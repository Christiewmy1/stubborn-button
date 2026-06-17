export type PrankConfig = {
  title: string;
  yesButtonText: string;
  noButtonText: string;
  sassMessages: string[];
  victoryMessage: string;
  victorySoundUrl?: string;
  createdAt: string;
};

export type PrankFormState = Omit<PrankConfig, "createdAt">;
