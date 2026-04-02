import { Types } from "mongoose";

export enum PAYMENT_STATUS {
    PENDING = 'pending',
    UNPAID = 'unpaid',
    PAID = 'paid',
    CANCELED = 'canceled',
    SUCCESS = 'success',
    FAILED = 'failed',
    REFUNDED = 'refunded'
}

export interface IPayment {
   booking: Types.ObjectId;
   transactionId: string;
   status: PAYMENT_STATUS;
   amount: number;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   paymentGatewayData?: any;
   invoiceUrl?: string;
   createdAt: Date;
   updatedAt: Date;
}