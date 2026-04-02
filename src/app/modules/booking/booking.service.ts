import { Payment } from "./../payment/payment.model";
import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { User } from "../user/user.model";
import { BOOKING_STATUS, IBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import { Tour } from "../tour/tour.model";

const getTransactionId = () => {
  return `TRXN${Date.now()}${Math.floor(Math.random() * 1000)}`;
};

const createBooking = async (payload: Partial<IBooking>, userId: string) => {
  const user = await User.findById(userId);

  const transactionId = getTransactionId();

  if (!user?.phone || !user?.address) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Please update your profile with phone and address before making a booking",
    );
  }

  const tour = await Tour.findById(payload.tour).select("costFrom");

  if (!tour?.costFrom) {
    throw new AppError(httpStatus.NOT_FOUND, "No Tour Cost found");
  }

  const amount = Number(tour.costFrom) * Number(payload.guestCount);

  const booking = await Booking.create({
    user: userId,
    status: BOOKING_STATUS.PENDING,
    ...payload,
  });

//   throw new Error("Simulated error after booking creation");

  const payment = await Payment.create({
    booking: booking._id,
    amount: amount,
    status: BOOKING_STATUS.PENDING,
    transactionId: transactionId,
  });

  const updatedBooking = await Booking.findByIdAndUpdate(
    booking._id,
    { payment: payment._id },
    { new: true, runValidators: true },
  )
    .populate("user", "name email phone address")
    .populate("tour", "title costFrom")
    .populate("payment");

  return updatedBooking;
};

const getUserBookings = async () => {
  return {};
};

const getBookingById = async () => {
  return {};
};
const getAllBookings = async () => {
  return {};
};

const updateBookingStatus = async () => {
  return {};
};

export const BookingService = {
  createBooking,
  getUserBookings,
  getBookingById,
  getAllBookings,
  updateBookingStatus,
};
