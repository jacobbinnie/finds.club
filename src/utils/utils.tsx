import * as crypto from "crypto";

export const usernamePattern = /^(?![-.])[\w.-]{3,20}(?<![-.])$/;

export const hashString = (id: string) => {
  return crypto.createHash("md5").update(id).digest("hex");
};
