import { useState } from "react";
import { TableCell, TableRow } from "@mui/material";
import { SnackbarKey, closeSnackbar, enqueueSnackbar } from "notistack";
import { v4 as uuid } from "uuid";
import { Measurement } from "../../utils/interfaces";
import { useAppDispatch } from "../../app/store";
import { Button } from "../shared";
import { MeasurementsForm } from "..";
import { deleteMeasurement } from "../../features/measurementSlice";
import ViewMeasurement from "./ViewMeasurement";

const measurementData: {
  value: string;
}[] = [
  {
    value: "weight",
  },
  {
    value: "chest",
  },
  {
    value: "waist",
  },
  {
    value: "hips",
  },
  {
    value: "biceps",
  },
  {
    value: "date",
  },
];

type MeasurementItemProps = {
  measurement: Measurement;
};

const MeasurementsItem = ({ measurement }: MeasurementItemProps) => {
  const dispatch = useAppDispatch();

  const [openView, setOpenView] = useState(false);
  const [open, setOpen] = useState(false);

  const toggleDialogView = () => {
    setOpenView(!openView);
  };

  const toggleDialog = () => {
    setOpen(!open);
  };

  const handleDeleteMeasurement = () => {
    const action = (key: SnackbarKey) => (
      <>
        <Button
          color="secondary"
          size="small"
          btnVariant="text"
          onClick={() => {
            dispatch(deleteMeasurement(measurement._id!));
            closeSnackbar(key);
          }}
        >
          YES
        </Button>
        <Button
          color="secondary"
          size="small"
          btnVariant="text"
          onClick={() => {
            closeSnackbar(key);
          }}
        >
          NO
        </Button>
      </>
    );

    enqueueSnackbar("Proceed to delete?", {
      variant: "warning",
      preventDuplicate: true,
      persist: true,
      action,
    });
  };

  return (
    <>
      <TableRow
        key={measurement._id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        {measurementData.map((el) => (
          <TableCell key={uuid()} align="left">
            {measurement[el.value]}
          </TableCell>
        ))}

        <TableCell align="left">
          <Button
            btnStyle="dashboard change--role"
            btnVariant="outlined"
            onClick={toggleDialogView}
          >
            View
          </Button>
        </TableCell>

        <TableCell align="left">
          <Button
            btnStyle="dashboard change--role"
            btnVariant="outlined"
            onClick={toggleDialog}
          >
            Edit
          </Button>
        </TableCell>
        <TableCell align="left">
          <Button
            btnStyle="dashboard btn--delete"
            btnVariant="text"
            onClick={handleDeleteMeasurement}
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>

      {openView && (
        <ViewMeasurement
          open={openView}
          measurement={measurement}
          toggleDialog={toggleDialogView}
        />
      )}

      {open && (
        <MeasurementsForm
          open={open}
          toggleDialog={toggleDialog}
          title="Edit measurement"
          actionType="edit"
          measurementData={measurement}
        />
      )}
    </>
  );
};

export default MeasurementsItem;
