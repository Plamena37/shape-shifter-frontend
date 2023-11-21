import { useEffect } from "react";
import { getCurrentUserIdAndEmail } from "../utils/functions";
import { useAppDispatch, useAppSelector } from "../app/store";
import { selectIsUserLoggedIn } from "../features/auth/authSelectors";
import { getCurrentUser } from "../features/profile/profileSlice";
import Header from "../components/Navigation/Header";
import Footer from "../components/Navigation/Footer";
import { Outlet } from "react-router-dom";

const BasicLayout = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsUserLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      const userInfo = getCurrentUserIdAndEmail();

      userInfo?.id && dispatch(getCurrentUser(userInfo.id));
    }
  }, [isLoggedIn]);

  return (
    <div className="base">
      {isLoggedIn && <Header />}
      <div className="basic__layout">
        <Outlet />
      </div>
      {isLoggedIn && <Footer />}
    </div>
  );
};

export default BasicLayout;
