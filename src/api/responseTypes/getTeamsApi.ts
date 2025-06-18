import { z } from "zod";

export const SingleTeamMemberSchema = z
  .object({
    uuid: z.number(),
    profileId: z.number(),
    userName: z.string(),
    userEmail: z.string(),
    profilePic: z.string().nullable(),
  })
  .strict();

export type SingleTeamMemberType = z.infer<typeof SingleTeamMemberSchema>;

export const SingleTeamSchema = z
  .object({
    teamId: z.number(),
    teamName: z.string(),
    teamCreator: z.array(SingleTeamMemberSchema),
    teamLeader: z.array(SingleTeamMemberSchema),
    teamMembers: z.array(SingleTeamMemberSchema),
    createdAt: z.string(),
  })
  .strict();

export type SingleTeamType = z.infer<typeof SingleTeamSchema>;
