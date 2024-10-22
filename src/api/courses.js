import instance from ".";
const getAllCourses = async () => {
 try {
 const { data } = await instance.get('/courses');
 return data;
 } catch (error) {
 console.error('Error fetching all courses:', error.response?.data || error.message);
 throw error;
 }
};
const getCourseById = async (id) => {
 try {
 const { data } = await instance.get(`/courses/${id}`);
 return data;
 } catch (error) {
 console.error('Error fetching course:', error.response?.data || error.message);
 throw error;
 }
};
const createCourse = async (courseInfo) => {
 try {
 const { data } = await instance.post('/courses', courseInfo);
 return data;
 } catch (error) {
 console.error('Error creating course:', error.response?.data || error.message);
 throw error;
 }
};
const updateCourse = async (id, courseInfo) => {
 try {
 const { data } = await instance.put(`/courses/${id}`, courseInfo);
 return data;
 } catch (error) {
 console.error('Error updating course:', error.response?.data || error.message);
 throw error;
 }
};
const deleteCourse = async (id) => {
 try {
 const { data } = await instance.delete(`/courses/${id}`);
 return data;
 } catch (error) {
 console.error('Error deleting course:', error.response?.data || error.message);
 throw error;
 }
};
const addComment = async (id, comment) => {
 try {
 const { data } = await instance.post(`/courses/${id}/comments`, comment);
 return data;
 } catch (error) {
 console.error('Error adding comment:', error.response?.data || error.message);
 throw error;
 }
};
const addRating = async (id, rating) => {
 try {
 const { data } = await instance.post(`/courses/${id}/ratings`, rating);
 return data;
 } catch (error) {
 console.error('Error adding rating:', error.response?.data || error.message);
 throw error;
 }
};
export {
 getAllCourses,
 getCourseById,
 createCourse,
 updateCourse,
 deleteCourse,
 addComment,
 addRating,
};