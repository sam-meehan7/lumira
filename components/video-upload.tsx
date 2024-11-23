import { useState } from "react";
import { api } from "@/config/api";
import ContentLimitModal from "./content-limit-modal";

export function VideoUpload({ onVideoAdded }: { onVideoAdded: () => void }) {
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showLimitModal, setShowLimitModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      await api.videos.upload(videoUrl);
      setVideoUrl("");
      setSuccessMessage(
        "Video is being processed. It will appear in your library shortly."
      );
      onVideoAdded();
    } catch (err) {
      if (err instanceof Error) {
        // Check if it's a payment required error (402)
        if ((err as any).status === 402) {
          setShowLimitModal(true);
        } else {
          setError(err.message);
        }
      } else {
        setError("Failed to upload video");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLimitModalChoice = async (choice: "yes" | "no") => {
    setShowLimitModal(false);

    try {
      await api.preferences.updatePayment(choice === "yes");

      if (choice === "yes") {
        // Redirect to pricing page or payment flow
        window.location.href = "/pricing";
      }
    } catch (err) {
      // Optionally handle error - could show a toast notification
      console.error("Failed to update payment preference:", err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex flex-col space-y-2">
          <label htmlFor="videoUrl" className="font-medium">
            Add YouTube Video
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              id="videoUrl"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="Enter YouTube URL"
              className="flex-1 px-3 py-2 border rounded-md"
              required
              pattern="^https?:\/\/(www\.)?youtube\.com\/watch\?v=.*|^https?:\/\/youtu\.be\/.*"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Video"}
            </button>
          </div>
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {successMessage && (
          <p className="text-green-600 text-sm mt-2 flex items-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            {successMessage}
          </p>
        )}
      </form>

      {showLimitModal && (
        <ContentLimitModal onChoice={handleLimitModalChoice} />
      )}
    </>
  );
}
