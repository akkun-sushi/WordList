"use client";

import React, { ChangeEvent, FormEvent, useState } from 'react'
import { addWord} from '../api';

interface AddWordProps {
  lastId: number;
}


const AddWord = ({ lastId }: AddWordProps ) => {
  const [wordEn, setWordEn] = useState("");
  const [wordJa, setWordJa] = useState("");
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const id = lastId + 1
    await addWord({id: id.toString(), en: wordEn, ja: wordJa});
    setWordEn("");
    setWordJa("");
  };

  const handleChangeEn = (e: ChangeEvent<HTMLInputElement>) => {setWordEn(e.target.value)};
  const handleChangeJa = (e: ChangeEvent<HTMLInputElement>) => {setWordJa(e.target.value)};

  const isButtonDisabled = wordEn.trim() === "" || wordJa.trim() === "";

  return (
    <form className='flex flex-row px-2 py-4' onSubmit={handleSubmit}>
      <input 
        type="text"
        placeholder='英語'
        className="w-2/5 rounded-lg border text-2xl px-4 py-1 mr-3"
        onChange={handleChangeEn}
        value={wordEn}
      />
      <input 
        type="text"
        placeholder='日本語'
        className="w-2/5 rounded-lg border text-2xl px-4 py-1 mr-10"
        onChange={handleChangeJa}
        value={wordJa}
      />
      <button 
        type='submit'
        className='w-1/5 bg-green-400 text-white text-2xl rounded-lg'
        disabled={isButtonDisabled}
      >
        追加
      </button>
    </form>
  );
};

export default AddWord;
