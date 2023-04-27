import logo from "./logo.svg";
import "./App.css";
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
import Header from "./components/header";

// import { searchCHange, incrementByAmount } from "./redux/counter";
import { useSelector, useDispatch } from "react-redux";
import Data from "./components/data";

function App() {
  const { value, searchingStatus, found } = useSelector((state) => state);
  const [dataResponse, setDataResponse] = useState(false);
  const [searching, setSearching] = useState(null);
  const [data, setData] = useState([]);

  let url = "";
  for (let i = 0; i < data[0]?.phonetics.length; i++) {
    url = data[0]?.phonetics[i].audio ? data[0]?.phonetics[i].audio : "";
  }
  useEffect(() => {
    setData(value);
    setSearching(searchingStatus);
    found === false ? setDataResponse(true) : setDataResponse(false);
  }, [value, searchingStatus, found]);
  const audio = new Audio(url);
  const dispatch = useDispatch();

  console.log(data);

  return (
    <div className="App">
      <div className="container">
        <Header />
        {data[0] ? (
          <>
            <Data data={data} />
          </>
        ) : searching === false ? (
          <>
            {dataResponse && (
              <img
                className="notfound"
                src="https://freefrontend.com/assets/img/html-funny-404-pages/GSAP-SVG-Animation-404-Error-Milk-Carton.png"
                alt=""
              />
            )}
          </>
        ) : (
          <CircularProgress sx={{ margin: "20px" }} color="success" />
        )}
      </div>
    </div>
  );
}

export default App;
