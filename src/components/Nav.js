import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import logo from "../img/logo.svg";

import { fetchSearch } from "../actions/gamesAction";
import { useDispatch } from "react-redux";
import { fadeIn } from "../animation";
const Nav = () => {
  const dispatch = useDispatch();
  const [textInput, setTextInput] = useState("");

  const inputHand = (e) => {
    setTextInput(e.target.value);
  };

  const submitSearch = (e) => {
    e.preventDefault();
    dispatch(fetchSearch(textInput));

    setTextInput("");
  };

  const clearSearched = () => {
    dispatch({ type: "CLEAR_SEARCHED" });
  };
  return (
    <StyledNav variants={fadeIn} initial="hidden" animate="show">
      <Logo onClick={clearSearched}>
        <img src={logo} alt="logo" />
        <h1>Ignition</h1>
      </Logo>
      <form className="search" id="search-form">
        <input type="text" onChange={inputHand} />
        <button type="submit" onClick={submitSearch}>
          Search
        </button>
      </form>
    </StyledNav>
  );
};

// const StyledNav = styled(motion.div)`
//   padding: 3rem 5rem;
//   text-align: center;
//   input {
//     width: 30%;
//     font-size: 1.5rem;
//     padding: 0.5rem;
//     border: none;
//     margin-top: 1rem;
//     box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
//     outline: none;
//   }
//   button {
//     font-size: 1.5rem;
//     border: none;
//     padding: 0.5rem 2rem;
//     cursor: pointer;
//     background: #ff0000;
//     color: white;
//   }
// `;
// const Logo = styled(motion.div)`
//   display: flex;
//   justify-content: center;
//   padding: 1rem;
//   cursor: pointer;
//   img {
//     height: 2rem;
//     width: 2rem;
//   }
// `;
const StyledNav = styled(motion.div)`
  padding: 3rem 5rem;
  text-align: center;

  input {
    width: 30%;
    font-size: 1.5rem;
    padding: 0.5rem;
    border: none;
    margin-top: 1rem;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
    outline: none;
  }

  button {
    font-size: 1.5rem;
    border: none;
    padding: 0.5rem 2rem;
    cursor: pointer;
    background: #ff0000;
    color: white;
  }

  @media (max-width: 768px) {
    padding: 2rem 3rem;

    input {
      width: 80%;
    }

    button {
      font-size: 1.2rem;
      padding: 0.5rem 1.5rem;
    }
  }

  @media (max-width: 480px) {
    padding: 1rem 2rem;

    input {
      width: 80%;
      font-size: 1rem;
    }

    button {
      font-size: 1rem;
      /* width: 100%; */
      padding: 0.5rem 1rem;
      margin-top: 2rem;
    }
  }
`;

const Logo = styled(motion.div)`
  display: flex;
  justify-content: center;
  padding: 1rem;
  cursor: pointer;

  img {
    height: 2rem;
    width: 2rem;
  }
`;

export default Nav;
