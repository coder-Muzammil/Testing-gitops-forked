const TeamsCounterHeader = () => {
  return (
    <div className="w-full h-auto px-5 mt-10">
      <p className="m-4 text-3xl font-bold text-purple-500">Teams</p>
      <div className="flex flex-row items-center justify-between gap-4 m-4">
        <div className="flex flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center justify-center">
            <p className="text-3xl text-purple-500">65</p>
            <p className="text-xl text-purple-400">Total Teams</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-3xl text-purple-500">12</p>
            <p className="text-xl text-purple-400">Teams Joined</p>
          </div>
        </div>
        <div className="flex items-center justify-center">icon</div>
      </div>
    </div>
  );
};

export default TeamsCounterHeader;
