"use client";

import { useState } from "react";

type PathType = "usa" | "india" | null;

export function useIntakeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [initialPath, setInitialPath] = useState<PathType>(null);

  const openModal = (path?: PathType) => {
    setInitialPath(path || null);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    initialPath,
    openModal,
    closeModal
  };
}
