import { useEffect, useRef, useState } from "react";
import { AccordionDetails, TablePagination } from "@mui/material";
import {
  clearFilteredExerciseTypes,
  filterExerciseTypes,
  getAllExerciseTypes,
} from "../../features/exerciseTypes/exerciseTypeSlice";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { Button, ExerciseTypeItem, PaginationActions, TextField } from "..";
import "./ExerciseTypesAccordion.scss";
import {
  selectExerciseTypes,
  selectFilteredExerciseType,
} from "../../features/exerciseTypes/exerciseTypesSelectors";

const ExerciseTypesAccordion = () => {
  const dispatch = useAppDispatch();
  const allExerciseTypes = useAppSelector(selectExerciseTypes);
  const filteredExerciseTypes = useAppSelector(selectFilteredExerciseType);

  const filterNameRef = useRef<HTMLInputElement | null>(null);
  const filterMuscleRef = useRef<HTMLInputElement | null>(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(getAllExerciseTypes());
  }, []);

  let nameRefValue = filterNameRef.current?.value;
  let muscleRefValue = filterMuscleRef.current?.value;

  const filterCheck = nameRefValue || muscleRefValue;

  let emptyRows =
    page > 0
      ? Math.max(
          0,
          (1 + page) * rowsPerPage -
            (filterCheck
              ? filteredExerciseTypes.length
              : allExerciseTypes!.length)
        )
      : 0;

  if (page === 0 && filteredExerciseTypes.length < rowsPerPage) {
    emptyRows = Math.max(
      0,
      (1 + page) * rowsPerPage -
        (filterCheck ? filteredExerciseTypes.length : allExerciseTypes!.length)
    );
  }

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const displayedExerciseTypes = filterCheck
    ? filteredExerciseTypes.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      )
    : allExerciseTypes!.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    nameRefValue = filterNameRef.current?.value;
    muscleRefValue = filterMuscleRef.current?.value;

    if (filterNameRef.current?.value || filterMuscleRef.current?.value) {
      const filterCriteria = {
        name: nameRefValue ? filterNameRef.current?.value || "" : "",
        muscleGroups: muscleRefValue
          ? [filterMuscleRef.current?.value || ""]
          : [],
      };

      setPage(0);
      dispatch(filterExerciseTypes(filterCriteria));
    }
  };

  const handleReset = () => {
    setPage(0);
    dispatch(getAllExerciseTypes());
    dispatch(clearFilteredExerciseTypes());

    filterNameRef.current && (filterNameRef.current.value = "");
    filterMuscleRef.current && (filterMuscleRef.current.value = "");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="filter form">
        <div className="filter__wrapper">
          <TextField
            id="filterName"
            name="filterName"
            label="Search by name"
            inputRef={filterNameRef}
            required={false}
            className="filter__textfields"
          />

          <TextField
            id="filterMuscle"
            name="filterMuscle"
            label="Search by muscle"
            inputRef={filterMuscleRef}
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

      {displayedExerciseTypes.length > 0 &&
        displayedExerciseTypes.map((el) => (
          <ExerciseTypeItem key={el._id} exerciseType={el} />
        ))}

      {displayedExerciseTypes.length > 0 && emptyRows > 0 && (
        <AccordionDetails
          sx={{
            backgroundColor: "#f5f5f5",
          }}
          style={{ height: 49 * emptyRows }}
        ></AccordionDetails>
      )}

      {displayedExerciseTypes.length === 0 && (
        <p className="no__content">No exercise types found!</p>
      )}

      <TablePagination
        rowsPerPageOptions={[5, 8]}
        component="div"
        count={
          filterCheck ? filteredExerciseTypes.length : allExerciseTypes!.length
        }
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={PaginationActions}
        sx={{
          backgroundColor: "#f5f5f5",
        }}
      />
    </div>
  );
};

export default ExerciseTypesAccordion;
