import { useEffect, useRef } from "react";

export interface UseOverlayOptions {
  isOpen: boolean;
  onClose: () => void;
  containerRef: React.RefObject<HTMLElement>;
  preventBodyScroll?: boolean;
  enableFocusTrap?: boolean;
  enableEscape?: boolean;
}

export function useOverlay({
  isOpen,
  onClose,
  containerRef,
  preventBodyScroll = true,
  enableFocusTrap = true,
  enableEscape = true,
}: UseOverlayOptions) {
  // Handle ESC key
  useEffect(() => {
    if (!isOpen || !enableEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose, enableEscape]);

  // Prevent body scroll when overlay is open
  useEffect(() => {
    if (!isOpen || !preventBodyScroll) return;

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, preventBodyScroll]);

  // Focus trap
  useEffect(() => {
    if (!isOpen || !enableFocusTrap || !containerRef.current) return;

    const focusableSelectors = [
      'button:not([disabled])',
      'a[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ');

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !containerRef.current) return;

      const focusableElements = containerRef.current.querySelectorAll<HTMLElement>(focusableSelectors);
      const focusableArray = Array.from(focusableElements).filter(
        (el) => el.offsetParent !== null
      );

      if (focusableArray.length === 0) return;

      const firstElement = focusableArray[0];
      const lastElement = focusableArray[focusableArray.length - 1];
      const activeElement = document.activeElement as HTMLElement;

      // Check if focus is leaving the container
      const isFocusInside = containerRef.current.contains(activeElement);
      if (!isFocusInside) {
        e.preventDefault();
        firstElement.focus();
        return;
      }

      if (e.shiftKey) {
        // Shift+Tab: if at first element, wrap to last
        if (activeElement === firstElement || (!focusableArray.includes(activeElement))) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab: if at last element, wrap to first
        if (activeElement === lastElement || (!focusableArray.includes(activeElement))) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [isOpen, enableFocusTrap, containerRef]);
}

