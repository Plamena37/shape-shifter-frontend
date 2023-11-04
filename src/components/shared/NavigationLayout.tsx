import { Outlet } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

const NavigationLayout = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
};

export default NavigationLayout;
