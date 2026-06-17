import { useState } from "react";
import type { PrankConfig } from "../../types/prank";
import AppHeader from "../layout/AppHeader";
import PageLayout from "../layout/PageLayout";
import EvasiveButton from "./EvasiveButton";
import PrankLayout from "./PrankLayout";
import YesButton from "./YesButton";
import VictoryScreen from "./VictoryScreen";

type PrankExperienceProps = {
  config: PrankConfig;
};

export default function PrankExperience({ config }: PrankExperienceProps) {
  const [won, setWon] = useState(false);

  if (won) {
    return (
      <>
        <AppHeader />
        <PageLayout narrow>
          <VictoryScreen
            message={config.victoryMessage}
            imageUrl={config.victoryImageUrl || undefined}
            soundUrl={config.victorySoundUrl || undefined}
            onDismiss={() => setWon(false)}
          />
        </PageLayout>
      </>
    );
  }

  return (
    <>
      <AppHeader />
      <PageLayout narrow>
        <PrankLayout title={config.title}>
          <YesButton label={config.yesButtonText} onClick={() => setWon(true)} />
          <EvasiveButton
            label={config.noButtonText}
            sassMessages={config.sassMessages}
            enabled
          />
        </PrankLayout>
      </PageLayout>
    </>
  );
}
