import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'; // Import Link for navigation
import apiService from '../api';


const List = () => {

  const navigate = useNavigate();

  const [items, setItems] = useState([]);

  useEffect(() => {
    apiService.getAllItems().then((response) => {
      setItems(response.data.data);
    });
  }, []);


  const handleDelete = (id) => {
    // Perform the delete operation here
    apiService.deleteItem(id).then(() => {
      // Refresh the list after deleting
      apiService.getAllItems().then((response) => {
        setItems(response.data.data);
      });
    });
  };


  const handleNavigate = () => {
    // Redirect to the create page
    navigate('/create');
  };

  return (
    <div className="list-container">
      <h1>Contact List</h1>
      <button onClick={handleNavigate}>Create Contact</button>
      <div className="card-list">
        {items.map((item) => (
          <div className="card" key={item._id}>
            <div className="card-body">
              <h2 className="card-title">{item.firstname} {item.lastname}</h2>
              <div className="card-actions">
                <Link to={`/update/${item._id}`} className="card-action">Update</Link>
                <Link
                  to="#"
                  className="card-action delete-action"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this item?')) {
                      handleDelete(item._id);
                    }
                  }}
                >
                  Delete
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

}

export default List