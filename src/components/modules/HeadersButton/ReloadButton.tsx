import { useQueryClient } from "@tanstack/react-query";

const ReloadButton = ({ queryKey }: { queryKey: string }) => {
  const queryClient = useQueryClient();
  const handleLatestTickersReload = () => {
    queryClient
      .invalidateQueries({
        queryKey: [queryKey],
      })
      .catch((err: unknown) => {
        console.error(err);
      });
  };
  return (
    <>
      <button
        className="h-9 cursor-pointer rounded-md border-2 border-lavender-600 px-3 text-sm text-lavender-600 shadow-md dark:bg-lavender-500 dark:text-white"
        onClick={() => {
          handleLatestTickersReload();
        }}
      >
        Reload
      </button>
    </>
  );
};

export default ReloadButton;
