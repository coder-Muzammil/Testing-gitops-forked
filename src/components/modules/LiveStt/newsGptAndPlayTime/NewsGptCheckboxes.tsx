import { NewsGptPromptresponseType } from "../../../../api/useSendNewsGptCommands";
import IconButton from "./IconButton";

type NewsGptCheckboxesPropsType = {
  isPendingGpt: boolean;
  clickedCheckbox: string;
  setClickedCheckbox: React.Dispatch<React.SetStateAction<string>>;
  isShowLogo: boolean;
  setIsShowLogo: React.Dispatch<React.SetStateAction<boolean>>;
  isShowTableData: boolean;
  setIsShowTableData: React.Dispatch<React.SetStateAction<boolean>>;
  onLogoCheckboxClick: () => void;
  onTableCheckboxClick: () => void;
  clickedPrompt?: string;
  mkData: Array<NewsGptPromptresponseType>;
  mkIndex: number;
};

const NewsGptCheckboxes = ({
  clickedCheckbox,
  setClickedCheckbox,
  isShowLogo,
  setIsShowLogo,
  isShowTableData,
  setIsShowTableData,
  onLogoCheckboxClick,
  onTableCheckboxClick,
  isPendingGpt,
  clickedPrompt,
  mkData,
  mkIndex,
}: NewsGptCheckboxesPropsType) => {
  const isDisableCheckbox = clickedPrompt !== "Channel Wise Summary";

  // console.log({ mkData });
  // console.log({ mkDataIndex: mkData[mkIndex] });

  return (
    <div className="flex items-center justify-center gap-2">
      <IconButton
        disabled={
          (isPendingGpt && clickedCheckbox === "logo") || isDisableCheckbox
        }
      >
        <input
          className="size-4 accent-white disabled:cursor-not-allowed"
          type="checkbox"
          checked={mkData[mkIndex].is_logo ?? isShowLogo}
          onChange={() => {
            setIsShowLogo(true);
            setClickedCheckbox("logo");
            onLogoCheckboxClick();
          }}
          disabled={
            (isPendingGpt && clickedCheckbox === "logo") || isDisableCheckbox
          }
        />
        <span className="text-sm font-semibold">Logo</span>
      </IconButton>

      <IconButton
        disabled={(isPendingGpt && isShowTableData) || isDisableCheckbox}
        // disabled={isPendingGpt && clickedCheckbox === "table"}
      >
        <input
          className="size-4 accent-white disabled:cursor-not-allowed"
          type="checkbox"
          // checked={isShowTableData}
          checked={mkData[mkIndex].is_table ?? isShowTableData}
          onChange={() => {
            // setIsShowTableData(e.target.checked);
            setIsShowTableData(true);
            setClickedCheckbox("table");
            onTableCheckboxClick();
          }}
          disabled={
            (isPendingGpt && clickedCheckbox === "table") || isDisableCheckbox
          }
        />
        <span className="text-sm font-semibold">Show table</span>
      </IconButton>
    </div>
  );
};

export default NewsGptCheckboxes;
