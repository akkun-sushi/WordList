'use client'

import React, { useState } from 'react'
import { Words } from '../types'
import Word from './Word';
import { deleteWord, editWord, getAllWords, updateWords } from '../api';

interface WordsListProps {
  words: Words[];
}

/*
const WordList = ({ words }: WordsListProps) => {
  return (
    <ul className='text-2xl' >
      {words.map((word) => (
        <Word key={word.id} word={word} />
       ))}
    </ul>
  )
}
*/

const WordList = ({ words }: WordsListProps) => {
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [editingWord, setEditingWord] = useState<{en: string, ja:string} | null>(null)
  
  const handleEdit = (id: string, en: string, ja: string) => {
    setIsEditing(id);
    setEditingWord({en, ja});
  }

  const handleSave = async (id: string, editedWordEn: string, editedWordJa: string) => {
    await editWord(id, editedWordEn, editedWordJa);
    setIsEditing(null);
    setEditingWord(null);
  };

  const handleDelete = async (id: string) => {
    if (isEditing) {
        return;
    };
    await deleteWord(id);
    const words = await getAllWords();
    let updateId = 1;
    for (const word of words) {
        await deleteWord(word.id)
        word.id = updateId.toString();
        await updateWords(word);
        updateId ++;
    };
  };

  return (
    <ul className='text-2xl' >
      {words.map((word) => (
        <Word 
          key={word.id} 
          word={word} 
          isEditing={isEditing === word.id}
          editingWord={editingWord || {en: word.en, ja: word.ja}}
          onedit={() => handleEdit(word.id, word.en, word.ja)}
          onsave={handleSave}
          ondelete={handleDelete}
        />
       ))}
    </ul>
  )
}

export default WordList