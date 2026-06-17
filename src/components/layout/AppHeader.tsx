import { Link } from "react-router-dom";
import { APP_NAME, APP_TAGLINE } from "../../lib/constants";

export default function AppHeader() {
  return (
    <header className="flex flex-col items-center gap-1 px-6 pt-12 pb-8 text-center">
      <Link to="/create" className="no-underline text-ink">
        <h1 className="m-0 text-2xl font-semibold tracking-tight">{APP_NAME}</h1>
      </Link>
      <p className="m-0 text-sm text-ink/70">{APP_TAGLINE}</p>
    </header>
  );
}
