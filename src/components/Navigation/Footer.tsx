import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link } from "@mui/material";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div>
        <Link
          href="https://www.linkedin.com/in/plamena-ivanova-3b6782239/"
          target="blank"
        >
          <LinkedInIcon />
          LinkedIn Profile
        </Link>
      </div>
      <div>
        <Link href="https://github.com/Plamena37" target="blank">
          <GitHubIcon /> GitHub Profile
        </Link>
      </div>
      <div>
        <Link
          href="https://github.com/Plamena37/shape-shifter-frontend"
          target="blank"
        >
          <GitHubIcon />
          Project App
        </Link>
      </div>
      <div>
        <Link
          href="https://github.com/Plamena37/shape-shifter-backend"
          target="blank"
        >
          <GitHubIcon />
          Project Server
        </Link>
      </div>
    </div>
  );
};

export default Footer;
