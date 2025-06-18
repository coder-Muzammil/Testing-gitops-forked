import { Link } from "react-router-dom";
import { useSidebar } from "./useSideBar";
import { useEffect } from "react";
import { routes } from "../../../utils/routes";
import { browserStorageKeys } from "../../../utils/constants";
import { RoutesType } from "../../../utils/typeDefinations";
import { twMerge } from "tailwind-merge";
function SubRoutesSidebar({
  selectedSubRoute,
  setSelectedSubRoute,
  item: items,
  setSelectedRoute,
  setIsSubSideBarOpen,
}: {
  selectedSubRoute: string;
  setSelectedSubRoute: (slug: string) => void;
  item: RoutesType;
  setSelectedRoute: (slug: string) => void;
  setIsSubSideBarOpen: (isOpen: boolean) => void;
}) {
  useEffect(() => {
    setSelectedSubRoute(
      localStorage.getItem(browserStorageKeys.selectedSubRoute) ??
        routes[0].subRoutes[0].slug,
    );
  }, [setSelectedSubRoute]);
  const { route, isSideBarOpen } = useSidebar();

  return (
    <div
      className={twMerge(
        `absolute  top-[1%] z-10 flex flex-col gap-2 overflow-hidden rounded-r-md bg-lavender-700 pb-6 text-white dark:bg-gray-700 2xl:gap-4 2xl:rounded-r-lg`,
        isSideBarOpen ? "left-[130px] " : "left-[45px]",
      )}
      onMouseLeave={() => {
        setIsSubSideBarOpen(false);
      }}
    >
      {route?.subRoutes.map((item, index) => {
        const { path, icon, label, slug } = item;
        const displayLabel = !isSideBarOpen
          ? label
          : index === 0
            ? "Dashboard"
            : label;
        return (
          <Link
            to={path}
            key={index}
            onClick={() => {
              setSelectedRoute(items.slug);
              localStorage.setItem(
                browserStorageKeys.selectedRoute,
                items.slug,
              );
              setSelectedSubRoute(slug);
              setIsSubSideBarOpen(false);
              localStorage.setItem(browserStorageKeys.selectedSubRoute, slug);
            }}
          >
            <div
              className={`flex cursor-pointer items-center gap-2 whitespace-nowrap py-1 pl-3 pr-6 text-xs hover:bg-white/10 2xl:py-2 2xl:text-base ${selectedSubRoute === slug ? "bg-white/10" : ""}`}
            >
              {icon}{" "}
              <span className="text-xs 2xl:text-base">{displayLabel}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default SubRoutesSidebar;
