import React, { useEffect, useState } from "react";
import { AxiosRespWithWebAPI } from "@/common/http";
import qryList, { Resp as QryListResp } from "@/common/services/qryList";
import styles from "./style.module.scss";
import { Table, Tag, Button } from "antd";
import { event, req } from "@/common/utils";
import "./utils";

interface Props {}
// http://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&start=2&count=10
const Home: React.FC<Props> = () => {
  const [data, setdata] = useState<any>([]);
  const qryListFn = async () => {
    const resp: AxiosRespWithWebAPI<QryListResp> = await qryList({});
    console.log(resp);
    const {
      data: { body },
    } = resp;
    setdata(body);
  };

  useEffect(() => {
    qryListFn();
    const fn = (...args: any[]) => {
      console.log(args, 123);
    };
    event.on("axios", fn);
    return () => {
      event.delete("axios", fn);
    };
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
      title: "状态1",
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

  return (
    <div>
      <p className={styles.wrapper}>例子：abc</p>
      <Button
        onClick={() => {
          req(12, 321, 12312, 4324, 23, "sada");
        }}
      >
        发布订阅
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={(record) => record.dictId}
      />
    </div>
  );
};

export default Home;
