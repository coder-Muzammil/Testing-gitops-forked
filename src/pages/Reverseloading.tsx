import { useEffect, useState } from "react";
import { useIntersectionObserver } from "@uidotdev/usehooks";

const arrOfRandNum = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArray(max: number, length: number) {
  return Array.from({ length }, () => getRandomInt(1, max));
}

function Reverseloading() {
  const [state, setstate] = useState(arrOfRandNum);
  const [ref, entry] = useIntersectionObserver({
    threshold: 0.5,
    rootMargin: "0px",
    root: null,
  });

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === "F") {
        setTimeout(() => {
          handleLoadMore();
        }, 200);
      }
    });
  }, []);

  useEffect(() => {
    if (entry?.isIntersecting) {
      //   handleLoadMore();
    }
  }, [entry]);

  function handleLoadMore() {
    const newNumbers = getRandomArray(20, 5);

    setstate((prev) => {
      return prev.concat(newNumbers);
    });
  }

  return (
    <div className="grid h-screen grid-rows-[auto_1fr] gap-2 overflow-hidden p-3">
      <div className="h-52 bg-fuchsia-500"></div>
      <div className="flex flex-col-reverse gap-4 overflow-auto bg-blue-500 px-6 py-10">
        <p className="text-center">{state.length}</p>
        {state.map((item, index) => {
          return (
            <div
              key={item}
              className="rounded-lg bg-green-400 py-10 text-center"
            >
              {index + 1}
            </div>
          );
        })}
        <button
          type="button"
          className="bg-purple-800 text-white"
          onClick={handleLoadMore}
          ref={ref}
        >
          load more
        </button>
        <div
          style={{
            minHeight: "200px",
            background: "red",
          }}
        />
      </div>
    </div>
  );
}

export default Reverseloading;
