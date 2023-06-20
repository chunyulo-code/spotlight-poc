"use client";
import React, { useCallback } from "react";
import WordCloud from "react-d3-cloud";
import { scaleOrdinal, scaleLinear } from "d3-scale";

// const data = [
//   { text: "Hey", value: 10 },
//   { text: "lol", value: 20 },
//   { text: "first impression", value: 80 },
//   { text: "very cool", value: 10 },
//   { text: "duck", value: 10 },
//   { text: "Hey", value: 10 },
//   { text: "lol", value: 20 },
//   { text: "first impression", value: 80 },
//   { text: "very cool", value: 10 },
//   { text: "duck", value: 10 },
//   { text: "duck", value: 10 },
//   { text: "Hey", value: 10 },
//   { text: "lol", value: 20 },
//   { text: "first impression", value: 80 },
//   { text: "very cool", value: 10 },
//   { text: "duck", value: 10 }
// ];

const text2 =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ac condimentum tortor. Maecenas porta id tortor dapibus ultrices. Pellentesque a ligula sapien. Nam scelerisque dictum metus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nec quam vitae lacus pharetra lobortis at in est. Cras semper massa et fringilla vehicula. Nunc eros metus, ultrices nec commodo ut, lacinia ac enim. Sed cursus mattis sapien et sodales. Aliquam pulvinar nec sem vel elementum. Integer non lectus varius, viverra lacus non, pulvinar tellus.";

export default function Spotlight() {
  function sortByFrequency(text) {
    const words = text.split(/[ ,.]+/);
    const wordFrequency = {};

    // 统计单词频率
    words.forEach((word) => {
      if (wordFrequency[word]) {
        wordFrequency[word]++;
      } else {
        wordFrequency[word] = 1;
      }
    });

    // 转换为对象数组并按照频率排序
    const result = Object.entries(wordFrequency).map(([text, value]) => ({
      text,
      value
    }));

    result.sort((a, b) => b.value - a.value); // 按照频率降序排序

    return result;
  }

  const data = sortByFrequency(text2);
  console.log(data);
  const fontSize = useCallback((word) => Math.log2(word.value) * 25, []);
  const rotate = useCallback(() => 0, []);
  const colorScale = scaleLinear()
    .domain([
      Math.min(...data.map((d) => d.value)),
      Math.max(...data.map((d) => d.value))
    ])
    .range(["#c5c6c7", "#66fcf1"]);
  const fill = useCallback((d, i) => {
    console.log(d.value);
    return colorScale(d.value);
  }, []);

  return (
    <div>
      {typeof window !== "undefiend" && (
        <WordCloud
          data={data}
          width={300}
          height={300}
          fontSize={fontSize}
          rotate={rotate}
          spiral="archimedean"
          random={Math.random}
          fill={fill}
          // fill={() => d3.interpolate("#ffffff", "#66fcf1")}
        />
      )}
    </div>
  );
}
