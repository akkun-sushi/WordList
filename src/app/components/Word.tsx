"use client"

import React, { ChangeEvent, useEffect, useState } from 'react';
import { Words } from '../types';

interface WordProps {
    word: Words;
    isEditing: boolean;
    editingWord: {en: string, ja: string};
    onedit: () => void;
    onsave: (id: string, editedWordEn: string, editedWordJa: string) => Promise<void>;
    ondelete: (id: string) => Promise<void>;
};

const Word = ({ word, isEditing, editingWord, onedit, onsave, ondelete }: WordProps) => {
    const [editedWordEn, setEditedWordEn] = useState(word.en);
    const [editedWordJa, setEditedWordJa] = useState(word.ja);

    const handleChangeEn = (e: ChangeEvent<HTMLInputElement>) => setEditedWordEn(e.target.value);
    const handleChangeJa = (e: ChangeEvent<HTMLInputElement>) => setEditedWordJa(e.target.value);

    useEffect(() => {
        if (isEditing) {
            setEditedWordEn(editingWord.en)
            setEditedWordJa(editingWord.ja)
        }
    }, [isEditing, editingWord])

    return (
        <li className='flex'>
            <span className='w-1/6 py-3 text-center'> { word.id }. </span>
            {isEditing ? 
                <input 
                    type='text' 
                    className='w-2/6 px-2 my-2 -ml-2 mr-2 border rounded-lg' 
                    value={editedWordEn} 
                    onChange={handleChangeEn}
                /> : <span className='w-2/6 py-3 border-r-2 border-black mr-4'> {word.en} </span>}
            {isEditing ? 
                <input 
                    type='text' 
                    className='w-2/6 px-2 my-2 ml-1 mr-1 border rounded-lg' 
                    value={editedWordJa}
                    onChange={handleChangeJa}
                /> : <span className='w-2/6 py-3'> { word.ja } </span>}
            {isEditing ? 
                <button className='w-1/6 text-base text-white bg-green-300 hover:bg-green-500 rounded-md mr-3 my-3 ml-3' onClick={()=>{onsave(word.id, editedWordEn, editedWordJa)}}>決定</button>
                : 
                <button className='w-1/6 text-base text-white bg-blue-300 hover:bg-blue-500 rounded-md mr-3 my-3 ml-3' onClick={onedit}>編集</button>
            }
            <button className='w-1/6 text-base text-white bg-red-300 hover:bg-red-500 rounded-md my-3' onClick={()=>{ondelete(word.id)}}>削除</button>
        </li>
    );
};

export default Word
