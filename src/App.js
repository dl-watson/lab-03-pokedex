import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import request from "superagent";
import Main from "./Main.js";
import Details from "./Details.js";
import Header from "./Header.js";
import Navbar from "./Navbar.js";

export default class App extends Component {
  state = {
    selectedCategory: "",
    selectedSortDirection: "",
    inputVal: "",
    pokedex: [],
    loading: true,
    activePage: 1,
    perPage: 50,
    pokemon: [],
  };

  async handlePageChange(pageNumber) {
    await this.setState({
      activePage: pageNumber,
    });
    this.fetchPokemonAPI();
  }

  handlePokemonClick = async (pokemon) => {
    this.props.history.push(`/pokemon/${pokemon.pokemon}`);
  };

  handleCategorySelect = async (e) => {
    await this.setState({
      selectedCategory: e.target.value,
    });

    await this.handleSelectedCategory();
  };

  handleSortDirection = async (e) => {
    await this.setState({
      selectedSortDirection: e.target.value,
    });

    await this.fetchPokemonAPI();
  };

  handleSearch = async (e) => {
    await this.setState({
      inputVal: e.target.value,
    });
    await this.fetchPokemonAPI();
  };

  handleFormSubmit = async (e) => {
    e.preventDefault();

    await this.fetchPokemonAPI();
  };

  componentDidMount = async () => {
    await this.fetchPokemonAPI();
  };

  fetchPokemonAPI = async () => {
    if (this.state.selectedSortDirection === ("asc" || "desc")) {
      const res = await request.get(
        `https://alchemy-pokedex.herokuapp.com/api/pokedex?pokemon=${this.state.inputVal}&sort=${this.state.selectedCategory}&direction=${this.state.selectedSortDirection}&page=${this.state.activePage}&perPage=${this.state.perPage}`
      );
      return this.setState({
        pokedex: res.body.results,
        loading: false,
      });
    } else {
      const res = await request.get(
        `https://alchemy-pokedex.herokuapp.com/api/pokedex?page=${this.state.activePage}&perPage=${this.state.perPage}`
      );
      return this.setState({
        pokedex: res.body.results,
        loading: false,
      });
    }
  };

  handleSelectedCategory = async () => {
    if (this.state.selectedCategory === "") {
      const res = await request.get(
        `https://alchemy-pokedex.herokuapp.com/api/pokedex?pokemon=${this.state.inputVal}&page=${this.state.pageNumber}&perPage=${this.state.perPage}`
      );
      return this.setState({
        pokedex: res.body.results,
      });
    } else {
      const res = await request.get(
        `https://alchemy-pokedex.herokuapp.com/api/pokedex?type=${this.state.selectedCategory}&page=${this.state.activePage}&perPage=${this.state.perPage}`
      );
      return this.setState({
        pokedex: res.body.results,
      });
    }
  };

  render() {
    return (
      <div>
        <Router>
          <header>
            <Header />
            <Navbar />
          </header>
          <Switch>
            <Route
              path="/"
              exact
              render={(routerProps) => (
                <Main
                  {...routerProps}
                  data={this.state.pokedex}
                  loading={this.state.loading}
                  handleFormSubmit={this.handleFormSubmit}
                  handleCategorySelect={this.handleCategorySelect}
                  handleSortDirection={this.handleSortDirection}
                  handleSearch={this.handleSearch}
                  inputVal={this.state.inputVal}
                  selectedCategory={this.state.selectedCategory}
                  selectedSortDirection={this.state.selectedSortDirection}
                  fetchPokemonAPI={this.fetchPokemonAPI}
                  activePage={this.state.activePage}
                  perPage={this.state.perPage}
                  handlePokemonClick={this.handlePokemonClick}
                  handlePageChange={this.handlePageChange.bind(this)}
                />
              )}
            />
            <Route
              path="/details/:pokename"
              exact
              render={(routerProps) => (
                <Details
                  {...routerProps}
                  data={this.state.pokedex}
                  fetchPokemonAPI={this.fetchPokemonAPI}
                  pokemon={this.state.pokemon}
                />
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}
