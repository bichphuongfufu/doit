/**
 * GoalForm Component
 * Form inside modal for creating new goals with validation
 */

"use client";

import { useState } from "react";
import { validateTitle, validateEndDate } from "@/lib/utils/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface GoalFormProps {
  onSubmit: (title: string, endDate: string) => void;
  onCancel: () => void;
}

export function GoalForm({ onSubmit, onCancel }: GoalFormProps) {
  const [title, setTitle] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errors, setErrors] = useState<{
    title?: string;
    endDate?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate minimum date (today)
  const today = new Date();
  const minDate = today.toISOString().split("T")[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate
    const titleError = validateTitle(title);
    const endDateError = validateEndDate(endDate);

    if (titleError || endDateError) {
      setErrors({
        title: titleError || undefined,
        endDate: endDateError || undefined,
      });
      return;
    }

    // Submit
    setIsSubmitting(true);
    onSubmit(title, endDate);
    setTitle("");
    setEndDate("");
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title Input */}
      <div>
        <Label htmlFor="title" className="text-sm font-medium">
          Goal Title
        </Label>
        <Input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What's your goal?"
          maxLength={500}
          aria-invalid={!!errors.title}
          className={
            errors.title ? "border-red-500 focus:border-red-500" : ""
          }
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
      </div>

      {/* End Date Input */}
      <div>
        <Label htmlFor="endDate" className="text-sm font-medium">
          Target Date
        </Label>
        <Input
          id="endDate"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          min={minDate}
          aria-invalid={!!errors.endDate}
          className={
            errors.endDate ? "border-red-500 focus:border-red-500" : ""
          }
        />
        {errors.endDate && (
          <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-6 justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-pink-300 hover:bg-pink-400"
        >
          {isSubmitting ? "Adding..." : "Add Goal"}
        </Button>
      </div>
    </form>
  );
}
