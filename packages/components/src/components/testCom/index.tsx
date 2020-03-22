import React, { Component } from "react";

interface Props {
  title: string;
  comments: any[];
  setData: any;
  createComment: (obj: { key: string; name: string }) => void;
}
interface State {
  key: string;
  name: string;
  [propname: string]: any;
}

export default class TestCom extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      key: "",
      name: ""
    };
  }

  handleSubmit = (event: any) => {
    event.preventDefault();
    const { key, name } = this.state;
    this.props.createComment({ key, name });
  };

  handleChange = (event: any) => {
    this.props.setData({ [event.target.id]: event.target.value });
    this.setState({ [event.target.id]: event.target.value });
  };

  commentRender = () => {
    const { comments } = this.props;
    return comments.map((item, index) => {
      return (
        <li className="comments" key={index}>
          {item.key}:{item.name}
        </li>
      );
    });
  };

  render() {
    const { title } = this.props;
    return (
      <div>
        <h2>{title}</h2>
        <form className="comment-form" onSubmit={this.handleSubmit}>
          <label htmlFor="key">
            Author
            <input id="key" type="text" onChange={this.handleChange} />
          </label>
          <label htmlFor="name">
            Comment
            <input id="name" type="text" onChange={this.handleChange} />
          </label>

          <button type="submit">提交</button>
        </form>
        <ul>{this.commentRender()}</ul>
      </div>
    );
  }
}
