import { model, Schema } from "mongoose";
import { ITour, ITourType } from "./tour.interface";

const tourTypeSchema = new Schema<ITourType>(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  },
);

export const TourType = model<ITourType>("TourType", tourTypeSchema);

const tourSchema = new Schema<ITour>(
  {
    title: { type: String, required: true },
    slug: { type: String,  unique: true },
    thumbnail: { type: String },
    description: { type: String },
    images: { type: [String], required: true },
    location: { type: String },
    costFrom: { type: Number },
    startDate: { type: Date },
    endDate: { type: Date },
    departureLocation: { type: String },
    arrivalLocation: { type: String },
    included: { type: [String] },
    excluded: { type: [String] },
    aminities: { type: [String] },
    tourPlan: { type: String },
    maxGuest: { type: Number },
    minAge: { type: Number },
    division: { type: Schema.Types.ObjectId, ref: "Division", required: true },
    tourType: { type: Schema.Types.ObjectId, ref: "TourType", required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

tourSchema.pre("save", async function (next) {
  if (this.isModified("title") || this.isNew) {
    const baseSlug = this.title.toLowerCase().split(" ").join("-");
    let slug = `${baseSlug}-tour`;
    let counter = 0;
    while (await Tour.exists({ slug })) {
      slug = `${baseSlug}-tour-${counter++}`;
    }
    this.slug = slug;
  }
  next();
});

tourSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate() as Partial<ITour>;
   if (update.title) {
        const baseSlug = update.title.toLowerCase().split(" ").join("-")
        let slug = `${baseSlug}`


        let counter = 0;
        while (await Tour.exists({ slug })) {
            slug = `${baseSlug}-tour-${counter++}` // dhaka-division-2
        }

        update.slug = slug
    }

    this.setUpdate(update)

    next()
});

export const Tour = model<ITour>("Tour", tourSchema);
