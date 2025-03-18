import { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import { defaultClothingItems } from "../../utils/constants";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weather.api";
import { coordinates, APIkey } from "../../utils/constants";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit";
import AddItemModal from "../AddItemModal/AddItemModal";
import { Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile";
import { getItems, addItem, deleteItem } from "../../utils/api";
function App() {
  const [weatherData, setWeatherData] = useState(
    {
      type: "",
      temp: { F: 999 },
      city: "",
    },
    []
  );

  const [clothingItems, setClothingItems] = useState([...defaultClothingItems]);
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

  const handleAddItemModalSubmit = (item) => {
    addItem(item)
      .then((item) => {
        console.log(item);
        setClothingItems([item, ...clothingItems]);
        closeActiveModal();
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteCard = (cardId) => {
    deleteItem(cardId)
      .then(() => {
        console.log(cardId);
        setClothingItems(([item, ...clothingItems]) =>
          [item, ...clothingItems].filter((item) => item._id !== cardId)
        );
        closeActiveModal();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filterData = filterWeatherData(data);

        setWeatherData(filterData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data), console.log(data);
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
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleAddButtonClick={handleAddButtonClick}
                />
              }
            />
          </Routes>

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
          onDelete={handleDeleteCard}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
