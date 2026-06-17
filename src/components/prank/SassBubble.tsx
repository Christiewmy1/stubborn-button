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
          className="pointer-events-none fixed bottom-[20dvh] left-1/2 z-30 m-0 max-w-[85vw] -translate-x-1/2 px-4 text-center text-sm font-medium leading-snug text-ink sm:max-w-xs"
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
