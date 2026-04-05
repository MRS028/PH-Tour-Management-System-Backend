import { model, Schema } from "mongoose";
import { IDivision } from "./division.interface";

const divisionSchema = new Schema<IDivision>({
    name: { type: String, required: true , unique:true},
    slug: { type: String,  unique: true },
    thumbnail: { type: String, required: true },
    description: { type: String },
    isDeleted: { type: Boolean, default: false },
},
{
    timestamps: true,
    versionKey: false,
}
);

divisionSchema.pre("save", async function (next) {
    if (this.isModified("name") ) {
        const baseSlug = this.name.toLowerCase().split(" ").join("-")
        let slug = `${baseSlug}-division`

        let counter = 0;
        while (await Division.exists({ slug })) {
            slug = `${baseSlug}-division-${counter++}`
        }

        this.slug = slug;
    }
    next();
});

divisionSchema.pre("findOneAndUpdate", async function (next) {
    const update = this.getUpdate() as Partial<IDivision>;
        if (update.name) {
            const baseSlug = update.name.toLowerCase().split(" ").join("-")
            let slug = `${baseSlug}-division`            

            let counter = 0;
            while (await Division.exists({ slug })) {
                slug = `${baseSlug}-division-${counter++}`
            }

            update.slug = slug;
        }

        this.setUpdate(update)
    next();
});

export  const Division = model<IDivision>("Division", divisionSchema);