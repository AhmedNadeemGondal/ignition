const api_key = process.env.REACT_APP_SOME_THING;
const isDevelopment = process.env.NODE_ENV === "development";
const server_url = `/api/fetchData?url=`;

const base_url = `https://api.rawg.io/api/`;
const local_key = isDevelopment ? `key=${api_key}` : "";

const getCurrMonth = () => {
  const month = new Date().getMonth() + 1; // getMonth() is zero-based
  return month < 10 ? `0${month}` : month;
};

const getCurrDay = () => {
  const day = new Date().getDate(); // getDate() gets the day of the month
  return day < 10 ? `0${day}` : day;
};

const currYear = new Date().getFullYear();
const currMonth = getCurrMonth();
const currDay = getCurrDay();
const currDate = `${currYear}-${currMonth}-${currDay}`;
const lastYear = `${currYear - 1}-${currMonth}-${currDay}`;
const nextYear = `${currYear + 1}-${currMonth}-${currDay}`;

const pop_games = isDevelopment
  ? `games?${local_key}&dates=${lastYear},${currDate}&ordering=-rating&page_size=10`
  : `games?&dates=${lastYear},${currDate}&ordering=-rating&page_size=10`;

const upcome_games = isDevelopment
  ? `games?${local_key}&dates=${currDate},${nextYear}&ordering=-added&page_size=10`
  : `games?&dates=${currDate},${nextYear}&ordering=-added&page_size=10`;

const new_games = isDevelopment
  ? `games?${local_key}&dates=${lastYear},${currDate}&ordering=-released&page_size=10`
  : `games?&dates=${lastYear},${currDate}&ordering=-released&page_size=10`;

const getReqURL = (req_url) =>
  isDevelopment ? req_url : `${server_url}${encodeURIComponent(req_url)}`;

export const popGURL = () => `${base_url}${pop_games}`;
export const upComeGURL = () => `${base_url}${upcome_games}`;
export const newGURL = () => `${base_url}${new_games}`;

export const pop_games_page = (page) => {
  console.log("This fired! pop Page");
  return getReqURL(
    `${base_url}games?${local_key}&dates=${lastYear},${currDate}&ordering=-rating&page_size=10&page=${page}`
  );
};

export const upcome_games_page = (page) => {
  console.log("This fired! upCome Page");
  return getReqURL(
    `${base_url}games?${local_key}&dates=${lastYear},${currDate}&ordering=-added&page_size=10&page=${page}`
  );
};

export const new_games_page = (page) => {
  console.log("This fired! newGames Page");
  return getReqURL(
    `${base_url}games?${local_key}&dates=${lastYear},${currDate}&ordering=-released&page_size=10&page=${page}`
  );
};

export const gameDetailURL = (game_id) =>
  getReqURL(`${base_url}games/${game_id}?${local_key}`);

export const gameScreenShotURL = (game_id) =>
  getReqURL(`${base_url}games/${game_id}/screenshots?${local_key}`);

export const searchGameURL = (game_name) =>
  getReqURL(`${base_url}games?${local_key}&search=${game_name}&page_size=9`);

export const search_games_page = (game_name, page) => {
  console.log("This fired! search Games Page");
  return getReqURL(
    `${base_url}games?${local_key}&search=${game_name}&page_size=9&page=${page}`
  );
};

// export const popGURL = () => `${base_url}${pop_games}`;
// export const upComeGURL = () => `${base_url}${upcome_games}`;
// export const newGURL = () => `${base_url}${new_games}`;

// export const pop_games_page = (page) => {
//   console.log("This fired!");
//   return `${base_url}games?${local_key}&dates=${lastYear},${currDate}&ordering=-rating&page_size=10&page=${page}`;
// };
// export const upcome_games_page = (page) => {
//   console.log("This fired!");
//   return `${base_url}games?${local_key}&dates=${lastYear},${currDate}&ordering=-added&page_size=10&page=${page}`;
// };
// export const new_games_page = (page) => {
//   console.log("This fired!");
//   return `${base_url}games?${local_key}&dates=${lastYear},${currDate}&ordering=-released&page_size=10&page=${page}`;
// };

// export const gameDetailURL = (game_id) =>
//   `${base_url}games/${game_id}?${local_key}`;
// export const gameScreenShotURL = (game_id) =>
//   `${base_url}games/${game_id}/screenshots?${local_key}`;

// export const searchGameURL = (game_name) =>
//   `${base_url}games?${local_key}&search=${game_name}&page_size=9`;

// export const search_games_page = (game_name, page) => {
//   console.log("This fired!");
//   return `${base_url}games?${local_key}&search=${game_name}&page_size=9&page=${page}`;
// };
