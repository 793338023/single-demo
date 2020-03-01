import makeWebAPI from "common/dist/makeWebAPI";

export type Req = any;
export type Resp = {
  dictId: string;
  dictName: string;
  status: string;
}[];

export default makeWebAPI<any, Resp>("system/v1/qryList");
