"use client";

import { useState, useRef, useEffect, useCallback } from "react";

export function useCategorySelect() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setIsOpen(false);
    setSelectedIndex(-1);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      setSelectedIndex(-1);
    }
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, itemCount: number): number | null => {
      if (!isOpen && (e.key === "Enter" || e.key === " " || e.key === "ArrowDown")) {
        e.preventDefault();
        setIsOpen(true);
        setSelectedIndex(0);
        return null;
      }

      if (!isOpen) return null;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => (prev < itemCount - 1 ? prev + 1 : 0));
          return null;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : itemCount - 1));
          return null;
        case "Home":
          e.preventDefault();
          setSelectedIndex(0);
          return null;
        case "End":
          e.preventDefault();
          setSelectedIndex(itemCount - 1);
          return null;
        case "Enter":
        case " ":
          e.preventDefault();
          if (selectedIndex >= 0 && selectedIndex < itemCount) {
            return selectedIndex;
          }
          return null;
        case "Escape":
          e.preventDefault();
          close();
          triggerRef.current?.focus();
          return null;
        default:
          return null;
      }
    },
    [isOpen, selectedIndex, close]
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        menuRef.current &&
        triggerRef.current &&
        !menuRef.current.contains(target) &&
        !triggerRef.current.contains(target)
      ) {
        close();
      }
    };

    const timeoutId = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, close]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, close]);

  return {
    isOpen,
    selectedIndex,
    triggerRef,
    menuRef,
    close,
    toggle,
    handleKeyDown,
    setSelectedIndex,
  };
}


