import { useState } from "react";
import type { PrankFormState } from "../types/prank";
import AppHeader from "../components/layout/AppHeader";
import PageLayout from "../components/layout/PageLayout";
import CreatorForm from "../components/creator/CreatorForm";
import PrankExperience from "../components/prank/PrankExperience";

export default function CreatorPage() {
  const [previewConfig, setPreviewConfig] = useState<PrankFormState | null>(null);

  if (previewConfig) {
    return (
      <>
        <div className="fixed right-4 top-4 z-50">
          <button
            type="button"
            onClick={() => setPreviewConfig(null)}
            className="cursor-pointer border border-ink bg-paper px-4 py-2 text-sm text-ink"
          >
            ← back to editor
          </button>
        </div>
        <PrankExperience
          config={{
            ...previewConfig,
            createdAt: new Date().toISOString(),
          }}
        />
      </>
    );
  }

  return (
    <>
      <AppHeader />
      <PageLayout>
        <CreatorForm onPreview={setPreviewConfig} />
      </PageLayout>
    </>
  );
}
