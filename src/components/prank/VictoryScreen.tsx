import { useRef, useEffect } from "react";

type VictoryScreenProps = {
  message: string;
  imageUrl?: string;
  soundUrl?: string;
  onDismiss?: () => void;
};

export default function VictoryScreen({
  message,
  imageUrl,
  soundUrl,
  onDismiss,
}: VictoryScreenProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (soundUrl && audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }, [soundUrl]);

  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Victory"
          className="max-h-48 max-w-full object-contain"
        />
      )}
      <p className="m-0 max-w-md text-2xl font-semibold leading-snug text-ink">
        {message}
      </p>
      {soundUrl && <audio ref={audioRef} src={soundUrl} preload="auto" />}
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="cursor-pointer border-0 bg-transparent text-sm text-ink/60 underline"
        >
          play again
        </button>
      )}
    </section>
  );
}
