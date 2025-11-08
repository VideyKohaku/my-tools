import { Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import z from "zod";

const storySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  members: z.array(z.string()),
})

export default function Home() {
  const { register, handleSubmit } = useForm();
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Button>Click Me</Button>
        
      </main>
    </div>
  );
}
