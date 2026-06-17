import { motion } from "framer-motion";
import { useEvasivePosition } from "../../hooks/useEvasivePosition";
import { useDodgeThrottle, useSassMessage } from "../../hooks/useSassMessage";
import SassBubble from "./SassBubble";

type EvasiveButtonProps = {
  label: string;
  sassMessages: string[];
  enabled: boolean;
};

export default function EvasiveButton({
  label,
  sassMessages,
  enabled,
}: EvasiveButtonProps) {
  const { message, showRandom } = useSassMessage(sassMessages);
  const canDodge = useDodgeThrottle();

  const handleDodge = () => {
    if (!canDodge()) return;
    showRandom();
  };

  const { containerRef, buttonRef, position } = useEvasivePosition({
    enabled,
    onDodge: handleDodge,
  });

  return (
    <div ref={containerRef} className="relative mt-8 h-48 w-full">
      <SassBubble message={message} />
      <motion.button
        ref={buttonRef}
        type="button"
        tabIndex={enabled ? 0 : -1}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
        onPointerEnter={() => enabled && handleDodge()}
        className="absolute left-0 top-0 cursor-default border border-ink/20 bg-muted-btn px-8 py-3 text-base font-medium text-ink"
        style={{ touchAction: "none" }}
      >
        {label}
      </motion.button>
    </div>
  );
}
