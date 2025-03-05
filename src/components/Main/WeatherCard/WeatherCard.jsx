import { useContext } from "react";
import sunny from "../../../assets/sunny.png";
import "./WeatherCard.css";
import CurrentTemperatureUnitContext from "../../../contexts/CurrentTemperatureUnit";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {" "}
        {weatherData.temp[currentTemperatureUnit]} &deg;
        {currentTemperatureUnit}
      </p>
      <img src={sunny} alt="sunny" className="weather-card__image" />
    </section>
  );
}
export default WeatherCard;
