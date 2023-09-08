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
        <p>No results found.</p>
      )}
    </Grid>
  );
}

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(280px, 1fr)
  ); // Ajusta el ancho mínimo y máximo de las columnas según tus necesidades.
  grid-gap: 1.5rem; // Reduce el espacio entre las tarjetas en pantallas pequeñas.
  padding: 1.5rem; // Agrega un espacio adicional alrededor del contenedor en pantallas pequeñas.

  @media (max-width: 768px) {
    justify-content: center; // Centra el contenido en pantallas pequeñas.
  }
`;

const Card = styled(motion.div)`
  img {
    width: 100%;
    border-radius: 2rem;
  }

  a {
    text-align: center;
    padding: 1rem;
    text-decoration: none; // Agrega un estilo de enlace a los títulos.
    color: #333; // Cambia el color del texto de los títulos.
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h4 {
    margin-top: 1rem; // Agrega espacio entre la imagen y el título.
  }
`;
