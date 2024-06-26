import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
const EditEventModal = ({ event, show, handleClose, handleUpdate }) => {
  const [editedEvent, setEditedEvent] = useState({ ...event });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent({ ...editedEvent, [name]: value });
  };

  const handleSubmit = () => {
    handleClose();
    handleUpdate(editedEvent);
  };

  return (
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Edit Event</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <label>
                Event Name:
                <input
                  type="text"
                  name="eventName"
                  value={editedEvent.eventName}
                  onChange={handleChange}
                />
              </label>
              <label>
                Start Date:
                <input
                  type="date"
                  name="date"
                  value={editedEvent.date.slice(0, 10)}
                  onChange={handleChange}
                />
              </label>
              <label>
                Starts At:
                <input
                  type="time"
                  name="time"
                  value={editedEvent.time}
                  onChange={handleChange}
                />
              </label>
              <label>
                Ends At:
                <input
                  type="time"
                  name="endTime"
                  value={editedEvent.endTime}
                  onChange={handleChange}
                />
              </label>
              <label>
                Trainer:
                <input
                  type="text"
                  name="trainer"
                  value={editedEvent.trainer}
                  onChange={handleChange}
                />
              </label>
              <label>
                Skillset:
                <input
                  type="text"
                  name="skillSet"
                  value={editedEvent.skillSet}
                  onChange={handleChange}
                />
              </label>
            </form>
          
            <label>
              Event Description:
              <textarea
                name="eventDescription"
                value={editedEvent.eventDescription}
                onChange={handleChange}
              />
            </label>
            </div>
          <div className="col-md-6">
            <label>
              End Date:
              <input
                type="date"
                name="endDate"
                value={ editedEvent.endDate.slice(0, 10)}
                onChange={handleChange}
              />
            </label>
            <label>
              Capacity :
              <input
                type="number"
                name="capacity"
                value={editedEvent.capacity}
                onChange={handleChange}
              />
            </label>
            <label>
              Location:
              <input
                type="text"
                name="location"
                value={editedEvent.location}
                onChange={handleChange}
              />
            </label>
            <label>
        Resource:
        <input
          type="text"
          name="resource"
          value={editedEvent.resource}
          onChange={handleChange}
          required
        />
      </label>
      <label>
      Prerequisite:
        <input
          type="text"
          name=" prerequisite"
          value={editedEvent.prerequisite}
          onChange={handleChange}
          required
        />
      </label>
            <label>
              Status:
              <input
                type="text"
                name="status"
                value={editedEvent.status}
                onChange={handleChange}
              />
            </label>
          </div>
        </div>
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="outline-success" type="submit" onClick={handleSubmit} style={{width:"200%", borderRadius:"25px"}}>Save Changes</Button>
    </Modal.Footer>
  </Modal>
  
  );
};

export default EditEventModal;