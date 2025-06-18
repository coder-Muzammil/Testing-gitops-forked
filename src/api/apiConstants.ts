import axios from "axios";

// **************** Naming rules ****************

// 1. All constants should be in camelCase.
// 2. if adding a new service, add a new constant for the base url in BASE URLS section.
// 3. BASE URL must be kept in .env file.
// 4. if that service has a common suffix for all endpoints, add a new constant for that suffix in BASE URLS section just beneath base url.
// 5. name the base url constant as ****serviceUrl and the suffix constant as apiBaseUrl****Service.
// 6. if some service needs a separate file access url, add a new constant for that in FILE ACCESS URLS section.

// **************** BASE URLS ****************

export const baseServiceUrl = import.meta.env.VITE_BASE_SERVICE_URL as string;
export const apiBaseUrlBaseService = `${baseServiceUrl}api/`;

//temporay seting url for 6061
export const serviceUrl = import.meta.env.VITE_BASE_SERVICE_URL as string;
export const apiServiceUrl = serviceUrl;

export const StarPlayServiceUrl = import.meta.env
  .VITE_LIVE_SERVICE_URL as string;

export const liveServiceUrl = import.meta.env.VITE_LIVE_SERVICE_URL as string;

export const keyboardServiceUrl = import.meta.env
  .VITE_KEYBOARD_SERVICE_URL as string;

export const apiBaseUrlLiveService = `${liveServiceUrl}api/`;

export const frServiceUrl = import.meta.env.VITE_FR_SERVICE_URL as string;
export const apiBaseUrlFrService = `${frServiceUrl}api/`;

export const sttLiveServiceUrl = import.meta.env
  .VITE_STT_LIVE_SERVICE_URL as string;

export const sttLiveStreamServiceUrl = import.meta.env
  .VITE_STT_LIVE_STREAMING_SERVICE_URL as string;

// **************** FILE ACCESS URLS ****************

export const baseServiceUrlFileAccess = import.meta.env
  .VITE_BASE_SERVICE_URL as string;

// **************** NEWSGPT URLS ****************
export const baseServiceUrlNewsGpt = import.meta.env
  .VITE_NEWSGPT_SERVICE_URL as string;

export const wordCloudApiServiceUrl = import.meta.env
  .VITE_WORD_CLOUD_BASE_SERVICE_URL as string;

export const wordCloudImagesUrl = import.meta.env
  .VITE_WORD_CLOUD_IMAGES_URL as string;

export const wordCloudNewsGPTUrl = import.meta.env
  .VITE_WORLDCLOUD_NEWSGPT_URL as string;

export const tinyMcPublicApiKey = import.meta.env
  .VITE_PUBLIC_TINYMCE_API_KEY as string;

// **************** AUTH AND USER ENDPOINTS ****************

export const loginUrl = `${apiBaseUrlBaseService}auth/login/`;
export const logoutUrl = `${apiBaseUrlBaseService}auth/logout/`;
export const refreshUrl = `${apiBaseUrlBaseService}auth/refresh/`;
export const getAllTeams = `${apiBaseUrlBaseService}teams/getAllTeams/`;
export const getMyTeams = `${apiBaseUrlBaseService}teams/`;
export const shareWithTeamsUrl = `${apiBaseUrlBaseService}reports/share/`;
export const playlistUrl = `${apiBaseUrlBaseService}reports/playlists/`;

// **************** LIVE SERVICE ENDPOINTS ****************

export const myClipsUrl = `${apiBaseUrlBaseService}reports/clips/`;
export const saveClipMetadata = `${apiBaseUrlBaseService}reports/clips/`;
export const getAllChannels = `${apiBaseUrlBaseService}live/getChannels/`;
export const generationClipFromLive = `${apiBaseUrlLiveService}generateClips/`;
export const deleteClipUrl = `${apiBaseUrlBaseService}reports/clips/`;
export const addPlayTimeIntervalUrl = `${apiBaseUrlLiveService}timeIntervalLive/`;

// **************** TICKERS ENDPOINTS ****************
export const getTickersUrl = `${apiBaseUrlBaseService}tickers/`;
export const updateTickerUrl = `${apiBaseUrlBaseService}tickers/update/`;
export const saveCollageUrl = `${apiBaseUrlBaseService}reports/collages/`;
export const getCollagesUrl = `${apiBaseUrlBaseService}reports/collages/`;
export const getTickersHeadlinesNewsDataUrl = `${baseServiceUrlFileAccess}api/newsgpt/get_tickers_newsgpt/`;
export const getTickersTranslatedOcrDataUrl = `${apiServiceUrl}api/reports/CollageGpt/`;
// export const reelPlayTickersUrl = `${apiBaseUrlBaseService}tickers/reelPlay/`;

export const deleteCollageUrl = `${apiBaseUrlBaseService}reports/collages/`;

// **************** FLASHERS ENDPOINTS ****************

export const getAllFlashersUrl = `${apiBaseUrlBaseService}flashers/`;
export const updateFlasherUrl = `${apiBaseUrlBaseService}flashers/update/`;
export const saveFlasher = `${apiBaseUrlBaseService}reports/mosaics/`;
export const getAllMosaics = `${apiBaseUrlBaseService}reports/mosaics/`;

