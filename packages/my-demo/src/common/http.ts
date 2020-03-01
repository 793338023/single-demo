// 解决: Cannot re-export a type when the '--isolatedModules' flag is provided
import { AxiosRespWithWebAPI as WEBAPI } from "common/dist/http";
export type AxiosRespWithWebAPI<T> = WEBAPI<T>;
