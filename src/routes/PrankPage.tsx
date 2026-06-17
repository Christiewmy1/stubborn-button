import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { decodePrankPayload } from "../lib/prankStorage";
import type { PrankConfig } from "../types/prank";
import AppHeader from "../components/layout/AppHeader";
import PageLayout from "../components/layout/PageLayout";
import PrankExperience from "../components/prank/PrankExperience";

export default function PrankPage() {
  const { payload } = useParams<{ payload: string }>();
  const [config, setConfig] = useState<PrankConfig | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!payload) {
      setError(true);
      setLoading(false);
      return;
    }

    decodePrankPayload(payload)
      .then(setConfig)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [payload]);

  if (loading) {
    return (
      <>
        <AppHeader hideTaglineOnMobile />
        <PageLayout narrow>
          <p className="flex flex-1 items-center justify-center text-sm text-ink/50">
            loading…
          </p>
        </PageLayout>
      </>
    );
  }

  if (error || !config) {
    return (
      <>
        <AppHeader hideTaglineOnMobile />
        <PageLayout narrow>
          <section className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <p className="m-0 text-lg text-ink">This link doesn&apos;t look right.</p>
            <Link to="/create" className="text-sm text-ink underline">
              create your own
            </Link>
          </section>
        </PageLayout>
      </>
    );
  }

  return <PrankExperience config={config} />;
}
