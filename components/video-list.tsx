import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface Video {
  video_id: string;
  title: string;
  url: string;
  thumbnail: string;
  author: string;
}

interface VideoListProps {
  videos: Video[];
  selectedVideo: string | null;
  onVideoSelect: (videoId: string) => void;
  loading: boolean;
}

export function VideoList({
  videos,
  selectedVideo,
  onVideoSelect,
  loading
}: VideoListProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Videos</h2>
      <div className="grid gap-4">
        {loading ? (
          <div>Loading...</div>
        ) : (
          videos.map((video) => (
          <Card
            key={video.video_id}
            className={`cursor-pointer transition-colors ${
              selectedVideo === video.video_id ? "border-purple-500" : ""
            }`}
            onClick={() => onVideoSelect(video.video_id)}
          >
            <CardContent className="p-4 flex items-center space-x-4">
              <Image
                src={video.thumbnail}
                alt={video.title}
                width={96}
                height={96}
                className="rounded"
              />
              <div>
                <h3 className="font-semibold">{video.title}</h3>
                <p className="text-sm text-gray-500">{video.author}</p>
              </div>
            </CardContent>
          </Card>
        )))}
      </div>
    </div>
  );
}
