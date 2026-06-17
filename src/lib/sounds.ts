export type SoundPreset = {
  id: string;
  label: string;
  path: string;
};

export const SOUND_PRESETS: SoundPreset[] = [
  { id: "ahh", label: "Ahh", path: "/ahh(lowervolume).mp3" },
  { id: "among-us", label: "Among Us", path: "/among-us-role-reveal-sound.mp3" },
  { id: "ara-ara", label: "Ara Ara", path: "/araara.mp3" },
  { id: "bruh", label: "Bruh", path: "/bruh.mp3" },
  { id: "cat-laugh", label: "Cat Laugh", path: "/cat-laugh-meme-1.mp3" },
  { id: "cute-wow", label: "Cute Wow", path: "/cutewow.mp3" },
  { id: "ding", label: "Ding", path: "/ding.mp3" },
  { id: "dramatic", label: "Dramatic Impact", path: "/dramatic_addimpact.mp3" },
  { id: "dun-dun", label: "Dun Dun Dun", path: "/dun-dun-dunnnnnnnn.mp3" },
  { id: "eheh-boy", label: "Eheh Boy", path: "/ehehboy.mp3" },
  { id: "fahh", label: "Fahh", path: "/fahh.mp3" },
  { id: "fart", label: "Fart", path: "/fart.mp3" },
  { id: "hee-hee", label: "Hee Hee", path: "/michaeljacksonheehee.mp3" },
  { id: "heheheha", label: "Heheheha", path: "/heheheha.ogg" },
  { id: "king-cry", label: "King Cry", path: "/king_cry.ogg" },
  { id: "mimimi", label: "Mimimi", path: "/mimimimimi.wav" },
  { id: "oof", label: "Roblox Oof", path: "/roblox_oof.mp3" },
  { id: "punch", label: "Punch", path: "/punch-sound.mp3" },
  { id: "record-scratch", label: "Record Scratch", path: "/record-scratch-wut.mp3" },
  { id: "rizz", label: "Rizz", path: "/rizz-sound-effect.mp3" },
  { id: "spongebob-fail", label: "SpongeBob Fail", path: "/spongebob-fail.mp3" },
  { id: "windows-xp", label: "Windows XP Error", path: "/windows-xp-error.mp3" },
  { id: "yippee", label: "Yippee", path: "/yippee.mp3" },
];

export function isCustomSound(url: string): boolean {
  return url.startsWith("data:");
}

export function getPresetByPath(path: string): SoundPreset | undefined {
  return SOUND_PRESETS.find((preset) => preset.path === path);
}
