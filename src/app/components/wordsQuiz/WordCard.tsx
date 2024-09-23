"use client";

import React, { useEffect, useState } from "react";
import { WordCardProps } from "@/app/api/wordQuiz/types";
import { Delete, Update } from "@/app/api/wordQuiz/route";

const WordCard = ({
  id,
  term: initialTerm,
  meaning: initialMeaning,
  isEditing,
  setIsEditing,
  isDeleting,
  setIsDeleting,
}: WordCardProps) => {
  //編集時に使用
  const [term, setTerm] = useState(initialTerm);
  const [meaning, setMeaning] = useState(initialMeaning);
  //削除時に使用
  const [clicked, setClicked] = useState(false);
  const [targetId, setTargetId] = useState("");

  useEffect(() => {
    //編集完了
    if (isEditing === "FINISH") {
      Update(id, term, meaning);
      setIsEditing("NULL");
    }

    //削除項目追加
    setTargetId(clicked ? id : "");

    //削除完了
    if (isDeleting === "FINISH") {
      if (targetId !== "") {
        Delete(targetId);
      }
      setIsDeleting("NULL");
    }
  }, [
    id,
    term,
    meaning,
    clicked,
    targetId,
    isEditing,
    setIsEditing,
    isDeleting,
    setIsDeleting,
  ]);

  return (
    <section className="pr-4 flex flex-col md:flex-row">
      <input
        value={term}
        onChange={(e) => {
          if (isEditing === "EDIT") {
            if (e.target.value.trim() !== "") {
              setTerm(e.target.value);
            }
          }
        }}
        readOnly={isEditing === "NULL"}
        className={`${
          isEditing !== "EDIT" && "pointer-events-none"
        } flex-1 px-2 my-2 border rounded-lg md:mx-4`}
      />
      <input
        value={meaning}
        onChange={(e) => {
          if (isEditing === "EDIT") {
            if (e.target.value.trim() !== "") {
              setMeaning(e.target.value);
            }
          }
        }}
        readOnly={isEditing === "NULL"}
        className={`${
          isEditing !== "EDIT" && "pointer-events-none"
        } flex-1 px-2 my-2 border rounded-lg md:mx-4`}
      />
      {isDeleting === "DELETE" ? (
        <button
          onClick={() => setClicked(!clicked)}
          className={`rounded-full border-2 w-6 h-6 m-auto md:w-10 md:h-10 ${
            clicked
              ? "bg-red-500 border-red-500"
              : "bg-transparent border-red-500"
          }`}
        />
      ) : (
        <p className="mr-10" />
      )}
    </section>
  );
};

export default WordCard;
