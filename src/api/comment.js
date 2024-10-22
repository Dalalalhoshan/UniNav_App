import instance from ".";
const getComments = async (type, id) => {
 try {
 const { data } = await instance.get(`/comments/${type}/${id}`);
 return data;
 } catch (error) {
 console.error('Error fetching comments:', error.response?.data || error.message);
 throw error;
 }
};
const createComment = async (type, id, comment) => {
 try {
 const { data } = await instance.post(`/comments/${type}/${id}`, comment);
 return data;
 } catch (error) {
 console.error('Error creating comment:', error.response?.data || error.message);
 throw error;
 }
};
const deleteComment = async (commentId) => {
 try {
 const { data } = await instance.delete(`/comments/${commentId}`);
 return data;
 } catch (error) {
 console.error('Error deleting comment:', error.response?.data || error.message);
 throw error;
 }
};
const replyToComment = async (commentId, reply) => {
 try {
 const { data } = await instance.post(`/comments/${commentId}`, reply);
 return data;
 } catch (error) {
 console.error('Error replying to comment:', error.response?.data || error.message);
 throw error;
 }
};
export {
 getComments,
 createComment,
 deleteComment,
 replyToComment,
};