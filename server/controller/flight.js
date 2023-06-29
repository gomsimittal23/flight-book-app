const Flight = require('../models/Flight');
const moment = require('moment');

const createFlight = (req, res) => {
    console.log(req.body);

    res.setHeader("Content-Type", "application/json");

    const newFlight = new Flight({
        ...req.body,
    });

    newFlight.save()
    .then(() => {
        res.status(200).json("Added the Flight");
    })
    .catch((err) => {
        console.log(err);
        res.status(400).json(`Error: ${err}`);
    })
}

const removeFlight = async (req, res) => {
    console.log(req.body);

    res.setHeader("Content-Type", "application/json");
    console.log("remove called")

    if(!req.body.id)
    {
        res.status(400).json("Please provide the ID")
    }

    const flight = await Flight.findByIdAndRemove(req.body.id);

    if(flight)
    {
        console.log(flight);
        res.status(200).json("Flight deleted successfully");
    }
    else
    {
        res.status(400).json("Incorrect ID");
    }
}

const viewFlights = async (req, res) => {
    console.log(req.body);

    const { date, flightNumber, departureTime } = req.body;

    res.setHeader("Content-Type", "application/json");

    try 
        {
            const times = departureTime.split(':').map(Number);
            // const startTime = new Date(date);
            // startTime.setHours(times[0], times[1], times[2], times[3]);
            const startTime = moment.utc(`${date}T${times[0]}:${times[1]}:${times[2]}Z`, 'YYYY-MM-DDTHH:mm:ss[Z]');

            console.log(startTime)

            if(!flightNumber)
            {
                const flights = await Flight.find({
                    departureTime: startTime,
                });
                
                res.status(200).json(flights);
            }
            else
            {
                const flights = await Flight.find({
                    departureTime: startTime,
                    flightNumber
                });
                
                res.status(200).json(flights);
            }

        } 
        catch (error) {
            res.status(400).json(`Error ${error}`);
        }

    
}

module.exports = {
    createFlight,
    removeFlight,
    viewFlights
}