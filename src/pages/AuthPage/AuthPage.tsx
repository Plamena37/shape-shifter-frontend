import authImage from "../../assets/img/auth.jpg";
import "../../assets/global.scss";

type Props = {
  component: React.ComponentType;
};
const AuthPage = ({ component: Component }: Props) => {
  return (
    <section className="overlay">
      <div className="overlay__section">
        <div className="overlay__image__wrapper">
          <img className="overlay__img" alt="Hot air baloon" src={authImage} />
        </div>
        <Component />
      </div>
    </section>
  );
};

export default AuthPage;
