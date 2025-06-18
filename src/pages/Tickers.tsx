import TickersHeader from "../components/modules/Tickers/TickersHeader";
import TickersDataTable from "../components/modules/Tickers/TickersDataViewTable";
import OutletMainContainer from "../components/modules/Auth/OutletMainContainer";
import TickersContextComponent from "../components/modules/Tickers/TickersContextComponent";
import StarPlayerContextComponent from "../components/modules/StarPlayer/StarPlayerContextComponent";

const Tickers = () => {
  return (
    <OutletMainContainer>
      <TickersContextComponent>
        <StarPlayerContextComponent>
          <div className="grid grid-rows-[auto_1fr] gap-2">
            <TickersHeader />
            <div className=" space-y-2 overflow-auto pr-3">
              <TickersDataTable />
            </div>
          </div>
        </StarPlayerContextComponent>
      </TickersContextComponent>
    </OutletMainContainer>
  );
};

export default Tickers;
