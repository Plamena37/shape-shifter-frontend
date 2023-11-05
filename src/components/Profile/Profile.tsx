import { useState } from "react";
import { format } from "date-fns";
import { useAppSelector } from "../../app/store";
import ProfileDialog from "./ProfileDialog";
import ProfileExcerpt from "./ProfileExcerpt";
import { Button, LoadingSpinner } from "../shared";
import {
  selectCurrentUser,
  selectProfileIsLoading,
} from "../../features/profile/profileSelectors";
import "./Profile.scss";
import { Box } from "@mui/material";

const Profile = () => {
  const user = useAppSelector(selectCurrentUser);
  const isLoading = useAppSelector(selectProfileIsLoading);
  const [open, setOpen] = useState(false);

  const toggleDialog = () => {
    setOpen(!open);
  };

  return (
    <div className="profile">
      {isLoading ? (
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            height: "100vh",
            justifyContent: "center",
          }}
        >
          <LoadingSpinner />
        </Box>
      ) : (
        <>
          <div className="profile--message">
            <h2>Hello {user!.name}</h2>
          </div>

          <section className="profile__info">
            <ProfileExcerpt title="Name" data={user!.name} />
            <ProfileExcerpt title="Email" data={user!.email} />
            <ProfileExcerpt title="Role" data={user!.role} />
            <ProfileExcerpt title="Gender" data={user!.gender} />
            <ProfileExcerpt
              title="Date of birth"
              data={
                user!.dateOfBirth &&
                format(new Date(user!.dateOfBirth), "yyyy-MM-dd")
              }
            />
            <ProfileExcerpt title="Height (cm)" data={user!.height} />
          </section>
          <Button
            btnVariant="outlined"
            btnStyle="btn btn--ordinary"
            onClick={toggleDialog}
          >
            Edit
          </Button>
        </>
      )}
      {open && (
        <ProfileDialog
          currUser={user!}
          isOpen={open}
          handleClose={toggleDialog}
        />
      )}
    </div>
  );
};

export default Profile;
