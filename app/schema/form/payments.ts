import {z} from "zod";

export const paymentParticipantShareSchema = z.object({
  memberId: z.uuid(),
  amount: z.number().positive("Share must be > 0"),
});

export const memberSchema = z.object({
    name: z.string().min(1, "Name is required"),
    id: z.uuid()
});

export const paymentSchema = z.object({
    payer: memberSchema,

    amount: z.number().min(0.01, "Amount must be at least 0.01"),
    description: z.string().min(1, "Description is required"),
    date: z.string().optional(),

    participants: z.array(z.uuid()).min(1, "At least one participant is required"),

    splitType: z.enum(["equal", "custom"]).default("equal"),
    customSplits: z.array(paymentParticipantShareSchema).optional(),
});

export const storySchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    members: z.array(memberSchema),
    payments: z.array(paymentSchema).default([]),
});