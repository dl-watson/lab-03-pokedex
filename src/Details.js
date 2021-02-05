import React, { Component } from "react";
import request from "superagent";
import PokemonDetails from "./PokemonDetails.js";

export default class Details extends Component {
  state = {
    loading: true,
    pokemon: [],
  };

  componentDidMount = async () => {
    const res = await request.get(
      `https://pokedex-alchemy.herokuapp.com/api/pokedex?pokemon=${this.props.match.params.pokename}`
    );
    this.setState({
      pokemon: res.body.results[0],
      loading: false,
    });
  };

  render() {
    return (
      <div className="details-page">
        {this.state.loading ? (
          <div className="loading">
            <img
              className="loading-gif det-loading"
              src="https://icon-library.com/images/loading-icon-transparent-background/loading-icon-transparent-background-12.jpg"
              alt="loading"
            />
          </div>
        ) : (
          <PokemonDetails
            name={this.state.pokemon.pokemon}
            image={this.state.pokemon.url_image}
            typeOne={this.state.pokemon.type_1}
            typeTwo={this.state.pokemon.type_2}
            abilityOne={this.state.pokemon.ability_1}
            abilityTwo={this.state.pokemon.ability_2}
            abilityHidden={this.state.pokemon.ability_hidden}
            eggGroupOne={this.state.pokemon.egg_group_1}
            eggGroupTwo={this.state.pokemon.egg_group_2}
            height={this.state.pokemon.height}
            weight={this.state.pokemon.weight}
            attack={this.state.pokemon.attack}
            defense={this.state.pokemon.defense}
            hp={this.state.pokemon.hp}
            special_attack={this.state.pokemon.special_attack}
            special_defense={this.state.pokemon.special_defense}
            speed={this.state.pokemon.speed}
            generation_id={this.state.pokemon.generation_id}
            base_experience={this.state.pokemon.base_experience}
            pokebase={this.state.pokemon.pokebase}
            pokedex={this.state.pokemon.pokedex}
            key={this.state.pokemon._id}
          />
        )}
      </div>
    );
  }
}
