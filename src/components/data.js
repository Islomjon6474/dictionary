import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";
import AlarmIcon from "@mui/icons-material/Alarm";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { pink } from "@mui/material/colors";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

const Data = ({data}) => {

   
  
  
    let url = "";
    for (let i = 0; i < data[0]?.phonetics.length; i++) {
      url = data[0]?.phonetics[i].audio ? data[0]?.phonetics[i].audio : "";
    }
    
    const audio = new Audio(url);
    const dispatch = useDispatch();
  
    console.log(data);
    return (
        (
            <div className="data">
              <div className="word">
                <div className="pronouciation">
                  <h1>{data[0].word}</h1>
                  <p className="phonetic">{data[0].phonetic}</p>
                </div>
                <div className="audio">
                  <button
                    onClick={() =>
                      url
                        ? audio.play()
                        : alert(
                            "Sorry there is no available audio for this word."
                          )
                    }
                    className="play"
                  >
                    <i className="fa-solid fa-play"></i>
                  </button>
                </div>
              </div>
              {data[0].meanings.map((meaning, index) => {
                return (
                  <div key={index} className="meaning">
                    <div className="type">
                      <h3>{meaning.partOfSpeech}</h3>
                      <div className="line"></div>
                    </div>
                    <h2>Meaning</h2>
                    <ul>
                      {meaning.definitions.map((definition, index) => {
                        return <li key={index}>{definition.definition}</li>;
                      })}
                    </ul>
                    <div className="synonyms">
                      {meaning.synonyms[0] && <p>Synonyms:</p>}
                      <div className="synonymList">
                        {meaning.synonyms.map((synonym, index) => {
                          return (
                            <p className="synonym" key={index}>
                              {synonym +
                                (index == meaning.synonyms.length - 1
                                  ? "."
                                  : ", ")}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )
    );
}

export default Data;
