import instance from ".";

const createResource = async (resource) => {
  try {
    console.log(resource);
    const formData = new FormData();

    for (key in resource) {
      if (key != "url") formData.append(key, resource[key]);
    }

    formData.append("url", {
      name: "url.pdf",
      type: "application/pdf",
      uri: resource.file,
    });
    // for (const k in resource) formData.append(k, resource[k]);
    const { data } = await instance.post("/resources", formData);
    return data;
  } catch (error) {
    console.error(
      "Error creating resource:",
      error.response?.data || error.message
    );
    throw error;
  }
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
const toggleLikeResource = async (id) => {
  try {
    const { data } = await instance.post(`/resources/${id}/like`);
    return data;
  } catch (error) {
    console.error(
      "Error liking resource:",
      error.response?.data || error.message
    );
    throw error;
  }
};
const toggleDislikeResource = async (id) => {
  try {
    const { data } = await instance.post(`/resources/${id}/dislike`);
    return data;
  } catch (error) {
    console.error(
      "Error disliking resource:",
      error.response?.data || error.message
    );
    throw error;
  }
};
export {
  createResource,
  getResources,
  getResourceById,
  deleteResource,
  toggleLikeResource,
  toggleDislikeResource,
};
