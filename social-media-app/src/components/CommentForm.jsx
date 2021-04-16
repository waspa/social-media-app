import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import TextArea from "./TextArea";
import styles from "./commentform.module.css";

const CommentForm = ({ onSubmit }) => {
    const [caption, setCaption] = useState("");

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onSubmit({ caption: caption, imageSrc: "" });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <TextArea onChange={setCaption} />
            <Button type="submit" className={styles.button}>
                Update Status
            </Button>
        </Form>
    );
};

export default CommentForm;
