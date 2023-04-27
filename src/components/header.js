import React, { useEffect, useRef } from "react";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";
import AlarmIcon from "@mui/icons-material/Alarm";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { pink, green } from "@mui/material/colors";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography } from "@mui/material";
import { incrementByAmount, searchCHange, ifFound } from "../redux/counter";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
const Header = () => {
  const { value, searchingStatus, foundResult } = useSelector((state) => state);
  console.log(value, searchingStatus);
  const inputRef = useRef("");
  const dispatch = useDispatch();
  useEffect(() => {
    document.addEventListener(
      "keydown",
      (e) => {
        if (e.key == "Enter") {
          dataFetch(inputRef.current.value);
        }
      },
      true
    );
  }, []);

  const dataFetch = async (word) => {
    if (word) {
      dispatch(searchCHange());
      try {
        await axios
          .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
          .then((res) => {
            dispatch(incrementByAmount(res.data));
            dispatch(searchCHange());
            dispatch(ifFound(true));

            // console.log(res.data);
          });
      } catch (error) {
        dispatch(searchCHange());
        dispatch(incrementByAmount([]));
        dispatch(ifFound(false));
      }
    } else {
      dispatch(incrementByAmount([]));
      dispatch(ifFound(null));
      alert("Please enter a valid search term");
    }
  };

  return (
    <header>
      <div className="search">
        <input
          className="search_input"
          placeholder="Search..."
          type="text"
          ref={inputRef}
        />
        <IconButton
          onClick={() => dataFetch(inputRef.current.value)}
          aria-label="search"
          className="search_button"
        >
          <SearchIcon sx={{ color: green[700] }} />
        </IconButton>
      </div>
    </header>
  );
};

export default Header;
