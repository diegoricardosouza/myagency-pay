import { X } from "lucide-react";
import React from "react";
import { AlertDialog, AlertDialogContent } from "./ui/alert-dialog";

interface ModalProps {
  open?: boolean;
  children: React.ReactNode;
  onClose?(): void;
}

export function Modal({ open, children, onClose }: ModalProps) {
  return (
    <div className="!z-[999999]">
      <AlertDialog open={open} onOpenChange={onClose}>
        <AlertDialogContent>
          <button
            onClick={onClose}
            className='w-12 h-12 flex items-center justify-center outline-none absolute top-0 right-0'
          >
            <X className='w-6 h-6' />
          </button>

          {children}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
