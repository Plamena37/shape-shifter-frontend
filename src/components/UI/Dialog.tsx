import {
  Box,
  Dialog as MuiDialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";

type DialogProps = {
  open: boolean;
  toggleDialog: () => void;
  title: string;
  children: React.ReactNode;
};

const Dialog = ({ open, toggleDialog, title, children }: DialogProps) => {
  return (
    <div>
      <MuiDialog open={open} onClose={toggleDialog}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              p: 2,
              pb: 0,
              minWidth: 500,
            }}
          >
            {children}
          </Box>
        </DialogContent>
      </MuiDialog>
    </div>
  );
};

export default Dialog;
