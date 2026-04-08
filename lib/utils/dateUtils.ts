/**
 * Date utilities using date-fns
 * Handles countdown calculation, formatting, and highlighting logic
 */

import {
  differenceInDays,
  format,
  isBefore,
  startOfDay,
} from "date-fns";
import { Goal, GoalWithComputed } from "@/lib/types/goal";

/**
 * Calculate days remaining between endDate and today
 * Returns negative if overdue, 0 if due today, positive if future
 */
export function daysRemaining(endDate: string): number {
  return differenceInDays(
    new Date(endDate),
    startOfDay(new Date())
  );
}

/**
 * Format end date for display (e.g., "Apr 10, 2026")
 */
export function formatEndDate(dateString: string): string {
  return format(new Date(dateString), "MMM d, yyyy");
}

/**
 * Check if goal is overdue
 */
export function isOverdue(endDate: string): boolean {
  return daysRemaining(endDate) < 0;
}

/**
 * Check if goal should be highlighted (active and within 3 days)
 */
export function isHighlighted(endDate: string): boolean {
  const days = daysRemaining(endDate);
  return days >= 0 && days <= 3;
}

/**
 * Get human-readable days remaining string
 */
export function getDisplayDaysRemaining(endDate: string): string {
  const days = daysRemaining(endDate);
  if (days < 0) return "Overdue";
  if (days === 0) return "Due today";
  return `${days} day${days === 1 ? "" : "s"} left`;
}

/**
 * Add computed properties to a Goal
 */
export function getGoalWithComputed(goal: Goal): GoalWithComputed {
  const days = daysRemaining(goal.endDate);
  return {
    ...goal,
    daysRemaining: days,
    isOverdue: days < 0,
    isHighlighted:
      goal.status === "active" && days >= 0 && days <= 3,
    displayEndDate: formatEndDate(goal.endDate),
    displayDaysRemaining: getDisplayDaysRemaining(goal.endDate),
  };
}

/**
 * Convert list of goals to list with computed properties
 */
export function getGoalsWithComputed(goals: Goal[]): GoalWithComputed[] {
  return goals.map(getGoalWithComputed);
}
