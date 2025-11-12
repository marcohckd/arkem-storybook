import React, { useEffect, useRef, ReactNode } from "react";

import { Button } from "../../atoms/Button/Button";
import { Header } from "../Header/Header";
import { useOverlay } from "../../../hooks/useOverlay";

import "./Modal.css";

/** Modal layout format */
export type ModalFormat = "single" | "1+1-vertical" | "1+1-horizontal" | "2+1" | "1+2";

export const MODAL_FORMATS: readonly ModalFormat[] = [
  "single",
  "1+1-vertical",
  "1+1-horizontal",
  "2+1",
  "1+2",
] as const;

export type ModalProps = {
  /** Modal title text */
  title: string;
  /** Layout format of the modal */
  format?: ModalFormat;
  /** Optional leading icon for modal header */
  leadingIcon?: ReactNode;
  /** Content to display in the header right slot */
  rightSlot?: ReactNode;
  /** Optional subheader content */
  subHeader?: ReactNode;
  /** Optional footer content */
  footer?: ReactNode;
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback function called when modal should close */
  onClose: () => void;
  /** Additional CSS class name */
  className?: string;
  /** Controls first pane visibility (or top/left depending on format) */
  showA?: boolean;
  /** Controls second pane visibility (or bottom/right depending on format) */
  showB?: boolean;
  /** Controls third pane visibility (for 2+1 and 1+2 formats) */
  showC?: boolean;
  /** Custom header element (alternative to title/rightSlot) */
  header?: ReactNode;
};

export const Modal: React.FC<ModalProps> = ({
  title,
  format = "single",
  leadingIcon,
  rightSlot,
  subHeader,
  footer,
  isOpen,
  onClose,
  className,
  showA = true,
  showB = true,
  showC = true,
  header,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const headerIdRef = useRef(`modal-header-${Math.random().toString(36).substr(2, 9)}`);

  // Use overlay hook for shared functionality
  useOverlay({
    isOpen,
    onClose,
    containerRef: modalRef,
    preventBodyScroll: true,
    enableFocusTrap: true,
    enableEscape: true,
  });

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
        {/* Header */}
        {header ? (
          header
        ) : (
          <Header
            hierarchy="secondary"
            label={title}
            leadingIcon={leadingIcon}
            rightSlot={
              rightSlot ? (
                <div className="arkem-modal__right-slot">
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
        )}

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

        {/* Footer (optional) */}
        {footer && <div className="arkem-modal__footer">{footer}</div>}
      </div>
    </div>
  );
};

