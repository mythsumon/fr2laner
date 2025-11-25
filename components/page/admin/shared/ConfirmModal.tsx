"use client";

import { X, AlertTriangle } from "lucide-react";
import { Button } from "@/components/shared/common";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: "danger" | "warning" | "info";
  isLoading?: boolean;
}

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "확인",
  cancelText = "취소",
  type = "danger",
  isLoading = false,
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  const typeStyles = {
    danger: "bg-red-50 border-red-200 text-red-700",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-700",
    info: "bg-blue-50 border-blue-200 text-blue-700",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-start gap-4 mb-4">
          <div className={`p-3 rounded-full ${typeStyles[type]}`}>
            <AlertTriangle className="size-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-[#0F172A] mb-2">{title}</h3>
            <p className="text-sm text-[#64748B]">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-[#F8FAFC] text-[#64748B]"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="flex gap-3 pt-4">
          <Button
            type="outline"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1"
          >
            {cancelText}
          </Button>
          <Button
            type={type === "danger" ? "primary" : "primary"}
            onClick={onConfirm}
            disabled={isLoading}
            loading={isLoading}
            className={`flex-1 ${type === "danger" ? "bg-red-600 hover:bg-red-700" : ""}`}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};


