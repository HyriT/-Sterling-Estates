import Booking from '../Models/bookingModel.js';
import Listing from '../Models/listingModel.js';

export const createBooking = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { propertyId } = req.body;

    const property = await Listing.findById(propertyId);
    if (!property) return res.status(404).json({ message: 'Prona nuk u gjet' });

    const booking = await Booking.create({
      user: userId,
      property: propertyId,
      status: 'pending' 
    });

    res.status(201).json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gabim serveri' });
  }
};
