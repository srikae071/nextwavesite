import { Component } from "react";

import * as Loader from "react-loader-spinner";
import Cookies from "js-cookie";

import FiltersGroup from "../FiltersGroup";
import ProductCard from "../ProductCard";
import ProductsHeader from "../ProductsHeader";

import "./index.css";

const categoryOptions = [
  {
    name: "Clothing",
    categoryId: "1",
  },
  {
    name: "Electronics",
    categoryId: "2",
  },
  {
    name: "Appliances",
    categoryId: "3",
  },
  {
    name: "Grocery",
    categoryId: "4",
  },
  {
    name: "Toys",
    categoryId: "5",
  },
];

const sortbyOptions = [
  {
    optionId: "PRICE_HIGH",
    displayText: "Price (High-Low)",
  },
  {
    optionId: "PRICE_LOW",
    displayText: "Price (Low-High)",
  },
];

const ratingsList = [
  {
    ratingId: "4",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png",
  },
  {
    ratingId: "3",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png",
  },
  {
    ratingId: "2",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png",
  },
  {
    ratingId: "1",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png",
  },
];

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: false,
    activeOptionId: sortbyOptions[0].optionId,
    activeCatogery: categoryOptions[0].categoryId,
    SearchInput: "",
    ActiveRating: "",
  };

  componentDidMount() {
    this.getProducts();
  }

  getProducts = async () => {
    this.setState({
      isLoading: true,
    });
    const jwtToken = Cookies.get("jwt_token");

    // TODO: Update the code to get products with filters applied

    const { activeOptionId, activeCatogery, SearchInput, ActiveRating } =
      this.state;
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${activeCatogery}&title_search=${SearchInput}&rating=${ActiveRating}`;

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };
    const response = await fetch(apiUrl, options);
    if (response.ok) {
      const fetchedData = await response.json();
      const updatedData = fetchedData.products.map((product) => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }));
      this.setState({
        productsList: updatedData,
        isLoading: false,
      });
    }
  };

  //   getsearchinouts = () => {
  //     this.getProducts()
  //   }

  changeSortby = (activeOptionId) => {
    this.setState({ activeOptionId }, this.getProducts);
  };

  Searchinputfunction = (gotvalue, gotkey) => {
    this.setState({ SearchInput: gotvalue });
    if (gotkey === "Enter") {
      this.getProducts();
    }
  };

  renderProductsList = () => {
    const { productsList, activeOptionId, SearchInput } = this.state;

    // TODO: Add No Products View
    return (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
          SearchInput={SearchInput}
          Searchinputfunction={this.Searchinputfunction}
        />
        <ul className="products-list">
          {productsList.map((product) => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    );
  };

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader.Bars type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  );

  clickedCatogery = (gotvalue) => {
    this.setState(
      { activeCatogery: gotvalue, SearchInput: "" },
      this.getProducts
    );
    console.log("all products called");
  };

  // TODO: Add failure view

  clickRating = (gotrating) => {
    this.setState(
      { ActiveRating: gotrating, SearchInput: "" },
      this.getProducts
    );
    console.log("all products called");
  };

  render() {
    const { isLoading, activeCatogery, ActiveRating } = this.state;

    return (
      <div className="all-products-section">
        {/* TODO: Update the below element */}
        <FiltersGroup
          categoryOptions={categoryOptions}
          activeCatogery={activeCatogery}
          clickedCatogery={this.clickedCatogery}
          ratingsList={ratingsList}
          ActiveRating={ActiveRating}
          clickRating={this.clickRating}
        />

        {isLoading ? this.renderLoader() : this.renderProductsList()}
      </div>
    );
  }
}

export default AllProductsSection;
