import { useState } from "react";
import OutletMainContainer from "../Auth/OutletMainContainer";
import ClusterDetailContent from "./ClusterDetailContent";
import ClusterDetailHeader from "./ClusterDetailHeader";
import { useParams } from "react-router-dom";
import useGetCluster from "../../../api/useGetCluster";

export default function ClusterDetail() {
  const [selectedItems, setSelectedItems] = useState<Array<string>>([]);
  const routeParams = useParams();
  const { clusterId } = routeParams;
  const { data: clusterData, isPending, isError, error } = useGetCluster();
  if (isPending) {
    return <p className="m-4 text-center font-bold">Loading...</p>;
  }
  if (isError) {
    return <p className="m-4 text-center font-bold">{error.message}</p>;
  }

  const selectClusterById = clusterData.find((cluster) => {
    if (clusterId !== undefined) {
      const clusterIdNumber = parseInt(clusterId, 10); // Convert clusterId to a number
      return cluster.id === clusterIdNumber;
    }
    return false; // Return false if clusterId is undefined
  });

  return (
    <OutletMainContainer>
      <div className="hide-scrollbarr h-[90vh] overflow-y-auto px-[3%]">
        <ClusterDetailHeader selectedImages={selectedItems} />
        <ClusterDetailContent
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          clusterImages={selectClusterById?.images}
        />
      </div>
    </OutletMainContainer>
  );
}
