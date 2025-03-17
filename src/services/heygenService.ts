
import { toast } from "sonner";

// HeyGen API endpoints
const HEYGEN_API_BASE_URL = "https://api.heygen.com/v1";
const HEYGEN_AVATAR_ENDPOINT = `${HEYGEN_API_BASE_URL}/avatars`;
const HEYGEN_VIDEO_ENDPOINT = `${HEYGEN_API_BASE_URL}/video_generation`;

// Types for HeyGen API responses
export interface HeyGenAvatar {
  id: string;
  name: string;
  image_url: string;
  gender: string;
  style: string;
  ethnicity?: string;
  age_range?: string;
}

export interface HeyGenVideoStatus {
  video_id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  url?: string;
  error?: string;
}

export interface HeyGenVideoRequest {
  avatar_id: string;
  voice_id: string;
  script: string;
  voice_type: string;
  name?: string;
}

class HeyGenService {
  private apiKey: string;

  constructor(apiKey: string = import.meta.env.VITE_HEYGEN_API_KEY || '') {
    this.apiKey = apiKey;
  }

  // Set API key dynamically
  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  // Generic method for making API requests
  private async fetchFromHeyGen(endpoint: string, options: RequestInit = {}) {
    if (!this.apiKey) {
      toast.error("HeyGen API key is not set");
      throw new Error("HeyGen API key is not set");
    }

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.apiKey}`,
      ...options.headers
    };

    try {
      const response = await fetch(endpoint, {
        ...options,
        headers
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HeyGen API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("HeyGen API error:", error);
      toast.error(`HeyGen API error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw error;
    }
  }

  // Get all available avatars
  async getAvatars(): Promise<HeyGenAvatar[]> {
    try {
      const data = await this.fetchFromHeyGen(HEYGEN_AVATAR_ENDPOINT);
      return data.avatars || [];
    } catch (error) {
      console.error("Failed to fetch avatars:", error);
      // Return empty array on error
      return [];
    }
  }

  // Generate video with an avatar
  async generateVideo(request: HeyGenVideoRequest): Promise<string> {
    const payload = {
      avatar: {
        avatar_id: request.avatar_id
      },
      voice: {
        voice_id: request.voice_id,
        voice_type: request.voice_type || "text"
      },
      text: request.script,
      name: request.name || "UGC Ad"
    };

    try {
      const response = await this.fetchFromHeyGen(HEYGEN_VIDEO_ENDPOINT, {
        method: "POST",
        body: JSON.stringify(payload)
      });
      
      return response.video_id;
    } catch (error) {
      console.error("Failed to generate video:", error);
      throw error;
    }
  }

  // Check video generation status
  async checkVideoStatus(videoId: string): Promise<HeyGenVideoStatus> {
    try {
      const response = await this.fetchFromHeyGen(`${HEYGEN_VIDEO_ENDPOINT}/${videoId}`);
      return {
        video_id: videoId,
        status: response.status,
        url: response.url,
        error: response.error
      };
    } catch (error) {
      console.error("Failed to check video status:", error);
      return {
        video_id: videoId,
        status: 'failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

// Export a singleton instance
export const heygenService = new HeyGenService();

// Export the class for testing or custom instantiation
export default HeyGenService;
