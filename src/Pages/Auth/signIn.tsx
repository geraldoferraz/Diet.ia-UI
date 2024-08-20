import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { userAuthenticate } from "@/api/authenticate";
import { toast } from "sonner";
import { FaSpinner } from "react-icons/fa";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const signInFormData = z.object({
    email: z.string().email(),
    password: z.string()
});

type SignInFormData = z.infer<typeof signInFormData>;

export function SignIn() {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignInFormData>();

    const { mutateAsync: authenticate } = useMutation({
        mutationFn: userAuthenticate,
    });

    async function handleSignIn(data: SignInFormData) {
        try {
            const response = await authenticate({
                email: data.email,
                password: data.password,
            });

            if (response.id) {
                localStorage.setItem('userId', response.id);
                toast.success('Usuário autenticado com sucesso.');
                navigate('/'); 
            } else {
                toast.error('Falha ao autenticar. Tente novamente.');
            }

        } catch (err) {
            toast.error('Credenciais inválidas.');
            console.error('Erro durante a autenticação:', err);
        }
    }

    return (
        <>
            <Helmet title="Login" />
            <div className="p-8">
                <div className="absolute right-4 top-8">
                    <ThemeToggle />
                </div>

                <div className="w-[350px] flex flex-col justify-center gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">Acessar treinos</h1>
                        <p className="text-sm text-muted-foreground">Monitore todos os seus treinos diários</p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
                        <div className="space-y-2">
                            <Label htmlFor="email">E-mail</Label>
                            <Input id="email" type="email" {...register('email')} />
                        </div>

                        <div className="space-y-2 pb-1">
                            <Label htmlFor="password">Senha</Label>
                            <Input id="password" type="password" {...register('password')} />
                        </div>

                        <Link to="/sign-up" className="text-sm transition-colors duration-300 ease-in-out hover:text-primary">
                            Ainda não tem conta?
                        </Link>

                        <Button disabled={isSubmitting} type="submit" className="w-full flex items-center justify-center">
                            {isSubmitting ? <FaSpinner className="animate-spin" /> : 'Acessar conta'}
                        </Button>
                    </form>

                    {isSubmitting && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                            <FaSpinner className="animate-spin text-white w-10 h-10" />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
