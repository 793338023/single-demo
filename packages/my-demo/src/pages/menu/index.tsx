import React from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";

const MenuTabs = () => {
  const tabsArr: any[] = [
    { path: "/", name: "home" },
    { path: "/hr", name: "home-redux" },
    { path: "/h", name: "hooks-test" },
    { path: "/e", name: "error" },
    { path: "/b", name: "tabs" },
  ];

  return (
    <div>
      {tabsArr.map((item, index) => {
        const { path, name } = item;
        return (
          <div key={index} className={styles.content}>
            <Link to={`${path}`}>{name}</Link>
          </div>
        );
      })}
    </div>
  );
};

export default MenuTabs;
