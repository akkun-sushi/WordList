"use client";

import { GetAll } from "@/app/api/wordQuiz/route";
import { Data } from "@/app/api/wordQuiz/types";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";

const LearnWord = () => {
  const [data, setData] = useState<Data[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [term, setTerm] = useState<string>("");
  const [meaning, setMeaning] = useState<string>("");
  const [reverse, setReverse] = useState<boolean>(false);

  //データ取得
  useEffect(() => {
    const getAll = async () => {
      const data = await GetAll();
      //作成順（昇順）
      data?.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      setData(data || []);
    };
    getAll();
  }, []);

  useEffect(() => {
    setTerm(data[index]?.term);
    setMeaning(data[index]?.meaning);
  }, [data, index]);

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "Enter":
      case "ArrowUp":
      case "ArrowDown":
        setReverse(!reverse);
        break;
      case "ArrowLeft":
        if (index > 0) {
          setIndex((prevIndex) => prevIndex - 1);
          setReverse(false)
        }
        break;
      case "ArrowRight":
        if (index < data.length - 1) {
          setIndex((prevIndex) => prevIndex + 1);
          setReverse(false)
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <main className="flex flex-col items-center fullscreen w-screen bg-blue-200 py-8 overflow-x-hidden">
      <Link
        href="/wordQuiz"
        className="text-2xl md:text-3xl w-full text-left font-bold text-black hover:text-red-500 ml-20 md:ml-72 mt-14 md:mt-6 mb-4 md:-mb-6"
      >
        戻る
      </Link>
      <h1 className="text-6xl font-bold text-black">学習</h1>
      <section className="w-full h-full">
        <div className="w-4/5 md:w-3/5 h-1/2 md:h-3/4 bg-white rounded-2xl m-auto mt-10 px-3 py-5 flex items-center justify-center">
          <h1 className="text-5xl md:text-6xl font-bold">
            {reverse ? meaning : term}
          </h1>
        </div>
      </section>
    </main>
  );
};

export default LearnWord;
