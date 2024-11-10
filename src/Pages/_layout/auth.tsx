import { Outlet, useLocation } from "react-router-dom"
import { FaDumbbell } from "react-icons/fa";
import LoginSvgSignIn from "../../assets/login.svg"
import LoginSvgSignUp from "../../assets/signUp.svg"

export function AuthLayout(){

    const location = useLocation();

    const isLogin = location.pathname === "/sign-in";

    return(
        <div className="min-h-screen grid grid-cols-2 antialiased">
            <div className="h-full border-r border-foreground/5 bg-muted p-10 text-muted-foreground flex flex-col justify-between">
                <div className="flex items-center gap-3 text-lg font-medium text-foreground">
                    <FaDumbbell className="h-5 w-5" />
                    <span className="font-semibold">Diet.IA</span>
                </div>
                <div className="flex flex-col items-center justify-center mr-16 w-auto h-auto">
                    <img src={isLogin ? LoginSvgSignIn : LoginSvgSignUp} alt="Auth Illustration" />
                </div>
                <footer className="text-sm ">
                    &copy; Sua alimentação monitorada pela equipe Diet.IA - {new Date().getFullYear()}
                </footer>
            </div>

            <div className="flex flex-col items-center justify-center relative">
                <Outlet />
            </div>
        </div>
    )
}

//outlet é o conteudo que muda de página para página. nesse caso, oque muda esta dentro da pasta Auth