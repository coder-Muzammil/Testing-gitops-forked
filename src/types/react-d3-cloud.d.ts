declare module "react-d3-cloud" {
  import React from "react";
  import { BaseType, ValueFn } from "d3-selection";

  export type Datum = {
    text: string;
    value: number;
    count: number;
  };

  export type Word = {
    text: string;
    value: number;
    count: number;
  };

  export type WordCloudProps = {
    data: Array<Datum>;
    width?: number;
    height?: number;
    font?: string | ((word: Word, index: number) => string);
    fontStyle?: string | ((word: Word, index: number) => string);
    fontWeight?:
      | string
      | number
      | ((word: Word, index: number) => string | number);
    fontSize?: number | ((word: Word, index: number) => number);
    rotate?: number | ((word: Word, index: number) => number);
    spiral?:
      | "archimedean"
      | "rectangular"
      | ((size: [number, number]) => (t: number) => [number, number]);
    padding?: number | ((word: Word, index: number) => number);
    random?: () => number;
    fill?: ValueFn<SVGTextElement, Word, string>;
    onWordClick?: (
      this: BaseType,
      event: React.MouseEvent<SVGTextElement>,
      d: Word,
    ) => void;
    onWordMouseOver?: (
      this: BaseType,
      event: React.MouseEvent<SVGTextElement>,
      d: Word,
    ) => void;
    onWordMouseOut?: (
      this: BaseType,
      event: React.MouseEvent<SVGTextElement>,
      d: Word,
    ) => void;
  };

  const WordCloud: React.MemoExoticComponent<React.FC<WordCloudProps>>;
  export default WordCloud;
}
