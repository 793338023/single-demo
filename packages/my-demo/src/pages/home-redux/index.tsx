import React, { useEffect } from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { Table, Tag, DatePicker } from "antd";
import { qryList } from "./reducer/actions";
interface Props
  extends ReturnType<typeof mapStateToProps>,
    ReturnType<typeof mapDispatchToProps> {}

const Home: React.FC<Props> = (props) => {
  useEffect(() => {
    props.handleQryList();
  }, []);

  const columns = [
    {
      title: "id",
      dataIndex: "dictId",
      key: "dictId",
    },
    {
      title: "名称",
      dataIndex: "dictName",
      key: "dictName",
    },
    {
      title: "状态",
      key: "status",
      dataIndex: "status",
      render: (status: string) => {
        let color = status === "1" ? ["volcano", "失败"] : ["green", "成功"];

        return (
          <span>
            <Tag color={color[0]}>{color[1]}</Tag>
          </span>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <span>
          <a>Delete</a>
        </span>
      ),
    },
  ];

  function onChange(date: any, dateString: any) {
    console.log(date, dateString);
  }
  return (
    <div>
      <DatePicker onChange={onChange} />
      <br />
      <Table
        columns={columns}
        dataSource={props.qryList.payload || []}
        rowKey={(record) => record.dictId}
        loading={props.qryList.loading}
      />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const qryList = state["home-redux"].qryList;
  return {
    qryList,
  };
};
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    handleQryList() {
      dispatch(qryList.request({}));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
