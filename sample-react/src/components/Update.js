import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiService from '../api';

function Update() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the ID from the URL parameter
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    country: '',
  });

  useEffect(() => {
    // Fetch the existing data for the item using the ID
    apiService.getItem(id).then((response) => {
      setFormData(response.data.data);
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (formData.firstname.trim() === '' || formData.lastname.trim() === '' || !isValidEmail(formData.email)) {
      alert('Please fill in all required fields and provide a valid email address.');
      return;
    }

    // Update the item with the new data
    console.log(formData)
    apiService.updateItem(id, formData).then(() => {
      navigate('/'); // Redirect to the list after updating
    });
  };

  // Email validation function
  function isValidEmail(email) {
    // A basic email validation regex
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  }

  const handleNavigate = () => {
    // Redirect to the list page
    navigate('/');
  };

  return (
    <div className='form-container'>
      <h1>Update Item</h1>
      <button onClick={handleNavigate}>Back to List</button>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Country:</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </div>
        <button className="button-submit" type="submit">Update</button>
      </form>
    </div>
  );
}

export default Update;
