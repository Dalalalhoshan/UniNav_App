import instance from ".";

const createResourceType = async (ResourceType) => {
  const response = await instance.post("/resourceType", ResourceType);
  return response.data;
};

const getResourceTypes = async () => {
  const response = await instance.get("/resourceType");
  return response.data;
};

export { createResourceType, getResourceTypes };
