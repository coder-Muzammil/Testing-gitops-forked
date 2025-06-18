import useProgressStore from "../../stores/useSttProgress";

const ProgressLoader = () => {
  const { progress } = useProgressStore();

  return (
    <div className="my-2 h-6 w-full rounded-md border-[2px] border-[#5F467A]">
      <div
        className="h-full rounded-sm bg-[#78589E]"
        style={{ width: `${String(progress)}%` }}
      />
      <div className="p-2 text-center text-xl font-semibold">{progress}%</div>
    </div>
  );
};

export default ProgressLoader;
