import "./ItemModal.css";

function ItemModal({ activeModal, onClose, card, onDelete }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} className="modal__close" type="button" />
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">
            {card.name}
            <button
              className="modal__delete"
              onClick={() => onDelete(card._id)}
            >
              Delete Item
            </button>
          </h2>
          <p className="modal__weather">Weather: {card.weather}</p>{" "}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
