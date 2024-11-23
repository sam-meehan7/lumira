"use client";

import { useState } from "react";
import { Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ContentLimitModal() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[480px] p-6">
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-2xl font-bold">
            Content Upload Limit Reached
          </DialogTitle>
          <p className="text-lg text-muted-foreground font-normal">
            You have reached your content upload limit of one hour. Would you
            like to pay for more upload time?
          </p>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-6">
          <Button
            variant="secondary"
            className="bg-green-500 hover:bg-green-600 text-white text-base font-normal justify-start px-4 py-6 h-auto"
            onClick={() => setIsOpen(false)}
          >
            <Smile className="w-5 h-5 mr-2" />
            Yes, I would pay for this service
          </Button>
          <Button
            variant="outline"
            className="text-base font-normal justify-start px-4 py-6 h-auto"
            onClick={() => setIsOpen(false)}
          >
            No, I wouldn&apos;t pay for this service
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
