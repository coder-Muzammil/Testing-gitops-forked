import Portal from "../../../primitives/Portal";
import useSendNewsGptCommands, {
  NewsGptPromptresponseType,
} from "../../../../api/useSendNewsGptCommands";
import { Editor as TinyMCEEditor } from "@tinymce/tinymce-react";
import { useEffect, useRef, useState } from "react";
import useDownloadPdfReportOfNewsGptData from "../../../../api/useDownloadPdfReportOfNewsGptData";
import NewGptPromptsButtons from "./NewGptPromptsButtons";
import { MdOutlineCancel } from "react-icons/md";
import NewsGptCheckboxes from "./NewsGptCheckboxes";
import NewsGptUndoAndRedo from "./NewsGptUndoAndRedo";
import DownloadPdfReportOfData from "./DownloadPdfReportOfData";
import UrduKeyPad, {
  Keyboardtype,
} from "../../../uiComponents/keyboardTranslitrator/UrduKeyPad";
import { tinyMcPublicApiKey } from "../../../../api/apiConstants";
import toast from "react-hot-toast";
import MDEdittorTypeWritterEffect from "./MDEdittorTypeWritterEffect";
import ButtonGradientPrimary from "../../../primitives/ButtonGradientPrimary";
import { RiVideoDownloadLine } from "react-icons/ri";
import useDownloadNewsGptReportVideo, {
  DownloadVideoFileOfNewsGptReportType,
} from "../../../../api/useDownloadNewsGptReportVideo";
import useThemeContext from "../../Theme/useThemeContext";

