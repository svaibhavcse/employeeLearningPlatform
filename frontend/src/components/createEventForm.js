import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const CreateEventForm = () => {
  // State for form data
  const [formData, setFormData] = useState({
    eventName: '',
    eventDescription: '',
    date: '',
    time: '',
    location: '',
    skillSet: '',
    trainer:'',
    skills: [],
    status:'' ,
    capacity:0,
    endDate:'',
    resource:'',
    prerequisite:''
  });

  
  // Function to handle skill input
  const handleSkillInput = (event) => {
    if (event.key === 'Enter') {
      const newSkill = event.target.value.trim();
      if (newSkill) {
        setFormData({
          ...formData,
          skillSet: '',
          skills: [...formData.skills, newSkill] // Add the new skill to the skills array
        });
      }
    }
  };

  // Function to handle removing a skill
  const handleRemoveSkill = (index) => {
    const updatedSkills = formData.skills.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      skills: updatedSkills
    });
  };

  // Function to handle form submit
  const handleSubmit = async () => {
    try {
      // Send a POST request to the backend to create the event
      const response = await axios.post('http://localhost:5000/createEvent', formData);
      console.log('Event created:', response.data);
      // Reset the form after successful submission
     toast.success("Event Created Successfully !")
     setTimeout(()=>{
      setFormData({
        eventName: '',
        eventDescription: '',
        date: '',
        time: '',
        location: '',
        skillSet: '',
        trainer:'',
        skills: '',
        status:'' ,
        capacity:0,
        endDate:'',
        resource:'',
        prerequisite:'',
        endTime:''
      })
     },50000)
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error("Error creating event")
    }
  };

  // Function to handle form field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div>
    <ToastContainer position="top-right" autoClose={1500} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} draggable theme="colored"/>

    <form onSubmit={handleSubmit}>
  <div className="row">
    <div className="col-md-6">
      <label>
        Event Name:
        <input
          type="text"
          name="eventName"
          value={formData.eventName}
          onChange={handleChange}
          required
        />
      </label>
      
      <label>
        Start Date:
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Starts At:
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Ends At:
        <input
          type="time"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Trainer:
        <input
          type="text"
          name="trainer"
          value={formData.trainer}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Skill Set:
        <input
          type="text"
          name="skillSet"
          value={formData.skillSet}
          onChange={handleChange}
          required
        />
      </label>
    
      <label>
        Event Description:
        <textarea
          name="eventDescription"
          value={formData.eventDescription}
          onChange={handleChange}
          required
        />
      </label>
      </div>
    <div className="col-md-6">
      <label>
        End Date:
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Available Seats:
        <input
          type="number"
          name="capacity"
          value={formData.capacity}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Location:
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </label>
      
      <label>
        Resource:
        <input
          type="text"
          name="resource"
          value={formData.resource}
          onChange={handleChange}
          required
        />
      </label>
      <label>
      Prerequisite:
        <input
          type="text"
          name="prerequisite"
          value={formData.prerequisite}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Status:
        <input
          type="text"
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        />
      </label>
    </div>
  </div>
      <Button variant="outline-success" type="submit" style={{width:"100%", borderRadius:"25px"}}>Create Event</Button>
</form>
    </div>
  );
};

export default CreateEventForm;
