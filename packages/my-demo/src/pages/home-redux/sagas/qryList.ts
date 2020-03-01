import { getType } from "typesafe-actions";
import { takeLatest, call, put } from "redux-saga/effects";
import * as actions from "../reducer/actions";
import qryList, { Resp as QryListResp } from "@/common/services/qryList";
import { AxiosRespWithWebAPI } from "@/common/http";

function* doFetch(action: ReturnType<typeof actions.qryList.request>) {
  try {
    const req: AxiosRespWithWebAPI<QryListResp> = yield call(qryList, {
      ...action.payload
    });
    const {
      data: { body }
    } = req;
    yield put(actions.qryList.success(body));
  } catch (err) {
    yield put(
      actions.qryList.failure(err instanceof Error ? err : new Error(err))
    );
  }
}

export default takeLatest(getType(actions.qryList.request), doFetch);
