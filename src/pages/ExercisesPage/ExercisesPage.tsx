import { ExercisesTable } from "../../components";
import "../../assets/global.scss";

const ExercisesPage = () => {
  return (
    <section className="wrapper overlay">
      <nav className="wrapper__nav">
        <h2>Exercises</h2>
      </nav>
      <ExercisesTable />
    </section>
  );
};

export default ExercisesPage;
