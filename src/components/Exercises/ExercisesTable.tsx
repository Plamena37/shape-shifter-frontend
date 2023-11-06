import { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { v4 as uuid } from "uuid";
import { useAppDispatch, useAppSelector } from "../../app/store";
import ExercisesItem from "./ExercisesItem";
import { getAllExercises } from "../../features/exercises/exercisesSlice";
import { LoadingSpinner, PaginationActions } from "..";
import {
  selectExercises,
  selectExercisesIsLoading,
} from "../../features/exercises/exercisesSelectors";
import { calcEmptyRows } from "../../utils/functions";
import { Exercise } from "../../utils/interfaces";
import "./ExercisesTable.scss";

const exerciseCellData: {
  title: string;
}[] = [
  {
    title: "Exercise",
  },
  { title: "Series" },
  { title: "Repetitions" },
  { title: "Weight (kg)" },
  { title: "Time (hh/mm)" },
  { title: "Distance (km)" },
];

const ExercisesTable = () => {
  const dispatch = useAppDispatch();
  const allExercises = useAppSelector(selectExercises);
  const isLoading = useAppSelector(selectExercisesIsLoading);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(getAllExercises());
  }, []);

  const emptyRows = calcEmptyRows(page, rowsPerPage, allExercises!.length);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="exercises__container">
      {allExercises!.length > 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {exerciseCellData.map((el) => (
                  <TableCell key={uuid()} className="table__head">
                    {el.title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    sx={{
                      padding: "5.5rem",
                    }}
                    align="center"
                  >
                    <LoadingSpinner />
                  </TableCell>
                </TableRow>
              ) : (
                (rowsPerPage > 0
                  ? allExercises!.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : allExercises!
                ).map((exercise: Exercise) => (
                  <ExercisesItem key={exercise._id} exercise={exercise} />
                ))
              )}

              {!isLoading && emptyRows > 0 && (
                <TableRow style={{ height: 52.5 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>

            <TableFooter className="table__footer">
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5]}
                  colSpan={8}
                  count={allExercises!.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={(_, page) => {
                    setPage(page);
                  }}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={PaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )}
      {!isLoading && allExercises!.length === 0 && (
        <p className="no__content full__width">No exercises found!</p>
      )}
    </div>
  );
};

export default ExercisesTable;
