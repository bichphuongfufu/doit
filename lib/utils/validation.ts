/**
 * Form validation utilities
 * Validates goal title and end date before submission
 */

import { isBefore, startOfDay } from "date-fns";

/**
 * Validate goal title
 * Returns error message if invalid, null if valid
 */
export function validateTitle(title: string): string | null {
  if (!title?.trim()) {
    return "Goal title cannot be empty";
  }
  if (title.length > 500) {
    return "Goal title cannot exceed 500 characters";
  }
  return null;
}

/**
 * Validate goal end date
 * Returns error message if invalid, null if valid
 */
export function validateEndDate(endDateString: string): string | null {
  if (!endDateString) {
    return "Please select an end date";
  }

  const endDate = new Date(endDateString);
  const today = startOfDay(new Date());

  if (isBefore(endDate, today)) {
    return "End date must be in the future";
  }

  return null;
}
