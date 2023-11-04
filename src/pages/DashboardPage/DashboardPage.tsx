import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { DashboardTable } from "../../components";
import { getUserById } from "../../features/userSlice";
import { RootState, useAppDispatch } from "../../app/store";
import { User } from "../../utils/common-interfaces";
import { getCurrentUserIdAndEmail } from "../../utils/common-functions";
import { ROLE, ROUTES } from "../../utils/common-enums";
import measurementsImg from "../../assets/img/measurements.png";
import exerciseTypesImg from "../../assets/img/exerciseType.png";
import exercisesImg from "../../assets/img/exercise.png";
import chartImg from "../../assets/img/chart.png";
import workoutImg from "../../assets/img/workout.png";
import "./DashboardPage.scss";

const DashboardPage = () => {
  const dispatch = useAppDispatch();

  const [userInfo, setUserInfo] = useState({
    email: "",
    id: "",
  });

  useEffect(() => {
    const res = getCurrentUserIdAndEmail();

    setUserInfo({
      email: res!.email,
      id: res!.id,
    });
  }, []);

  const user: User | undefined = useSelector(
    (state: RootState) => state.user.user
  );

  useEffect(() => {
    if (userInfo.id) {
      dispatch(getUserById(userInfo.id));
    }
  }, [userInfo]);

  return (
    <section className="dashboard__layout">
      {user.role === ROLE.ADMIN && <DashboardTable />}

      <div className="dashboard common">
        <figure className="dashboard__shape">
          <img src={measurementsImg} alt="Measurement image" />
          <figcaption className="dashboard__caption">
            <Link className="dashboard__caption--link" to={ROUTES.MEASUREMENTS}>
              Measurements
            </Link>
          </figcaption>
        </figure>
      </div>

      <div className="dashboard common">
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

      <div className="dashboard common">
        <figure className="dashboard__shape">
          <img src={exercisesImg} alt="Exercise image" />
          <figcaption className="dashboard__caption">
            <Link className="dashboard__caption--link" to={ROUTES.EXERCISES}>
              Exercises
            </Link>
          </figcaption>
        </figure>
      </div>

      <div className="dashboard common">
        <figure className="dashboard__shape">
          <img src={chartImg} alt="Measurements Chart image" />
          <figcaption className="dashboard__caption">
            <Link className="dashboard__caption--link" to={ROUTES.MEASUREMENTS}>
              Track your progress
            </Link>
          </figcaption>
        </figure>
      </div>

      <div className="dashboard common">
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

export default DashboardPage;
