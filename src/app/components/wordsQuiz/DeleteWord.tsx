import { PropsForComponent } from "@/app/api/wordQuiz/types";
import React from "react";

const DeleteWord = (props: PropsForComponent) => {
  return (
    <button
      onClick={() => {
        switch (props.isDeleting) {
          case "NULL":
            props.setIsDeleting("DELETE");
            break;
          case "DELETE":
            props.setIsDeleting("FINISH");
            break;
        }
      }}
      className="bg-red-400 text-white text-lg mt-3 ml-2 mr-4 flex-1 rounded-lg md:text-2xl md:ml-10 md:py-1"
    >
      {props.isDeleting === "NULL" && "削除"}
      {props.isDeleting === "DELETE" && "完了"}
    </button>
  );
};

export default DeleteWord;
