"use client";

import React, { useState } from "react";
import { Words } from "../types";
import Word from "./Word";
import { deleteWord, editWord, getAllWords, updateWords } from "../api";
import { useRouter } from "next/navigation";

interface WordsListProps {
  words: Words[];
}

const WordList = ({ words }: WordsListProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editingWord, setEditingWord] = useState<{
    en: string;
    ja: string;
  } | null>(null);

  const handleEdit = (id: string, en: string, ja: string) => {
    setIsEditing(id);
    setEditingWord({ en, ja });
    console.log(editingWord);
  };

  const handleSave = async (
    id: string,
    editedWordEn: string,
    editedWordJa: string
  ) => {
    //await editWord(id, editedWordEn, editedWordJa);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    await fetch(`${API_URL}/api/words`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        editedEn: editedWordEn,
        editedJa: editedWordJa,
      }),
    });

    router.refresh();

    //console.log(id, editedWordEn, editedWordJa);

    setIsEditing(null);
    setEditingWord(null);
  };

  const handleDelete = async (id: string) => {
    if (isEditing) {
      return;
    }
    await deleteWord(id);
    const words = await getAllWords();
    let updateId = 1;
    for (const word of words) {
      await deleteWord(word.id);
      word.id = updateId.toString();
      await updateWords(word);
      updateId++;
    }
  };

  return (
    <ol className="text-2xl list-decimal ml-10">
      {words.map((word) => (
        <li key={word.id}>
          <Word
            word={word}
            isEditing={isEditing === word.id}
            editingWord={editingWord || { en: word.en, ja: word.ja }}
            onedit={() => handleEdit(word.id, word.en, word.ja)}
            onsave={handleSave}
            ondelete={handleDelete}
          />
        </li>
      ))}
    </ol>
  );
};

export default WordList;
