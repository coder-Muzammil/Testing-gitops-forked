import { useMutation } from "@tanstack/react-query";
import { saveCollageUrl } from "./apiConstants";
import { useAxiosPrivate } from "./useAxiosPrivate";

function usePostCollage() {
  const axiosPrivate = useAxiosPrivate();

  function saveCollageFn({
    tickerIds,
    collageName,
    collageImage,
  }: {
    tickerIds: Array<number>;
    collageName: string;
    collageImage: File;
  }) {
    const formData = new FormData();

    formData.append("collageImage", collageImage);
    formData.append("collageName", collageName);
    formData.append("tickerIds", tickerIds.join(","));
    return axiosPrivate.post(saveCollageUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  return useMutation({
    mutationKey: ["saveCollage"],
    mutationFn: saveCollageFn,
  });
}
export default usePostCollage;
