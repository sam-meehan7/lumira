"use client";

import { useState, useEffect } from "react";
import { NavBar } from "./nav-bar";
import { api, Video, AnswerResponse } from "@/config/api";
import { QuestionSection } from "./question-section";
import { VideoList } from "./video-list";
import { VideoUpload } from "./video-upload";

interface LibraryPageComponentProps {
  user: any;
}

export function LibraryPageComponent({ user }: LibraryPageComponentProps) {
  console.log("Lib user", user);
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<AnswerResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [videosLoading, setVideosLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      setVideosLoading(true);
      const data = await api.videos.getAll();
      setVideos(data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setVideosLoading(false);
    }
  };

  const handleAskQuestion = async () => {
    if (!question) return;
    setLoading(true);
    setAnswer(null);
    try {
      const data = selectedVideo
        ? await api.questions.askAboutVideo(selectedVideo, question)
        : await api.questions.ask(question);
      setAnswer(data);
    } catch (error) {
      console.error("Error asking question:", error);
    } finally {
      setLoading(false);
    }
  };

  // ... existing imports ...

  return (
    <>
      <NavBar user={user} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Video Library</h1>
        <VideoUpload onVideoAdded={fetchVideos} />
        <div className="grid md:grid-cols-2 gap-8">
          {videosLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-200 rounded-lg p-4 animate-pulse"
                >
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <VideoList
              videos={videos}
              selectedVideo={selectedVideo}
              onVideoSelect={setSelectedVideo}
              loading={videosLoading}
            />
          )}
          <QuestionSection
            question={question}
            answer={answer}
            loading={loading}
            onQuestionChange={setQuestion}
            selectedVideo={selectedVideo}
            onAskQuestion={handleAskQuestion}
          />
        </div>
      </div>
    </>
  );
}
