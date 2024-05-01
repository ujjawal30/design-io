import React from "react";

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <div className="p-10">{children}</div>;
};

export default AuthLayout;
