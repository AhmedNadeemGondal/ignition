import axios from "axios";
import { gameDetailURL, gameScreenShotURL } from "../api";

const loadDetail = (id) => async (dispatch) => {
  dispatch({
    type: "LOADING_DETAIL",
  });
  const detailData = await axios.get(gameDetailURL(id));
  const screenShotData = await axios.get(gameScreenShotURL(id));

  dispatch({
    type: "GET_DETAIL",
    payload: {
      game: detailData.data,
      screen: screenShotData.data,
    },
  });
};

export default loadDetail;
