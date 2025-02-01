import apiUrl from "@/utils/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const addToWishlist = async (item) => {
  try {
    const res = await apiUrl.post("/wishlist/add", item);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const fetchWishlist = async () => {
  try {
    const res = await apiUrl.get("/wishlist/get");
    const wishlist = res?.data?.data.wishList;
    return wishlist;
  } catch (error) {
    throw error;
  }
};

export default function useWishlist() {
  const queryClient = useQueryClient();

  // fetch wishlist data
  const {
    data: wishlist,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["wishlist"],
    queryFn: fetchWishlist,
  });

  // Add item mutation
  const addMutation = useMutation({
    mutationFn: addToWishlist,
    onMutate: async (newItem) => {
      await queryClient.cancelQueries(["wishlist"]);

      // Get the current wishlist state
      const previousWishlist = queryClient.getQueryData(["wishlist"]) || [];

      // Check if the item already exists in the wishlis
      if (previousWishlist.includes(newItem.id)) {
        throw new Error("Item is already in the wishlist");
      }

      // Optimistically update the cache
      queryClient.setQueryData(["wishlist"], (old) => {
        return [...(Array.isArray(old) ? old : []), newItem];
      });

      return { previousWishlist };
    },
    onSuccess: (newItem) => {
      queryClient.invalidateQueries(["wishlist"]);
    },
    onError: (error) => {
      console.log("Failedd to add item to wishlist", error);

      // Rollback to the previous state if the mutation fails
      if (context?.previousWishlist) {
        queryClient.setQueryData(["wishlist"], context.previousWishlist);
      }
    },
  });

  return { wishlist, addMutation, isLoading, error };
}
