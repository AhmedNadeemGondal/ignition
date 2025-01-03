const initState = {
  popular: [],
  newgames: [],
  upcoming: [],
  searched: [],
  currentSearchQuery: "",
  pagePop: 2,
  pageNew: 2,
  pageUpcome: 2,
  pageSearch: 2,
};

// export const gamesReducer = (state = initState, action) => {
//   switch (action.type) {
//     case "FETCH_GAMES":
//       return {
//         ...state,
//         popular: action.payload.popular,
//         upcoming: action.payload.upcoming,
//         newgames: action.payload.newGames,
//       };
//     case "LOAD_NEW_GAME":
//       return {
//         ...state,
//         newgames: [...state.newgames, ...action.payload.newGames],
//         pageNew: state.pageNew + 1,
//       };
//     case "LOAD_POP_GAME":
//       return {
//         ...state,
//         popular: [...state.popular, ...action.payload.popGames],
//         pagePop: state.pagePop + 1,
//       };
//     case "LOAD_UPCOME_GAME":
//       return {
//         ...state,
//         upcoming: [...state.upcoming, ...action.payload.upcomeGames],
//         pageUpcome: state.pageUpcome + 1,
//       };
//     case "FETCH_SEARCHED":
//       return {
//         ...state,
//         searched: action.payload.searched,
//         currentSearchQuery: action.payload.currentSearch,
//       };
//     case "FETCH_SEARCHED_NEW_PAGE":
//       return {
//         ...state,
//         searched: [...state.searched, ...action.payload.searched],
//         pageSearch: state.pageSearch + 1,
//       };
//     case "CLEAR_SEARCHED":
//       return {
//         ...state,
//         searched: [],
//       };
//     default:
//       return { ...state };
//   }
// };

const removeDuplicates = (arr, key) => {
  const seen = new Set();
  return arr.filter((item) => {
    if (seen.has(item[key])) {
      return false;
    }
    seen.add(item[key]);
    return true;
  });
};

export const gamesReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_GAMES":
      return {
        ...state,
        popular: action.payload.popular,
        upcoming: action.payload.upcoming,
        newgames: action.payload.newGames,
      };
    case "LOAD_NEW_GAME":
      return {
        ...state,
        newgames: removeDuplicates(
          [...state.newgames, ...action.payload.newGames],
          "id"
        ),
        pageNew: state.pageNew + 1,
      };
    case "LOAD_POP_GAME":
      return {
        ...state,
        popular: removeDuplicates(
          [...state.popular, ...action.payload.popGames],
          "id"
        ),
        pagePop: state.pagePop + 1,
      };
    case "LOAD_UPCOME_GAME":
      return {
        ...state,
        upcoming: removeDuplicates(
          [...state.upcoming, ...action.payload.upcomeGames],
          "id"
        ),
        pageUpcome: state.pageUpcome + 1,
      };
    case "FETCH_SEARCHED":
      return {
        ...state,
        searched: action.payload.searched,
        currentSearchQuery: action.payload.currentSearch,
      };
    case "FETCH_SEARCHED_NEW_PAGE":
      return {
        ...state,
        searched: removeDuplicates(
          [...state.searched, ...action.payload.searched],
          "id"
        ),
        pageSearch: state.pageSearch + 1,
      };
    case "CLEAR_SEARCHED":
      return {
        ...state,
        searched: [],
      };
    default:
      return { ...state };
  }
};
