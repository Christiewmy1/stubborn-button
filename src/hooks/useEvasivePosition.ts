import { useCallback, useEffect, useRef, useState } from "react";
import { DANGER_RADIUS } from "../lib/constants";

type Position = { x: number; y: number };

type UseEvasivePositionOptions = {
  enabled: boolean;
  onDodge?: () => void;
};

const TOUCH_DANGER_RADIUS = 140;

export function useEvasivePosition({
  enabled,
  onDodge,
}: UseEvasivePositionOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const initialized = useRef(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const dangerRadius = isTouch ? TOUCH_DANGER_RADIUS : DANGER_RADIUS;

  const getRandomPosition = useCallback(
    (pointerX: number, pointerY: number): Position | null => {
      const container = containerRef.current;
      const button = buttonRef.current;
      if (!container || !button) return null;

      const containerRect = container.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();
      const maxX = containerRect.width - buttonRect.width;
      const maxY = containerRect.height - buttonRect.height;

      if (maxX <= 0 || maxY <= 0) return null;

      const buttonCenter = {
        x: buttonRect.left - containerRect.left + buttonRect.width / 2,
        y: buttonRect.top - containerRect.top + buttonRect.height / 2,
      };

      const relPointer = {
        x: pointerX - containerRect.left,
        y: pointerY - containerRect.top,
      };

      for (let attempt = 0; attempt < 20; attempt++) {
        const candidate = {
          x: Math.random() * maxX,
          y: Math.random() * maxY,
        };

        const candidateCenter = {
          x: candidate.x + buttonRect.width / 2,
          y: candidate.y + buttonRect.height / 2,
        };

        const distToPointer = Math.hypot(
          candidateCenter.x - relPointer.x,
          candidateCenter.y - relPointer.y,
        );

        const distFromCurrent = Math.hypot(
          candidateCenter.x - buttonCenter.x,
          candidateCenter.y - buttonCenter.y,
        );

        if (distToPointer > dangerRadius && distFromCurrent > 40) {
          return candidate;
        }
      }

      const awayX = buttonCenter.x + (buttonCenter.x - relPointer.x);
      const awayY = buttonCenter.y + (buttonCenter.y - relPointer.y);

      return {
        x: Math.min(Math.max(0, awayX - buttonRect.width / 2), maxX),
        y: Math.min(Math.max(0, awayY - buttonRect.height / 2), maxY),
      };
    },
    [dangerRadius],
  );

  const moveAway = useCallback(
    (clientX: number, clientY: number) => {
      const next = getRandomPosition(clientX, clientY);
      if (next) {
        setPosition(next);
        onDodge?.();
      }
    },
    [getRandomPosition, onDodge],
  );

  const dodge = useCallback(
    (clientX: number, clientY: number) => {
      if (!enabled) return;

      const button = buttonRef.current;
      if (!button) return;

      const buttonRect = button.getBoundingClientRect();
      const buttonCenterX = buttonRect.left + buttonRect.width / 2;
      const buttonCenterY = buttonRect.top + buttonRect.height / 2;
      const distance = Math.hypot(clientX - buttonCenterX, clientY - buttonCenterY);

      if (distance < dangerRadius) {
        moveAway(clientX, clientY);
      }
    },
    [enabled, dangerRadius, moveAway],
  );

  const forceDodge = useCallback(
    (clientX: number, clientY: number) => {
      if (!enabled) return;
      moveAway(clientX, clientY);
    },
    [enabled, moveAway],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !enabled) return;

    const handlePointerMove = (e: PointerEvent) => {
      dodge(e.clientX, e.clientY);
    };

    const handlePointerDown = (e: PointerEvent) => {
      dodge(e.clientX, e.clientY);
    };

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerdown", handlePointerDown);

    return () => {
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [dodge, enabled]);

  useEffect(() => {
    if (initialized.current) return;
    const container = containerRef.current;
    const button = buttonRef.current;
    if (!container || !button) return;

    const containerRect = container.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    const maxX = containerRect.width - buttonRect.width;
    const maxY = containerRect.height - buttonRect.height;

    setPosition({
      x: Math.max(0, maxX * 0.65),
      y: Math.max(0, maxY * 0.5),
    });
    initialized.current = true;
  }, []);

  return { containerRef, buttonRef, position, forceDodge };
}
