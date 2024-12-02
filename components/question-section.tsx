import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Loader2, Search } from "lucide-react";
import { AnswerResponse } from "@/config/api";

interface QuestionSectionProps {
  question: string;
  answer: AnswerResponse | null;
  loading: boolean;
  onQuestionChange: (question: string) => void;
  selectedVideo: string | null;
  onAskQuestion: () => void;
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export function QuestionSection({
  question,
  answer,
  loading,
  selectedVideo,
  onQuestionChange,
  onAskQuestion,
}: QuestionSectionProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Ask a Question</h2>
      <Card>
        <CardContent className="p-4">
          <Input
            placeholder={
              selectedVideo
                ? "Type your question here"
                : "Please select a video first"
            }
            value={question}
            onChange={(e) => onQuestionChange(e.target.value)}
            className="mb-4"
            disabled={!selectedVideo}
          />
          <Button
            onClick={onAskQuestion}
            disabled={loading || !selectedVideo}
            className="w-full"
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Search className="mr-2 h-4 w-4" />
            )}
            {loading
              ? "Thinking..."
              : selectedVideo
              ? "Ask Question"
              : "Select a video first"}
          </Button>
        </CardContent>
        {answer && (
          <CardFooter className="bg-gray-50 p-4 block">
            {" "}
            {/* Changed to block display */}
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Answer:</h4>
                <p className="whitespace-pre-wrap">{answer.answer}</p>
              </div>

              {answer.vectorResults.length > 0 && (
                <div>
                  <h4 className="font-semibold text-sm text-zinc-800 dark:text-zinc-200 mb-2">
                    Sources:
                  </h4>
                  <ul className="list-none space-y-1">
                    {answer.vectorResults.map((result, index) => (
                      <li key={index} className="text-sm">
                        <span className="text-zinc-500 dark:text-zinc-400">
                          •
                        </span>{" "}
                        <a
                          href={`${result.url}&t=${Math.floor(result.start)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline ml-1"
                        >
                          {result.title} ({formatTime(result.start)} -{" "}
                          {formatTime(result.end)})
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
