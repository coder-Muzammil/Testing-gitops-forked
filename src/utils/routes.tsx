import { PiNewspaperBold } from "react-icons/pi";
import { RoutesType } from "./typeDefinations";
import {
  MdModelTraining,
  MdOutlineOndemandVideo,
  MdSlowMotionVideo,
} from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";
import { TbFaceId } from "react-icons/tb";
import { LuTextSelect } from "react-icons/lu";
import { SiKdenlive, SiTeamcity } from "react-icons/si";
import { PiUploadSimpleFill } from "react-icons/pi";
import { MdOutlineCloudSync } from "react-icons/md";
import { PiSticker } from "react-icons/pi";
import { HiViewGrid } from "react-icons/hi";
import { BsPersonRolodex } from "react-icons/bs";
import { GiFilmStrip } from "react-icons/gi";

export const routes: Array<RoutesType> = [
  {
    label: "Live Tv",
    icon: <MdSlowMotionVideo className="text-xs 2xl:text-xl" />,
    slug: "liveTv",
    subRoutes: [
      {
        label: "Live Tv",
        icon: <LuLayoutDashboard className="text-xs 2xl:text-base" />,
        path: "/",
        slug: "ltDashboard",
      },
      {
        label: "Mosaic",
        icon: <HiViewGrid className="text-xs 2xl:text-base" />,
        path: "/livetv/mosaic",
        slug: "mosaic",
      },
      {
        label: "My Clips",
        icon: <MdOutlineOndemandVideo className="text-xs 2xl:text-base" />,
        path: "/livetv/myclips",
        slug: "myclips",
      },
      {
        label: "Team Clips",
        icon: <BsPersonRolodex className="text-xs 2xl:text-base" />,
        path: "/livetv/teamClips",
        slug: "teamclips",
      },
    ],
  },
  {
    label: "Tickers",
    icon: <PiSticker className="text-xs 2xl:text-xl" />,
    slug: "tickers",
    subRoutes: [
      {
        label: "Tickers",
        icon: <LuLayoutDashboard className="text-xs 2xl:text-base" />,
        path: "/tickers",
        slug: "tDashboard",
      },
      {
        label: "My Collages",
        icon: <LuLayoutDashboard className="text-xs 2xl:text-base" />,
        path: "/myCollages",
        slug: "myCollages",
      },
      {
        label: "Team Collages",
        icon: <SiTeamcity className="text-xs 2xl:text-base" />,
        path: "/teamCollages",
        slug: "teamCollages",
      },
    ],
  },
  {
    label: "Flashers",
    icon: <GiFilmStrip className="text-xs 2xl:text-xl" />,
    slug: "flashers",
    subRoutes: [
      {
        label: "Flashers",
        icon: <LuLayoutDashboard className="text-xs 2xl:text-base" />,
        path: "/flashers",
        slug: "fDashboard",
      },
      {
        label: "My Collages",
        icon: <LuLayoutDashboard className="text-xs 2xl:text-base" />,
        path: "/myMosaics",
        slug: "myMosaics",
      },
      {
        label: "Team Flashers",
        icon: <SiTeamcity className="text-xs 2xl:text-base" />,
        path: "/teamMosaics",
        slug: "teamMosaicsS",
      },
    ],
  },

  {
    label: "Speech",
    icon: <LuTextSelect className="text-xs 2xl:text-xl" />,
    slug: "stt",
    subRoutes: [
      {
        label: "STT Live",
        icon: <SiKdenlive className="text-xs 2xl:text-base" />,
        path: "/stt/live",
        slug: "sttLive",
      },
      {
        label: "My Transcriptions",
        icon: <SiKdenlive className="text-xs 2xl:text-base" />,
        path: "/stt/myTranscriptions",
        slug: "myTranscriptions",
      },
      {
        label: "Teams Transcriptions",
        icon: <SiKdenlive className="text-xs 2xl:text-base" />,
        path: "/stt/teamsTranscriptions",
        slug: "teamsTranscriptions",
      },
      {
        label: "STT Upload",
        icon: <PiUploadSimpleFill className="text-xs 2xl:text-base" />,
        path: "/stt/upload",
        slug: "sttUpload",
      },
    ],
  },
  {
    label: "Word Cloud",
    icon: <MdOutlineCloudSync className="text-xs 2xl:text-xl" />,
    slug: "worldCloud",
    subRoutes: [
      {
        label: "Word Cloud",
        icon: <LuLayoutDashboard className="text-xs 2xl:text-base" />,
        path: "/wordcloud",
        slug: "wcDashboard",
      },
    ],
  },
  {
    label: "Face Track",
    icon: <TbFaceId className="text-xs 2xl:text-xl" />,
    slug: "faceTrack",
    subRoutes: [
      // {
      //   label: "Star Player",
      //   icon: <LuLayoutDashboard className="text-xs 2xl:text-base" />,
      //   path: "/starPlayer/",
      //   slug: "starPlayer",
      // },
      {
        label: "Face Track",
        icon: <LuLayoutDashboard className="text-xs 2xl:text-base" />,
        path: "/fr/",
        slug: "frDashboard",
      },
      {
        label: "Trained Persons",
        icon: <PiNewspaperBold className="text-xs 2xl:text-base" />,
        path: "/fr/trainedPersons",
        slug: "trainedPersons",
      },
      {
        label: "Training",
        icon: <MdModelTraining className="text-xs 2xl:text-base" />,
        path: "/fr/training",
        slug: "training",
      },
    ],
  },
];
