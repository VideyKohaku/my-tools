'use client';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { storySchema } from '@/app/schema';
import { Story } from '@/app/type';
import { v4 as uuid } from 'uuid';
import { ACTION } from '@/app/constants';
import { useStoryDataContext } from '@/app/context/storiesContext';

import { Field, FieldLabel, FieldError, Input, Button, Card } from '@ui/index';
import { SpacerMd } from '../Spacers';

interface IStoryForm {
  titleRef?: React.RefObject<HTMLLabelElement>;
}

const mockMember = {
  name: 'Sora',
  memberId: uuid(),
};

export const StoryForm: React.FC<IStoryForm> = ({ titleRef }) => {
  const { dispatch } = useStoryDataContext();
  const { control: formControl, handleSubmit } = useForm<Story>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(storySchema),
    defaultValues: {
      title: '',
      description: 'This bill was created for ...',
      members: [mockMember],
      payments: [],
    },
  });

  const onSubmit = (data: Story) => {
    dispatch({
      type: ACTION.ADD_STORY,
      payload: {
        storyId: uuid(),
        ...data,
      },
    });
  };

  return (
    <Card
      className="
      flex flex-col gap-4 w-full p-6
    "
    >
      <form
        onSubmit={handleSubmit(onSubmit, (e) => {
          console.log('Errors:', e);
        })}
        className="w-full"
      >
        <Controller
          name="title"
          control={formControl}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="story-title" ref={titleRef}>
                Bill Title
              </FieldLabel>
              <Input
                {...field}
                id="story-title"
                placeholder="My bill title (E.g., Đi Đà Lạt)"
                data-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <SpacerMd />
        <Controller
          name="description"
          control={formControl}
          render={({ field, fieldState }) => {
            return (
              <Field>
                <FieldLabel htmlFor="story-description">
                  Bill Description
                </FieldLabel>
                <Input
                  {...field}
                  id="story-description"
                  placeholder="Description for the bill"
                  data-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            );
          }}
        />
        <SpacerMd />
        <Field>
          <Button type="submit">Submit</Button>
        </Field>
      </form>
    </Card>
  );
};
