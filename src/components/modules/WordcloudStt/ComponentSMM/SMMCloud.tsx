import { useState, useMemo, useCallback } from "react";
import WordCloud, { Word } from "react-d3-cloud";
import SMMWordDetailModal from "./SMMWordDetailModal";
import useGetSMMCloud from "../../../../api/useGetSMMCloud";
import useWordColor from "../../../../hooks/useWordColor";

function SMMCloud() {
  const { data, isLoading, isError, error } = useGetSMMCloud();

  const [openWordModal, setOpenWordModal] = useState("");
  const [hoverState, setHoverState] = useState<{
    word: Word | null;
    x: number;
    y: number;
  }>({
    word: null,
    x: 0,
    y: 0,
  });

  // Memoize the words data
  const wordsData = useMemo(() => {
    if (!data?.results) return [];
    return data.results.slice(0, 50).map((wordObject) => ({
      text: wordObject.text,
      value: wordObject.value,
      count: wordObject.count,
    }));
  }, [data?.results]);

  const { getWordFill } = useWordColor(wordsData);

  /* Stable color function */
  // const getWordFill = useCallback((word: Word) => {
  //   const minValue = 1;
  //   const maxValue = 100;
  //   const normalizedValue = (word.value - minValue) / (maxValue - minValue);
  //   const index = Math.floor(normalizedValue * (cloudColorPalette.length - 1));
  //   return cloudColorPalette[index];
  // }, []);

  // Stable size function
  const getWordSize = useCallback((word: Word) => word.value + 10, []);

  // Stable event handlers
  const handleWordClick = useCallback(
    (_event: React.MouseEvent, word: Word) => {
      setOpenWordModal(word.text);
    },
    [],
  );

  const handleWordMouseOver = useCallback(
    (event: React.MouseEvent, word: Word) => {
      setHoverState({
        word,
        x: event.clientX,
        y: event.clientY,
      });
    },
    [],
  );

  const handleWordMouseOut = useCallback(() => {
    setHoverState((prev) => ({ ...prev, word: null }));
  }, []);

  if (isLoading) {
    return <div className="pt-10 text-center">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="pt-10 text-center text-red-500">
        Error: {error.message}
      </div>
    );
  }

  if (wordsData.length === 0) {
    return <div className="pt-10 text-center text-red-500">No data found.</div>;
  }

  return (
    <div className="relative">
      <div
        className="word-cloud-container"
        style={{ width: "96%", height: "600px" }}
      >
        <WordCloud
          key="abc"
          data={wordsData}
          width={1700}
          height={600}
          rotate={0}
          font="Noto Nastaliq Urdu"
          fontSize={getWordSize}
          fontWeight="bold"
          padding={24}
          fill={getWordFill}
          spiral="rectangular"
          onWordClick={handleWordClick}
          onWordMouseOver={handleWordMouseOver}
          onWordMouseOut={handleWordMouseOut}
        />
      </div>

      {hoverState.word && (
        <div
          className="pointer-events-none fixed z-50 rounded bg-gray-600/80 text-sm text-gray-300 shadow-lg"
          style={{
            top: `${(hoverState.y + 10).toString()}px`,
            left: `${(hoverState.x + 10).toString()}px`,
          }}
        >
          <p className="urdu-text px-3 py-2 text-center">
            <strong>{hoverState.word.text}</strong>{" "}
            <span className="px-1">({hoverState.word.count})</span>
          </p>
        </div>
      )}

      {openWordModal && (
        <SMMWordDetailModal
          word={openWordModal}
          setOpenWordModal={setOpenWordModal}
        />
      )}
    </div>
  );
}

export default SMMCloud;
