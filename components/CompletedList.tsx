/**
 * CompletedList Component
 * Right column displaying completed goals
 */

"use client";

import { GoalWithComputed } from "@/lib/types/goal";
import { GoalItem } from "./GoalItem";

interface CompletedListProps {
  goals: GoalWithComputed[];
  onToggle: (goalId: string) => void;
  onDelete: (goalId: string) => void;
}

export function CompletedList({
  goals,
  onToggle,
  onDelete,
}: CompletedListProps) {
  return (
    <div className="flex-1 bg-gradient-to-br from-green-50 to-teal-50 rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Completed Goals
      </h2>

      {goals.length === 0 ? (
        <p className="text-gray-400 text-center py-8">
          Complete some goals to see them here!
        </p>
      ) : (
        <div className="space-y-3">
          {goals.map((goal) => (
            <GoalItem
              key={goal.id}
              goal={goal}
              onToggle={() => onToggle(goal.id)}
              onDelete={() => onDelete(goal.id)}
              isCompleted={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}
