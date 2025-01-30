import axios from "axios";

const API_URL = "/api/v1/wishlist";

export const fetchWishlist = async() => {
    const {data} = await axios.get(API_URL);
    return data;
};


export const addToWishlist = async(item) => {
    const {data} = await axios.post(`${API_URL}/add`, item);
    return data;
};

export const removeFromWishlist = async(itemId) => {
    await axios.delete(`${API_URL}/delete/${itemId}`);
}