import React, { useState, useEffect, useMemo } from 'react';

/**
 * Event object to be applied on the target element.
 * <div {...events} />
 */
export interface IPointerDragEvents {
  onMouseDown: (e: React.MouseEvent) => void;
  onTouchStart: (e: React.TouchEvent) => void;
}

export interface IPointerDragState {
  /**
   * Event object to be applied on the target element.
   * <div {...events} />
   */
  events: IPointerDragEvents;

  /**
   * Whether the element is currently being dragged.
   */
  moving: boolean;
}

/**
 * Common mouse/touch hold and move actions.
 * @param updatePosition Function to be called with clientX and clientY when mouse/touch is down and dragged.
 * @returns IPointerDragState
 */
export function usePointerDrag(
  updatePosition: (x: number, y: number) => void
): IPointerDragState {
  const [moving, setMoving] = useState(false);

  useEffect(() => {
    if (!moving) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      updatePosition(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const touch = e.touches[0];
      if (!touch) {
        return;
      }

      updatePosition(touch.clientX, touch.clientY);
    };

    const handleUp = () => {
      setMoving(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleUp);

    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleUp);
    document.addEventListener('touchcancel', handleUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleUp);

      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleUp);
      document.removeEventListener('touchcancel', handleUp);
    };
  });

  const events = useMemo(
    () => ({
      onMouseDown: (e: React.MouseEvent) => {
        e.preventDefault();
        setMoving(true);
      },
      onTouchStart: (e: React.TouchEvent) => {
        e.preventDefault();
        setMoving(true);
      }
    }),
    [setMoving]
  );

  return {
    events,
    moving
  };
}
