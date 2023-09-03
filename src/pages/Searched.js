import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";

export function Searched() {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const { search } = useParams();

  const getSearched = async (name) => {
    try {
      const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`;
      const response = await fetch(url);
      const result = await response.json();
      setSearchedRecipes(result.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSearched(search);
  }, [search]);

  return (
    <Grid>
      {searchedRecipes && searchedRecipes.length > 0 ? (
        searchedRecipes.map((item) => (
          <Card key={item.id}>
            <Link to={"/recipe/" + item.id}>
              <img src={item.image} />
              <h4>{item.title}</h4>
            </Link>
          </Card>
        ))
      ) : (
        <h1></h1>
      )}
    </Grid>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;
const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }
  a {
    text-align: center;
    padding: 1rem;
  }
`;
