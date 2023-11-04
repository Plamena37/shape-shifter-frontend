import { DialogActions } from "@mui/material";
import { v4 as uuid } from "uuid";
import { Button, CloudinaryImage } from "../UI";
import { Dialog } from "..";
import { Measurement } from "../../utils/common-interfaces";

const viewMeasurementData: {
  title: string;
  value: string;
  metric: string;
}[] = [
  {
    title: "Weight: ",
    value: "weight",
    metric: "kg",
  },
  {
    title: "Chest: ",
    value: "chest",
    metric: "cm",
  },
  {
    title: "Waist: ",
    value: "waist",
    metric: "cm",
  },
  {
    title: "Hips: ",
    value: "hips",
    metric: "cm",
  },
  {
    title: "Biceps: ",
    value: "biceps",
    metric: "cm",
  },
];

type ViewMeasurementProps = {
  open: boolean;
  measurement: Measurement;
  toggleDialog: () => void;
};

const ViewMeasurement = ({
  open,
  measurement,
  toggleDialog,
}: ViewMeasurementProps) => {
  const url = measurement.photoUrl;
  const cloudinaryPath = url?.split("/upload/")[1];

  return (
    <Dialog
      open={open}
      toggleDialog={toggleDialog}
      title="Check your measurement 🎉"
    >
      <div className="measurement__view">
        <div className="measurement__view__img__wrapper">
          <CloudinaryImage img={cloudinaryPath ?? ""} />
        </div>
        <div className="measurement__view--grid">
          {viewMeasurementData.map((el) => (
            <p key={uuid()}>
              <span>{el.title}</span>
              {measurement[el.value]} {el.metric}
            </p>
          ))}
          <p>
            <span>Date: </span>
            {measurement.date}
          </p>
        </div>
      </div>
      <DialogActions>
        <Button onClick={toggleDialog}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewMeasurement;
