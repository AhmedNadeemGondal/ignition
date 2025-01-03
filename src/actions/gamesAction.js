import axios from "axios";
import {
  popGURL,
  upComeGURL,
  newGURL,
  searchGameURL,
  new_games_page,
  pop_games_page,
  upcome_games_page,
  search_games_page,
} from "../api";

// const forbiddenTags = [];
const forbiddenTags = [
  "nsfw",
  "adult",
  "hentai",
  "erotic",
  "sexual-content",
  "lgbtq-2",
];
const filterByForbiddenTags = (array, forbiddenTags) =>
  array.filter(
    (obj) =>
      obj.background_image !== null && // Exclude objects with null background_image
      Array.isArray(obj.tags) &&
      !obj.tags.some((tag) => forbiddenTags.includes(tag.slug.toLowerCase()))
  );

export const loadGames = () => async (dispatch) => {
  const popData = await axios.get(popGURL());
  const upComeGData = await axios.get(upComeGURL());
  const newGData = await axios.get(newGURL());

  dispatch({
    type: "FETCH_GAMES",
    payload: {
      popular: filterByForbiddenTags(popData.data.results, forbiddenTags),
      upcoming: filterByForbiddenTags(upComeGData.data.results, forbiddenTags),
      newGames: filterByForbiddenTags(newGData.data.results, forbiddenTags),
    },
  });
};

export const newPageNewGames = (page) => async (dispatch) => {
  const pageNewGames = await axios.get(new_games_page(page));
  dispatch({
    type: "LOAD_NEW_GAME",
    payload: {
      newGames: filterByForbiddenTags(pageNewGames.data.results, forbiddenTags),
    },
  });
};

export const newPagePopGames = (page) => async (dispatch) => {
  const pagePopGames = await axios.get(pop_games_page(page));
  dispatch({
    type: "LOAD_POP_GAME",
    payload: {
      popGames: filterByForbiddenTags(pagePopGames.data.results, forbiddenTags),
    },
  });
};

export const newPageUpcomeGames = (page) => async (dispatch) => {
  const pageUpcomeGames = await axios.get(upcome_games_page(page));
  dispatch({
    type: "LOAD_UPCOME_GAME",
    payload: {
      upcomeGames: filterByForbiddenTags(
        pageUpcomeGames.data.results,
        forbiddenTags
      ),
    },
  });
};

export const fetchSearch = (game_name) => async (dispatch) => {
  const searchGames = await axios.get(searchGameURL(game_name));
  dispatch({
    type: "FETCH_SEARCHED",
    payload: {
      searched: filterByForbiddenTags(searchGames.data.results, forbiddenTags),
      currentSearch: game_name,
    },
  });
};

export const fetchSearchNewPage = (game_name, page) => async (dispatch) => {
  const searchGamesNewPage = await axios.get(
    search_games_page(game_name, page)
  );
  dispatch({
    type: "FETCH_SEARCHED_NEW_PAGE",
    payload: {
      searched: filterByForbiddenTags(
        searchGamesNewPage.data.results,
        forbiddenTags
      ),
    },
  });
};
