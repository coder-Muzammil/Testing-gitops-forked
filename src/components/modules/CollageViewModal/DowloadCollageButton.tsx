import { IoMdDownload } from "react-icons/io";
// import { btnClass } from "./HeaderCollageEditModal";
import { baseServiceUrl } from "../../../api/apiConstants";
import { download } from "../../../utils/helpers";
import useDownloadS3Images from "../../../api/useDownloadS3Images";

function DowloadCollageButton({
  collageName,
  collageImageName,
}: {
  collageName: string;
  collageImageName: string;
}) {
  const {
    mutate: downloadImagesUrl,
    // isPending,
    // isError,
  } = useDownloadS3Images();
  const handleDownload = () => {
    downloadImagesUrl(
      {
        selectedImagesName: [
          { imageName: collageImageName, logoName: "92_news.png" },
        ],
      },
      {
        onSuccess: (data) => {
          console.log(data);
          download(
            `${baseServiceUrl}${data.image_urls.map((image) => image.imageUrl)[0]}`,
            `${collageName}.jpg`,
          );
        },
      },
    );
  };
  return (
    <button
      className="btnClass dark:bg-gray-500 dark:text-gray-200"
      title="Download Collage Image"
      onClick={() => {
        // download(`${baseServiceUrl}${collageImageUrl}`, `${collageName}.jpg`);
        handleDownload();
      }}
    >
      <IoMdDownload />
    </button>
  );
}
export default DowloadCollageButton;
