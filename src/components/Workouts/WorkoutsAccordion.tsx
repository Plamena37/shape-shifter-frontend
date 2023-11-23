import { useEffect, useRef, useState } from "react";
import { AccordionDetails, Box, TablePagination } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store";
import {
  getAllWorkouts,
  searchWorkouts,
} from "../../features/workouts/workoutSlice";
import WorkoutsItem from "./WorkoutsItem";
import { Button, LoadingSpinner, PaginationActions, TextField } from "..";
import {
  selectWorkouts,
  selectWorkoutsIsLoading,
} from "../../features/workouts/workoutsSelectors";

const WorkoutsAccordion = () => {
  const dispatch = useAppDispatch();
  const allWorkouts = useAppSelector(selectWorkouts);
  const isLoading = useAppSelector(selectWorkoutsIsLoading);

  const [filteredWorkouts, setFilteredWorkouts] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [isFilteredData, setIsFilteredData] = useState(false);

  useEffect(() => {
    dispatch(getAllWorkouts());
  }, []);

  const filterWorkoutDateRef = useRef<HTMLInputElement | null>(null);
  const filterExerciseTypeNameRef = useRef<HTMLInputElement | null>(null);
  const filterMuscleGroupRef = useRef<HTMLInputElement | null>(null);

  let workoutDateRefValue = filterWorkoutDateRef.current?.value;
  let exerciseTypeNameRefValue = filterExerciseTypeNameRef.current?.value;
  let muscleGroupRefValue = filterMuscleGroupRef.current?.value;

  const filterCheck =
    workoutDateRefValue || exerciseTypeNameRefValue || muscleGroupRefValue;

  let emptyRows =
    page > 0
      ? Math.max(
          0,
          (1 + page) * rowsPerPage -
            (filterCheck ? filteredWorkouts.length : allWorkouts!.length)
        )
      : 0;

  if (page === 0 && filteredWorkouts.length < rowsPerPage) {
    emptyRows = Math.max(
      0,
      (1 + page) * rowsPerPage -
        (filterCheck ? filteredWorkouts.length : allWorkouts!.length)
    );
  }

  const displayedWorkouts = filterCheck
    ? filteredWorkouts.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      )
    : allWorkouts!.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    workoutDateRefValue = filterWorkoutDateRef.current?.value;
    exerciseTypeNameRefValue = filterExerciseTypeNameRef.current?.value;
    muscleGroupRefValue = filterMuscleGroupRef.current?.value;

    if (
      filterWorkoutDateRef.current?.value ||
      filterExerciseTypeNameRef.current?.value ||
      filterMuscleGroupRef.current?.value
    ) {
      const filterCriteria = {
        date: workoutDateRefValue
          ? filterWorkoutDateRef.current?.value || ""
          : "",
        exerciseType: exerciseTypeNameRefValue
          ? filterExerciseTypeNameRef.current?.value || ""
          : "",
        muscleGroups: muscleGroupRefValue
          ? [filterMuscleGroupRef.current?.value || ""]
          : [],
      };

      if (
        filterWorkoutDateRef.current?.value ||
        filterExerciseTypeNameRef.current?.value ||
        filterMuscleGroupRef.current?.value
      ) {
        setIsFilteredData(true);
      }
      setPage(0);
      const data = await dispatch(searchWorkouts(filterCriteria));
      setFilteredWorkouts(data.payload);
    }
  };

  const handleReset = () => {
    setPage(0);
    setFilteredWorkouts([]);
    setIsFilteredData(false);
    dispatch(getAllWorkouts());

    filterWorkoutDateRef.current && (filterWorkoutDateRef.current.value = "");
    filterExerciseTypeNameRef.current &&
      (filterExerciseTypeNameRef.current.value = "");
    filterMuscleGroupRef.current && (filterMuscleGroupRef.current.value = "");
  };

  return (
    <div className="workoutsAccordion">
      <form onSubmit={handleSubmit} className="filter form">
        <div className="filter__wrapper">
          <TextField
            id="filterWorkoutDate"
            name="filterWorkoutDate"
            label="Search by date"
            type="date"
            inputRef={filterWorkoutDateRef}
            InputLabelProps={{ shrink: true }}
            required={false}
            className="filter__textfields"
          />

          <TextField
            id="filterExerciseTypeName"
            name="filterExerciseTypeName"
            label="Search by exercise"
            inputRef={filterExerciseTypeNameRef}
            InputLabelProps={{ shrink: true }}
            required={false}
            className="filter__textfields"
          />

          <TextField
            id="filterMuscleGroup"
            name="filterMuscleGroup"
            label="Search by muscle"
            inputRef={filterMuscleGroupRef}
            InputLabelProps={{ shrink: true }}
            required={false}
            className="filter__textfields"
          />
          <Button btnType="submit" btnStyle="filter__btn" btnVariant="outlined">
            Search
          </Button>
          <Button
            onClick={handleReset}
            btnStyle="filter__btn"
            btnVariant="outlined"
          >
            Clear
          </Button>
        </div>
      </form>

      {isLoading ? (
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#f5f5f5",
            padding: "7rem",
          }}
        >
          <LoadingSpinner />
        </Box>
      ) : displayedWorkouts.length > 0 ? (
        displayedWorkouts.map((workout) => (
          <WorkoutsItem
            key={workout._id}
            workout={workout}
            isFilteredData={isFilteredData}
          />
        ))
      ) : (
        displayedWorkouts.length === 0 && (
          <p className="no__content full__width">No workouts found!</p>
        )
      )}

      {!isLoading && displayedWorkouts.length > 0 && emptyRows > 0 && (
        <AccordionDetails
          sx={{
            backgroundColor: "#f5f5f5",
            paddingInlineStart: "0",
            paddingInlineEnd: "0",
          }}
          style={{ height: 49 * emptyRows }}
        ></AccordionDetails>
      )}

      <TablePagination
        sx={{
          paddingInlineStart: "0",
          paddingInlineEnd: "0",
          backgroundColor: "#f5f5f5",
        }}
        rowsPerPageOptions={[5]}
        component="div"
        count={filterCheck ? filteredWorkouts.length : allWorkouts!.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, page) => {
          setPage(page);
        }}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={PaginationActions}
      />
    </div>
  );
};

export default WorkoutsAccordion;
