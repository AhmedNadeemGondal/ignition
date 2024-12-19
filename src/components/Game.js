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
      onClick={loadDetailHand}
      layoutId={stringPathId}
    >
      <Link to={`/game/${id}`}>
        <motion.h3 layoutId={`title ${stringPathId}`}>{name}</motion.h3>
        <p>{released}</p>
        <motion.img
          layoutId={`image ${stringPathId}`}
          // src={smallImage(image, 640)}
          src={image ? smallImage(image, 640) : image}
          alt={name}
        />
      </Link>
    </StyledGame>
  );
};

const StyledGame = styled(motion.div)`
  min-height: 30vh;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.3);
  text-align: center;
  border-radius: 1rem;
  overflow: hidden;
  img {
    width: 100%;
    height: 40vh;
    object-fit: cover;
  }
`;

export default Game;
