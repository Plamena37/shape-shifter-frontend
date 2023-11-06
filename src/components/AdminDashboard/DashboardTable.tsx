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
import { UsersSliceActionTypePrefix } from "../../utils/enums";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { getAllUsers } from "../../features/users/userSlice";
import {
  selectUserIsLoading,
  selectUsers,
} from "../../features/users/usersSelectors";
import { DashboardItem, LoadingSpinner } from "..";
import PaginationActions from "../shared/PaginationActions";
import { calcEmptyRows } from "../../utils/functions";
import { User } from "../../utils/interfaces";
import "./Dashboard.scss";

const DashboardTable = () => {
  const dispatch = useAppDispatch();
  const allUsers = useAppSelector(selectUsers);
  const isUsersLoading = useAppSelector(selectUserIsLoading);

  const { USERS_GET_ALL } = UsersSliceActionTypePrefix;

  const isLoading = isUsersLoading === USERS_GET_ALL;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(getAllUsers()).unwrap();
  }, []);

  const emptyRows = calcEmptyRows(page, rowsPerPage, allUsers!.length);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="users__dashboard common">
      <h4>Admin's Dashboard</h4>

      <TableContainer component={Paper}>
        {allUsers!.length !== 0 && (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="table__head">Name</TableCell>
                <TableCell align="left" className="table__head">
                  Email
                </TableCell>
                <TableCell align="left" className="table__head">
                  Gender
                </TableCell>
                <TableCell align="left" className="table__head">
                  Role
                </TableCell>
                <TableCell align="left" className="table__head">
                  Height
                </TableCell>
                <TableCell align="left" className="table__head">
                  Date of birth
                </TableCell>
                <TableCell align="left" className="table__head">
                  Change role
                </TableCell>
                <TableCell align="left" className="table__head">
                  Delete user
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    sx={{
                      padding: "7.8rem",
                    }}
                    align="center"
                  >
                    <LoadingSpinner />
                  </TableCell>
                </TableRow>
              ) : (
                (rowsPerPage > 0
                  ? allUsers!.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : allUsers!
                ).map((user: User) => (
                  <DashboardItem key={user._id} user={user} />
                ))
              )}
              {!isLoading && emptyRows > 0 && (
                <TableRow style={{ height: 66.9 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>

            <TableFooter className="table__footer">
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10]}
                  colSpan={8}
                  count={allUsers!.length}
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
        )}
      </TableContainer>

      {!isLoading && allUsers!.length === 0 && (
        <p className="no__content full__width">No users found!</p>
      )}
    </div>
  );
};

export default DashboardTable;
