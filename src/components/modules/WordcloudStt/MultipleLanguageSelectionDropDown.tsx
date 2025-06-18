import MultipleSelectionsDropDown from "../../primitives/MultipleSelectionsDropDown";
import { useSearchParams } from "react-router-dom";
import { wordcloudOptions } from "../../../utils/constants";
const MultipleLanguageSelectionDropDown = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const scope = searchParams.get("scope")?.split(",") ?? [];

  const handleOptionsSelection = (scopeValue: string) => {
    let newSelectedScope: Array<string>;

    if (scopeValue === "") {
      if (scope.length === wordcloudOptions.length) {
        return;
      } else {
        newSelectedScope = wordcloudOptions.map((entry) => String(entry.value));
      }
    } else {
      if (scope.includes(scopeValue)) {
        if (scope.length === 1) {
          return;
        }

        newSelectedScope = scope.filter((value) => value !== scopeValue);
      } else {
        newSelectedScope = [...scope, scopeValue];
      }
    }

    if (newSelectedScope.length === wordcloudOptions.length) {
      newSelectedScope = wordcloudOptions.map((entry) => String(entry.value));
    }

    setSearchParams((currentParams) => {
      if (newSelectedScope.length === 0) {
        currentParams.delete("scope");
      } else {
        currentParams.set("scope", newSelectedScope.join(","));
      }
      return currentParams;
    });
  };

  return (
    <>
      <MultipleSelectionsDropDown
        slug="Modules"
        placeholderText="All"
        selectedOptions={scope}
        handleOptionsSelection={handleOptionsSelection}
        entries={[{ label: "All", value: "" }, ...wordcloudOptions]}
      />
    </>
  );
};

export default MultipleLanguageSelectionDropDown;
