import { useCallback, useEffect, useRef, useState } from "react";
import { DANGER_RADIUS } from "../lib/constants";

type Position = { x: number; y: number };
type Bounds = { minX: number; maxX: number; minY: number; maxY: number };

type UseEvasivePositionOptions = {
  enabled: boolean;
  onDodge?: () => void;
};

const TOUCH_DANGER_RADIUS = 140;
const EDGE_PADDING = 8;

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

  const getBounds = useCallback((): Bounds | null => {
    const container = containerRef.current;
    const button = buttonRef.current;
    if (!container || !button) return null;

    const maxX = container.clientWidth - button.offsetWidth;
    const maxY = container.clientHeight - button.offsetHeight;

    if (maxX < EDGE_PADDING || maxY < EDGE_PADDING) return null;

    return {
      minX: EDGE_PADDING,
      maxX: maxX - EDGE_PADDING,
      minY: EDGE_PADDING,
      maxY: maxY - EDGE_PADDING,
    };
  }, []);

  const clampToBounds = useCallback((pos: Position, bounds: Bounds): Position => {
    return {
      x: Math.min(Math.max(bounds.minX, pos.x), bounds.maxX),
      y: Math.min(Math.max(bounds.minY, pos.y), bounds.maxY),
    };
  }, []);

  const getRandomPosition = useCallback(
    (pointerX: number, pointerY: number): Position | null => {
      const container = containerRef.current;
      const button = buttonRef.current;
      const bounds = getBounds();
      if (!container || !button || !bounds) return null;

      const containerRect = container.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();

      const buttonCenter = {
        x: buttonRect.left - containerRect.left + buttonRect.width / 2,
        y: buttonRect.top - containerRect.top + buttonRect.height / 2,
      };

      const relPointer = {
        x: pointerX - containerRect.left,
        y: pointerY - containerRect.top,
      };

      const rangeX = bounds.maxX - bounds.minX;
      const rangeY = bounds.maxY - bounds.minY;

      for (let attempt = 0; attempt < 40; attempt++) {
        const candidate = {
          x: bounds.minX + Math.random() * rangeX,
          y: bounds.minY + Math.random() * rangeY,
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

      return clampToBounds(
        {
          x: awayX - buttonRect.width / 2,
          y: awayY - buttonRect.height / 2,
        },
        bounds,
      );
    },
    [clampToBounds, dangerRadius, getBounds],
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

    const placeInitial = () => {
      const button = buttonRef.current;
      const bounds = getBounds();
      if (!button || !bounds) return;

      const centeredX = bounds.minX + (bounds.maxX - bounds.minX) / 2;

      setPosition({
        x: centeredX,
        y: bounds.minY,
      });
      initialized.current = true;
    };

    requestAnimationFrame(() => requestAnimationFrame(placeInitial));
  }, [getBounds]);

  return { containerRef, buttonRef, position, forceDodge };
}
