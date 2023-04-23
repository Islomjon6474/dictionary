import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

function App() {
  const [dataResponse, setDataResponse] = useState("");
  const [data, setData] = useState([]);

  const inputRef = useRef();

  let url = "";
  for (let i = 0; i < data[0]?.phonetics.length; i++) {
    url = data[0]?.phonetics[i].audio ? data[0]?.phonetics[i].audio : "";
  }

  const audio = new Audio(url);

  const dataFetch = async (word) => {
    setDataResponse("Searching...");
    try {
      await axios
        .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then((resp) => {
          setDataResponse("");
          setData(resp.data);
          console.log(resp.data);
        });
    } catch (error) {
      setDataResponse(
        "Sorry, we couldn't find definitions for the word you were looking for."
      );
    }
  };
  console.log(data);

  return (
    <div className="App">
      <div className="container">
        <header>
          <div className="search">
            <input
              className="search_input"
              placeholder="Search..."
              type="text"
              ref={inputRef}
            />
            <button
              className="search_button"
              onClick={() => dataFetch(inputRef.current.value)}
            >
              <i className="fa-solid search_icon fa-magnifying-glass"></i>
            </button>
          </div>
        </header>
        {data[0] ? (
          <div className="data">
            <div className="word">
              <div className="pronouciation">
                <h1>{data[0].word}</h1>
                <p className="phonetic">{data[0].phonetic}</p>
              </div>
              <div className="audio">
                <button onClick={() => audio.play()} className="play">
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
        ) : (
          <p className="notFound">{dataResponse}</p>
        )}
      </div>
    </div>
  );
}

export default App;
