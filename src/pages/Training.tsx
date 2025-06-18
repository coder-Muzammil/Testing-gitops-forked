import { useNavigate } from "react-router-dom";
import { frServiceUrl } from "../api/apiConstants";
import useGetCluster from "../api/useGetCluster";
import OutletMainContainer from "../components/modules/Auth/OutletMainContainer";
import UploadVideo from "../components/modules/training/UploadVideo";

export default function Training() {
  const { data, isPending, isError } = useGetCluster();

  const navigate = useNavigate();
  if (isPending) {
    return <p className="m-4 text-center font-bold">Loading...</p>;
  }
  if (isError) {
    return <p className="m-4 text-center font-bold">Something went wrong</p>;
  }

  const baseUrl = frServiceUrl;

  return (
    <OutletMainContainer>
      <div className="h-[93vh] overflow-y-auto">
        <header className="flex justify-center ">
          <UploadVideo />
        </header>

        <main className="px-24 py-10">
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {data.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col items-center"
                  onClick={() => {
                    navigate(`/fr/training/${String(item.id)}`);
                  }}
                >
                  <div className="cursor-pointer rounded-md p-4">
                    <img
                      className="h-[120px] w-[120px] cursor-pointer rounded-md transition-transform hover:scale-105"
                      src={`${baseUrl}${item.images[0]?.image}`}
                      alt="person"
                    />
                  </div>

                  <p className="text-center text-xl">{item.cluster}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </OutletMainContainer>
  );
}
