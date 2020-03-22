import React from "react";
// import "./styles.scss";
import Button from "antd/es/button";
import "antd/es/button/style";
import Input from "antd/es/input";
import "antd/es/input/style";

const styles = require("./styles.module.scss");
console.log(styles);
interface Props {
  title: string;
}

const { Search } = Input;

const Result: React.FC<Props> = props => {
  return (
    <div className="result">
      <div className="title">{props.title}</div>
      <div className="line">你申请的业务已办理{props.title}</div>
      <Button>按钮</Button>
      <Search
        placeholder="input search text"
        onSearch={value => console.log(value)}
        style={{ width: 200 }}
      />
    </div>
  );
};

export default Result;
