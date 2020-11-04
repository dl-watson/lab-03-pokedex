import React, { Component } from "react";

export default class Sort extends Component {
  render() {
    return (
      <div className="sort-dropdown">
        <select
          className="updown-dropdown"
          defaultValue={this.props.sortDirection}
          onChange={this.props.handleSortDirection}
        >
          <option className="content" value="">
            sort by...
          </option>
          <option className="content" value="ascending">
            ascending (z-a)
          </option>
          <option className="content" value="descending">
            descending (a-z)
          </option>
        </select>
        <select
          className="category-dropdown"
          defaultValue={this.props.sortType}
          onChange={this.props.handleSortSelect}
        >
          <option className="content" value="">
            all categories
          </option>
          {getUniqueCategories(this.props.data).map((category, index) => (
            <option className="content" value={category} key={index}>
              {category}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

const getUniqueCategories = (data) => {
  const arr = data.map((pokemon) => pokemon.type_1);
  return Array.from(new Set(arr));
};
