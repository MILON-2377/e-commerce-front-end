
import { addToWishlistItem, setWishlist } from '@/store/reducers/wishListSlice';
import { addToWishlist, fetchWishlist } from '@/utils/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux'

export default function useWishlist() {
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.wishList.wishLists );
  const queryClient = useQueryClient();

  // Fetch wishlist from db and sync with Redux
  useQuery({
    queryKey:["wishlist"],
    queryFn: fetchWishlist,
    onSuccess: (data) => dispatch(setWishlist(data)), 
  });   


  // Add item mutation
  const addMutation = useMutation({
    mutationFn: addToWishlist,
    onSuccess: (newItem) => {
        console.log(newItem);
        dispatch(addToWishlistItem(newItem));
        queryClient.invalidateQueries(["wishlist"]);
    },

  });   


  return {wishlist, addMutation};
}
