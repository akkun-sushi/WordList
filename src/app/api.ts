import { Words } from './types';
const url = "http://localhost:3001/words";

export const getAllWords = async ():Promise<Words[]> => {
    const response = await fetch(url, {
        cache: "no-store"
    });
    const words = await response.json()
    return words;
};

export const addWord = async (word: Words):Promise<void> => {
    const response = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(word)
    });
    await response.json();
};

export const editWord = async (id: string, newWordEn: string, newWordJa: string): Promise<void> => {
    const response = await fetch(url + '/' + id, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ id: id, en:newWordEn, ja: newWordJa })
    })
    await response.json();
};

export const deleteWord = async (id: string): Promise<void> => {
    const response = await fetch(url + '/' + id, {
        method: "DELETE", 
    })
    await response.json();
};

export const updateWords = async (word: Words): Promise<void> => {
    const response = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(word)
    })
    await response.json();
};

