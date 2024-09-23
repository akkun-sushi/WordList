import { PropsForComponent } from "@/app/api/wordQuiz/types";
import React from "react";

const EditWord = (props: PropsForComponent) => {
  return (
    <button
      onClick={() => {
        switch (props.isEditing) {
          case "NULL":
            props.setIsEditing("EDIT");
            break;
          case "EDIT":
            props.setIsEditing("FINISH");
            break;
        }
      }}
      className="bg-blue-400 text-white text-lg mt-3 ml-4 mr-2 flex-1 rounded-lg md:text-2xl md:mr-10 md:py-1"
    >
      {props.isEditing === "NULL" && "編集"}
      {props.isEditing === "EDIT" && "完了"}
    </button>
  );
};

export default EditWord;
