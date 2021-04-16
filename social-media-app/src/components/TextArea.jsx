import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { FaCamera } from "react-icons/fa";
import styles from "./textarea.module.css";

const TextArea = ({ onChange }) => {
    return (
        <div className={styles.container}>
            <InputGroup hasValidation>
                <Form.Control
                    type="text"
                    onChange={(evt) => onChange(evt.target.value)}
                    as="textarea"
                    className={styles.formControl}
                    placeholder="feed"
                />
                <InputGroup.Append>
                    <span className={styles.iconSpan}>
                        <FaCamera />
                    </span>
                </InputGroup.Append>
            </InputGroup>
        </div>
    );
};

export default TextArea;
