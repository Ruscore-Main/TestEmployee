import React, { useState } from "react";
import Registration from "./Registration";
import { useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";

const AddUser = ({ updateTable }) => {
  const [isModal, setIsModal] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <button
        className="button button--outline"
        onClick={() => setIsModal(true)}
      >
        Добавить сотрудника
      </button>

      <Modal show={isModal} onHide={() => setIsModal(false)} className="p-2">
        <Modal.Header closeButton>
          <Modal.Title>Добавление сотрудника</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Registration
            dispatch={dispatch}
            isAdmin
            closeModal={() => setIsModal(false)}
            updateTable={updateTable}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddUser;
