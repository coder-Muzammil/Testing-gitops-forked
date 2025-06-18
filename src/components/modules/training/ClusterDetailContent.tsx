import { frServiceUrl } from "../../../api/apiConstants";
import { Dispatch, SetStateAction } from "react";
type ClusterDetailProps = {
  selectedItems: Array<string>;
  setSelectedItems: Dispatch<SetStateAction<Array<string>>>;
  clusterImages:
    | Array<{
        id: number;
        image: string;
        cluster_name: number;
      }>
    | undefined;
};
export default function ClusterDetailContent({
  selectedItems,
  setSelectedItems,
  clusterImages,
}: ClusterDetailProps) {
  const handleCheckboxChange = (itemImg: string) => {
    setSelectedItems((prevImgs) => {
      if (prevImgs.includes(itemImg)) {
        return prevImgs.filter((iId) => iId !== itemImg);
      }
      return [...prevImgs, itemImg];
    });
  };
  return (
    <main className="p-12 px-24">
      <div
        className="mt-2 "
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(10rem, 1fr))",
        }}
      >
        {clusterImages?.map((item) => (
          <div
            className="relative h-44 w-36 cursor-pointer overflow-hidden"
            onClick={() => {
              handleCheckboxChange(item.image);
            }}
            key={item.id}
          >
            <div className="absolute right-0 top-0  rounded-full">
              <input
                className="h-5 w-5 cursor-pointer"
                type="checkbox"
                checked={selectedItems.includes(item.image)}
                readOnly
              />
            </div>

            <div className="w-full">
              <img
                src={`${frServiceUrl}${item.image}`}
                alt={item.image}
                className="h-auto w-full"
              />
            </div>

          </div>
        ))}
      </div>
    </main>
  );
}
