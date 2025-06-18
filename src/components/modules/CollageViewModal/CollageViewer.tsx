import { SingleCollageType } from "../../../api/responseTypes/getMyCollagesApi.types";
import placeholderImage from "../../../assets/placeholder.jpg";

function CollageViewer({ collageData }: { collageData: SingleCollageType }) {
  const { collageImageUrl } = collageData;

  return (
    <div className="overflow-auto ">
      <img
        src={collageImageUrl ?? placeholderImage}
        alt=""
        className="w-full"
      />
    </div>
  );
}
export default CollageViewer;
