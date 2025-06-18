import { z } from "zod";

export const UserDetailSchema = z.object({
  uuid: z.number(),
  profileId: z.number(),
  userName: z.string(),
  userEmail: z.string(),
  profilePic: z.string(),
});

export type UserDetailType = z.infer<typeof UserDetailSchema>;

export const SingleTeamSchema = z.object({
  teamId: z.number(),
  teamCreator: z.array(UserDetailSchema),
  teamLeader: z.array(UserDetailSchema),
  teamMembers: z.array(UserDetailSchema),
  teamName: z.string(),
  createdAt: z.string(),
});

export type SingleTeamType = z.infer<typeof SingleTeamSchema>;
