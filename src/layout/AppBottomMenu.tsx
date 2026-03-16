import { Link, useLocation } from "react-router";
import { FoldersIcon, HomeIcon, PlusIcon } from "../icons";

type MenuItem = {
  name: string;
  path: string;
  icon: React.ReactNode;
  position: "left" | "center" | "right";
};

const AppBottomMenu: React.FC = () => {
  const location = useLocation();
  const hideCenter = location.pathname === "/classification";

  const menus: MenuItem[] = [
    {
      name: "Beranda",
      path: "/",
      icon: <HomeIcon />,
      position: "left",
    },
    {
      name: "",
      path: "/classification",
      icon: <PlusIcon />,
      position: "center",
    },
    {
      name: "Daftar Klasifikasi",
      path: "/classification-list",
      icon: <FoldersIcon />,
      position: "right",
    },
  ];

  const leftMenus = menus.filter((m) => m.position === "left");
  const rightMenus = menus.filter((m) => m.position === "right");
  const centerMenu = menus.find((m) => m.position === "center");

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-9999 flex justify-center pb-0 sm:pb-2 px-0 sm:px-4 lg:pb-3 lg:px-8 pointer-events-none">
      <div className="w-full lg:max-w-6xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-none sm:rounded-2xl lg:rounded-full border-t sm:border border-white/20 dark:border-gray-800/30 shadow-lg pointer-events-auto theme-transition">
        <div className="flex items-center h-20 sm:h-24">
          {/* LEFT AREA */}
          <div className="flex-1 flex justify-center">
            {leftMenus.map((menu, i) => {
              const activeClass = isActive(menu.path)
                ? "text-blue-500 dark:text-blue-400 font-medium"
                : "text-gray-500 dark:text-gray-400";

              return (
                <Link
                  key={i}
                  to={menu.path}
                  className={`flex flex-col items-center text-xs sm:text-sm transition hover:text-blue-500 active:scale-90 ${activeClass}`}
                >
                  <span className="mb-1 text-lg sm:text-2xl">{menu.icon}</span>
                  {menu.name}
                </Link>
              );
            })}
          </div>

          {/* CENTER AREA */}
          <div className="flex-1 flex justify-center relative">
            {!hideCenter && centerMenu && (
              <Link
                to={centerMenu.path}
                className="absolute -top-12 sm:-top-15 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-110 active:scale-95 transition-all duration-200 group"
              >
                <span className="text-2xl sm:text-3xl group-hover:rotate-90 transition-transform duration-200">
                  {centerMenu.icon}
                </span>
              </Link>
            )}
          </div>

          {/* RIGHT AREA */}
          <div className="flex-1 flex justify-center">
            {rightMenus.map((menu, i) => {
              const activeClass = isActive(menu.path)
                ? "text-blue-500 dark:text-blue-400 font-medium"
                : "text-gray-500 dark:text-gray-400";

              return (
                <Link
                  key={i}
                  to={menu.path}
                  className={`flex flex-col items-center text-xs sm:text-sm transition hover:text-blue-500 active:scale-90 ${activeClass}`}
                >
                  <span className="mb-1 text-lg sm:text-2xl">{menu.icon}</span>
                  {menu.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AppBottomMenu;
