import React, { useEffect, useState } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [flights, setFlights] = useState([]);

  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('adminInfo'))
    {
        setAdmin(true);
    }

    if(localStorage.getItem('userInfo'))
    {
        setUser(true);
    }

    // console.log()
  }, [])

  const handleSearch = async (e) => {
    e.preventDefault();

    // Perform the search based on the user's input
    console.log('Search:', date, time, flightNumber);

    if(!date || !time)  
    {
      alert("please enter all the fields");
      return;
    }

    const searchRequest = {
      flightNumber,
      date,
      departureTime: time + ":00"
    }

    console.log(searchRequest)

    try {
      const response = await fetch(`${process.env.REACT_APP_API}/viewFlights`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchRequest),
      });

      if (response.ok) {
        const flights = await response.json();
        console.log(flights)
        console.log('flight');

        setFlights(flights)

        
      } else {
        alert("");
        console.log('search failed');
      }
    } catch (error) {
      console.error('Error occurred during search:', error);
      alert(error)
    }


    // const searchResults = [
    //   {
    //     flightNumber: 'FL123',
    //     name: 'Flight 123',
    //     seatsAvailable: 100,
    //     departureTime: '9:00 AM',
    //     arrivalTime: '11:30 AM',
    //     source: 'City A',
    //     destination: 'City B',
    //   },
    //   {
    //     flightNumber: 'FL456',
    //     name: 'Flight 456',
    //     seatsAvailable: 75,
    //     departureTime: '1:00 PM',
    //     arrivalTime: '3:30 PM',
    //     source: 'City C',
    //     destination: 'City D',
    //   },
    // ];

    // setFlights(searchResults);
  };

  const handleDeleteFlight = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/removeFlight`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id}),
      });

      if (response.ok) {
        alert("deleted flight successfully");
        window.location.reload();
      } else {
        alert("");
        console.log('deletion failed');
      }
    } catch (error) {
      console.error('Error occurred during delete:', error);
      alert(error)
    }
  }

  const handleBookFlight = async (id, seats) => {
    if(seats == 0)
    {
      alert("flight already full");
      return;
    }
    alert("flight booked successfully");
  }

  return (
    <div className='home-container'>
      <h1>Flight Booking</h1>
      <form onSubmit={handleSearch}>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label>Time:</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        {
          admin &&
          <>
            <label>Flight Number:</label>
            <input
              type="text"
              value={flightNumber}
              onChange={(e) => setFlightNumber(e.target.value)}
            />
          </>
        }

        <button type="submit">Search</button>
        {
          admin &&
          <Link to='/add-flight'>
            <button type="submit">Add a flight</button>
          </Link>
        }
      </form>

      <div className="flight-list">
        {flights.map((flight, index) => (
          <div className="flight-item" key={index}>
            <div className="flight-image">
              <img src='https://img.freepik.com/premium-vector/flying-airplane-realistic-composition-with-sky-scenery-passenger-airplane-gaining-height-with-air-jet-trails-vector-illustration_1284-78981.jpg?w=2000' alt="Flight" />
            </div>
            <div className="flight-details">
              <h2>{flight.flightNumber}</h2>
              <p>{flight.name}</p>
              <p>Seats Available: {flight.seats}</p>
              <p>Departure Time: {flight.departureTime}</p>
              <p>Arrival Time: {flight.arrivalTime}</p>
              <p>Source: {flight.source}</p>
              <p>Destination: {flight.destination}</p>
              {
                user &&
                <button onClick={() => handleBookFlight(flight._id, flight.seats)}>Book Now</button>
              }
              {
                admin &&
                <button id='delete' onClick={() => handleDeleteFlight(flight._id)}>Delete</button>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
