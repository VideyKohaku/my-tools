import { Suspense } from 'react';
import { signIn} from '@/middleware';
import { Button } from '@/components/ui/button';
 
const LoginForm: React.FC = () => {
    const handleLogin = async () => {
        "use server"
        await signIn("google")
    }

    return (
        <form action={handleLogin} className="flex flex-col space-y-4">
            <Button>Sign in with google</Button>
        </form>
    );
}
 
export function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}