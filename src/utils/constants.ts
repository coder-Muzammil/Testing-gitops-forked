import { DropdownSingleSelectOptionsType } from "../components/primitives/DropdownSingleSelect";

export const browserStorageKeys = {
  refreshToken: "refreshToken",
  selectedRoute: "selectedRoute",
  selectedSubRoute: "selectedSubRoute",
};

export const mosaicSizes = [
  { label: "3x3", value: 3 },
  { label: "4x4", value: 4 },
  { label: "5x5", value: 5 },
  { label: "6x6", value: 6 },
  { label: "7x7", value: 7 },
  { label: "8x8", value: 8 },
] satisfies Array<DropdownSingleSelectOptionsType>;

export const serviceCardData = [
  {
    id: 1,
    serviceName: "Frontend",
    isOnline: true,
    lastOnline: "24/06/2022 - 03:45 am",
  },
  {
    id: 2,
    serviceName: "Core Backend Server",
    isOnline: true,
    lastOnline: "23/06/2022 - 12:30 pm",
  },
  {
    id: 3,
    serviceName: "Live Clipping",
    isOnline: true,
    lastOnline: "24/06/2022 - 08:20 am",
  },
  {
    id: 4,
    serviceName: "Ticker",
    isOnline: true,
    lastOnline: "22/06/2022 - 05:00 pm",
  },
  {
    id: 5,
    serviceName: "STT",
    isOnline: true,
    lastOnline: "24/06/2022 - 01:15 am",
  },
  {
    id: 6,
    serviceName: "FR",
    isOnline: true,
    lastOnline: "21/06/2022 - 11:45 pm",
  },
  {
    id: 7,
    serviceName: "Flasher",
    isOnline: true,
    lastOnline: "24/06/2022 - 02:30 am",
  },
  {
    id: 8,
    serviceName: "OCR",
    isOnline: true,
    lastOnline: "20/06/2022 - 09:15 am",
  },
  {
    id: 9,
    serviceName: "Speech to Text",
    isOnline: true,
    lastOnline: "24/06/2022 - 04:50 am",
  },
  {
    id: 10,
    serviceName: "Ticker Detection",
    isOnline: true,
    lastOnline: "19/06/2022 - 07:10 pm",
  },
  {
    id: 11,
    serviceName: "Topic Generation",
    isOnline: true,
    lastOnline: "24/06/2022 - 06:00 am",
  },
  {
    id: 12,
    serviceName: "Translation",
    isOnline: true,
    lastOnline: "18/06/2022 - 03:30 pm",
  },
  {
    id: 13,
    serviceName: "Urdu Text Summary",
    isOnline: true,
    lastOnline: "24/06/2022 - 07:45 am",
  },
  {
    id: 14,
    serviceName: "English Text Summary",
    isOnline: true,
    lastOnline: "17/06/2022 - 08:20 pm",
  },
  {
    id: 15,
    serviceName: "Sentiment",
    isOnline: false,
    lastOnline: "24/06/2022 - 09:30 am",
  },
];
type Option = {
  value: string | number;
  label: string;
};
export const personsOptions: Array<Option> = [
  { value: "all_data", label: "All Data" },
  { value: "all_known", label: "All Known" },
  { value: "all_unknown", label: "All unknown" },
];

export const wordcloudOptions = [
  // { value: "topic_english", label: "English Topics" },
  // { value: "topic_urdu", label: "Urdu Topics" },
  { value: "tickers", label: "Tickers" },
  // { value: "flasher", label: "Flasher" },
];
