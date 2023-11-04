import { useEffect, useState } from "react";
import {
  Button,
  MeasurementsForm,
  MeasurementsTable,
  TextField,
} from "../../components";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { RootState, useAppDispatch } from "../../app/store";
import { getAllMeasurements } from "../../features/measurementSlice";
import MeasurementsChart from "../../components/Measurements/components/MeasurementsChart";
import "../../assets/global.scss";
import "../../components/Measurements/MeasurementsTable.scss";

const MeasurementsPage = () => {
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState({
    startDate: "",
    endDate: "",
  });

  const measurements = useSelector(
    (state: RootState) => state.measurement.measurements
  );

  const today = format(new Date(), "yyyy-MM-dd");

  useEffect(() => {
    dispatch(getAllMeasurements());
  }, []);

  useEffect(() => {
    measurements.length > 0 &&
      setDate({
        startDate: String(measurements[0].date),
        endDate: String(measurements[measurements.length - 1].date),
      });
  }, [measurements]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setDate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleReset = () => {
    setDate({
      startDate: String(measurements[0].date),
      endDate: String(measurements[measurements.length - 1].date),
    });
  };

  const toggleDialog = () => {
    setOpen(!open);
  };

  return (
    <>
      <section className="wrapper  overlay__measurements">
        <nav className="wrapper__nav measurements">
          <h2>My measurements</h2>
          <Button
            btnStyle="action__btn"
            onClick={toggleDialog}
            btnVariant="outlined"
          >
            New measurement
          </Button>
        </nav>
        <MeasurementsTable />

        <section className="overlay__measurements__chart">
          <div className="chart">
            <form onSubmit={handleSubmit} className="chart__form">
              <TextField
                id="startDate"
                name="startDate"
                label="Start date"
                type="date"
                onChange={(event) => handleChange(event)}
                value={date.startDate as string}
                InputLabelProps={{ shrink: true }}
                inputProps={{ max: today }}
                required={false}
              />
              <TextField
                id="endDate"
                name="endDate"
                label="End date"
                type="date"
                onChange={(event) => handleChange(event)}
                value={date.endDate as string}
                InputLabelProps={{ shrink: true }}
                inputProps={{ max: today }}
                required={false}
              />
              <Button btnType="submit" btnVariant="text" onClick={handleReset}>
                Clear
              </Button>
            </form>

            <MeasurementsChart
              measurements={measurements}
              startDate={date.startDate as string}
              endDate={date.endDate as string}
            />
          </div>
          <nav className="wrapper__nav measurements">
            <h2>Track your measurements</h2>
          </nav>
        </section>
      </section>

      {open && (
        <MeasurementsForm
          open={open}
          toggleDialog={toggleDialog}
          title="Add measurement"
          actionType="create"
        />
      )}
    </>
  );
};

export default MeasurementsPage;
