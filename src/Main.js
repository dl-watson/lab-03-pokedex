import React, { Component } from "react";
import Pagination from "react-js-pagination";
import PokeList from "./PokeList.js";
import Searchbar from "./Searchbar.js";

export default class Main extends Component {
  render() {
    return (
      <>
        <main>
          <Searchbar
            data={this.props.data}
            handleFormSubmit={this.props.handleFormSubmit}
            handleSort={this.props.handleSort}
            handleSearch={this.props.handleSearch}
            inputVal={this.props.inputVal}
            pokemonName={this.props.pokemonName}
          />
          <Pagination
            activePage={this.props.activePage}
            itemsCountPerPage={50}
            totalItemsCount={801}
            pageRangeDisplayed={5}
            onChange={this.props.handlePageChange}
            firstPageText="first"
            lastPageText="last"
            prevPageText="prev"
            nextPageText="next"
          />
          <PokeList
            data={this.props.data}
            loading={this.props.loading}
            sortDirection={this.props.sortDirection}
            sortType={this.props.sortType}
            inputVal={this.props.inputVal}
            handlePokemonClick={this.props.handlePokemonClick}
          />
        </main>
      </>
    );
  }
}
