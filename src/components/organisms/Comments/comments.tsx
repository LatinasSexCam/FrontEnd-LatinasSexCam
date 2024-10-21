import axios from 'axios';
import { useState, useEffect } from 'react';
import Comment from "../../atoms/Comment/comment";
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
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get('https://backlatinassexcam.onrender.com/LatinasSexCam/comments');
        setComments(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching comments');
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  const handleImageError = (id: string) => {
    setImageError(prev => ({ ...prev, [id]: true }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className={styles.comments}>
      <h2 className={styles.comments__title}>Comments</h2>

      <ul className={styles.comments__list}>
        {comments.length === 0 ? (
          <li>No comments available.</li>
        ) : (
          comments.map((comment) => (
            <li key={comment.idComment}>
              <Comment 
                comment={comment}
                handleImageError={handleImageError}
                imageError={imageError}
              />
            </li>
          ))
        )}
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