import instance from ".";

const createResourceType = async (resourceType) => {
  const response = await instance.post("/resourceType", resourceType);
  return response.data;
};

const getResourceTypes = async () => {
  const response = await instance.get("/resourceType");
  return response.data;
};

export { createResourceType, getResourceTypes };
