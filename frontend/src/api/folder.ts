import axiosInstance from './axios';

export const createFolder = async (name: string, parent: string | null) => {
  try {
    const response = await axiosInstance.post('/folder', { name, parent });

    return response.data;
  } catch (error) {
    console.error('Create folder error:', error);
  }
};

export const getFolders = async (parentId: string) => {
  try {
    const response = await axiosInstance.get(`/folder/${parentId || ''}`);
    return response.data;
  } catch (error) {
    console.error('Get folders error:', error);
  }
};

export const getAllFolderData = async (parentId: string) => {
  try {
    const response = await axiosInstance.get(`/folder/all/${parentId || ''}`);
    return response.data;
  } catch (error) {
    console.error('Get folders error:', error);
  }
};

export const deleteFolder = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/folder/?id=${id}`);
    return response.data;
  } catch (error) {
    console.error('Delete folder error:', error);
  }
};
