import { useSearchParams } from "react-router-dom";
import Input from "../../primitives/Input";

function TimeSelectionField({ slug }: { slug: "startTime" | "endTime" }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSetTime(newTime: string) {
    setSearchParams((currentParams) => {
      const currentStartTime = currentParams.get("startTime");
      const currentEndTime = currentParams.get("endTime");

      if (!newTime) {
        currentParams.delete(slug);
        return currentParams;
      }

      if (slug === "startTime" && currentEndTime && newTime > currentEndTime) {
        return currentParams;
      }

      if (
        slug === "endTime" &&
        currentStartTime &&
        newTime < currentStartTime
      ) {
        return currentParams;
      }

      currentParams.set(slug, newTime);

      if (slug === "startTime" && !currentEndTime) {
        currentParams.set("endTime", newTime);
      }
      if (slug === "endTime" && !currentStartTime) {
        currentParams.set("startTime", newTime);
      }

      return currentParams;
    });
  }

  const selectedTime = searchParams.get(slug) ?? "";

  return (
    <Input
      type="time"
      placeholder="Start Time"
      value={selectedTime}
      onChange={(e) => {
        handleSetTime(e.target.value);
      }}
    />
  );
}
export default TimeSelectionField;
