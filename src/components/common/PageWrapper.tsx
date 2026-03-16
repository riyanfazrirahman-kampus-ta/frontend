import React from "react";

interface PageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col pt-24 sm:pt-30 pb-28 sm:pb-32 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl mx-auto flex-1">{children}</div>
    </div>
  );
};

export default PageWrapper;
