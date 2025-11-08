import { signIn} from '@/middleware';
import { Button } from '@/components/ui/button';

export const LoginButton: React.FC = () => {
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