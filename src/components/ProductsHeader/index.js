import { BsFilterRight } from "react-icons/bs";

import "./index.css";

const ProductsHeader = (props) => {
  const onChangeSortby = (event) => {
    const { changeSortby } = props;
    changeSortby(event.target.value);
  };

  const { sortbyOptions, activeOptionId, Searchinputfunction, SearchInput } =
    props;
  const OnSearchinputfunction = (event) => {
    Searchinputfunction(event.target.value, event.key);
    // console.log(event.key)
  };

  const searchBar = () => (
    <div>
      {/* <label htmlFor="textInput">Enter Text: </label> */}
      <input
        type="text"
        id="textInput"
        value={SearchInput}
        onChange={OnSearchinputfunction}
        onKeyDown={OnSearchinputfunction}
      />
    </div>
  );

  return (
    <div className="products-header">
      <div className="searchbarDiv">{searchBar()}</div>
      <h1 className="products-list-heading">All Products</h1>
      <div className="sort-by-container">
        <BsFilterRight className="sort-by-icon" />
        <p className="sort-by">Sort by</p>
        <select
          className="sort-by-select"
          value={activeOptionId}
          onChange={onChangeSortby}
        >
          {sortbyOptions.map((eachOption) => (
            <option
              key={eachOption.optionId}
              value={eachOption.optionId}
              className="select-option"
            >
              {eachOption.displayText}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ProductsHeader;
