import React, { useEffect, useRef, ReactNode } from "react";

import { Button } from "../Button/Button";
import { Header } from "../Header/Header";

import "./Modal.css";

export type ModalFormat = "single" | "1+1-vertical" | "1+1-horizontal" | "2+1" | "1+2";

export const MODAL_FORMATS: readonly ModalFormat[] = [
  "single",
  "1+1-vertical",
  "1+1-horizontal",
  "2+1",
  "1+2",
] as const;

export type ModalProps = {
  title: string;
  format?: ModalFormat;
  rightSlot?: ReactNode;
  subHeader?: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  showA?: boolean; // Controls first pane visibility (or top/left depending on format)
  showB?: boolean; // Controls second pane visibility (or bottom/right depending on format)
  showC?: boolean; // Controls third pane visibility (for 2+1 and 1+2 formats)
};

export const Modal: React.FC<ModalProps> = ({
  title,
  format = "single",
  rightSlot,
  subHeader,
  isOpen,
  onClose,
  className,
  showA = true,
  showB = true,
  showC = true,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLElement | null>(null);
  const headerIdRef = useRef(`modal-header-${Math.random().toString(36).substr(2, 9)}`);

  // Handle ESC key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Ensure no buttons are focused on initial mount
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    // Blur any header buttons that might have been auto-focused
    const headerButtons = modalRef.current.querySelectorAll<HTMLElement>('.arkem-header button');
    headerButtons.forEach((btn) => {
      if (btn === document.activeElement) {
        btn.blur();
      }
    });
  }, [isOpen]);

  // Focus trap (no auto-focus to prevent visible focus rings on buttons)
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    // Find all focusable elements within modal (including header buttons for tab navigation)
    const focusableSelectors = [
      'button:not([disabled])',
      'a[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ');

    // Focus trap: keep focus within modal
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !modalRef.current) return;

      const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(focusableSelectors);
      const focusableArray = Array.from(focusableElements).filter(
        (el) => el.offsetParent !== null
      );

      if (focusableArray.length === 0) return;

      const firstElement = focusableArray[0];
      const lastElement = focusableArray[focusableArray.length - 1];
      const activeElement = document.activeElement as HTMLElement;

      // Check if focus is leaving the modal
      const isFocusInsideModal = modalRef.current.contains(activeElement);
      if (!isFocusInsideModal) {
        // If focus is outside modal, move to first element
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
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);

  // Set ID on header label for ARIA
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;
    const headerLabel = modalRef.current.querySelector<HTMLElement>('.arkem-header__label');
    if (headerLabel) {
      headerLabel.id = headerIdRef.current;
    }
  }, [isOpen, title]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="arkem-modal-overlay"
      onClick={handleBackdropClick}
      aria-hidden={!isOpen}
    >
      <div
        ref={modalRef}
        className={`arkem-modal ${className || ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headerIdRef.current}
      >
        {/* Header Secondary */}
        <Header
          hierarchy="secondary"
          label={title}
          rightSlot={
            rightSlot ? (
              <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                {rightSlot}
                <Button
                  size="md"
                  hierarchy="secondary"
                  tone="black"
                  function="close"
                  iconTrailing={true}
                  trailingIconName="X"
                  showText={false}
                  iconLeading={false}
                  ariaLabel="Close"
                  onClick={onClose}
                />
              </div>
            ) : (
              <Button
                size="md"
                hierarchy="secondary"
                tone="black"
                function="close"
                iconTrailing={true}
                trailingIconName="X"
                showText={false}
                iconLeading={false}
                ariaLabel="Close"
                onClick={onClose}
              />
            )
          }
        />

        {/* SubHeader (optional) */}
        {subHeader && <div className="arkem-modal__subheader">{subHeader}</div>}

        {/* Body - scrollable */}
        <div className={`arkem-modal__body arkem-modal__body--format-${format.replace(/\+/g, '-plus-')}`}>
          {format === "single" && (
            <>
              {showA ? (
                <div className="arkem-modal__pane"></div>
              ) : (
                <div className="arkem-modal__pane arkem-modal__pane--placeholder" aria-hidden data-empty></div>
              )}
            </>
          )}
          {format === "1+1-vertical" && (
            <>
              {showA ? (
                <div className="arkem-modal__pane"></div>
              ) : (
                <div className="arkem-modal__pane arkem-modal__pane--placeholder" aria-hidden data-empty></div>
              )}
              {showB ? (
                <div className="arkem-modal__pane"></div>
              ) : (
                <div className="arkem-modal__pane arkem-modal__pane--placeholder" aria-hidden data-empty></div>
              )}
            </>
          )}
          {format === "1+1-horizontal" && (
            <>
              {showA ? (
                <div className="arkem-modal__pane"></div>
              ) : (
                <div className="arkem-modal__pane arkem-modal__pane--placeholder" aria-hidden data-empty></div>
              )}
              {showB ? (
                <div className="arkem-modal__pane"></div>
              ) : (
                <div className="arkem-modal__pane arkem-modal__pane--placeholder" aria-hidden data-empty></div>
              )}
            </>
          )}
          {format === "2+1" && (
            <>
              <div className="arkem-modal__left-panes">
                {showA ? (
                  <div className="arkem-modal__pane"></div>
                ) : (
                  <div className="arkem-modal__pane arkem-modal__pane--placeholder" aria-hidden data-empty></div>
                )}
                {showB ? (
                  <div className="arkem-modal__pane"></div>
                ) : (
                  <div className="arkem-modal__pane arkem-modal__pane--placeholder" aria-hidden data-empty></div>
                )}
              </div>
              {showC ? (
                <div className="arkem-modal__pane"></div>
              ) : (
                <div className="arkem-modal__pane arkem-modal__pane--placeholder" aria-hidden data-empty></div>
              )}
            </>
          )}
          {format === "1+2" && (
            <>
              {showA ? (
                <div className="arkem-modal__pane"></div>
              ) : (
                <div className="arkem-modal__pane arkem-modal__pane--placeholder" aria-hidden data-empty></div>
              )}
              <div className="arkem-modal__right-panes">
                {showB ? (
                  <div className="arkem-modal__pane"></div>
                ) : (
                  <div className="arkem-modal__pane arkem-modal__pane--placeholder" aria-hidden data-empty></div>
                )}
                {showC ? (
                  <div className="arkem-modal__pane"></div>
                ) : (
                  <div className="arkem-modal__pane arkem-modal__pane--placeholder" aria-hidden data-empty></div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

