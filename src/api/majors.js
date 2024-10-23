import instance from ".";

const getMajors = async () => {
    try {
        const response = await instance.get("/major");
        return response.data;
    } catch (error) {
        console.error("Error fetching majors:", error);
        throw error;
    }
};

const getMajor = async (id) => {
    try {
        const response = await instance.get(`/major/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching major with id ${id}:`, error);
        throw error;
    }
};
const createMajor = async (major) => {
    try {
        const response = await instance.post("/major", major);
        return response.data;
    } catch (error) {
        console.error("Error creating major:", error);
        throw error;
    }
};
const updateMajor = async (id, major) => {
    try {
        const response = await instance.put(`/major/${id}`, major);
        return response.data;
    } catch (error) {
        console.error(`Error updating major with id ${id}:`, error);
        throw error;
    }
};
const deleteMajor = async (id) => {
    try {
        const response = await instance.delete(`/major/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting major with id ${id}:`, error);
        throw error;
    }
};
export { getMajors, getMajor, createMajor, updateMajor, deleteMajor };
