import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Link } from "react-router-dom";

export function Veggie() {
  const [veggie, setVeggie] = useState([]);

  useEffect(() => {
    getVeggie();
  }, []);

  const getVeggie = async () => {
    try {
      const check = localStorage.getItem("veggie");
      if (check) {
        setVeggie(JSON.parse(check));
      } else {
        const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&number=9&diet=vegetarian`;
        const response = await fetch(url);
        const result = await response.json();
        localStorage.setItem("veggie", JSON.stringify(result.results));
        setVeggie(result.results);
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Wrapper>
        <h3>Our vegetarian picks</h3>
        <Splide
          options={{
            perPage: 3, // Número predeterminado de tarjetas por página (pantallas medianas y grandes).
            arrows: false,
            pagination: false,
            drag: "free",
            gap: "1rem", // Espacio entre las tarjetas en pantallas pequeñas.
            breakpoints: {
              768: {
                perPage: 1, // Número de tarjetas por página en pantallas medianas.
                gap: "1rem", // Espacio entre las tarjetas en pantallas medianas.
              },
            },
          }}
        >
          {veggie.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <Card>
                  <Link to={"/recipe/" + recipe.id}>
                    <p>{recipe.title}</p>
                    <img src={recipe.image} alt={recipe.title} />
                    <Gradient />
                  </Link>
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;
const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align:center;
    font-weight600;
    font-size:1rem;
    height:40%;
    display:flex;
    justify-content:center;
    align-items:center;
  }
`;
const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;
