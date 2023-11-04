import { useState } from "react";
import { useSelector } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { format } from "date-fns";
import { RootState } from "../../app/store";
import { User } from "../../utils/interfaces";
import ProfileDialog from "./ProfileDialog";
import ProfileExcerpt from "./ProfileExcerpt";
import { Button } from "../UI";
import "./Profile.scss";

const Profile = () => {
  const [open, setOpen] = useState(false);

  const user: User | undefined = useSelector(
    (state: RootState) => state.user.user
  );

  const toggleDialog = () => {
    setOpen(!open);
  };

  return (
    <div className="profile">
      <div className="profile--message">
        <h2>Hello {user.name}</h2>
        <p className="profile--message--p">
          Personal Information <AccountCircleIcon className="icon" />
        </p>
      </div>

      <section className="profile__info">
        <ProfileExcerpt title="Name" data={user.name} />
        <ProfileExcerpt title="Email" data={user.email} />
        <ProfileExcerpt title="Role" data={user.role} />
        <ProfileExcerpt title="Gender" data={user.gender} />
        <ProfileExcerpt
          title="Date of birth"
          data={
            user.dateOfBirth &&
            format(new Date(user?.dateOfBirth), "yyyy-MM-dd")
          }
        />
        <ProfileExcerpt title="Height (cm)" data={user.height} />
      </section>
      <Button
        btnVariant="outlined"
        btnStyle="btn btn--ordinary"
        onClick={toggleDialog}
      >
        Edit
      </Button>

      {open && (
        <ProfileDialog
          currUser={user}
          isOpen={open}
          handleClose={toggleDialog}
        />
      )}
    </div>
  );
};

export default Profile;
