import { motion, AnimatePresence } from "framer-motion";

type SassBubbleProps = {
  message: string | null;
};

export default function SassBubble({ message }: SassBubbleProps) {
  return (
    <AnimatePresence mode="wait">
      {message && (
        <motion.p
          key={message}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15 }}
          className="pointer-events-none absolute left-1/2 top-4 z-10 m-0 -translate-x-1/2 text-center text-sm font-medium text-ink"
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
