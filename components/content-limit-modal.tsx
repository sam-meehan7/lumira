"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ContentLimitModalProps {
  onChoice: (choice: "yes" | "no") => void;
}

export default function ContentLimitModal({
  onChoice,
}: ContentLimitModalProps) {
  const [isOpen, setIsOpen] = useState(true);

  const handleChoice = (choice: "yes" | "no") => {
    setIsOpen(false);
    onChoice(choice);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Content Upload Limit Reached</DialogTitle>
          <DialogDescription>
            You have reached your content upload limit of one hour. Would you
            like to pay for more upload time?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button variant="secondary" onClick={() => handleChoice("yes")}>
            Yes, I'd like to pay
          </Button>
          <Button variant="outline" onClick={() => handleChoice("no")}>
            No, thanks
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
