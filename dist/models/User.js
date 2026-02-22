import { model } from "mongoose";
import { UserSchema } from "../schemas/authSchemas.js";
// Create unique index on email
UserSchema.index({ email: 1 }, { unique: true });
export const User = model("User", UserSchema);
//# sourceMappingURL=User.js.map