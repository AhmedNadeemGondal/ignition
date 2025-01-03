import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import {
  loadGames,
  newPageNewGames,
  newPagePopGames,
  newPageUpcomeGames,
  fetchSearchNewPage,
} from "../actions/gamesAction";
import Game from "../components/Game";
import GameDetail from "../components/GameDetail";
import { useLocation } from "react-router-dom";
import { AnimatePresence, LayoutGroup } from "framer-motion";

import { fadeIn } from "../animation";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadGames());
  }, [dispatch]);

  const handleLoadMore = (cat) => {
    if (cat === "upCome") {
      dispatch(newPageUpcomeGames(pageUpcome));
    } else if (cat === "newGames") {
      dispatch(newPageNewGames(pageNew));
    } else if (cat === "popGames") {
      dispatch(newPagePopGames(pagePop));
    } else if (cat === "search") {
      dispatch(fetchSearchNewPage(currentSearchQuery, pageSearch));
    }
  };

  const {
    popular,
    newgames,
    upcoming,
    searched,
    pagePop,
    pageNew,
    pageUpcome,
    pageSearch,
    currentSearchQuery,
  } = useSelector((state) => state.games);
  console.log(popular);
  const location = useLocation();
  const pathId = location.pathname.split("/")[2];

  return (
    <>
      {popular.length || newgames.length || upcoming.length ? (
        <GameList variants={fadeIn} initial="hidden" animate="show">
          <LayoutGroup type="crossfade">
            <AnimatePresence>
              {pathId && <GameDetail pathId={pathId} />}
            </AnimatePresence>
            {searched.length ? (
              <div className="searched">
                <h2>Searched Games</h2>
                <Games>
                  {searched.map((game) => {
                    return (
                      <Game
                        name={game.name}
                        released={game.released}
                        id={game.id}
                        image={game.background_image}
                        key={game.id}
                      />
                    );
                  })}
                </Games>
                <button
                  onClick={() => {
                    handleLoadMore("search");
                  }}
                >
                  Load More
                </button>
              </div>
            ) : (
              ""
            )}
            {/*  */}
            <h2>Upcoming Games</h2>
            {upcoming.length ? (
              <Games>
                {upcoming.map((game) => {
                  return (
                    <Game
                      name={game.name}
                      released={game.released}
                      id={game.id}
                      image={game.background_image}
                      key={game.id}
                    />
                  );
                })}
              </Games>
            ) : (
              <LoadingSpinner />
            )}

            <button
              onClick={() => {
                handleLoadMore("upCome");
              }}
            >
              Load More
            </button>
            {/*  */}
            <h2>Popular Games</h2>
            {popular.length ? (
              <Games>
                {popular.map((game) => {
                  return (
                    <Game
                      name={game.name}
                      released={game.released}
                      id={game.id}
                      image={game.background_image}
                      key={game.id}
                    />
                  );
                })}
              </Games>
            ) : (
              <LoadingSpinner />
            )}

            <button
              onClick={() => {
                handleLoadMore("popGames");
              }}
            >
              Load More
            </button>
            {/*  */}
            <h2>New Games</h2>
            {newgames.length ? (
              <Games>
                {newgames.map((game) => {
                  return (
                    <Game
                      name={game.name}
                      released={game.released}
                      id={game.id}
                      image={game.background_image}
                      key={game.id}
                    />
                  );
                })}
              </Games>
            ) : (
              <LoadingSpinner />
            )}

            <button
              onClick={() => {
                handleLoadMore("newGames");
              }}
            >
              Load More
            </button>
          </LayoutGroup>
        </GameList>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}

const GameList = styled(motion.div)`
  padding: 0rem 3rem;

  h2 {
    padding: 5rem 0rem;
  }

  button {
    font-size: 1.5rem;
    border: none;
    margin: 2rem auto;
    display: block;
    padding: 0.5rem 2rem;
    cursor: pointer;
    background: #ff0000;
    color: white;
  }

  @media (max-width: 768px) {
    padding: 0rem 1rem;

    h2 {
      padding: 3rem 0rem;
      font-size: 1.5rem;
    }

    button {
      font-size: 1.2rem;
      padding: 0.4rem 1.5rem;
    }
  }
`;

const Games = styled(motion.div)`
  min-height: 80vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-column-gap: 3rem;
  grid-row-gap: 5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-column-gap: 1.5rem;
    grid-row-gap: 3rem;
  }
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingSpinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
  }
`;

export default Home;
