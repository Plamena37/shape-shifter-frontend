import { Typography } from "@mui/material";
import notSupportedScreenSizeImage from "../../assets/img/notSupported.png";
import "./NotSupportedScreenSizePage.scss";

const NotSupportedScreenSizePage = () => {
  return (
    <div className="container">
      <div className="imgBox">
        <img src={notSupportedScreenSizeImage} />
      </div>
      <Typography
        sx={{
          fontSize: {
            tablet: "1.2rem",
            mobile: "1.1rem",
          },
        }}
        className="heading"
      >
        Best on bigger screens
      </Typography>
    </div>
  );
};

export default NotSupportedScreenSizePage;
