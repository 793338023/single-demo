import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders 蚂蚁金服 link", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/蚂蚁金服/i);
  expect(linkElement).toBeInTheDocument();
});
