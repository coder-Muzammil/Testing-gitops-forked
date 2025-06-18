import { useMutation } from "@tanstack/react-query";
import { getDownloadedS3ImagesUrl } from "./apiConstants";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { UseDownloadS3ImagesType } from "./useDownloadS3Images.types";

function useDownloadS3Images() {
  const axiosPrivate = useAxiosPrivate();

  return useMutation({
    mutationKey: ["getDownloadedS3Images"],
    mutationFn: async ({
      selectedImagesName: imagenamesList,
    }: {
      selectedImagesName: Array<{
        imageName: string;
        logoName: string;
      }>;
    }) => {
      const response = await axiosPrivate.post<UseDownloadS3ImagesType>(
        getDownloadedS3ImagesUrl,
        {
          imagenamesList,
        },
      );

      return response.data;
    },
  });
}

export default useDownloadS3Images;
