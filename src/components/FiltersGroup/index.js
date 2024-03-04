import "./index.css";

const FiltersGroup = (props) => {
  const catogorieslist = () => {
    const { categoryOptions } = props;

    return categoryOptions.map((eachCatogory) => {
      const { activeCatogery, clickedCatogery } = props;

      const onclickedCatogery = () => {
        console.log("category internal hit");
        clickedCatogery(eachCatogory.categoryId);
      };

      const isActive = eachCatogory.categoryId === activeCatogery;

      const CatogeryClassName = isActive ? `blue button` : `button`;

      return (
        <ul key={eachCatogory.categoryId}>
          <li id="dotremoval">
            <p className={CatogeryClassName} onClick={onclickedCatogery}>
              {eachCatogory.name}
            </p>
          </li>
        </ul>
      );
    });
  };

  const RatingsList = () => {
    const { ratingsList } = props;
    return ratingsList.map((eachRating) => {
      const { Ratingssssss } = props;

      const onclickRating = () => {
        console.log("rating internal hit");
        Ratingssssss(eachRating.ratingId);
      };

      //   const isratingActive = ActiveRating === eachRating

      //   const ratingclassname = isratingActive ? `blue normal` : 'normal'
      return (
        <ul className="ratinglist" key={eachRating.ratingId}>
          <li onClick={onclickRating} className="ratingListItem">
            <img
              className="ratingimg"
              src={eachRating.imageUrl}
              alt="ratingimg"
            />
            {/* <p onClick={onclickRating}>&up</p> */}
          </li>
        </ul>
      );
    });
  };

  return (
    <div className="filters-group-container">
      <h1>Catogery</h1>
      {catogorieslist()}
      <h1>Ratings</h1>
      {RatingsList()}
    </div>
  );
};

export default FiltersGroup;
