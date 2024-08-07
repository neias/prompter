import React from "react";
import { PageProps } from "gatsby";

const Layout: React.FC<PageProps> = ({ children }) => {
  return (
    <main>
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
