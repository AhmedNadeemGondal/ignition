import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import loadDetail from "../actions/detailAction";
import { Link } from "react-router-dom";
import { smallImage } from "../util";
import { popUp } from "../animation";

const Game = ({ name, released, image, id }) => {
  const stringPathId = id.toString();
  const dispatch = useDispatch();
  const loadDetailHand = () => {
    document.body.style.overflow = "hidden";
    dispatch(loadDetail(id));
  };
  return (
    <StyledGame
      variants={popUp}
      initial="hidden"
      animate="show"
      layoutId={stringPathId}
      onClick={loadDetailHand}
    >
      <Link to={`/game/${id}`}>
        <motion.h3 layoutId={`title ${stringPathId}`}>{name}</motion.h3>
        <p>{released}</p>
        <motion.img
          layoutId={`image ${stringPathId}`}
          src={image ? smallImage(image, 640) : image}
          alt={name}
        />
      </Link>
    </StyledGame>
  );
};

// const StyledGame = styled(motion.div)`
//   min-height: 30vh;
//   box-shadow: 0px 2px 22px rgba(0, 0, 0, 0.3);
//   text-align: center;
//   h3 {
//     padding: 1rem 1rem;
//   }
//   border-radius: 1rem;
//   overflow: hidden;
//   img {
//     width: 100%;
//     height: 40vh;
//     object-fit: cover;
//   }
// `;
const StyledGame = styled(motion.div)`
  min-height: 30vh;
  box-shadow: 0px 2px 22px rgba(0, 0, 0, 0.3);
  text-align: center;
  h3 {
    padding: 1rem 1rem;
  }
  border-radius: 1rem;
  overflow: hidden;
  img {
    width: 100%;
    height: 40vh;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    min-height: 25vh;
    img {
      height: 30vh;
    }
    h3 {
      padding: 0.5rem;
    }
  }

  @media (max-width: 480px) {
    min-height: 20vh;
    img {
      height: 25vh;
    }
    h3 {
      font-size: 1rem;
      padding: 0.3rem;
    }
  }
`;

export default Game;