export const deleteMosaicUrl = `${apiBaseUrlBaseService}reports/mosaics/`;
export const getFlasherssHeadlinesNewsDataUrl = `${baseServiceUrlFileAccess}newsgpt/get_flashers_newsgpt/`;
// **************** STT LIVE SERVICE ENDPOINTS ****************

export const getSttLiveData = `${sttLiveServiceUrl}index/`;
export const liveTranscriptionsUrl = `${sttLiveServiceUrl}sttData/`;
export const liveSttTopics = `${sttLiveServiceUrl}topicGenerationData/`;
export const saveSttTranscriptions = `${apiBaseUrlBaseService}reports/myTranscriptions/`;
export const getTranscriptionsUrl = `${apiBaseUrlBaseService}reports/myTranscriptions/`;
export const addMultipleChannelsToMultiplePlaylists = `${apiBaseUrlBaseService}reports/channelsplaylist/`;
export const getStarPlayUrl = `${apiBaseUrlLiveService}starPlay/`;
export const deleteMyTranscriptionUrl = `${apiBaseUrlBaseService}reports/myTranscriptions/`;

// **************** STT UPLOAD SERVICE ENDPOINTS ****************

export const transcribeSttVideo = `${apiBaseUrlBaseService}stt/myStt/`;
export const getSttVideoTranscription = `${apiBaseUrlBaseService}reports/myTranscriptions/`;
export const updateSttTranscription = `${apiBaseUrlBaseService}stt/updateSttUpload/`;
export const translateSttChunksUrl = `${apiBaseUrlBaseService}stt/translate/`;
export const updateDictionaryUrl = `${apiBaseUrlBaseService}stt/updateDictionary/`;
export const dictionaryUrl = `${apiBaseUrlBaseService}stt/dictionary/`;
export const downloadTextDocxFile = `${apiBaseUrlBaseService}stt/create_docx/`;
export const deleteMySttUploadUrl = `${apiBaseUrlBaseService}reports/myTranscriptions/`;
export const requestMyClipSttVideo = `${apiBaseUrlBaseService}stt/myClipStt/`;

// **************** WORDCLOUD ENDPOINTS ****************

export const wordCloudDataUrl = `${apiBaseUrlBaseService}analytics/topOccuringWords/`;

export const getWordCloudData = `${apiBaseUrlBaseService}analytics/topOccuringWords/`;
export const wordDetailUrl = `${apiBaseUrlBaseService}analytics/getWordData/`;

// export const getSMMKwCloudUrl = `${wordCloudApiServiceUrl}api/analytics/topOccuringWords/`;
export const getSMMKwCloudUrl = `${baseServiceUrlFileAccess}api/analytics/kwCloud/`;
export const getSMMkwCloudDetailUrl = `${apiBaseUrlBaseService}analytics/kwCloudWordDetail/`;
export const downloadkwCloudReportUrl = `${apiBaseUrlBaseService}analytics/downloadReport/`;

// **************** FR ENDPOINTS ****************

export const getAllThumbnails = `${apiBaseUrlFrService}appearances/`;
export const getAllTrainedPersons = `${apiBaseUrlFrService}fr/trainedPersons/`;
export const getVideoUrl = `${apiBaseUrlFrService}fr/video/`;
export const clusterUrl = `${apiBaseUrlFrService}fr/cluster/`;

//***************** KEYBOARD ENDPOINTS ****************

export const transliterationUrl = `${keyboardServiceUrl}transliterate/`;

// ***************** NewsGPT ENDPOINTS ****************
export const addHeadlinesUrl = `${baseServiceUrlFileAccess}api/newsgpt/createHeadline/`;
export const getAllHeadlinesUrl = `${baseServiceUrlFileAccess}api/newsgpt/getHeadline/`;
export const getHeadlinesNewsDataUrl = `${baseServiceUrlFileAccess}api/newsgpt/sttDataAssistant/`;
export const downloadPdfReportOfNewsGptDataUrl = `${baseServiceUrlFileAccess}api/newsgpt/createPdfNewsGpt/`;
export const deleteHeadlinesUrl = `${baseServiceUrlFileAccess}api/newsgpt/deleteHeadline/`;
export const updateHeadlinesUrl = `${baseServiceUrlFileAccess}api/newsgpt/updateHeadline/`;
export const downloadNewsGptReportVideoURL = `${apiBaseUrlLiveService}aiAssistantVideo/`;

// **************** NEWSGPT SERVICE ENDPOINTS ****************
export const gptCommondsPromptApiUrl = `${baseServiceUrlNewsGpt}process_task/`;
export const getNewsGptDataInWorldCloud = `${wordCloudNewsGPTUrl}process_task/`;

// **************** CONFIGURATION SERVICE ENDPOINTS ****************
export const manageConfigurationsUrl = `${apiBaseUrlBaseService}whisper_app/configurators/`;

//**************************** DOWNLOAD S3 IMAGES ENDPOINTS ************************* */
export const getDownloadedS3ImagesUrl = `${apiBaseUrlBaseService}reports/downloadS3Images/`;

export const axiosPrivate = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
