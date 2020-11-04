import React, { Component } from "react";
import { Link } from "react-router-dom";
import PokeItem from "./PokeItem.js";

export default class PokeList extends Component {
  render() {
    const filtered = filterData(this.props.data, this.props.sortType);
    const sorted = sortData(filtered, this.props.sortDirection);
    const validated = searchValidation(sorted, this.props.inputVal);

    return (
      <section className="poke-list">
        {this.props.loading ? (
          <div className="loading">
            <img
              className="loading-gif"
              src="https://icon-library.com/images/loading-icon-transparent-background/loading-icon-transparent-background-12.jpg"
              alt="loading"
            />
          </div>
        ) : (
          validated.map((pokemon) => {
            return (
              <Link to={`/details/${pokemon.pokemon}`}>
                <PokeItem
                  name={pokemon.pokemon}
                  image={pokemon.url_image}
                  typeOne={pokemon.type_1}
                  typeTwo={pokemon.type_2}
                  abilityOne={pokemon.ability_1}
                  abilityTwo={pokemon.ability_2}
                  shape={pokemon.shape}
                  key={pokemon._id}
                  onClick={(e) => this.props.handlePokemonClick(pokemon)}
                />
              </Link>
            );
          })
        )}
      </section>
    );
  }
}

const filterData = (data, filterCategory) => {
  return data.filter(
    (pokemon) => !filterCategory || pokemon.type_1 === filterCategory
  );
};

const sortData = (data, sortDirection) => {
  if (sortDirection === "") {
    return data;
  }
  if (sortDirection === "descending") {
    return data.sort((a, b) => a.pokemon.localeCompare(b.pokemon));
  }
  if (sortDirection === "ascending") {
    return data.sort((a, b) => b.pokemon.localeCompare(a.pokemon));
  }
};

const searchValidation = (data, input) => {
  if (input) {
    return data.filter((pokemon) =>
      pokemon.pokemon.toLowerCase().includes(input)
    );
  } else {
    return data;
  }
};
