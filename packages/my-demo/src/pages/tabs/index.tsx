import React, { useState } from "react";
import TabPage from "./tabPage";
interface Props {}

let data: any[] = [];
function e(n: number, c = 10) {
  for (let i = 0; i < c; i++) {
    data.push({ val: i, num: n });
  }
}
e(1, 30);
e(2, 10);
e(3, 20);

const Tabs: React.FC<Props> = () => {
  const [num, setnum] = useState(1);
  const [show, setshow] = useState(false);

  const handleChange = (tab: number) => {
    setshow(true);
    setnum(tab);
  };

  const childRender = () => {
    return data.map((item, index) => {
      return (
        <div
          key={index}
          style={{
            height: 30,
            width: "100%",
            display: num === item.num ? "" : "none"
          }}
        >
          xxx{item.val}asasd tabs{num}
        </div>
      );
    });
  };

  return (
    <div>
      <div>
        <button
          onClick={() => {
            handleChange(1);
          }}
        >
          tabs1
        </button>
        <button
          onClick={() => {
            handleChange(2);
          }}
        >
          tabs2
        </button>
        <button
          onClick={() => {
            handleChange(3);
          }}
        >
          tabs3
        </button>
      </div>
      <TabPage
        show={show}
        back={() => {
          setshow(false);
        }}
      >
        {childRender()}
      </TabPage>
    </div>
  );
};

export default Tabs;
