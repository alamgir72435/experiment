import { axios } from "../lib/axios";
import { useQuery } from "@tanstack/react-query";


// use Latency query
export const useLatency = ({ i, page,pageSize }:{i:number, page:number, pageSize:number}) => {

  return useQuery(["latency"], async () => {
      const {data} = await axios.get('/administrator/request-latency', {
        params:{
          page,
          pageSize,
          largeReq:false
        }
      });

      return data;
  }, {
    enabled:i ? true:false,
    refetchInterval:1000
  });
};