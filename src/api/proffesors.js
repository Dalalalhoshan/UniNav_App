import instance from ".";
const createProfessor = async (professorInfo) => {
 try {
 const { data } = await instance.post('/professors', professorInfo);
 return data;
 } catch (error) {
 console.error('Error creating professor:', error.response?.data || error.message);
 throw error;
 }
};
const getProfessors = async () => {
 try {
 const { data } = await instance.get('/professors');
 return data;
 } catch (error) {
 console.error('Error fetching professors:', error.response?.data || error.message);
 throw error;
 }
};
const getProfessorById = async (id) => {
 try {
 const { data } = await instance.get(`/professors/${id}`);
 return data;
 } catch (error) {
 console.error('Error fetching professor:', error.response?.data || error.message);
 throw error;
 }
};
const updateProfessor = async (id, professorInfo) => {
 try {
 const { data } = await instance.put(`/professors/${id}`, professorInfo);
 return data;
 } catch (error) {
 console.error('Error updating professor:', error.response?.data || error.message);
 throw error;
 }
};
const deleteProfessor = async (id) => {
 try {
 const { data } = await instance.delete(`/professors/${id}`);
 return data;
 } catch (error) {
 console.error('Error deleting professor:', error.response?.data || error.message);
 throw error;
 }
};
const addProfessorRating = async (professorId, rating) => {
 try {
 const { data } = await instance.post(`/professors/${professorId}/rate`, rating);
 return data;
 } catch (error) {
 console.error('Error adding professor rating:', error.response?.data || error.message);
 throw error;
 }
};
export {
 createProfessor,
 getProfessors,
 getProfessorById,
 updateProfessor,
 deleteProfessor,
 addProfessorRating,
};