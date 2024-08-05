const Booking = require("../models/bookingModel.js");

// Get bookings
const getBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.find();

        if(!bookings){
            res.status(400).json({message:"Cannot find booking"});
        }
        return res.status(200).json(bookings);
    } catch (error) {
        next(error);
    }
};

//create booking
const createBooking = async(req, res, next) =>{
    try {
        const booking = await Booking.create(req.body);

        if(!booking){

            res.status(400).json({message:"cannot create booking"});
        }

        return res.status(201).json(booking);
        
    } catch (error) {
        next(error)
    }
};

//update booking

const updateBooking = async(req, res, next) =>{
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id,
            {
                $set: req.body
            },
            {
                new: true,
            },
        );

        if(!updatedBooking){

            res.status(400).json({message:"cannot create booking"});
        }
        const bookings = await Booking.find(); 
        return res.status(200).json(bookings);

    } catch (error) {
        next(error)
    }
};

//delete booking

const deleteBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);

        if (!booking) {
            res.status(400).json({message:"Booking not found"});
        }

        return res.status(200).json({ message: "Booking deleted successfully", id: req.params.id });
        
    } catch (error) {
        next(error);
    }
};

//get single booking
const getBooking = async (req, res, next) =>{
    try {
        const booking = await Booking.findById(req.params.id);

        if(!booking){
            res.status(400).json({message:"booking not found"});
        }

        return res.status(200).json(booking);
    } catch (error) {
        next(error)
    }
};
module.exports = {
    getBookings,
    createBooking,
    updateBooking,
    deleteBooking,
    getBooking,
};
