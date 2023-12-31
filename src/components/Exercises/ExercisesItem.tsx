import { useEffect, useState } from "react";
import { TableCell, TableRow } from "@mui/material";
import { v4 as uuid } from "uuid";
import { Exercise } from "../../utils/interfaces";
import { getExerciseTypeById } from "../../features/exerciseTypes/exerciseTypesSlice";
import { useAppDispatch } from "../../app/store";

type ExerciseDataItem = {
  value: keyof Exercise;
  unit: string;
};

const exerciseData: ExerciseDataItem[] = [
  { value: "series", unit: "" },
  { value: "repetitions", unit: "" },
  { value: "weight", unit: "kg" },
  { value: "time", unit: "" },
  { value: "distance", unit: "km" },
];

type ExerciseItemProps = {
  exercise: Exercise;
};

const ExercisesItem = ({ exercise }: ExerciseItemProps) => {
  const dispatch = useAppDispatch();

  const [exerciseTypeName, setExerciseTypeName] = useState("");

  useEffect(() => {
    const getExerciseTypeName = async () => {
      try {
        const response = await dispatch(
          getExerciseTypeById(exercise.exerciseType)
        );

        setExerciseTypeName(response.payload.name);
      } catch (error) {
        console.error("Failed to fetch exercise type name:", error);
      }
    };

    getExerciseTypeName();
  }, [dispatch, exercise.exerciseType]);

  return (
    <TableRow
      key={exercise._id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell align="left">{exerciseTypeName}</TableCell>

      {exerciseData.map((el) => (
        <TableCell key={uuid()} align="center">
          {exercise[el.value] == 0 ? "-" : `${exercise[el.value]}${el.unit}`}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default ExercisesItem;
