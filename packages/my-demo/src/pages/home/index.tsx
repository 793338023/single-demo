import React, { useEffect, useState } from "react";
import { AxiosRespWithWebAPI } from "@/common/http";
import qryList, { Resp as QryListResp } from "@/common/services/qryList";
import styles from "./style.module.scss";
import { Table, Tag } from "antd";
interface Props {}

const Home: React.FC<Props> = () => {
  const [data, setdata] = useState<any>([]);
  const qryListFn = async () => {
    const resp: AxiosRespWithWebAPI<QryListResp> = await qryList({});
    console.log(resp);
    const {
      data: { body }
    } = resp;
    setdata(body);
  };

  useEffect(() => {
    qryListFn();
  }, []);

  const columns = [
    {
      title: "id",
      dataIndex: "dictId",
      key: "dictId"
    },
    {
      title: "名称",
      dataIndex: "dictName",
      key: "dictName"
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
      }
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <span>
          <a>Delete</a>
        </span>
      )
    }
  ];

  return (
    <div>
      <p className={styles.wrapper}>例子：abc</p>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={record => record.dictId}
      />
    </div>
  );
};

export default Home;
