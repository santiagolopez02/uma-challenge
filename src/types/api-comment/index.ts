import Comment from "../comment";

export default interface ApiCommentService {
  getAllDataById: (id_img: string) => Promise<Comment[]>;
  create: (id_img: string, comment: string) => Promise<Comment>;
}
