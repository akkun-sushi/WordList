import React from "react";
import AddWord from "../components/AddWord";
import WordList from "../components/WordList";

const wordsList = async () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${API_URL}/api/words`, { cache: "no-store" });
  const words = await res.json();

  return (
    <main className="flex flex-col items-center min-h-screen w-screen bg-blue-200 py-8">
      <h1 className="text-4xl font-bold text-black">単語リスト</h1>
      <div className="bg-white w-4/5 max-w-6xl mt-5 px-2  py-1 shadow-lg rounded-lg">
        <AddWord lastId={0}/>
      </div>
      <div className="bg-white w-4/5 max-w-6xl mt-5 px-8  py-4 shadow-lg rounded-lg">
        <WordList words={words} />
      </div>
    </main>
  );
};

export default wordsList;
