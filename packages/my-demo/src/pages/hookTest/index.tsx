import React, { Fragment } from "react";
import useRequest from "./useRequest";

interface Props {}

const HooksTest = (props: Props) => {
  // 当state很复杂，需要定义很多useState时，可以考虑使用useReducer
  const cReducer = useRequest();
  console.log(cReducer);
  return (
    <div>
      {cReducer.loading ? (
        <div>加载中...</div>
      ) : (
        <Fragment>
          <div>{cReducer.data}</div>
          <div>12312</div>
        </Fragment>
      )}
    </div>
  );
};

export default HooksTest;
