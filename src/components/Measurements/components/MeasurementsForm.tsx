import { useState } from "react";
import { Box, DialogActions, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { format } from "date-fns";
import { Dialog } from "../..";
import { EditMeasurement, Measurement } from "../../../utils/interfaces";
import { useAppDispatch } from "../../../app/store";
import {
  createMeasurement,
  getAllMeasurements,
  updateMeasurementById,
} from "../../../features/measurementSlice";
import { pushErrorsInArray, validations } from "../../../utils/auth.validation";
import { Button, TextField } from "../../shared";
import "../MeasurementsTable.scss";

type MeasurementsFormProps = {
  open: boolean;
  toggleDialog: () => void;
  title: string;
  actionType: "create" | "edit";
  measurementData?: Measurement;
};

const MeasurementsForm = ({
  open,
  toggleDialog,
  title,
  actionType,
  measurementData,
}: MeasurementsFormProps) => {
  const dispatch = useAppDispatch();

  const [createMeasurementData, setCreateMeasurementData] =
    useState<Measurement>({
      photoUrl: "",
      weight: 0,
      chest: 0,
      waist: 0,
      hips: 0,
      biceps: 0,
      date: "",
    });

  const [editMeasurementData, setEditMeasurementData] = useState({
    ...measurementData,
  });

  const [fieldErrors, setFieldErrors] = useState({
    photoUrl: false,
    weight: false,
    chest: false,
    waist: false,
    hips: false,
    biceps: false,
    date: false,
  });

  const measurement =
    actionType === "create" ? createMeasurementData : editMeasurementData;

  const today = format(new Date(), "yyyy-MM-dd");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    const numericValue = parseInt(value, 10);

    if (actionType === "create") {
      setCreateMeasurementData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else if (actionType === "edit") {
      setEditMeasurementData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    switch (name) {
      case "weight":
      case "chest":
        setFieldErrors({
          ...fieldErrors,
          [name]: numericValue < 30 || numericValue > 250,
        });
        break;
      case "waist":
      case "hips":
        setFieldErrors({
          ...fieldErrors,
          [name]: numericValue < 30 || numericValue > 200,
        });
        break;
      case "biceps":
        setFieldErrors({
          ...fieldErrors,
          [name]: numericValue < 10 || numericValue > 100,
        });
        break;
      case "photoUrl":
      case "date":
        setFieldErrors({
          ...fieldErrors,
          [name]: value === "",
        });
        break;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("file", measurement.photoUrl ?? "");
      formData.append("upload_preset", "zxwmtg6q");

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dnsgqua2p/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl = response.data.secure_url;

      const updatedMeasurementData: EditMeasurement | any = {
        ...measurement,
        photoUrl: (imageUrl as string) || "",
      };

      if (actionType === "create") {
        await dispatch(createMeasurement(updatedMeasurementData)).unwrap();
      } else if (actionType === "edit") {
        await dispatch(
          updateMeasurementById({
            measurementId: measurement._id ?? "",
            measurementData: updatedMeasurementData,
          })
        ).unwrap();
      }

      enqueueSnackbar("Success!", {
        preventDuplicate: true,
        variant: "success",
      });

      toggleDialog();
      dispatch(getAllMeasurements());
    } catch (error: Error | any) {
      enqueueSnackbar(`${error.message}`, {
        preventDuplicate: true,
        variant: "error",
        autoHideDuration: 10000,
        action: (key) => (
          <IconButton color="inherit" onClick={() => closeSnackbar(key)}>
            <CloseIcon />
          </IconButton>
        ),
      });
    }
  };

  return (
    <Dialog open={open} toggleDialog={toggleDialog} title={title}>
      <form onSubmit={handleSubmit} className="measurement__form">
        <TextField
          id="photoUrl"
          name="photoUrl"
          label="Photo Url"
          onChange={(event) => handleChange(event)}
          value={measurement.photoUrl}
          error={fieldErrors.photoUrl}
          helperText={fieldErrors.photoUrl && validations.photoUrl}
        />

        <TextField
          id="weight"
          name="weight"
          label="Weight (kg)"
          onChange={(event) => handleChange(event)}
          value={measurement.weight}
          error={fieldErrors.weight}
          helperText={fieldErrors.weight && validations.thirtyTo250}
        />

        <TextField
          id="chest"
          name="chest"
          label="Chest (cm)"
          type="chest"
          onChange={(event) => handleChange(event)}
          value={measurement.chest}
          error={fieldErrors.chest}
          helperText={fieldErrors.chest && validations.thirtyTo250}
        />

        <TextField
          id="waist"
          name="waist"
          label="Waist (cm)"
          onChange={(event) => handleChange(event)}
          value={measurement.waist}
          error={fieldErrors.waist}
          helperText={fieldErrors.waist && validations.thirtyTo200}
        />

        <TextField
          id="hips"
          name="hips"
          label="Hips (cm)"
          type="hips"
          onChange={(event) => handleChange(event)}
          value={measurement.hips}
          error={fieldErrors.hips}
          helperText={fieldErrors.hips && validations.thirtyTo200}
        />

        <TextField
          id="biceps"
          name="biceps"
          label="Biceps (cm)"
          type="biceps"
          onChange={(event) => handleChange(event)}
          value={measurement.biceps}
          error={fieldErrors.biceps}
          helperText={fieldErrors.biceps && validations.tenTo100}
        />

        <TextField
          id="date"
          name="date"
          label="Date"
          type="date"
          onChange={(event) => handleChange(event)}
          value={measurement.date}
          inputProps={{ max: today }}
          InputLabelProps={{ shrink: true }}
          error={fieldErrors.date}
          helperText={fieldErrors.date && validations.date}
        />

        <Box
          sx={{
            marginInline: "auto",
          }}
        >
          <DialogActions>
            <Button onClick={toggleDialog}>Cancel</Button>
            <Button
              btnDisabled={pushErrorsInArray(fieldErrors)}
              btnType="submit"
            >
              Save
            </Button>
          </DialogActions>
        </Box>
      </form>
    </Dialog>
  );
};

export default MeasurementsForm;
