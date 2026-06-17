import { Link } from "react-router-dom";
import { APP_NAME, APP_TAGLINE } from "../../lib/constants";

type AppHeaderProps = {
  hideTaglineOnMobile?: boolean;
};

export default function AppHeader({ hideTaglineOnMobile = false }: AppHeaderProps) {
  return (
    <header className="flex flex-col items-center gap-1 px-6 pt-12 pb-8 text-center">
      <Link to="/create" className="no-underline text-ink">
        <h1 className="m-0 text-2xl font-semibold tracking-tight">{APP_NAME}</h1>
      </Link>
      <p
        className={`m-0 text-sm text-ink/70 ${
          hideTaglineOnMobile ? "hidden sm:block" : ""
        }`}
      >
        {APP_TAGLINE}
      </p>
    </header>
  );
}
