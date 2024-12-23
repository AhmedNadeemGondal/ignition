import axios from "axios";
import { popGURL, upComeGURL, newGURL, searchGameURL } from "../api";

export const loadGames = () => async (dispatch) => {
  console.log(popGURL);
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

export const fetchSearch = (game_name) => async (dispatch) => {
  const searchGames = await axios.get(searchGameURL(game_name));
  dispatch({
    type: "FETCH_SEARCHED",
    payload: {
      searched: searchGames.data.results,
    },
  });
};
