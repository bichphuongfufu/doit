/**
 * Custom hook for goal management
 * Encapsulates all goal state, localStorage persistence, and CRUD operations
 */

"use client";

import { useState, useEffect } from "react";
import { Goal, GoalWithComputed } from "@/lib/types/goal";
import {
  loadGoals,
  saveGoals,
} from "@/lib/utils/storage";
import { getGoalsWithComputed } from "@/lib/utils/dateUtils";

export interface UseGoalsReturn {
  activeGoals: GoalWithComputed[];
  completedGoals: GoalWithComputed[];
  addGoal: (title: string, endDate: string) => void;
  toggleGoalStatus: (goalId: string) => void;
  deleteGoal: (goalId: string) => void;
  isLoading: boolean;
}

export function useGoals(): UseGoalsReturn {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load goals from localStorage on mount
  useEffect(() => {
    const loaded = loadGoals();
    setGoals(loaded);
    setIsLoading(false);
  }, []);

  // Persist to localStorage whenever goals change
  useEffect(() => {
    if (!isLoading) {
      saveGoals(goals);
    }
  }, [goals, isLoading]);

  // Helper: compute goals with calculated properties and sort
  const computeGoals = (
    goalList: Goal[]
  ): GoalWithComputed[] => {
    return getGoalsWithComputed(goalList)
      .sort((a, b) => {
        if (
          a.status === "active" &&
          b.status === "active"
        ) {
          // Active: sort by urgency (days remaining), nearest first
          return a.daysRemaining - b.daysRemaining;
        }
        // Completed: sort by completedAt descending (most recent first)
        const aDate = a.completedAt || "";
        const bDate = b.completedAt || "";
        return bDate > aDate ? 1 : -1;
      });
  };

  return {
    activeGoals: computeGoals(
      goals.filter((g) => g.status === "active")
    ),
    completedGoals: computeGoals(
      goals.filter((g) => g.status === "completed")
    ),

    addGoal: (title, endDate) => {
      const newGoal: Goal = {
        id: crypto.randomUUID(),
        title,
        endDate,
        status: "active",
        createdAt: new Date().toISOString(),
      };
      setGoals([...goals, newGoal]);
    },

    toggleGoalStatus: (goalId) => {
      setGoals(
        goals.map((goal) => {
          if (goal.id === goalId) {
            return {
              ...goal,
              status:
                goal.status === "active"
                  ? "completed"
                  : "active",
              completedAt:
                goal.status === "active"
                  ? new Date().toISOString()
                  : undefined,
            };
          }
          return goal;
        })
      );
    },

    deleteGoal: (goalId) => {
      setGoals(goals.filter((goal) => goal.id !== goalId));
    },

    isLoading,
  };
}
