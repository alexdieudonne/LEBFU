import { Card } from "@/types/Card";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";

const CardQuizz: FC<Card> = ({ category, id, question, tag }) => {
  return (
    <div className="max-w-sm w-full p-4 h-96 rounded-md shadow border bg-gradient-to-r from-10%   from-indigo-500 via-purple-500 to-purple-500  cursor-pointer relative overflow-hidden">
      <div className="mb-3 flex justify-between">
        <span className="text-[10px] rounded-full bg-indigo-400 text-white px-3 py-1 h-fit">
          {tag}
        </span>

        <p className="text-[12px] rounded-full bg-purple-400 text-white px-3 py-1 font-bold">
          <FontAwesomeIcon
            icon={faList}
            color="white"
            size="sm"
            className="mr-2"
          />
          <span className="text-[13px]">{category}</span>
        </p>
      </div>
      <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center">
        <h1 className="text-2xl font-bold text-white">{question}</h1>
      </div>
      <div className="absolute px-3 py-4 bottom-0 left-0 w-full border-t border-white bg-purple-400">
        <div className=" bg-purple-400 rounded-lg w-fit px-3 py-1 flex items-center">
          <FontAwesomeIcon icon={faList} color="white" size="lg" />
          <span className="text-white ml-2 text-sm">Réponses: ???</span>
        </div>
      </div>
    </div>
  );
};

export default CardQuizz;
