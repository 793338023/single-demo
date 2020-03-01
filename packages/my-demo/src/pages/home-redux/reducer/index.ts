import { ActionType, getType } from "typesafe-actions";
import * as actions from "./actions";
import { Resp as QryListResp } from "@/common/services/qryList";

// 注册的方法获取对应action值，根据actions里的方法名获取
type PFc<P extends ActionKeys> = FuctionReducer<P>;
type ActionKeys = keyof typeof actions;
type PState = NonNullable<Parameters<typeof reducer>[0]>;
interface FuctionReducer<T extends ActionKeys> {
  (s: PState, a: ActionType<Pick<typeof actions, T>>): CommonReducer;
}

// 定义reducer的state数据类型
export interface CommonReducer {
  qryList: { data?: QryListResp; loading: boolean; message?: any };
  [key: string]: any;
}

// 默认state
const initState = {
  qryList: { loading: false }
};

/***************注册方法，action对应的state处理函数********************** */

const makeqryList: PFc<"qryList"> = function(state, action) {
  switch (action.type) {
    case getType(actions.qryList.request): {
      return { ...state, qryList: { loading: true } };
    }
    case getType(actions.qryList.success): {
      return { ...state, qryList: { loading: false, payload: action.payload } };
    }
    case getType(actions.qryList.failure): {
      return { ...state, qryList: { loading: false, message: action.payload } };
    }
  }
};

/************************************* */

let MAP_REDUCER: {
  [key: string]: PFc<any>;
} = {};

// 注册type对应reducer的处理state方法
MAP_REDUCER[getType(actions.qryList.request)] = makeqryList;
MAP_REDUCER[getType(actions.qryList.success)] = makeqryList;
MAP_REDUCER[getType(actions.qryList.failure)] = makeqryList;

export default function reducer(
  state = initState,
  action: ActionType<typeof actions>
): CommonReducer {
  const { type } = action;
  if (MAP_REDUCER.hasOwnProperty(type)) {
    return MAP_REDUCER[type](state, action);
  }
  return state;
}
