import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/enums";
import measurementsImg from "../../assets/img/measurements.png";
import exerciseTypesImg from "../../assets/img/exerciseType.png";
import exercisesImg from "../../assets/img/exercise.png";
import chartImg from "../../assets/img/chart.png";
import workoutImg from "../../assets/img/workout.png";

const HomePage = () => {
  return (
    <section className="dashboard__layout">
      <div className="dashboard common box">
        <figure className="dashboard__shape">
          <img src={measurementsImg} alt="Measurement image" />
          <figcaption className="dashboard__caption">
            <Link className="dashboard__caption--link" to={ROUTES.MEASUREMENTS}>
              Measurements
            </Link>
          </figcaption>
        </figure>
      </div>

      <div className="dashboard common box">
        <figure className="dashboard__shape">
          <img src={exerciseTypesImg} alt="Exercise Types image" />
          <figcaption className="dashboard__caption">
            <Link
              className="dashboard__caption--link"
              to={ROUTES.EXERCISE_TYPES}
            >
              Exercise Types
            </Link>
          </figcaption>
        </figure>
      </div>

      <div className="dashboard common box">
        <figure className="dashboard__shape">
          <img src={exercisesImg} alt="Exercise image" />
          <figcaption className="dashboard__caption">
            <Link className="dashboard__caption--link" to={ROUTES.EXERCISES}>
              Exercises
            </Link>
          </figcaption>
        </figure>
      </div>

      <div className="dashboard common box">
        <figure className="dashboard__shape">
          <img src={chartImg} alt="Measurements Chart image" />
          <figcaption className="dashboard__caption">
            <Link className="dashboard__caption--link" to={ROUTES.MEASUREMENTS}>
              Track your progress
            </Link>
          </figcaption>
        </figure>
      </div>

      <div className="dashboard common box">
        <figure className="dashboard__shape">
          <img src={workoutImg} alt="Workouts image" />
          <figcaption className="dashboard__caption">
            <Link className="dashboard__caption--link" to={ROUTES.WORKOUTS}>
              Workouts
            </Link>
          </figcaption>
        </figure>
      </div>
    </section>
  );
};

export default HomePage;
