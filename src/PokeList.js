import React, { Component } from "react";
import { Link } from "react-router-dom";
import PokeItem from "./PokeItem.js";

export default class PokeList extends Component {
  render() {
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
          this.props.data.map((pokemon) => {
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
