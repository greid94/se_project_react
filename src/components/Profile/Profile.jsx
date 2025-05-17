import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({
  // This component is responsible for rendering the user's profile page
  handleCardClick,
  clothingItems,
  handleAddClick,
  onLogout,
  onEditProfile,
  handleCardLike,
}) {
  return (
    // This is the main profile component that contains the sidebar and clothing items section
    // The sidebar contains the user's profile information and the clothing items section displays the user's clothing items
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar onLogout={onLogout} onEditProfile={onEditProfile} />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          clothingItems={clothingItems}
          handleCardClick={handleCardClick}
          handleAddClick={handleAddClick}
          handleCardLike={handleCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
