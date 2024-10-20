import { StarRate } from "../StarRate/StarRate";
import styles from './comment.module.scss';
import React from 'react';

interface CommentType {
    idComment: string;
    user?: {
        profile_photo: string;
        user_name: string;
    };
    comment: string;
    stars: number;
}

interface CommentProps {
    comment: CommentType;
    handleImageError: (id: string) => void;
    imageError: Record<string, boolean>;
}

const Comment: React.FC<CommentProps> = ({ comment, handleImageError, imageError }) => {
    return (
        <article key={comment.idComment} className={styles.comment_wrapper}>
            <div className={styles.comment_wrapper__avatar}>
                {imageError[comment.idComment] || !comment.user ? (
                    <div className={styles.comment_wrapper__avatar__image} />
                ) : (
                    <img
                        onError={() => handleImageError(comment.idComment)}
                        src={comment.user.profile_photo}
                        alt="avatar"
                        className={styles.comment_wrapper__avatar__image}
                    />
                )}
            </div>
            <section className={styles.comment_wrapper__text}>
                <h3 className={styles.comment_wrapper__text__name}>
                    {comment.user?.user_name || 'Anonymous'}
                </h3>
                <p className={styles.comment_wrapper__text__comment}>
                    {comment.comment}
                </p>
            </section>
            <div className={styles.comment_wrapper__rate}>
                {Array.from({ length: comment.stars }).map((_, starIndex) => (
                    <StarRate key={`${comment.idComment}-Star-${starIndex}`} />
                ))}
            </div>
        </article>
    );
};

export default Comment;