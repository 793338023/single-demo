import { createAsyncAction } from "typesafe-actions";
import * as actions from "./actionTypes";
import { Resp as QryListResp } from "@/common/services/qryList";

export const qryList = createAsyncAction(
  actions.PG_COMMON_REQUEST,
  actions.PG_COMMON_SUCCESS,
  actions.PG_COMMON_FAIL
)<any, QryListResp, { message: string }>();
