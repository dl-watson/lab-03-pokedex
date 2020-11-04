import React, { Component } from "react";
import Pagination from "react-js-pagination";
import PokeList from "./PokeList.js";
import Searchbar from "./Searchbar.js";

export default class Main extends Component {
  render() {
    const validatePagination = (props) => {
      // pagination isn't currently set up to work correctly when the user makes a search
      if (props.length > 0) {
        return <div></div>;
      } else if (props === "") {
        return (
          <div>
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
          </div>
        );
      }
    };
    return (
      <>
        <main>
          <Searchbar
            data={this.props.data}
            handleFormSubmit={this.props.handleFormSubmit}
            handleCategorySelect={this.props.handleCategorySelect}
            handleSortDirection={this.props.handleSortDirection}
            handleSearch={this.props.handleSearch}
            inputVal={this.props.inputVal}
            pokemonName={this.props.pokemonName}
          />
          <div>{validatePagination(this.props.inputVal)}</div>
          <PokeList
            data={this.props.data}
            loading={this.props.loading}
            selectedCategory={this.props.selectedCategory}
            selectedSortDirection={this.props.selectedSortDirection}
            inputVal={this.props.inputVal}
            handlePokemonClick={this.props.handlePokemonClick}
          />
        </main>
      </>
    );
  }
}
