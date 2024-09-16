"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { addWord } from "../api";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

const AddWord = () => {
  const router = useRouter();
  const [wordEn, setWordEn] = useState("");
  const [wordJa, setWordJa] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id = uuidv4();
    //await addWord({ id: id, en: wordEn, ja: wordJa });
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    await fetch(`${API_URL}/api/words`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, en: wordEn, ja: wordJa }),
    });

    setWordEn("");
    setWordJa("");
    router.refresh();
  };

  const handleChangeEn = (e: ChangeEvent<HTMLInputElement>) => {
    setWordEn(e.target.value);
  };
  const handleChangeJa = (e: ChangeEvent<HTMLInputElement>) => {
    setWordJa(e.target.value);
  };

  const isButtonDisabled = wordEn.trim() === "" || wordJa.trim() === "";

  return (
    <form className="flex flex-row px-2 py-4" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="英語"
        className="w-2/5 rounded-lg border text-2xl px-4 py-1 mr-3"
        onChange={handleChangeEn}
        value={wordEn}
      />
      <input
        type="text"
        placeholder="日本語"
        className="w-2/5 rounded-lg border text-2xl px-4 py-1 mr-10"
        onChange={handleChangeJa}
        value={wordJa}
      />
      <button
        type="submit"
        className="w-1/5 bg-green-400 text-white text-2xl rounded-lg"
        disabled={isButtonDisabled}
      >
        追加
      </button>
    </form>
  );
};

export default AddWord;