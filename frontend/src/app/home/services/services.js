import { apiInstance } from "@/app/interceptor/interceptor";



export const getbanner = async () => {
    const res = await apiInstance.get(`/getbanner`);
    return res.data;
};


// Fetch all cards (for homepage or cards listing)
export const getcard = async () => {
  const res = await apiInstance.get(`/getcard`);
  return res.data;
};

// ✅ Fetch single card by ID (for product view page)
export const getcardbyid = async (id) => {
  try {
    const res = await apiInstance.get(`/getcardbyid/${id}`); // ✅ Correct usage
    return {
      ...res.data,
      imageUrl: res.data.imageUrl?.startsWith('/uploads')
        ? `http://localhost:7004${res.data.imageUrl}`
        : res.data.imageUrl,
    };
  } catch (err) {
    console.error('Error fetching product by ID:', err);
    throw err;
  }
};
// ✅ Fetch all top sellers
export const gettopseller = async () => {
  try {
    const res = await apiInstance.get('/gettopseller');
    return res.data;
  } catch (err) {
    console.error('Error fetching top sellers:', err);
    return [];
  }
};

