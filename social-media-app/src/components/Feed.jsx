import React from "react";
import { Card, Row } from "react-bootstrap";
import { FaHeart, FaThumbsUp, FaComment } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import styles from "./feed.module.css";

const Feed = ({
    post,
    onTapHeartIcon,
    onTapLikeIcon,
    showCommentBtn = true,
}) => {
    const { currentUser } = useAuth();
    return post ? (
        <Card className={styles.card}>
            <Card.Header className={styles.cardHeader}>
                <p>{post?.username}</p>
                <p>{new Date(post?.timestamp?.seconds * 1000).toLocaleDateString()}</p>
            </Card.Header>
            <Card.Img variant="top" src={post?.imageSrc} />
            <Card.Text>{post?.caption}</Card.Text>
            <Card.Footer className={styles.cardFooter}>
                <Row className={styles.cardFooterRow}>
                    <div className={styles.iconContainer}>
                        <div className={styles.iconItem}>
                            <FaHeart
                                className={styles.icon}
                                color={
                                    post?.hearts?.includes(currentUser?.uid) ? "red" : "grey"
                                }
                                onClick={() => onTapHeartIcon(post)}
                            />
                        </div>
                        <div className={styles.iconItem}>
                            <FaThumbsUp
                                className={styles.icon}
                                color={
                                    post?.likes?.includes(currentUser?.uid) ? "blue" : "grey"
                                }
                                onClick={() => onTapLikeIcon(post)}
                            />
                        </div>
                    </div>
                    {showCommentBtn && (
                        <div className={styles.iconItem}>
                            <FaComment />
                        </div>
                    )}
                </Row>
            </Card.Footer>
        </Card>
    ) : null;
};

export default Feed;
