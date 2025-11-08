import { storySchema, memberSchema, paymentSchema, paymentParticipantShareSchema } from "../schema";
import { z } from "zod";

export type Story = z.infer<typeof storySchema>;
export type Member = z.infer<typeof memberSchema>;
export type Payment = z.infer<typeof paymentSchema>;
export type PaymentParticipantShare = z.infer<typeof paymentParticipantShareSchema>;