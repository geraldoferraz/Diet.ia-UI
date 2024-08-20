import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner";

import { FaSpinner } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { createUserData } from "@/api/register";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const signUpSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    age: z.number(),
});

type SignUpForm = z.infer<typeof signUpSchema>;

export function SignUp() {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignUpForm>();

    const { mutateAsync: createUser } = useMutation({
        mutationFn: createUserData
    })

    async function handleSignUp(data: SignUpForm) {
        try {
            setIsLoading(true);

            const ageAsNumber = Number(data.age)

            await createUser({
                name: data.name,
                email: data.email,
                password: data.password,
                age: ageAsNumber
            })

            toast.success('Usuário cadastrado com sucesso!', {
                action: {
                    label: 'Faça agora seu login',
                    onClick: () => navigate('/sign-in')
                }
            })
        } catch {
            toast.error('Erro ao cadastrar usuário');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <Helmet title="Cadastro"/>
            <div className="p-8">

                <Button asChild className="absolute right-20 top-8"> 
                    <Link to="/sign-in" className="">
                        Fazer login
                    </Link>
                </Button>
                <div className="absolute right-4 top-8">
                    <ThemeToggle />
                </div>

                <div className="w-[350px] flex flex-col justify-center gap-6" >
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">Criar conta grátis</h1>
                        <p className="text-sm text-muted-foreground">Seja um parceiro e comece a monitorar seus treinos</p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
                        <div className="space-y-2">
                            <Label htmlFor="name">Nome Completo</Label>
                            <Input id="name" type="text"  {...register('name')} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">E-mail</Label>
                            <Input id="email" type="email" {...register('email')} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="age">Idade</Label>
                            <Input id="age" type="number" {...register('age', { valueAsNumber: true })} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Senha</Label>
                            <Input id="password" type="password" {...register('password')} />
                        </div>

                        <Button disabled={isSubmitting || isLoading} type="submit" className="w-full flex items-center justify-center">
                            {isLoading ? <FaSpinner className="animate-spin" /> : 'Finalizar cadastro'}
                        </Button>

                        <p className="px-6 pt-2 text-center text-sm leading-relaxed text-muted-foreground">
                            Ao continuar, você concorda com nossos termos de serviço e políticas de privacidade.
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}
