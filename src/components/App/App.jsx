import { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weather.api";
import { coordinates, APIkey } from "../../utils/constants";
import Footer from "../Footer/Footer";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddButtonClick = () => {
    setActiveModal("add-garment");
  };
  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filterData = filterWeatherData(data);

        setWeatherData(filterData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header
          handleAddButtonClick={handleAddButtonClick}
          weatherData={weatherData}
        />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
        <Footer />
      </div>
      <ModalWithForm
        title="New Garment"
        buttonText="Add garment"
        activeModal={activeModal}
        onClose={closeActiveModal}
        isOpen={activeModal === "add-garment"}
      >
        <label htmlFor="name" className="modal__label">
          Name
          <input
            type="text"
            className="modal__input"
            id="name"
            name="name"
            required
            minLength="1"
            maxLength="30"
            placeholder="Name"
          />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image
          {""}
          <input
            type="url"
            className="modal__input"
            id="imageUrl"
            name="name"
            required
            minLength="1"
            maxLength="30"
            placeholder="Image Url"
          />
        </label>
        <fieldset className="modal__radio-btns">
          <legend className="modal__legend">Select the weather type</legend>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input
              id="hot"
              type="radio"
              name="temp"
              className="modal__radio-input"
            />
            Hot
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input
              id="warm"
              type="radio"
              name="temp"
              className="modal__radio-input"
            />
            Warm
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input
              id="cold"
              name="temp"
              type="radio"
              className="modal__radio-input"
            />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        card={selectedCard}
        activeModal={activeModal}
        onClose={closeActiveModal}
      />
    </div>
  );
}

export default App;
