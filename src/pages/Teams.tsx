import React from "react";
import OutletMainContainer from "../components/modules/Auth/OutletMainContainer";
import TeamsCounterHeader from "../components/modules/Teams/TeamsCounterHeader";
import TeamsStorageInforamtion from "../components/modules/Teams/TeamsStorageInforamtion";
const Teams = () => {
  return (
    <OutletMainContainer>
      <div className="flex flex-col items-center w-full h-full bg-white border-2 bprder rounded-3xl ">
        <TeamsCounterHeader />
        <div className="w-full h-full px-5 mx-5 overflow-auto ">
          {[1, 2, 3, 4, 5, 6, 7].map((item) => (
            <React.Fragment key={item}>
              <TeamsStorageInforamtion />
            </React.Fragment>
          ))}
        </div>
      </div>
    </OutletMainContainer>
  );
};

export default Teams;
