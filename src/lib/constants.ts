import type { PrankFormState } from "../types/prank";

export const APP_NAME = "thestubbornbutton";
export const APP_TAGLINE = "make them agree with you.";

export const DEFAULT_PRANK: PrankFormState = {
  title: "Am I right?",
  yesButtonText: "Yes",
  noButtonText: "No",
  sassMessages: [
    "Invalid option",
    "Nope",
    "HAHA",
    "Bruh",
    "NUHHH",
    "Really?",
    "*Sigh*",
    "meow",
    "You sure?",
    "HEHEHEHA",
    "zzz",
  ],
  victoryMessage: "That is right, I am always right.",
  victorySoundUrl: "",
};

export const MAX_SOUND_SIZE_BYTES = 100_000;
export const DANGER_RADIUS = 100;
export const DODGE_THROTTLE_MS = 300;
