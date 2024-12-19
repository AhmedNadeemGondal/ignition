const api_key = process.env.REACT_APP_API_KEY;

const base_url = `https://api.rawg.io/api/`;

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

const pop_games = `games?key=${api_key}&dates=${lastYear},${currDate}&ordering=-rating&page_size=10`;
const upcome_games = `games?key=${api_key}&dates=${currDate},${nextYear}&ordering=-added&page_size=10`;
const new_games = `games?key=${api_key}&dates=${lastYear},${currDate}&ordering=-released&page_size=10`;

export const popGURL = () => `${base_url}${pop_games}`;
export const upComeGURL = () => `${base_url}${upcome_games}`;
export const newGURL = () => `${base_url}${new_games}`;

// export const gameDetailURL = (game_id) => `${base_url}games/${game_id}`;

export const gameDetailURL = (game_id) =>
  `${base_url}games/${game_id}?key=${api_key}`;
export const gameScreenShotURL = (game_id) =>
  `${base_url}games/${game_id}/screenshots?key=${api_key}`;

// export const gameDetailURL = (game_id) =>
//   `${base_url}games/${game_id}?key=${api_key}&resize=640`;
// export const gameScreenShotURL = (game_id) =>
//   `${base_url}games/${game_id}/screenshots?key=${api_key}&resize=640`;

export const searchGameURL = (game_name) =>
  `${base_url}games?key=${api_key}&search=${game_name}&page_size=9`;
