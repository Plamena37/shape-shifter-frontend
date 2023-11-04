import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
import { RootState, useAppDispatch } from "../../app/store";
import { getAllUsers } from "../../features/userSlice";
import { DashboardItem } from "..";
import PaginationActions from "../shared/PaginationActions";
import "./Dashboard.scss";

const DashboardTable = () => {
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(getAllUsers()).unwrap();
  }, []);

  const allUsers = useSelector((state: RootState) => state.user.users);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allUsers.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

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
            {(rowsPerPage > 0
              ? allUsers.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : allUsers
            ).map((user) => (
              <DashboardItem key={user._id} user={user} />
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 66.9 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>

          <TableFooter className="table__footer">
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={8}
                count={allUsers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={PaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DashboardTable;
