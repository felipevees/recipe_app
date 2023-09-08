import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

export function Recipe() {
  const { name } = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");

  const fetchDetails = async () => {
    try {
      const url = `https://api.spoonacular.com/recipes/${name}/information?apiKey=${process.env.REACT_APP_API_KEY}`;
      const response = await fetch(url);
      const result = await response.json();
      setDetails(result);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [name]);

  return (
    <RecipeContainer>
      {details ? (
        <>
          <RecipeHeader>
            <h2>{details.title}</h2>
          </RecipeHeader>
          <RecipeImage>
            <img src={details.image} alt={details.title} />
          </RecipeImage>
          <RecipeContent>
            <RecipeTabs>
              <ButtonContainer>
                <Button
                  className={activeTab === "instructions" ? "active" : ""}
                  onClick={() => setActiveTab("instructions")}
                >
                  Instructions
                </Button>
                <Button
                  className={activeTab === "ingredients" ? "active" : ""}
                  onClick={() => setActiveTab("ingredients")}
                >
                  Ingredients
                </Button>
              </ButtonContainer>

              <TabContent>
                {activeTab === "instructions" && (
                  <div>
                    <h3
                      dangerouslySetInnerHTML={{ __html: details.summary }}
                    ></h3>
                    <br />
                    <h3
                      dangerouslySetInnerHTML={{ __html: details.instructions }}
                    ></h3>
                  </div>
                )}
                {activeTab === "ingredients" && (
                  <>
                    {details && details.extendedIngredients ? (
                      <ul>
                        {details.extendedIngredients.map((ingredient) => (
                          <li key={ingredient.id}>{ingredient.original}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>No ingredients available.</p>
                    )}
                  </>
                )}
              </TabContent>
            </RecipeTabs>
          </RecipeContent>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </RecipeContainer>
  );
}

const RecipeContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RecipeHeader = styled.div`
  text-align: center;
  h2 {
    font-size: 2rem;
  }
`;

const RecipeContent = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  width: 60%;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const RecipeImage = styled.div`
  img {
    width: 100%;
    max-width: 400px;
    border-radius: 10px;
    margin-top: 20px;
  }
`;

const RecipeTabs = styled.div`
  margin-top: 2rem;
  width: 100%;

  @media (min-width: 768px) {
    margin-left: 2rem;
    width: auto;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;

  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
  &.active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
`;

const TabContent = styled.div`
  margin-top: 2rem;

  h3 {
    font-size: 1rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin-top: 1rem;
    li {
      font-size: 1rem;
      line-height: 1.5rem;
    }
  }
`;
