import { Building, ChevronDown, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "./ui/dropdown-menu";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Skeleton } from "./ui/skeleton";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { getUserData } from "@/api/getUser";
import { useNavigate } from "react-router-dom";

export function AccountMenu() {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const navigate = useNavigate()
  const userId = localStorage.getItem('userId');

  const { data: user, isLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserData({ userId: userId || '' }),
    enabled: !!userId,
  })

  function handleSignOut(){
    setIsRedirecting(true)
    localStorage.removeItem('userId');

    setTimeout(() => {
      navigate('/sign-in', { replace: true })
  }, 1500); 
  }

  return (
    <div>
      {isRedirecting && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <FaSpinner className="animate-spin h-16 w-16 text-white" />
        </div>
      )}
      <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2 select-none">
            {isLoading ? <FaSpinner className="animate-spin h-4 w-4" /> : user?.name}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">

          <DropdownMenuLabel className="flex flex-col">
              {isLoading ? (
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-32"/>
                  <Skeleton className="h-3 w-24"/>
                </div>
              ) : (
                <>
                  <span className="mb-0">{user?.name}</span>
                  <span className="text-xs font-normal text-muted-foreground">{user?.email}</span>
                </>
              )}
          </DropdownMenuLabel>

          <DropdownMenuSeparator/>

          <DialogTrigger className="w-full">
            <DropdownMenuItem>
                <Building className="w-4 h-4 mr-2"/>
                <span>Perfil</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem asChild className="text-rose-500 dark:text-rose-400">
              <button className="w-full" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-2"/>
                <span>Sair</span>
              </button>
          </DropdownMenuItem>

        </DropdownMenuContent>
      </DropdownMenu>
      </Dialog>
    </div>
  );
}
