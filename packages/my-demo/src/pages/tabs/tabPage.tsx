import React from "react";
import styles from "./style.module.scss";

interface Props {
  show: boolean;
  back: () => void;
}

const TabPage: React.FC<Props> = props => {
  const goBack = () => {
    props.back();
  };
  return (
    <div
      className={styles.tabPage}
      style={{ display: props.show ? "" : "none" }}
    >
      <div onClick={goBack}>返回</div>
      <div className={styles.tabW}>{props.children}</div>
    </div>
  );
};

export default TabPage;
