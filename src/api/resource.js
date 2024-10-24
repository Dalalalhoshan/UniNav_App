import instance from ".";

const createResource = async (resource) => {
  const response = await instance.post("/resources", resource);
  return response.data;
};

const getResources = async () => {
  const response = await instance.get("/resources");
  return response.data;
};

const getResourceById = async (id) => {
  const response = await instance.get(`/resources/${id}`);
  return response.data;
};

const deleteResource = async (id) => {
  const response = await instance.delete(`/resources/${id}`);
  return response.data;
};

export { createResource, getResources, getResourceById, deleteResource };
