/**
 * GoalModal Component
 * Modal dialog for goal creation
 */

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GoalForm } from "./GoalForm";

interface GoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, endDate: string) => void;
}

export function GoalModal({
  isOpen,
  onClose,
  onSubmit,
}: GoalModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white rounded-lg shadow-xl">
        <DialogHeader>
          <DialogTitle>Add New Goal</DialogTitle>
        </DialogHeader>
        <GoalForm onSubmit={onSubmit} onCancel={onClose} />
      </DialogContent>
    </Dialog>
  );
}
