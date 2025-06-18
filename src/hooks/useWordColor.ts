import { useMemo, useCallback } from "react";
import { Word } from "react-d3-cloud";

const cloudColorPalette = [
  "#3B82F6", // blue
  "#EC4899", // pink
  "#4ADE80", // green
  "#A855F7", // purple
  "#0EA5E9", // sky
  "#6366F1", // indigo
  "#14B8A6", // teal
  "#10B981", // emerald
  "#D946EF", // fuchsia
  "#EF4444", // red

  //   "#FACC15", // yellow
  //   "#8B5CF6", // violet
  //   "#22D3EE", // cyan
  //   "#F97316", // orange
  //   "#F43F5E", // rose
];

const useWordColor = (wordData: Array<Word>) => {
  const [minValue, maxValue] = useMemo(() => {
    if (wordData.length === 0) return [0, 100];
    const values = wordData.map((w) => w.value);
    return [Math.min(...values), Math.max(...values)];
  }, [wordData]);

  const getWordFill = useCallback(
    (word: Word) => {
      const range = maxValue - minValue || 1; // Avoid divide by zero
      const normalized = (word.value - minValue) / range;
      const colorIndex = Math.floor(
        normalized * (cloudColorPalette.length - 1),
      );
      return cloudColorPalette[colorIndex];
    },
    [minValue, maxValue],
  );

  return { getWordFill };
};

export default useWordColor;
