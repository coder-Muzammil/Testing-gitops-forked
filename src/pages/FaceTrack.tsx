import OutletMainContainer from "../components/modules/Auth/OutletMainContainer";
import FaceTrackHeader from "../components/modules/FaceTrack/FaceTrackHeader";
import FaceTrackTable from "../components/modules/FaceTrack/FaceTrackTable";

export default function FaceTrack() {
  return (
    <OutletMainContainer>
      <main className=" h-[73vh] px-[2%]">
        <FaceTrackHeader />
        <div className="mt-8 h-full">
          <FaceTrackTable />
        </div>
      </main>
    </OutletMainContainer>
  );
}
