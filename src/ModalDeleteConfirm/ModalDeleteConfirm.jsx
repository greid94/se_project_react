import "./ModalDeleteConfirm.css";

function ModalDeleteConfirm({ isOpen, onClose, onSubmit }) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">Are you sure?</h2>
        <button
          onClick={onClose}
          className="modal__close"
          type="button"
        ></button>
        <form onSubmit={onSubmit} className="modal__form">
          <button type="submit" className="modal__submit">
            Yes
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalDeleteConfirm;
