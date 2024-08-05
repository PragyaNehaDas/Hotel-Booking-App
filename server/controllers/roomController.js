const Room = require("../models/roomsModel.js");

const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();

    if (!rooms) {
      res.status(400).json({message:"rooms not found"});
    }

    return res.status(201).json(rooms);
  } catch (error) {
    next(error);
  }
};

// Create room
const createRoom = async (req, res, next) => {
  try {
    const room = await Room.create(req.body);

    if (!room) {
      res.status(400).json({message:"There was a problem creating the room"});
    }
    // Send a success response
    res.status(201).json(room);
  } catch (error) {
    next(error);
  }
};

//get single room
const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      res.status(400).json({message:"room not found"});
    }
    return res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

//update rooms
const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!updatedRoom) {
      res.status(400).json({message:"cannot update room"});
    }

    return res.status(200).json(updatedRoom);
  } catch (error) {
    next(error);
  }
};

//delete room
const deleteRoom = async(req, res, next) =>{
    try {
        const room = await Room.findByIdAndDelete(req.params.id);

        if(!room){
            res.status(400).json({message:"room not deleted"});
        }

        return res.status(200).json({message:"room deleted successfully", id: req.params.id});
        
    } catch (error) {
        next(error)
    }
}

module.exports = {
  getRooms,
  createRoom,
  getRoom,
  updateRoom,
  deleteRoom,
};
