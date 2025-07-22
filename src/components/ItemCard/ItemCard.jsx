import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import likeButton from "../../assets/like_button.svg";
import likeButtonActive from "../../assets/like_button_liked.svg";

function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);

  const isLoggedIn = Boolean(currentUser);

  const isLiked =
    isLoggedIn &&
    Array.isArray(item.likes ?? []) &&
    (item.likes ?? []).some((id) => id === currentUser._id);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLikeClick = () => {
    onCardLike(item._id, isLiked);
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      {isLoggedIn && (
        <button
          className={`card__like-button ${
            isLiked ? "card__like-button_active" : ""
          }`}
          onClick={handleLikeClick}
          type="button"
        >
          <img
            src={isLiked ? likeButtonActive : likeButton}
            alt={isLiked ? "unlike" : "like"}
          />
        </button>
      )}
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
