import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [newVehicle, setNewVehicle] = useState('');
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/vehicles')
      .then(response => {
        setVehicles(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the vehicles!', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      axios.put(`http://localhost:5000/api/vehicles/${editId}`, { name: editValue })
        .then(response => {
          setVehicles(vehicles.map(vehicle => vehicle._id === editId ? response.data : vehicle));
          setEditId(null);
          setEditValue('');
        });
    } else {
      axios.post('http://localhost:5000/api/vehicles', { name: newVehicle })
        .then(response => {
          setVehicles([...vehicles, response.data]);
          setNewVehicle('');
        });
    }
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/vehicles/${id}`)
      .then(() => {
        setVehicles(vehicles.filter(vehicle => vehicle._id !== id));
      });
  };

  const enableEditMode = (vehicle) => {
    setEditId(vehicle._id);
    setEditValue(vehicle.name);
  };

  const cancelEditMode = () => {
    setEditId(null);
    setEditValue('');
  };

  return (
    <div>
      <h1 className="header">Vehicle Management Log</h1>
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">{editId ? "Edit Item" : "New Item  "}</label>
          <input
            value={editId ? editValue : newVehicle}
            onChange={(e) => editId ? setEditValue(e.target.value) : setNewVehicle(e.target.value)}
            type="text"
            id="item"
          />
        </div>
        <button className="btn">{editId ? "Update" : "Add"}</button>
        {editId && (
          <button
            type="button"
            onClick={cancelEditMode}
            className="btn btn-danger"
          >
            Cancel
          </button>
        )}
      </form>

      <table className="vehicle-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map(vehicle => (
            <tr key={vehicle._id}>
              <td>{vehicle.name}</td>
              <td>
                <button onClick={() => enableEditMode(vehicle)} className="btn">Edit</button>
                <button onClick={() => handleDelete(vehicle._id)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default App;
