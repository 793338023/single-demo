import React, { useState, Fragment } from "react";
import useRequest from "./useRequest";

interface Props {}

const HooksTest = (props: Props) => {
  // 当state很复杂，需要定义很多useState时，可以考虑使用useReducer
  const cReducer = useRequest();
  debugger;
  const [str, setstr] = useState("");
  const [num, setnum] = useState(0);

  console.log(cReducer);
  function sethandle() {
    setstr(str + "xxx");
    setnum(num + 1);
  }

  return (
    <div>
      <div onClick={sethandle}>ccc{str + num}</div>
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
