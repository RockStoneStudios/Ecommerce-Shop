import useSWR,{SWRConfiguration} from 'swr';
import { IProduct } from '../interfaces';

const fetcher = (...args:[key:string]) => fetch(...args).then(res=> res.json());



export const useProducts = <T>(url : string,config:SWRConfiguration={}) => {
    const {data,error} = useSWR<T>(`/api${url}`,fetcher,config);

    return {
        products : data || [],
        isLoading: !error && !data,
        isError : error
    }
}