import { z } from 'zod';

export const paymentParticipantShareSchema = z.object({
  memberId: z.uuid().optional(),
  amount: z.number().positive('Share must be > 0'),
});

export const memberSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  memberId: z.uuid(),
});

export const paymentSchema = z.object({
  paymentId: z.uuid().optional(),
  amount: z.number().min(0.01, 'Amount must be at least 0.01'),
  description: z.string().min(1, 'Description is required'),
  date: z.string().optional(),

  payer: memberSchema,
  participants: z
    .array(z.uuid())
    .min(1, 'At least one participant is required'),

  splitType: z.enum(['equal', 'custom']).default('equal').optional(),
  customSplits: z.array(paymentParticipantShareSchema).optional(),
});

export const storySchema = z.object({
  storyId: z.uuid().optional(),
  title: z
    .string()
    .min(1, 'Title is required')
    .max(50, 'Title should be at most 50 characters'),
  description: z
    .string()
    .max(100, 'Description should be at most 100 characters')
    .optional(),

  members: z.array(memberSchema),
  payments: z.array(paymentSchema).default([]).optional(),
});
