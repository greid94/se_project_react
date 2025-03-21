import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({ onCardClick, clothingItems, handleAddButtonClick }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__content">
        <p className="clothes-section__text">Your items</p>
        <button
          className="clothes-section__button"
          onClick={handleAddButtonClick}
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems?.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
