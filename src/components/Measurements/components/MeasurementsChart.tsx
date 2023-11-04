import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Measurement } from "../../../utils/interfaces";
import "../MeasurementsTable.scss";

type MeasurementsChartProps = {
  measurements: Measurement[];
  startDate: Date | string;
  endDate: Date | string;
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "MEASUREMENTS 🎉",
    },
  },
};

const MeasurementsChart: React.FC<MeasurementsChartProps> = ({
  measurements,
  startDate,
  endDate,
}) => {
  const filteredMeasurements = measurements.filter((measurement) => {
    const measurementDate = new Date(measurement.date!);
    const lastDate = endDate ? endDate : startDate;

    return (
      measurementDate >= new Date(startDate) &&
      measurementDate <= new Date(lastDate)
    );
  });

  const labels = filteredMeasurements.map((measurement) => measurement.date);

  const weightData = filteredMeasurements.map(
    (measurement) => measurement.weight
  );

  const chestData = filteredMeasurements.map(
    (measurement) => measurement.chest
  );

  const waistData = filteredMeasurements.map(
    (measurement) => measurement.waist
  );

  const hipsData = filteredMeasurements.map((measurement) => measurement.hips);

  const bicepsData = filteredMeasurements.map(
    (measurement) => measurement.biceps
  );

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Weight",
        data: weightData,
        backgroundColor: "rgba(0, 148, 141, 0.3)",
        borderColor: "rgba(0, 148, 141, 1)",
        borderWidth: 1,
      },
      {
        label: "Chest",
        data: chestData,
        backgroundColor: "rgba(0, 140, 206, 0.2)",
        borderColor: "rgba(0, 140, 206, 1)",
        borderWidth: 1,
      },
      {
        label: "Waist",
        data: waistData,
        backgroundColor: "rgba(119, 129, 80, 0.2)",
        borderColor: "rgba(119, 129, 80, 1)",
        borderWidth: 1,
      },
      {
        label: "Hips",
        data: hipsData,
        backgroundColor: "rgba(255, 86, 86, 0.2)",
        borderColor: "rgba(255, 86, 86, 1)",
        borderWidth: 1,
      },
      {
        label: "Biceps",
        data: bicepsData,
        backgroundColor: "rgba(85, 197, 122, 0.2)",
        borderColor: "rgba(85, 197, 122, 1)",
        borderWidth: 1,
      },
    ],
  };

  return filteredMeasurements.length === 0 ? (
    <div className="no__content measurements">No measurement data</div>
  ) : (
    <Bar data={data} options={options} />
  );
};

export default MeasurementsChart;
