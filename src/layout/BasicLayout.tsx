import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { getCurrentUserIdAndEmail } from "../utils/functions";
import { useAppDispatch, useAppSelector } from "../app/store";
import { selectIsUserLoggedIn } from "../features/auth/authSelectors";
import { getCurrentUser } from "../features/profile/profileSlice";
import Header from "../components/Navigation/Header";
import Footer from "../components/Navigation/Footer";

const BasicLayout = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [style, setStyle] = useState("");
  const isLoggedIn = useAppSelector(selectIsUserLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      const userInfo = getCurrentUserIdAndEmail();

      userInfo?.id && dispatch(getCurrentUser(userInfo.id));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (location.pathname.includes("measurements")) {
      setStyle("baseSpecial");
    } else {
      setStyle("");
    }
  }, [location.pathname]);

  return (
    <div className={`base ${style}`}>
      {isLoggedIn && <Header />}
      <div className="basicLayout">
        <Outlet />
      </div>
      {isLoggedIn && <Footer />}
    </div>
  );
};

export default BasicLayout;
