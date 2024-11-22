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

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const data = await api.videos.getAll();
      setVideos(data);
    } catch (error) {
      console.error("Error fetching videos:", error);
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

  return (
    <>
      <NavBar user={user} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Video Library</h1>
        <VideoUpload onVideoAdded={fetchVideos} />
        <div className="grid md:grid-cols-2 gap-8">
          <VideoList
            videos={videos}
            selectedVideo={selectedVideo}
            onVideoSelect={setSelectedVideo}
          />
          <QuestionSection
            question={question}
            answer={answer}
            loading={loading}
            onQuestionChange={setQuestion}
            onAskQuestion={handleAskQuestion}
          />
        </div>
      </div>
    </>
  );
}
