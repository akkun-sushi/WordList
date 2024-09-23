"use client";

import React, { useState } from "react";
import AddWord from "../components/wordsQuiz/AddWord";
import { Data, IsDeleting, IsEditing, SortType } from "../api/wordQuiz/types";
import WordCard from "../components/wordsQuiz/WordCard";
import EditWord from "../components/wordsQuiz/EditWord";
import DeleteWord from "../components/wordsQuiz/DeleteWord";
import SortWord from "../components/wordsQuiz/SortWord";

const WordQuiz = () => {
  const [data, setData] = useState<Data[]>([]);
  const [sortType, setSortType] = useState<SortType>("CREATION_ASC");
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<IsEditing>("NULL");
  const [isDeleting, setIsDeleting] = useState<IsDeleting>("NULL");

  const props = {
    setData,
    sortType,
    setSortType,
    isAdding,
    setIsAdding,
    isEditing,
    setIsEditing,
    isDeleting,
    setIsDeleting,
  };

  return (
    <main className="flex flex-col items-center min-h-screen w-screen bg-blue-200 py-8">
      <h1 className="text-4xl font-bold text-black">単語リスト</h1>
      <div className="bg-white w-3/4 max-w-6xl shadow-lg rounded-lg mt-5 px-4 py-4 md:mt-10 md:py-6">
        <AddWord {...props} />
      </div>
      <div className="bg-white w-3/4 max-w-6xl shadow-lg rounded-lg flex flex-col mt-5 py-4 md:mt-10 md:px-10 md:py-8">
        <SortWord {...props} />
        <div className="flex flex-row mx-4 md:mx-20 md: mt-5">
          <EditWord {...props} />
          <DeleteWord {...props} />
        </div>
      </div>
      <div className="bg-white w-3/4 max-w-6xl shadow-lg rounded-lg mt-5 pl-12 md:pl-14 py-4 md:mt-10">
        <ol className="text-2xl list-decimal">
          {data.map((item) => (
            <li key={item.id} className="my-4">
              <WordCard {...item} {...props} />
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
};

export default WordQuiz;
