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
      const response = await fetch(`${API_BASE_URL}/api/videos`);
      return handleResponse<Video[]>(response);
    },

    upload: async (videoUrl: string) => {
      const response = await fetch(`${API_BASE_URL}/api/upload`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoUrl }),
      });
      return handleResponse<{ message: string }>(response);
    },
  },

  // Questions endpoints
  questions: {
    ask: async (question: string): Promise<AnswerResponse> => {
      const response = await fetch(`${API_BASE_URL}/api/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      return handleResponse<AnswerResponse>(response);
    },

    askAboutVideo: async (
      videoId: string,
      question: string
    ): Promise<AnswerResponse> => {
      const response = await fetch(`${API_BASE_URL}/api/ask/${videoId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      return handleResponse<AnswerResponse>(response);
    },
  },

  // Stats endpoint
  stats: {
    getIndexStats: async (): Promise<IndexStats> => {
      const response = await fetch(`${API_BASE_URL}/api/index-stats`);
      return handleResponse<IndexStats>(response);
    },
  },
};
