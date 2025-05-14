"use client"

import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { X } from "lucide-react"

interface PolicyModalProps {
  title: string
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export function PolicyModal({ title, isOpen, onClose, children }: PolicyModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto bg-gray-900 text-gray-200">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </button>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
