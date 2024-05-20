import { ApiCommentService } from "@/types";
import Comment from "@/types/comment";
import axios from "axios";

const apiCommentService: ApiCommentService = {
  /**
   * Function to get all comments by id_img
   * @param id_img
   * @returns Comment[]
   */
  async getAllDataById(id_img: string) {
    try {
      const response = await axios.get<Comment[]>(
        `${process.env.NEXT_PUBLIC_API_COMMENT_URL}`,
        {
          params: {
            id_img,
          },
        }
      );

      const comments: Comment[] = response.data.map(
        ({ id, comment, id_img, active, created_at }) => ({
          id,
          comment,
          id_img,
          active,
          created_at,
        })
      );

      return comments;
    } catch (error) {
      throw new Error("Failed to fetch data from Comment-API");
    }
  },

  /**
   * Function to create comment
   * @param id_img
   * @param comment
   * @returns Comment
   */
  async create(id_img: string, comment: string) {
    try {
      const requestData = {
        id_img,
        comment,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_COMMENT_URL}/save`,
        requestData
      );

      const commentResponse: Comment = response.data;

      return commentResponse;
    } catch (error) {
      console.error(
        "Error fetching data in create comment from Comment-API",
        error
      );
      throw new Error(
        "Failed to fetch data in create comment from Comment-API"
      );
    }
  },
};

export default apiCommentService;
