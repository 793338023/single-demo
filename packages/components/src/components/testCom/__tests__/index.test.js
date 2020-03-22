import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import TestCom from "../";

describe("TestCom 测试", () => {
  const props = {
    title: "zhang",
    comments: [
      { key: "123", name: "xxc" },
      { key: "1rr", name: "zcc" }
    ]
  };

  it("TestCom 渲染", () => {
    const { queryByText } = render(<TestCom {...props} />);
    const title = queryByText(props.title);
    expect(title.innerHTML).toBe(props.title);
  });
  it("comments 长度", () => {
    const { container } = render(<TestCom {...props} />);
    const commentNodes = container.querySelectorAll(".comments");
    expect(commentNodes.length).toBe(props.comments.length);
  });
});

const createProps = props => ({
  header: "zzz Feed",
  comments: [
    {
      key: "adc",
      name: "这是一个测试."
    },
    {
      key: "adcadc",
      name: "第二条测试."
    }
  ],
  createComment: jest.fn(),
  setData: jest.fn(),
  ...props
});
describe("TestCom 行为操作", () => {
  it("添加评论", () => {
    const newComment = { key: "bbc", name: "Why?" };
    let props = createProps({});
    render(<TestCom {...props} />);
    const authorNode = screen.getByLabelText("Author");
    const textNode = screen.getByLabelText("Comment");
    const formNode = screen.getByText(/提交/i);
    console.log(textNode);
    fireEvent.change(authorNode, {
      target: { value: newComment.key }
    });
    fireEvent.change(textNode, {
      target: { value: newComment.name }
    });

    fireEvent.click(formNode);

    expect(props.setData).toHaveBeenCalledTimes(2);

    expect(props.createComment).toHaveBeenCalledTimes(1);
    expect(props.createComment).toHaveBeenCalledWith(newComment);
  });
});
