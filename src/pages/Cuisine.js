import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";

export function Cuisine() {
  const [cuisine, setCuisine] = useState([]);
  const { type } = useParams();

  const getCuisine = async (name) => {
    try {
      const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`;
      const response = await fetch(url);
      const result = await response.json();
      setCuisine(result.results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCuisine(type);
  }, [type]);

  return (
    <Grid
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {cuisine && cuisine.length > 0 ? (
        cuisine.map((item) => (
          <Card key={item.id}>
            <Link to={"/recipe/" + item.id}>
              <img src={item.image} alt={item.title} />
              <h4>{item.title}</h4>
            </Link>
          </Card>
        ))
      ) : (
        <p></p>
      )}
    </Grid>
  );
}
const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;
const Card = styled(motion.div)`
  img {
    width: 100%;
    border-radius: 2rem;
  }
  a {
    text-align: center;
    padding: 1rem;
  }
`;
