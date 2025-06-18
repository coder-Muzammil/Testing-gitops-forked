export type SubRoutes = {
  label: string;
  icon: JSX.Element;
  path: string;
  slug: string;
};

export type RoutesType = {
  label: string;
  icon: JSX.Element;
  slug: string;
  subRoutes: Array<SubRoutes>;
};

export type TeamEntitiesType =
  | "myCollages"
  | "myClips"
  | "myTranscriptionsCollages"
  | "myMosaics"
  | "myCoverages"
  | "myTeamSttUploads"

export type ServiceCardTypes = {
  id: number;
  serviceName: string;
  isOnline: boolean;
  lastOnline: string;
};

export type OneMinuteEditorTopicDataType = {
  topicRecordId: number ;
  topicUrdu: string;
  topicEnglish: string;
  summaryUrdu: string;
  summaryEnglish: string;
};

export type ServicesStatusKeys =
  | "isTickerActivated"
  | "isFlasherActivated"
  | "isSTTActivated"
  | "isFRActivated"
  | "isWordCloudActivated";
