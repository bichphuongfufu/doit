/**
 * Goal Entity Interfaces
 * Defines the core data structures for goal tracking
 */

export interface Goal {
  id: string; // UUID v4, auto-generated on creation
  title: string; // User-provided, non-empty (1-500 chars)
  endDate: string; // ISO 8601 date string (YYYY-MM-DD)
  status: "active" | "completed"; // Enum: active or completed
  createdAt: string; // ISO 8601 timestamp of creation
  completedAt?: string; // ISO 8601 timestamp when marked complete (optional)
}

/**
 * Goal with computed properties
 * Calculated at render time from endDate and current date
 */
export interface GoalWithComputed extends Goal {
  daysRemaining: number; // differenceInDays(endDate, today)
  isOverdue: boolean; // daysRemaining < 0
  isHighlighted: boolean; // status === 'active' && daysRemaining <= 3
  displayEndDate: string; // formatted using date-fns (e.g., "Apr 10, 2026")
  displayDaysRemaining: string; // e.g., "3 days left", "0 days (Due today)", "Overdue"
}
