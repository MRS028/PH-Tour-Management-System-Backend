import { Payment } from "./../payment/payment.model";
import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { User } from "../user/user.model";
import { BOOKING_STATUS, IBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import { Tour } from "../tour/tour.model";
import e from "express";

const getTransactionId = () => {
  return `TRXN${Date.now()}${Math.floor(Math.random() * 1000)}`;
};

/**
 * createBooking => create Payment => update Booking with Payment ID => Real DB
 * if error-> delete created booking and payment (if created) to maintain data integrity
 */

const createBooking = async (payload: Partial<IBooking>, userId: string) => {
  const transactionId = getTransactionId();

  //   session start
  const session = await Booking.startSession();
  session.startTransaction();

  try {
    const user = await User.findById(userId);
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

    const booking = await Booking.create(
      [{
        user: userId,
        status: BOOKING_STATUS.PENDING,
        ...payload,
      }],
      { session },
    );

    //   throw new Error("Simulated error after booking creation");

    const payment = await Payment.create(
      [{
        booking: booking[0]._id,
        amount: amount,
        status: BOOKING_STATUS.PENDING,
        transactionId: transactionId,
      }],
      { session },
    );

    const updatedBooking = await Booking.findByIdAndUpdate(
      booking[0]._id,
      { payment: payment[0]._id },
      { new: true, runValidators: true, session },
    )
      .populate("user", "name email phone address")
      .populate("tour", "title costFrom")
      .populate("payment");

    await session.commitTransaction();
    session.endSession();

    return updatedBooking;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
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
