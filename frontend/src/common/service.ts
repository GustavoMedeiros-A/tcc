import apiInstance from "../axios";
import { IOptions } from "./interface";

export const executePostgresQuery = async (options: IOptions): Promise<any> => {
  try {
    const response = await apiInstance.post("/postgres/execute", options);
    return response.data;
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
};

export const executeMongoQuery = async (options: IOptions): Promise<any> => {
  try {
    const response = await apiInstance.post("/mongodb/execute", options);
    return response.data;
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
};
