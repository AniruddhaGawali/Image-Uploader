import axiosInstance from './axios';

export const uploadImage = async (
  name: string,
  imageFile: string,
  folder: string | null
) => {
  try {
    const response = await axiosInstance.post('/image/upload', {
      name,
      image: imageFile,
      folder,
    });
    return response.data;
  } catch (error) {
    console.error('Upload image error:', error);
  }
};

export const searchImages = async (query: string) => {
  try {
    const response = await axiosInstance.get(`/image/${query}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Search images error:', error);
  }
};
