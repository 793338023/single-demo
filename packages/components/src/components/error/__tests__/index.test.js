import React from "react";
import { render } from "@testing-library/react";
import Error from "../";

/**
 * 层级
 * test describe it
 * describe 分大族
 * it 分小组，既在describe里
 * test与it类似
 * 它们都是进行描述的，让测试代码更加直观可读
 *
 */

test("error test", () => {
  const { getByText } = render(
    <Error>
      <div>1231</div>
    </Error>
  );
  const linkElement = getByText(/1231/i);
  // console.log(linkElement);
  expect(linkElement).toBeInTheDocument();
});
