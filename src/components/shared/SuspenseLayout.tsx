import { Suspense } from "react";

type SuspenseProps = {
  children: React.ReactNode;
};

const SuspenseLayout = ({ children }: SuspenseProps) => {
  return <Suspense>{children}</Suspense>;
};

export default SuspenseLayout;
