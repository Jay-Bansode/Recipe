// import logo from './logo.svg';
import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Recipe from "./Components/Recipe";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  useEffect(() => {
    getRecipes();
  }, [query]);

  const updateSearch = (e) => {
    setSearch(e.target.value);
    // console.log(search);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    console.log(query);
  };
  const getRecipes = async () => {
    const response = await axios.get(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=fe891301&app_key=023c1f2cfc82c08a8ea94f9ad8e60dd1`
    );

    // console.log(response.data.hits);
    setRecipes(response.data.hits);
    console.log(response.data.hits);
  };
  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />

          // <div key={recipe.recipe.label}>
          //   <h1>{recipe.recipe.label}</h1>
          //   <p>{recipe.recipe.calories}</p>
          //   <img src={recipe.recipe.image} alt="" />
          // </div>

          // console.log(recipe.recipe.label)
        ))}
      </div>
    </div>
  );
}

export default App;
