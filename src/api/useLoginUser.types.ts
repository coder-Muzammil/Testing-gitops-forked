import { z } from "zod";

export const UserDetailSchema = z
  .object({
    accessToken: z.string(),
    profileId: z.number(),
    profilePic: z.string().nullable(),
    refreshToken: z.string(),
    userEmail: z.string(),
    userName: z.string(),
    userType: z.union([z.literal("superAdmin"), z.literal("user")]),
    uuid: z.number(),
  })
  .strict();

export type UserDetailType = z.infer<typeof UserDetailSchema>;
