import apiUrl from "@/utils/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


const addItemToCart = async(item) => {
    console.log(item);
    try {

        const res = await apiUrl.post("/cart/add", item);
        return res.data;
    } catch (error) {
        throw new Error("Failed to add item in cart", error);
    }
}



const fetchCartItems = async() => {
    try {
        const res = await apiUrl.get("/cart/get");
        const items = res?.data?.data?.items;
        return items;
    } catch (error) {
        console.error("Failed to fetch cart items", error);
    }
}

export default function useCart() {

    const queryClient = useQueryClient();

  const {data:cartItems, isLoading, error} = useQuery({
    queryKey:["cartItems"],
    queryFn: fetchCartItems,
  });

  const addCartMutation = useMutation({
    mutationFn:addItemToCart,
    onMutate: async(item) => {
        await queryClient.cancelQueries(["cartItems"]);

        const previousCartItems = queryClient.getQueryData(["cartItems"]) || [];

        if(previousCartItems.includes(item.productId)){
            throw new Error("Product already in the cart");
        }

        queryClient.setQueriesData(["cartItems"], (old) => {
            return [...(Array.isArray(old) ? old : []), item];
        });

        return {previousCartItems};
    },
    onSuccess: () => {
        queryClient.invalidateQueries(["cartItems"]);
    },
    onError:(error) => {
        console.log("Failed to item to the cart", error);

        if(context?.previousCartItems){
            queryClient.setQueryData(["cartItems"], context.previousCartItems);
        }
    }
  });


  return {addCartMutation,cartItems, isLoading, error};
}
