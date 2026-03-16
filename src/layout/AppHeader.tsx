import { Link } from "react-router";
import { ThemeToggleButton } from "../components/common/ThemeToggleButton";

const AppHeader: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-9999 w-full flex justify-center pt-0 sm:pt-2 px-0 sm:px-4 lg:pt-3 lg:px-8 pointer-events-none">
      <div className="w-full lg:max-w-6xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-none sm:rounded-2xl lg:rounded-full border-b sm:border border-white/20 dark:border-gray-800/30 shadow-lg pointer-events-auto theme-transition px-4 py-3 sm:py-4 flex items-center justify-between">
        <Link to="/" className="flex-shrink-0">
          <img
            className="dark:hidden h-8 sm:h-9 w-auto"
            src="./images/logo/logo.svg"
            alt="Logo"
          />
          <img
            className="hidden dark:block h-8 sm:h-9 w-auto"
            src="./images/logo/logo-dark.svg"
            alt="Logo"
          />
        </Link>
        <div>
          <ThemeToggleButton />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
