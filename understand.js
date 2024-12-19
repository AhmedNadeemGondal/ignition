import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadGames } from "../actions/gamesAction";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadGames());
  });
  return (
    <div>
      <h1>Hello ignite</h1>
    </div>
  );
}

export default Home;
//
//
// ACTION //
import axios from "axios";
import { popGURL, upComeGURL, newGURL } from "../api";

export const loadGames = () => async (dispatch) => {
  const popData = await axios.get(popGURL());
  const newGData = await axios.get(upComeGURL());
  const upComeGData = await axios.get(newGURL());
  dispatch({
    type: "FETCH_GAMES",
    payload: {
      popular: popData.data.results,
      upcoming: upComeGData.data.results,
      newGames: newGData.data.results,
    },
  });
};
//
//
//
const initState = {
  popular: [],
  newGames: [],
  upcomingGames: [],
  searchGames: [],
};

//REDUCER//

export const gamesReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_GAMES":
      return {
        ...state,
        popular: action.payload.popular,
        upcoming: action.payload.upcoming,
        newgames: action.payload.newGames,
      };
    default:
      return { ...state };
  }
};
