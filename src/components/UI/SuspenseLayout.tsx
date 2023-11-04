import { Suspense } from "react";
import LoadingSpinner from "./LoadingSpinner/LoadingSpinner";

type SuspenseProps = {
  children: React.ReactNode;
};

const SuspenseLayout = ({ children }: SuspenseProps) => {
  return <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>;
};

export default SuspenseLayout;
