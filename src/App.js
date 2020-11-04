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
    sortType: "",
    sortDirection: "",
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
    if (this.state.sort) {
      await this.handleSort();
    } else {
      await this.handleSortDirection();
    }
  }

  handlePokemonClick = async (pokemon) => {
    this.props.history.push(`/pokemon/${pokemon.pokemon}`);
  };

  handleSearch = async (e) => {
    await this.setState({
      inputVal: e.target.value,
    });
    await this.fetchPokemonAPI();
  };

  handleFormSubmit = async (e) => {
    e.preventDefault();
    await request.get(
      `https://alchemy-pokedex.herokuapp.com/api/pokedex?pokemon=${this.state.inputVal}&page=${this.state.activePage}&perPage=${this.state.perPage}`
    );

    await this.fetchPokemonAPI();
  };

  componentDidMount = async () => {
    await this.fetchPokemonAPI();
  };

  handleSortDirection = async (e) => {
    await this.setState({
      sortDirection: e.target.value,
    });

    this.handleSortSelect();
  };

  handleSelectedSort = async (e) => {
    await this.setState({
      sortType: e.target.value,
    });

    this.handleSortDirection();
  };

  handleSortSelect = async () => {
    if (
      this.state.sortDirection === "asc" ||
      this.state.sortDirection === "desc"
    ) {
      const sorted = await request.get(
        `https://alchemy-pokedex.herokuapp.com/api/pokedex?pokemon=${this.state.inputVal}&sort=${this.state.sortType}&direction=${this.state.sortDirection}&page=${this.state.activePage}&perPage=20`
      );

      this.setState({
        pokedex: sorted.body.results,
      });
    } else {
      const list = await request.get(
        `https://alchemy-pokedex.herokuapp.com/api/pokedex?page=${this.state.activePage}&perPage=20`
      );

      this.setState({
        pokedex: list.body.results,
      });
    }
  };

  handleSortDirection = async () => {
    if (this.state.sortType === "") {
      const list = await request.get(
        `https://alchemy-pokedex.herokuapp.com/api/pokedex?pokemon=${this.state.inputVal}&page=${this.state.activePage}&perPage=${this.state.perPage}`
      );

      this.setState({
        pokemon: list.body.results,
      });
    } else {
      const sorted = await request.get(
        `https://alchemy-pokedex.herokuapp.com/api/pokedex?pokemon=${this.state.inputVal}&type=${this.state.sortType}&page=${this.state.activePage}&perPage=${this.state.perPage}`
      );

      this.setState({
        pokemon: sorted.body.results,
      });
    }
  };

  fetchPokemonAPI = async () => {
    if (this.state.inputVal.length > 0) {
      const res = await request.get(
        `https://alchemy-pokedex.herokuapp.com/api/pokedex?pokemon=${this.state.inputVal}`
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
                  handleSortDirection={this.handleSortDirection}
                  handleSortSelect={this.handleSortSelect}
                  sortDirection={this.state.sortDirection}
                  sortType={this.state.sortType}
                  handleSearch={this.handleSearch}
                  inputVal={this.state.inputVal}
                  // fetchPokemonAPI={this.fetchPokemonAPI}
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
                  // fetchPokemonAPI={this.fetchPokemonAPI}
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
