import { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";

import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weather.api";
import { coordinates, APIkey } from "../../utils/constants";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit";
import AddItemModal from "../AddItemModal/AddItemModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });

  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleAddButtonClick = () => {
    setActiveModal("add-garment");
  };
  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    setClothingItems((prevItems) => [
      { name, imageUrl, weather },
      ...prevItems,
    ]);
    closeActiveModal();
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
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header
            handleAddButtonClick={handleAddButtonClick}
            weatherData={weatherData}
          />
          <Main
            weatherData={weatherData}
            handleCardClick={handleCardClick}
            clothingItems={clothingItems}
          />
          <Footer />
        </div>
        <AddItemModal
          activeModal={activeModal}
          onClose={closeActiveModal}
          isOpen={activeModal === "add-garment"}
          onhandleAddItemModalSubmit={handleAddItemModalSubmit}
        ></AddItemModal>

        <ItemModal
          card={selectedCard}
          activeModal={activeModal}
          onClose={closeActiveModal}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