const NewsGptEditableDataModal = ({
  setIsOpenEditableModal,
  mkData,
  setMkData,
  clickedPrompt,
  module,
  setClickedPrompt,
  downloadReportWithVideoData,
  selectedChannels,
}: {
  setIsOpenEditableModal: React.Dispatch<React.SetStateAction<boolean>>;
  mkData: Array<NewsGptPromptresponseType>;
  setMkData: React.Dispatch<
    React.SetStateAction<Array<NewsGptPromptresponseType>>
  >;
  module?: string;
  clickedPrompt?: string;
  setClickedPrompt: React.Dispatch<React.SetStateAction<string>>;
  downloadReportWithVideoData?: DownloadVideoFileOfNewsGptReportType;
  selectedChannels?: Array<Array<string>>;
}) => {
  const { mutate: downloadPdfReport, isPending } =
    useDownloadPdfReportOfNewsGptData();
  const { mutate: downloadVideoFile, isPending: downloadingVideoFile } =
    useDownloadNewsGptReportVideo();
  const [isPendingVideo, setIsPendingVideo] = useState(false);

  const [isDownloadAndSave, setIsDownloadAndSave] = useState(false);
  const keyboardRef = useRef<Keyboardtype>(null);
  const editorRef = useRef<TinyMCEEditor | null>(null);

  const {
    data: gptData,
    mutate: sendData,
    isPending: isPendingGpt,
  } = useSendNewsGptCommands();

  const [isShowLogo, setIsShowLogo] = useState(false);
  const [isShowTableData, setIsShowTableData] = useState(false);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [clickedCheckbox, setClickedCheckbox] = useState("");

  const [mkIndex, setMkIndex] = useState(0);

  const [textData, setTextData] = useState("");
  const markdownRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const cursorPosition = useRef<number | null>(null);

  const isUrduLanguageSelected = mkData[mkIndex].isUrdu;

  useEffect(() => {
    if (gptData) {
      setMkData([...mkData, gptData]);
      setMkIndex(mkData.length);
    }
  }, [gptData, setMkData]); // don't include 'mkData' into array dependencies. it call infinite loop.

  useEffect(() => {
    setTextData(mkData[mkIndex].result);
  }, [mkData, mkIndex, gptData]);

  useEffect(() => {
    if (markdownRef.current) {
      const textArea = markdownRef.current.querySelector("textarea");
      if (textArea) {
        textareaRef.current = textArea;

        const handleClick = () => {
          if (textareaRef.current) {
            cursorPosition.current = textareaRef.current.selectionStart;
          }
        };

        textArea.addEventListener("click", handleClick);

        return () => {
          textArea.removeEventListener("click", handleClick);
        };
      }
    }
  }, []);

  const downloadPdfReportOfNewsGptData = (isSave: boolean) => {
    setIsDownloadAndSave(isSave);

    downloadPdfReport(
      { data: { result: textData, isUrdu: mkData[mkIndex].isUrdu }, isSave },
      {
        onSuccess: () => {
          toast.success("Report downloaded successfully.");
          setIsDownloadAndSave(false);
        },
        onError: (error: unknown) => {
          toast.error("Download failed due to " + String(error));
          setIsDownloadAndSave(false);
        },
      },
    );
  };

  const downloadReportWithVideoFile = () => {
    setIsPendingVideo(true);
    downloadPdfReport(
      {
        data: { result: textData, isUrdu: mkData[mkIndex].isUrdu },
        isSave: false,
      },
      {
        onSuccess: () => {
          downloadVideoFile(
            {
              data: {
                startTime: downloadReportWithVideoData?.startTime ?? "",
                endTime: downloadReportWithVideoData?.endTime ?? "",
                channelName: downloadReportWithVideoData?.channelName ?? "",
              },
            },
            {
              onSuccess: () => {
                toast.success("Video file downloaded successfully.");
                setIsPendingVideo(false);
              },
            },
          );
        },
        onError: (error: unknown) => {
          toast.error("Download failed due to " + String(error));
          setIsPendingVideo(false);
        },
      },
    );
  };

  const handleSubmitPromptData = (prompt: string) => {
    sendData(
      {
        prompt,
        data: [{ text: textData }],
      },
      {
        onSettled: () => {
          setIsOpenDropdown(false);
        },
      },
    );
  };

  const handleShowPromptDataInTabularFormat = () => {
    sendData(
      {
        data: [{ text: textData }],
        showTable: true,
        // showTable: !isShowTableData,
      },
      {
        onSettled: () => {
          setClickedCheckbox("");
        },
      },
    );
  };

  const handleShowPromptDataWithLogo = () => {
    sendData(
      {
        data: [{ text: textData }],
        showLogo: true,
        // showLogo: !isShowLogo,
      },
      {
        onSettled: () => {
          setClickedCheckbox("");
        },
      },
    );
  };

  const updateOcrTextValue = (value: string) => {
    if (!textareaRef.current) return;

    if (cursorPosition.current === null) {
      cursorPosition.current = textareaRef.current.selectionStart;
    }

    const cursorIndex = cursorPosition.current;

    setTextData(
      textData.slice(0, cursorIndex) + value + textData.slice(cursorIndex),
    );

    cursorPosition.current = cursorIndex + value.length;
  };

  const handleAcceptSuggestion = (value: string) => {
    // setTextData((prev) => prev + value);
    updateOcrTextValue(value);
  };

  const onKeyboardManualChange = (value: string) => {
    // setTextData((prev) => prev + value);
    updateOcrTextValue(value);
    keyboardRef.current?.clearInput();
  };
  const { theme } = useThemeContext(); // assume 'light' or 'dark'

  // const contentStyle =
  //   theme === "dark"
  //     ? `body { background-color: #1f2937; color: #f9fafb; }`
  //     : `body { background-color: #ffffff; color: #1f2937; }`;
  const isSingleChannelSelected = (
    selectedChannels: Array<Array<string>>,
  ): boolean => {
    return selectedChannels.length === 1 && selectedChannels[0].length === 1;
  };
  return (
    <Portal>
      <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/60">
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="relative h-auto w-11/12 rounded-md bg-white px-4 py-2 dark:bg-gray-700"
        >
          <MdOutlineCancel
            onClick={() => {
              setIsOpenEditableModal(false);
            }}
            size={24}
            className="absolute right-2 top-2 cursor-pointer dark:text-white"
          />
          <header className="mt-3 grid grid-cols-[1fr_auto] gap-2 py-3">
            <p className="w-full text-start text-2xl font-semibold text-lavender-600">
              MarkDown Editor
            </p>

            <div className="grid grid-cols-[auto_auto_auto_auto_auto_auto] place-items-end gap-2 px-2">
              <UrduKeyPad
                keyboardRef={keyboardRef}
                acceptSuggestion={handleAcceptSuggestion}
                onKeyboardManualChange={onKeyboardManualChange}
              />
              <NewGptPromptsButtons
                onPromptClick={handleSubmitPromptData}
                isPending={isPendingGpt}
                isOpenDropdown={isOpenDropdown}
                setIsOpenDropdown={setIsOpenDropdown}
                setClickedPrompt={setClickedPrompt}
              />
              <NewsGptCheckboxes
                isPendingGpt={isPendingGpt}
                clickedCheckbox={clickedCheckbox}
                setClickedCheckbox={setClickedCheckbox}
                isShowLogo={isShowLogo}
                setIsShowLogo={setIsShowLogo}
                isShowTableData={isShowTableData}
                setIsShowTableData={setIsShowTableData}
                onLogoCheckboxClick={handleShowPromptDataWithLogo}
                onTableCheckboxClick={handleShowPromptDataInTabularFormat}
                clickedPrompt={clickedPrompt}
                mkData={mkData}
                mkIndex={mkIndex}
              />
              <NewsGptUndoAndRedo
                mkDataLength={mkData.length}
                mkIndex={mkIndex}
                setMkIndex={setMkIndex}
              />
              <DownloadPdfReportOfData
                isPending={isPending && !isPendingVideo}
                isDownloadAndSave={isDownloadAndSave}
                handleDownloadReport={downloadPdfReportOfNewsGptData}
              />

              {/* Temporary condition added for showing video download button only
              for playtime */}
              {module === "playtime" && (
                <ButtonGradientPrimary
                  type="button"
                  title="Download Video of Report"
                  onClick={() => {
                    // console.log({ videoReportData: downloadReportWithVideoData });
                    downloadReportWithVideoFile();
                  }}
                  disabled={
                    selectedChannels !== undefined &&
                    !isSingleChannelSelected(selectedChannels)
                  }
                  isLoading={downloadingVideoFile}
                >
                  <RiVideoDownloadLine size={18} />
                </ButtonGradientPrimary>
              )}
            </div>
          </header>

          <div className="h-full">
            <MDEdittorTypeWritterEffect
              text={mkData[mkIndex].result}
              onUpdate={setTextData}
              key={mkData[mkIndex].result}
            />

            <TinyMCEEditor
              key={isUrduLanguageSelected ? "rtl" : "ltr"}
              apiKey={tinyMcPublicApiKey}
              onInit={(_evt: Event, editor: TinyMCEEditor) =>
                (editorRef.current = editor)
              }
              value={textData}
              onEditorChange={(newContent: string) => {
                setTextData(newContent);
              }}
              init={{
                // content_css:
                //   "http://192.168.18.62:6061/static/fonts/styles.css",
                // content_css_cors: false,
                directionality: isUrduLanguageSelected ? "rtl" : "ltr",
                height: "88vh",
                // max_height: 1400,
                plugins:
                  "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion",
                // editimage_cors_hosts: ["picsum.photos"],
                menubar: "file edit view insert format tools table help",
                toolbar:
                  "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview print |",
                // content_style: contentStyle,
                autosave_ask_before_unload: true,
                autosave_interval: "30s",
                autosave_prefix: "{path}{query}-{id}-",
                autosave_restore_when_empty: false,
                autosave_retention: "2m",
                image_advtab: true,
                importcss_append: true,
                image_caption: true,
                quickbars_selection_toolbar:
                  "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
                noneditable_class: "mceNonEditable",
                toolbar_mode: "sliding",
                contextmenu: "link image table",
                branding: false,
                content_style: `
                    @import url('https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu&display=swap');
                    body {
                      font-family: "Noto Nastaliq Urdu", serif;
                      font-size:16px;
                      line-height: 2.5;
                      letter-spacing: 1px;
                    }
                  `,

                skin: theme === "dark" ? "oxide-dark" : "oxide",
                content_css: theme === "dark" ? "dark" : "default",
              }}
            />
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default NewsGptEditableDataModal;
