import postService from "../services/post.service";

export const postFullData = (data) => (dispatch) => {
  console.log(`actions log ${data}`);
  return postService.postFullData(data);
};
