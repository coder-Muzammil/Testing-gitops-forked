// import { ClipboardEvent, useState } from "react";
// import useGetTopWords from "../../../api/useGetTopWords";
// import WordCloud from "react-d3-cloud";
// import WordDetailModal from "./WordDetailModal";

// const cloudColorPalette = [
//   "#60A5FA",
//   "#3B82F6",
//   "#2563EB",
//   "#1D4ED8",
//   "#38BDF8",
//   "#0EA5E9",
//   "#0284C7",
//   "#0369A1",
//   "#22D3EE",
//   "#06B6D4",
//   "#0891B2",
//   "#0E7490",
//   "#2DD4BF",
//   "#14B8A6",
//   "#0D9488",
//   "#0F766E",
//   "#34D399",
//   "#10B981",
//   "#059669",
//   "#047857",
// ];

// function Cloud() {
//   const { data: wordCloudData, isLoading, isError, error } = useGetTopWords();
//   const [openWordModal, setOpenWordModal] = useState<string>("");

//   const nounsData =
//     wordCloudData?.slice(0, 50).map((wordObject) => {
//       return {
//         text: wordObject.word,
//         value: wordObject.percentileValue,
//       };
//     }) ?? [];

//   function getWordFill(word: { text: string; value: number }) {
//     const value = word.value;

//     switch (true) {
//       case value > 90:
//         return cloudColorPalette[0];
//       case value > 80:
//         return cloudColorPalette[1];
//       case value > 70:
//         return cloudColorPalette[2];
//       case value > 60:
//         return cloudColorPalette[3];
//       case value > 50:
//         return cloudColorPalette[4];
//       case value > 40:
//         return cloudColorPalette[5];
//       case value > 30:
//         return cloudColorPalette[6];
//       case value > 20:
//         return cloudColorPalette[7];
//       case value > 10:
//         return cloudColorPalette[8];

//       default:
//         return cloudColorPalette[9];
//     }
//   }

//   function getWordSize(word: { text: string; value: number }): number {
//     const value = word.value;

//     if (value > 75) {
//       return 100;
//     } else if (value > 50) {
//       return 70;
//     } else if (value > 25) {
//       return 40;
//     } else {
//       return 30;
//     }

//   }

//   if (isLoading) {
//     return <div className="pt-10 text-center">Loading...</div>;
//   }

//   if (isError) {
//     return (
//       <div className="pt-10 text-center text-red-500">
//         Error: {error.message}
//       </div>
//     );
//   }

//   if (nounsData.length === 0) {
//     return <div className="pt-10 text-center text-red-500">No data found.</div>;
//   }

//   function handleWordClick(word: { text: string; value: number }) {
//     const { text } = word;
//     setOpenWordModal(text);
//   }

//   return (
//     <>
//       <WordCloud
//         data={[...nounsData]}
//         width={1700}
//         rotate={0}
//         font="aslam"
//         fontSize={getWordSize}
//         fontWeight="bold"
//         padding={30}
//         fill={getWordFill}
//         key="abc"
//         spiral="rectangular"
//         onWordClick={(__event: ClipboardEvent, d) => {
//           handleWordClick(d);
//         }}
//       />
//       {/* TODO: make modal to show and work on each word */}
//       {openWordModal && (
//         <WordDetailModal
//           word={openWordModal}
//           setOpenWordModal={setOpenWordModal}
//         />
//       )}
//     </>
//   );
// }
// export default Cloud;
