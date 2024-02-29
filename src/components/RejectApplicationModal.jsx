import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import CustomButton from "./CustomButton";
import { themecolor } from "../utils/constant";

function RejectApplicationModal({ show, handletoggle, postApi, getApi }) {
  const [description, setDescription] = useState("");

  const handleClick = async () => {
    await postApi({
      isRejected: true,
      description: description,
    });

    await getApi();
    setDescription("");
    handletoggle();
  };
  return (
    <Modal show={show} onHide={handletoggle}>
      <Modal.Header closeButton>
        <Modal.Title>Rejection Reason</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-4">
          <Form.Label>Reason for rejection</Form.Label>
          <Form.Control
            placeholder="Enter reason"
            as={"textarea"}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <div>
          <CustomButton
            name={"Submit"}
            bgColor={themecolor.primary}
            color={"#fff"}
            handleClick={handleClick}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default RejectApplicationModal;
