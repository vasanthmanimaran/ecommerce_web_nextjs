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

// 🔍 Get Full User Profile
export const getUserProfile = async () => {
  try {
    const res = await apiInstance.get('/user/profile');
    return res.data;
  } catch (err) {
    console.error('Error fetching profile:', err);
    throw err;
  }
};

// ✏️ Update Profile
export const updateUserProfile = async (data) => {
  try {
    const res = await apiInstance.put('/user/profile', data);
    return res.data;
  } catch (err) {
    console.error('Error updating profile:', err);
    throw err;
  }
};

// 🔐 Change Password
export const changePassword = async (data) => {
  try {
    const res = await apiInstance.put('/user/change-password', data);
    return res.data;
  } catch (err) {
    console.error('Error changing password:', err);
    throw err;
  }
};

// ➕ Add Address
export const addAddress = async (data) => {
  try {
    const res = await apiInstance.post('/user/address', data);
    return res.data;
  } catch (err) {
    console.error('Error adding address:', err);
    throw err;
  }
};

// 🛠️ Update Address
export const updateAddress = async (id, data) => {
  try {
    const res = await apiInstance.put(`/user/address/${id}`, data);
    return res.data;
  } catch (err) {
    console.error('Error updating address:', err);
    throw err;
  }
};

// ❌ Delete Address
export const deleteAddress = async (id) => {
  try {
    const res = await apiInstance.delete(`/user/address/${id}`);
    return res.data;
  } catch (err) {
    console.error('Error deleting address:', err);
    throw err;
  }
};

// 🔐 Login Function
export const handleLogin = async (credentials) => {
  try {
    const res = await apiInstance.post('/login', credentials);
    // Optionally store token if needed here, or return and store elsewhere
    return res.data;
  } catch (err) {
    console.error('Login failed:', err);
    throw err;
  }
};
