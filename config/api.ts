import { createClient } from "@/utils/supabase/client";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Types matching the backend models
export interface Video {
  video_id: string;
  title: string;
  url: string;
  thumbnail: string;
  author: string;
}

export interface VectorResult {
  video_id: string;
  title: string;
  url: string;
  start: number;
  end: number;
  metadata?: Record<string, string | number>; // Replace [key: string]: any with explicit metadata type
}

export interface AnswerResponse {
  answer: string;
  vectorResults: VectorResult[];
}

export interface IndexStats {
  total_vector_count: number;
  dimension: number;
  unique_videos: string[];
  sample_vectors: {
    id: string;
    score: number;
    metadata: VectorResult;
  }[];
}

// Helper function to get auth header
async function getAuthHeader() {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return {
    Authorization: `Bearer ${session?.access_token || ""}`,
  };
}

// API client with error handling
class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new ApiError(response.status, error.detail || response.statusText);
  }
  return response.json();
}

export const api = {
  // Videos endpoints
  videos: {
    getAll: async (): Promise<Video[]> => {
      const headers = await getAuthHeader();
      const response = await fetch(`${API_BASE_URL}/api/videos`, {
        headers,
      });
      return handleResponse<Video[]>(response);
    },

    upload: async (videoUrl: string) => {
      const headers = await getAuthHeader();
      const response = await fetch(`${API_BASE_URL}/api/upload`, {
        method: "POST",
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoUrl }),
      });
      return handleResponse<{ message: string }>(response);
    },
  },

  // Questions endpoints
  questions: {
    ask: async (question: string): Promise<AnswerResponse> => {
      const headers = await getAuthHeader();
      const response = await fetch(`${API_BASE_URL}/api/ask`, {
        method: "POST",
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });
      return handleResponse<AnswerResponse>(response);
    },

    askAboutVideo: async (
      videoId: string,
      question: string
    ): Promise<AnswerResponse> => {
      const headers = await getAuthHeader();
      const response = await fetch(`${API_BASE_URL}/api/ask/${videoId}`, {
        method: "POST",
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });
      return handleResponse<AnswerResponse>(response);
    },
  },
};
