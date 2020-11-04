import React, { Component } from "react";
import Sort from "./Sort.js";

export default class Searchbar extends Component {
  render() {
    return (
      <section className="searchbar">
        <form onSubmit={this.props.handleFormSubmit}>
          <input
            placeholder=" search Pokemon by name..."
            className="searchbar-input"
            onChange={this.props.handleSearch}
          />
          <button className="submit-button"> go </button>
        </form>
        <Sort
          data={this.props.data}
          handleCategorySelect={this.props.handleCategorySelect}
          handleSortDirection={this.props.handleSortDirection}
        />
      </section>
    );
  }
}
