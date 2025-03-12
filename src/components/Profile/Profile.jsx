import ClothesSection from "../ClothesSection/ClothesSection";
import Sidebar from "../Sidebar/Sidebar";
import "./Profile.css";

function Profile({ onCardClick }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <Sidebar />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection onCardClick={onCardClick} />
      </section>
    </div>
  );
}
export default Profile;
