import { v4 as uuid } from "uuid";
import type { z } from "zod";
import { id } from "zod/v4/locales";

// Helper to generate UUIDs
const createMember = (name: string) => ({ id: uuid(), name });

export const mockStories:any = [
  {
    id: uuid(),
    title: "Da Lat Trip",
    description: "Weekend trip with friends",
    members: [
      createMember("Alice"),
      createMember("Bob"),
      createMember("Charlie"),
    ],
    payments: [
      {
        payer: createMember("Alice"),
        amount: 150,
        description: "Dinner",
        date: "2025-11-08",
        participants: [], // empty = include all members if you want
        splitType: "equal",
      },
      {
        payer: createMember("Bob"),
        amount: 45,
        description: "Coffee",
        date: "2025-11-09",
        participants: [], // maybe Alice + Bob
        splitType: "custom",
        customSplits: [
          { memberId: uuid(), amount: 20 }, // replace with actual memberId
          { memberId: uuid(), amount: 25 },
        ],
      },
    ],
  },
  {
    id: uuid(),
    title: "Office Lunch",
    description: "Team lunch expense",
    members: [
      createMember("David"),
      createMember("Eva"),
    ],
    payments: [
      {
        id: uuid(),
        payer: createMember("David"),
        amount: 60,
        description: "Sushi",
        participants: [], // all members
        splitType: "equal",
      },
      {
        id: uuid(),
        payer: createMember("Eva"),
        amount: 30,
        description: "Drinks",
        participants: [], // all members
        splitType: "custom",
        customSplits: [
          { memberId: uuid(), amount: 10 },
          { memberId: uuid(), amount: 20 },
        ],
      },
    ],
  },
];