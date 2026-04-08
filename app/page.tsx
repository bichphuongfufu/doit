/**
 * DoitPage - Main Application Page
 * Displays dual-column layout: active goals (left) and completed goals (right)
 */

"use client";

import { useGoals } from "@/lib/hooks/useGoals";
import { GoalList } from "@/components/GoalList";
import { CompletedList } from "@/components/CompletedList";
import { AddGoalButton } from "@/components/AddGoalButton";
import { GoalModal } from "@/components/GoalModal";
import { useState } from "react";

export default function Home() {
  const {
    activeGoals,
    completedGoals,
    addGoal,
    toggleGoalStatus,
    deleteGoal,
    isLoading,
  } = useGoals();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddGoal = (title: string, endDate: string) => {
    addGoal(title, endDate);
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-stone-50 to-stone-100">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">doit</h1>
          <p className="text-gray-600 mt-2">
            Track your goals and stay motivated
          </p>
        </div>

        {/* Main Layout: Two Columns */}
        <div className="flex gap-8 h-[calc(100vh-200px)]">
          <GoalList
            goals={activeGoals}
            onToggle={toggleGoalStatus}
            onDelete={deleteGoal}
          />
          <CompletedList
            goals={completedGoals}
            onToggle={toggleGoalStatus}
            onDelete={deleteGoal}
          />
        </div>

        {/* Floating Action Button */}
        <AddGoalButton onClick={() => setIsModalOpen(true)} />

        {/* Modal Dialog */}
        <GoalModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddGoal}
        />
      </div>
    </div>
  );
}
