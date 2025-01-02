import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { motion } from "framer-motion";
import { loadGames } from "../actions/gamesAction";
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
  const { popular, newgames, upcoming, searched } = useSelector(
    (state) => state.games
  );
  const location = useLocation();
  const pathId = location.pathname.split("/")[2];
  const upcomingWithBackground = upcoming.filter(
    (obj) => obj.background_image !== null
  );

  const forbiddenTags = ["nsfw", "adult", "hentai", "erotic"];
  const filterByForbiddenTags = (array, forbiddenTags) =>
    array.filter(
      (obj) =>
        !obj.tags.some((tag) => forbiddenTags.includes(tag.name.toLowerCase()))
    );

  const popularFiltered = filterByForbiddenTags(popular, forbiddenTags);
  const newgamesFiltered = filterByForbiddenTags(newgames, forbiddenTags);

  const upcomingFiltered = filterByForbiddenTags(
    upcomingWithBackground,
    forbiddenTags
  );

  return (
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
          </div>
        ) : (
          ""
        )}
        {/*  */}
        <h2>Upcoming Games</h2>
        <Games>
          {upcomingFiltered.map((game) => {
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
        {/*  */}
        <h2>Popular Games</h2>
        <Games>
          {popularFiltered.map((game) => {
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
        {/*  */}
        <h2>New Games</h2>
        <Games>
          {newgamesFiltered.map((game) => {
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
      </LayoutGroup>
    </GameList>
  );
}

const GameList = styled(motion.div)`
  padding: 0rem 3rem;
  h2 {
    padding: 5rem 0rem;
  }
`;
const Games = styled(motion.div)`
  min-height: 80vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-column-gap: 3rem;
  grid-row-gap: 5rem;
  cursor: pointer;
`;

export default Home;
