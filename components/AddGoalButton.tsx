/**
 * AddGoalButton Component
 * Floating action button to open goal creation modal
 */

"use client";

import { Button } from "@/components/ui/button";

interface AddGoalButtonProps {
  onClick: () => void;
}

export function AddGoalButton({ onClick }: AddGoalButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-8 right-8 rounded-full w-16 h-16 bg-pink-300 hover:bg-pink-400 text-white text-2xl shadow-lg transition-all hover:scale-110"
      aria-label="Add new goal"
    >
      +
    </Button>
  );
}
