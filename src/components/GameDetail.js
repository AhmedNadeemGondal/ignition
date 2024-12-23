import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { smallImage } from "../util";

import playstation_3 from "../img/playstation_3.svg";
import playstation_4 from "../img/playstation_4.svg";
import playstation_5 from "../img/playstation_5.svg";
import steam from "../img/steam.svg";
import xbox from "../img/xbox.svg";
import xbox_360 from "../img/xbox_360.svg";
import xbox_s from "../img/xbox_s.svg";
import nintendo from "../img/nintendo.svg";
import apple from "../img/apple.svg";
import gamepad from "../img/gamepad.svg";
import starEmpty from "../img/star-empty.png";
import starFull from "../img/star-full.png";

const GameDetail = ({ pathId }) => {
  const [console, setConsole] = useState(undefined);
  const navigate = useNavigate();
  const exitDetailHand = (e) => {
    const element = e.target;
    if (element.classList.contains("shadow")) {
      document.body.style.overflow = "auto";
      navigate("/");
    }
  };

  const getStars = () => {
    const stars = [];
    const rating = Math.floor(game.rating);
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<img alt="star" key={i} src={starFull} />);
      } else {
        stars.push(<img alt="star" key={i} src={starEmpty} />);
      }
    }
    return stars;
  };

  const getPlatformImg = (platform) => {
    switch (platform) {
      case "PlayStation 3":
        return playstation_3;
      case "PlayStation 4":
        return playstation_4;
      case "PlayStation 5":
        return playstation_5;
      case "Xbox 360":
        return xbox_360;
      case "Xbox One":
        return xbox;
      case "Xbox Series S/X":
        return xbox_s;
      case "PC":
        return steam;
      case "Nintendo Switch":
        return nintendo;
      case "iOS":
        return apple;
      default:
        return gamepad;
    }
  };

  const { game, screen, isLoading } = useSelector((state) => state.detail);

  return (
    <>
      {!isLoading && (
        <CardShadow className="shadow" onClick={exitDetailHand}>
          <Detail layoutId={pathId}>
            <Stats>
              <div className="rating">
                <motion.h3 layoutId={`title ${pathId}`}>{game.name}</motion.h3>
                <p>Rating: {game.rating}</p>
                {getStars()}
              </div>
              <Info>
                <h3>Platforms</h3>
                <Platforms>
                  {/* {game.platforms.map((data) => (
                    <img
                      alt={data.platform.name}
                      key={data.platform.id}
                      src={getPlatformImg(data.platform.name)}
                    ></img>
                  ))} */}
                  {game.platforms.map((data) => {
                    return (
                      <Platform className="random" key={data.platform.id}>
                        <img
                          alt={data.platform.name}
                          key={data.platform.id}
                          src={getPlatformImg(data.platform.name)}
                          onMouseEnter={() => {
                            setConsole(data.platform.name);
                          }}
                          onMouseLeave={() => setConsole(null)}
                        />
                        {console === data.platform.name && (
                          <HoverText
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                          >
                            {data.platform.name}
                          </HoverText>
                        )}
                      </Platform>
                    );
                  })}
                </Platforms>
              </Info>
            </Stats>
            <Media>
              <motion.img
                layoutId={`image ${pathId}`}
                src={smallImage(game.background_image, 1280)}
                alt={game.name}
              />
            </Media>
            <Description>
              <p>{game.description_raw}</p>
            </Description>
            <div className="gallery">
              {screen.results.map((screen) => {
                return (
                  <img
                    src={smallImage(screen.image, 1280)}
                    key={screen.id}
                    alt="game screenshots"
                  />
                );
              })}
            </div>
          </Detail>
        </CardShadow>
      )}
    </>
  );
};

const CardShadow = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  overflow-y: scroll;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ff7676;
  }
  &::-webkit-scrollbar-track {
    background: white;
  }
`;

const Detail = styled(motion.div)`
  width: 80%;
  border-radius: 1rem;
  padding: 2rem 5rem;
  background: white;
  position: absolute;
  left: 10%;
  color: black;
  z-index: 5;
  img {
    width: 100%;
  }
`;

const Stats = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    width: 2rem;
    height: 2rem;
    display: inline;
  }
`;

const Info = styled(motion.div)`
  text-align: center;
  justify-content: center;
`;

const Platforms = styled(motion.div)`
  display: flex;
  justify-content: space-evenly;
`;
const Platform = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: space-evenly;
  img {
    margin: 0 1.5rem;
    width: 50%;
  }
`;

const Media = styled(motion.div)`
  margin-top: 5rem;
  img {
    width: 100%;
  }
`;

const Description = styled(motion.div)`
  margin: 5rem 0rem;
`;

const HoverText = styled(motion.div)`
  position: absolute;
  bottom: -2.5rem;
  /* left: 50%; */
  /* transform: translateX(-50%); */
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  white-space: nowrap;
  pointer-events: none;
`;
export default GameDetail;
