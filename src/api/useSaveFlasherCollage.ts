import { useMutation } from "@tanstack/react-query";
import { saveFlasher } from "./apiConstants";
import { useAxiosPrivate } from "./useAxiosPrivate";

function usePostFlasherCollage() {
  const axiosPrivate = useAxiosPrivate();

  function saveCollageFn({
    flasherIds,
    mosaicName,
    mosaicImage,
  }: {
    flasherIds: Array<number>;
    mosaicName: string;
    mosaicImage: File;
  }) {
    const formData = new FormData();
    formData.append("mosaicImage", mosaicImage);
    formData.append("mosaicName", mosaicName);
    formData.append("flasherIds", flasherIds.join(","));
    return axiosPrivate.post(saveFlasher, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  return useMutation({
    mutationKey: ["saveFlasherCollage"],
    mutationFn: saveCollageFn,
  });
}
export default usePostFlasherCollage;
