'use client';
import React from 'react';
import { StoryForm, OpenFormButton } from '@components/index';

export default function Home() {
  const titleRef = React.useRef<HTMLLabelElement>(null);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main
        className="
        flex flex-col items-stretch justify-between
        w-full max-w-3xl min-w-[320px] min-h-screen
        mx-auto
        px-4 py-8
        md:basis-2/3 md:px-16 md:py-32
        bg-white dark:bg-black"
      >
        <OpenFormButton focusRef={titleRef} buttonLabel="Add New Bill">
          <StoryForm />
        </OpenFormButton>
      </main>
    </div>
  );
}
