import { Types } from "mongoose";

export interface IDivision {
  name: string;
  thumbnail: string;
  description?: string;
  images: string[];
  location?: string;
  costFrom?: number;
  startDate?: Date;
  endDate?: Date;
  included?: string[];
  excluded?: string[];
  aminities?: string[];
  tourPlan?: string;
  maxGuest?: number;
  minAge?: number;
  division: Types.ObjectId;
  tourType: Types.ObjectId;
}