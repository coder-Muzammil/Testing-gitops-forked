import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import AuthWrapper from "./components/modules/Auth/AuthWrapper";
import FaceTrack from "./pages/FaceTrack";
import Tickers from "./pages/Tickers";
import Teams from "./pages/Teams";
import MyClips from "./pages/MyClips";
import MyCollage from "./pages/MyCollages";
import TeamCollages from "./pages/TeamCollages";
import TeamClips from "./pages/TeamClips";
import MyTeams from "./pages/MyTeams";
import MyMosaics from "./pages/MyMosaics";
import TeamMosaics from "./pages/TeamMosaics";
import WordCloudStt from "./pages/WordCloudStt";
import SttMyTranscriptions from "./pages/SttMyTranscriptions";
import SttTeamsTranscriptions from "./pages/SttTeamsTranscriptions";
import LiveTv from "./pages/LiveTv";
import Mosaic from "./pages/Mosaic";
import Flashers from "./pages/Flashers";
import TrainedPersons from "./pages/TrainedPersons";
import Training from "./pages/Training";
import ClusterDetail from "./components/modules/training/ClusterDetail";
import SttLive from "./pages/SttLive";
import SttUpload from "./pages/SttUpload";
import SingleVideoTranscription from "./pages/SingleVideoTranscription";
import FlashersCanvas from "./pages/FlashersCanvas";
import Reverseloading from "./pages/Reverseloading";
import PlayTime from "./pages/PlayTime";

const routes = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<AuthWrapper />} key={0}>
      <Route index element={<LiveTv />} />
      <Route path="/livetv/myclips" element={<MyClips />} />
      <Route path="/livetv/teamClips" element={<TeamClips />} />
      <Route path="/livetv/mosaic" element={<Mosaic />} />
      <Route path="/settings" element={<Settings />} />,
      <Route path="/tickers" element={<Tickers />} />,
      <Route path="/myCollages" element={<MyCollage />} />,
      <Route path="/teamCollages" element={<TeamCollages />} />,
      <Route path="/flashersCanvas" element={<FlashersCanvas />} />,
      <Route path="/flashers" element={<Flashers />} />,
      <Route path="/myMosaics" element={<MyMosaics />} />,
      <Route path="/teamMosaics" element={<TeamMosaics />} />,
      <Route path="/fr/" element={<FaceTrack />} />,
      <Route path="/fr/trainedPersons" element={<TrainedPersons />} />,
      <Route path="/fr/training" element={<Training />} />,
      <Route path="/fr/training/:clusterId" element={<ClusterDetail />} />,
      <Route path="/teams" element={<Teams />} />,
      <Route path="/stt/live" element={<SttLive />} />,
      <Route path="/stt/upload" element={<SttUpload />} />,
      <Route path="/stt/uploads/:id" element={<SingleVideoTranscription />} />,
      <Route path="/stt/myTranscriptions" element={<SttMyTranscriptions />} />,
      <Route path="/playtime" element={<PlayTime />} />,
      <Route
        path="/stt/teamsTranscriptions"
        element={<SttTeamsTranscriptions />}
      />
      ,
      <Route path="/teams" element={<Teams />} />,
      <Route path="/myteams" element={<MyTeams />} />,
      <Route path="/wordcloud" element={<WordCloudStt />} />,
    </Route>,

    <Route path="/temp" element={<Reverseloading />} key={76767} />,
    <Route path="/login" element={<Login />} key={1} />,
    <Route
      path="*"
      element={
        <div className="flex h-screen items-center justify-center text-4xl">
          <p className="text-center text-lavender-500 ">
            Habeel Not Found - 404 <br />
            <span className="text-xl text-black">Page not found</span>
          </p>
        </div>
      }
      key={2}
    />,
  ]),
);

function App() {
  return <RouterProvider router={routes} />;
}
export default App;
