import { Comment } from "../../atoms/Comment/comment";
import { Comment as CommentType } from "../../../lib/types/types";
import { useNavigate } from "react-router-dom"; // Import useNavigate
interface Props {
  comments: CommentType[];
  hasBackButton?: boolean;
}
import styles from "./comments.module.scss";
import { Button } from "../../atoms/Button/button";
import { ROUTES } from "../../../lib/constants/routes";
export const Comments = ({ comments, hasBackButton }: Props) => {
  const navigate = useNavigate();

  return (
    <section className={styles.comments}>
      <h2 className={styles.comments__title}>Comments</h2>
      
      <ul className={styles.comments__list}>
        {comments.map((comment, index) => (
          <Comment key={`Comment-${index}`} comment={comment} />
        ))}
      </ul>
      <Button
        text="View More"
        type="button"
        disabled={false}
        url={ROUTES.COMMENTS.CLIENT}
        className={styles.comments__button}
      />
    </section>
  );
};
