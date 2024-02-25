import React, { Fragment, useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const EditTodo = ({ todo, onUpdate }) => {
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState(todo.description);
  const [endTime, setEndTime] = useState(todo.end_date); 
  const [status, setStatus] = useState(todo.status);
  
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveChanges = async () => {
    try {
      const body = { endDate: endTime, status: status, description: description };
      const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      handleCloseModal();
      onUpdate();
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning"
        onClick={() => setShowModal(true)}
      >
        Edit
      </button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={handleDescriptionChange}
          />
          <input
            type="date"
            className="form-control mt-2"
            value={todo.end_date}
            onChange={handleEndTimeChange}
          />
          <select
            className="form-control mt-2"
            value={status}
            onChange={handleStatusChange}
          >
            <option value="Pending">Pending</option>
            <option value="Done">Done</option>
            <option value="In Progress">In Progress</option>
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="warning" onClick={handleSaveChanges}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default EditTodo;
