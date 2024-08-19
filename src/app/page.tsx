import WordList from "./components/WordList";
import AddWord from "./components/AddWord";
import { getAllWords } from "./api";

export default async function Home() {
  const words = await getAllWords();
  console.log(words);
  const lastWord = words.find(word => word.id === words.length.toString());
  const lastId = lastWord?.id || "0"

  return (
    <main className="flex flex-col items-center min-h-screen bg-blue-200 py-14">
    <h1 className="text-4xl font-bold text-black">単語リスト</h1>
      <div className="bg-white w-full max-w-6xl mt-5 px-2  py-1 shadow-lg rounded-lg">
        <AddWord lastId={parseInt(lastId)} />
      </div>
      <div className="bg-white w-full max-w-6xl mt-5 px-8  py-4 shadow-lg rounded-lg">
        <WordList words={words} />
      </div>
    </main>
  );
}
