'use client';
import {
  createContext,
  useContext,
  ReactNode,
  Dispatch,
  useReducer,
} from 'react';
import { Story, Member, Payment, PaymentParticipantShare } from '@/app/type';
import { ACTION } from '../constants';

interface StoryDataContextType {
  stories: Story[];
  dispatch: Dispatch<StoryAction>;
}

const initialStoriesData: Story[] = [];

type StoryAction =
  | { type: ACTION.ADD_STORY; payload: Story }
  | { type: ACTION.UPDATE_STORY; payload: Story }
  | { type: ACTION.DELETE_STORY; payload: string }
  | {
      type: ACTION.ADD_MEMBER;
      payload: { storyId: string; member: Member };
    }
  | {
      type: ACTION.REMOVE_MEMBER;
      payload: { storyId: string; member: Member };
    }
  | {
      type: ACTION.ADD_PAYMENT;
      payload: { storyId: string; payment: Payment };
    }
  | {
      type: ACTION.UPDATE_PAYMENT;
      payload: { storyId: string; payment: Payment };
    }
  | {
      type: ACTION.REMOVE_PAYMENT;
      payload: { storyId: string; payment: Payment };
    };

export const StoryDataContext = createContext<StoryDataContextType | null>(
  null,
);

const reducer = (stories: Story[], action: StoryAction): Story[] => {
  switch (action.type) {
    // Implement action handlers here
    case ACTION.ADD_STORY:
      return [...stories, action.payload];
    case ACTION.UPDATE_STORY:
      return stories.map((story) =>
        action.payload.storyId === story.storyId ? action.payload : story,
      );
    case ACTION.DELETE_STORY:
      return stories.filter((story) => story.storyId !== action.payload);
    case ACTION.ADD_MEMBER:
      return stories.map((story) => {
        if (story.storyId === action.payload.storyId) {
          return {
            ...story,
            members: [...story.members, action.payload.member],
          };
        }
        return story;
      });
    case ACTION.REMOVE_MEMBER:
      return stories.map((story) => {
        if (story.storyId === action.payload.storyId) {
          return {
            ...story,
            members: story.members.filter(
              (member) => member.memberId !== action.payload.member.memberId,
            ),
          };
        }
        return story;
      });
    case ACTION.ADD_PAYMENT:
      return stories.map((story) => {
        if (story.storyId === action.payload.storyId) {
          const otherPayments = story.payments || [];
          return {
            ...story,
            payments: [...otherPayments, action.payload.payment],
          };
        }
        return story;
      });
    case ACTION.UPDATE_PAYMENT:
      return stories.map((story) => {
        if (story.storyId === action.payload.storyId) {
          const paymentsArr = story.payments || [];
          return {
            ...story,
            payments: paymentsArr.map((payment) => {
              if (payment.paymentId === action.payload.payment.paymentId) {
                return action.payload.payment;
              }
              return payment;
            }),
          };
        }
        return story;
      });
    case ACTION.REMOVE_PAYMENT:
      return stories.map((story) => {
        if (story.storyId === action.payload.storyId) {
          const paymentsArr = story.payments || [];
          return {
            ...story,
            payments: paymentsArr.filter(
              (payment) =>
                payment.paymentId !== action.payload.payment.paymentId,
            ),
          };
        }
        return story;
      });
    default:
      return stories; // Placeholder reducer
  }
};

export function StoryProvider({ children }: { children: ReactNode }) {
  const [stories, dispatch] = useReducer(reducer, initialStoriesData);

  return (
    <StoryDataContext.Provider value={{ stories, dispatch }}>
      {children}
    </StoryDataContext.Provider>
  );
}

export const useStoryDataContext = () => {
  const ctx = useContext(StoryDataContext);
  if (!ctx)
    throw new Error('useStoryContext must be used inside StoryProvider');
  return ctx;
};
