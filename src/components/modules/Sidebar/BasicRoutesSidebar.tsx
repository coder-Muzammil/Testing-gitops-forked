import { twMerge } from "tailwind-merge";
import { routes } from "../../../utils/routes";
import SubRoutesSidebar from "./SubRoutesSidebar";
import { useSidebar } from "./useSideBar";
import { useEffect, useState } from "react";
import { browserStorageKeys } from "../../../utils/constants";
import forbmaxLogoGray from "../../../assets/forbmax_logo_gray.png";
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";

function BasicRoutesSidebar() {
  const { route, setRoute, isSideBarOpen, setIsSideBarOpen } = useSidebar();
  const [isSubSideBarOpen, setIsSubSideBarOpen] = useState(false);
  const [selectedSubRoute, setSelectedSubRoute] = useState("");
  const [selectedRoute, setSelectedRoute] = useState("");
  useEffect(() => {
    setSelectedRoute(
      localStorage.getItem(browserStorageKeys.selectedRoute) ?? routes[0].slug,
    );
    setIsSideBarOpen(false);
  }, []);
  return (
    <div className={twMerge(isSideBarOpen ? "w-[130px] " : "w-[45px]")}>
      <div
        className={twMerge(
          `absolute  z-20 h-full  rounded-r-md bg-gradient-to-b from-lavender-600 to-lavender-900 text-white transition-all dark:bg-gradient-to-b dark:from-slate-500 dark:to-slate-800  2xl:rounded-r-lg `,
          isSideBarOpen ? "w-[130px] " : "w-[45px]",
        )}
      >
        <div
          onClick={() => {
            setIsSideBarOpen(!isSideBarOpen);
          }}
          className=" absolute -right-1.5 top-1 cursor-pointer"
        >
          {isSideBarOpen ? (
            <FaRegArrowAltCircleLeft
              size={24}
              className="rounded-full bg-lavender-600 "
            />
          ) : (
            <FaRegArrowAltCircleRight
              size={24}
              className="rounded-full bg-lavender-600  "
            />
          )}
        </div>
        <div
          className={twMerge(
            "mt-6 h-[100px] px-3 py-5",
            isSideBarOpen && "h-[120px] px-10 py-5",
          )}
        >
          <img
            src={forbmaxLogoGray}
            alt="fbx"
            className={twMerge(
              `h-[20px] w-[130px]`,
              isSideBarOpen && "h-[40px] w-[200px]",
            )}
            title="forbmax"
          />
        </div>

        <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        <div className="relative mt-6">
          <div className="relative -z-0 grid w-full grid-cols-1 gap-2 pt-6 2xl:gap-4">
            {routes.map((item, index) => {
              const { icon, label, slug } = item;
              return (
                <div
                  key={index}
                  className={twMerge(
                    `relative flex w-full cursor-pointer select-none items-center justify-center gap-2 py-1 hover:bg-white/10 2xl:py-2`,
                    isSubSideBarOpen && slug === route?.slug && " bg-white/10 ",
                    selectedRoute === item.slug && "bg-white/20 ",
                    isSideBarOpen && "justify-start pl-3",
                  )}
                  data-label={slug}
                  onMouseEnter={() => {
                    setIsSubSideBarOpen(true);
                    setRoute(item);
                  }}
                  onMouseLeave={() => {
                    setIsSubSideBarOpen(false);
                  }}
                >
                  <div className="flex items-center justify-center gap-2 ">
                    {icon}
                    {isSideBarOpen && (
                      <span className="text-xs 2xl:text-sm">{label}</span>
                    )}
                  </div>
                  {isSubSideBarOpen && slug === route?.slug && (
                    <SubRoutesSidebar
                      selectedSubRoute={selectedSubRoute}
                      setSelectedSubRoute={setSelectedSubRoute}
                      item={item}
                      setSelectedRoute={setSelectedRoute}
                      setIsSubSideBarOpen={setIsSubSideBarOpen}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default BasicRoutesSidebar;
