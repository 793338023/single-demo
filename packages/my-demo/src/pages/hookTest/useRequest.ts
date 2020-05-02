import { useReducer, useEffect } from "react";

interface InitState {
  data: any[];
  page: { [key: string]: any };
  loading: boolean;
}
const initState: InitState = {
  data: [],
  page: { total: 10, record: 10 },
  loading: true,
};
function reducer(
  state: InitState,
  action: { type: string; payload: InitState }
) {
  switch (action.type) {
    case "a":
      return { ...action.payload };
    case "b":
      return { ...action.payload };
    default:
      return state;
  }
}

const useRequest = () => {
  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    setTimeout(() => {
      const data = {
        type: "a",
        payload: {
          data: ["zhhh", "xxx", 3, 4],
          page: { total: 51, record: 999 },
          loading: false,
        },
      };
      dispatch(data);
    }, 1000);
  }, []);

  return state;
};

export default useRequest;
