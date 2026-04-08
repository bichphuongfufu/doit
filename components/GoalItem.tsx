/**
 * GoalItem Component
 * Displays a single goal card with checkbox, title, countdown, and delete button
 */

"use client";

import { GoalWithComputed } from "@/lib/types/goal";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface GoalItemProps {
  goal: GoalWithComputed;
  onToggle: () => void;
  onDelete: () => void;
  isCompleted?: boolean;
}

export function GoalItem({
  goal,
  onToggle,
  onDelete,
  isCompleted = false,
}: GoalItemProps) {
  return (
    <div
      className={`
        flex items-center gap-4 p-4 rounded-lg border transition
        ${
          goal.isHighlighted && !isCompleted
            ? "bg-orange-100 border-orange-300"
            : "border-gray-200"
        }
        ${
          isCompleted
            ? "bg-gray-50 opacity-60"
            : "bg-white hover:shadow-md"
        }
      `}
    >
      <Checkbox
        checked={isCompleted}
        onCheckedChange={onToggle}
        className="h-5 w-5"
        aria-label={`Mark "${goal.title}" as ${
          isCompleted ? "incomplete" : "complete"
        }`}
      />
      <div className="flex-1">
        <p
          className={`font-semibold ${
            isCompleted
              ? "line-through text-gray-400"
              : "text-gray-800"
          }`}
        >
          {goal.title}
        </p>
        <p className="text-sm text-gray-500">
          {goal.displayEndDate} • {goal.displayDaysRemaining}
        </p>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onDelete}
        className="text-red-500 hover:bg-red-50"
        aria-label={`Delete "${goal.title}"`}
      >
        ✕
      </Button>
    </div>
  );
}
