/**
 * GoalList Component
 * Left column displaying active goals with countdown timers
 */

"use client";

import { GoalWithComputed } from "@/lib/types/goal";
import { GoalItem } from "./GoalItem";

interface GoalListProps {
  goals: GoalWithComputed[];
  onToggle: (goalId: string) => void;
  onDelete: (goalId: string) => void;
}

export function GoalList({
  goals,
  onToggle,
  onDelete,
}: GoalListProps) {
  return (
    <div className="flex-1 bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Current Goals
      </h2>

      {goals.length === 0 ? (
        <p className="text-gray-400 text-center py-8">
          No active goals yet. Add one to get started!
        </p>
      ) : (
        <div className="space-y-3">
          {goals.map((goal) => (
            <GoalItem
              key={goal.id}
              goal={goal}
              onToggle={() => onToggle(goal.id)}
              onDelete={() => onDelete(goal.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
