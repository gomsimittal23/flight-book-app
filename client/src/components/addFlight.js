import React, { useState } from 'react';
import './adminLogin.css';
import { useNavigate } from 'react-router-dom';

const AddFlight = () => {
  const [name, setName] = useState('');
  const [flightNumber, setFlightNumber] = useState(0);
  const [seats, setSeats] = useState(0);
  const [departureDate, setDepartureDate] = useState('')
  const [departureTime, setDepartureTime] = useState('')
  const [arrivalDate, setArrivalDate] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');


  // const { storeAdminInfo } = useContext(AdminContext); 

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(process.env.REACT_APP_API)
    // console.log("hi")

    // if(!email)   alert("please enter email");
    // if(!password)   alert("please enter password");
    if(!name || !flightNumber || !seats || !departureTime || !departureDate || !arrivalDate || !arrivalTime || !source || !destination )
    {
        alert("please fill all fields");
        return;
    }

    // Create a login request object
    const addRequest = {
        name,
        flightNumber,
        seats,
        departureTime: departureDate + "T" + departureTime + ":00Z",
        arrivalTime: arrivalDate + "T" + arrivalTime + ":00Z",
        source,
        destination
      };

      console.log(addRequest)
  
      try {
        const response = await fetch(`${process.env.REACT_APP_API}/createFlight`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(addRequest),
        });
  
        if (response.ok) {
            alert("created flight successfully")
          console.log("added flight ")
          
        } else {
          alert("addition failed");
          console.log('addition failed');
        }
      } catch (error) {
        console.error('Error occurred during addition:', error);
        alert(error)
      }
  };

  return (
    <div className="admin-login-container" style={{minHeight: '1000px'}}>
      <div className="admin-login-form">
        <h2 className="admin-login-title">Add Flight</h2>
        <form onSubmit={handleSubmit}>
          <div className="admin-login-field">
            <label htmlFor="email">Name:</label>
            <input
              type="text"
            //   id="email"
              className="admin-login-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="admin-login-field">
            <label htmlFor="email">Flight Number:</label>
            <input
              type="number"
            //   id="email"
              className="admin-login-input"
              value={flightNumber}
              onChange={(e) => setFlightNumber(e.target.value)}
            />
          </div>
          <div className="admin-login-field">
            <label htmlFor="email">Total Seats:</label>
            <input
              type="number"
            //   id="email"
              className="admin-login-input"
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
            />
          </div>
          <div className="admin-login-field">
            <label htmlFor="email">Departure Date:</label>
            <input
              type="date"
            //   id="email"
              className="admin-login-input"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
            />
          </div>
          <div className="admin-login-field">
            <label htmlFor="email">Departure Time:</label>
            <input
              type="time"
            //   id="email"
              className="admin-login-input"
              value={departureTime}
              onChange={(e) => setDepartureTime(e.target.value)}
            />
          </div>
          <div className="admin-login-field">
            <label htmlFor="email">Arrival Date:</label>
            <input
              type="date"
            //   id="email"
              className="admin-login-input"
              value={arrivalDate}
              onChange={(e) => setArrivalDate(e.target.value)}
            />
          </div>
          <div className="admin-login-field">
            <label htmlFor="email">Arrival Time:</label>
            <input
              type="time"
            //   id="email"
              className="admin-login-input"
              value={arrivalTime}
              onChange={(e) => setArrivalTime(e.target.value)}
            />
          </div>
          <div className="admin-login-field">
            <label htmlFor="email">Source:</label>
            <input
              type="text"
            //   id="email"
              className="admin-login-input"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
          </div>
          <div className="admin-login-field">
            <label htmlFor="password">Destination:</label>
            <input
              type="text"
            //   id="password"
              className="admin-login-input"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          <button type="submit" className="admin-login-button">Create Flight</button>
        </form>
      </div>
    </div>
  );
};

export default AddFlight;
