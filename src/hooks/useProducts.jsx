
import axios from 'axios';
import {useQuery } from '@tanstack/react-query';


const fetchProducts = async({page, search, filters}) => {
    const params = {
        page,
        search,
        ...filters
    };

    try {
      const {data} = await axios.get(`https://wellness-care-backend.vercel.app/api/v1/product/display`, {params});
      return data || [];
    } catch (error) {
      console.log("errors while fetching data ", error);
    }
}

export default function useProducts({page, search, filters}) {
  return useQuery(
    {
        queryKey:["products", page, search, filters],
        queryFn: () => fetchProducts({page, search, filters}),
        keepPreviousData: true,
        staleTime: 5000,
    }
  );

}