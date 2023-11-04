import { Profile } from "../../components";
import "../../assets/global.scss";

const ProfilePage = () => {
  return (
    <section className="overlay--profile">
      <div className="overlay--profile__section">
        <Profile />
      </div>
    </section>
  );
};

export default ProfilePage;
