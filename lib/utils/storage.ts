/**
 * localStorage utilities for goal persistence
 * Handles reading, writing, and error recovery for goal data
 */

import { Goal } from "@/lib/types/goal";

const STORAGE_KEY = "doit_goals";

/**
 * Load goals from localStorage
 * Returns empty array if storage is empty or data is corrupted
 */
export function loadGoals(): Goal[] {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];

  try {
    return JSON.parse(stored) as Goal[];
  } catch (error) {
    console.error("Failed to parse stored goals:", error);
    return []; // Graceful fallback on corrupt data
  }
}

/**
 * Save goals to localStorage
 */
export function saveGoals(goals: Goal[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
}

/**
 * Clear all goals from localStorage
 */
export function clearGoals(): void {
  localStorage.removeItem(STORAGE_KEY);
}
