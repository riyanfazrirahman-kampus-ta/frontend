import { Outlet } from "react-router";
import AppBottomMenu from "./AppBottomMenu";
import AppHeader from "./AppHeader";
import { LocationProvider } from "../context/LocationContext";
import { ClassificationModelProvider } from "@/context/ClassificationModelContext";

const LayoutContent: React.FC = () => {
  return (
    <div className="relative h-screen w-full bg-slate-100 dark:bg-gray-950 transition-colors duration-300">
      <AppHeader />
      <div className="w-full h-full overflow-auto">
        <Outlet />
      </div>
      <AppBottomMenu />
    </div>
  );
};

const AppLayout: React.FC = () => {
  return (
    <LocationProvider>
      <ClassificationModelProvider>
        <LayoutContent />
      </ClassificationModelProvider>
    </LocationProvider>
  );
};

export default AppLayout;
