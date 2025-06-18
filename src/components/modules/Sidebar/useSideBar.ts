import { create } from "zustand";
import { RoutesType } from "../../../utils/typeDefinations";

// Define the type for RoutesType

type SidebarStateType = {
  route: RoutesType | null;
  setRoute: (data: RoutesType) => void;
  isSideBarOpen: boolean;
  setIsSideBarOpen: (data: boolean) => void;
  isSubSideBarOpen: boolean;
  setIsSubSideBarOpen: (data: boolean) => void;
};

export const useSidebar = create<SidebarStateType>((set) => ({
  route: null,
  setRoute: (data) => {
    set({ route: data });
  },
  isSideBarOpen: false,
  setIsSideBarOpen: (data) => {
    set({ isSideBarOpen: data });
  },
  isSubSideBarOpen: false,
  setIsSubSideBarOpen: (data) => {
    set({ isSubSideBarOpen: data });
  },
}));
