import React from "react";
import ErrorBoundary from "components/dist/error";
import BuggyCounter from "./buggyCounter";
import Result from "components/dist/result";
// import "antd/es/button/style";
interface Props {}

const ErrCounter: React.FC<Props> = () => {
  return (
    <div>
      <Result title="成功" />
      <ErrorBoundary>
        <BuggyCounter title="one" />
        <BuggyCounter title="two" />
      </ErrorBoundary>
    </div>
  );
};

export default ErrCounter;
