import { LaunchScreen } from "@/view/components/LaunchScreen";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { localStoragekeys } from "../config/localStorageKeys";
import { usersService } from "../services/usersService";

interface UserMe {
  data: {
    id: string;
    name: string;
    company: string;
    responsible: string;
    email: string;
    level: string;
    whatsapp: string;
    day: number;
    cpf: string;
    logo: string;
    credits: string;
  }
}

interface AuthContextValue {
  signedIn: boolean;
  user: UserMe | undefined;
  signin(token: string): void;
  signout(): void;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedToken = localStorage.getItem(localStoragekeys.TOKEN);

    return !!storedToken;
  });
  const queryClient = useQueryClient();

  const { isError, isSuccess, data, isLoading } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: () => usersService.me(),
    enabled: signedIn,
    staleTime: 0,
  });

  const signin = useCallback((token: string) => {
    localStorage.setItem(localStoragekeys.TOKEN, token);

    setSignedIn(true);
  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem(localStoragekeys.TOKEN);
    queryClient.invalidateQueries({ queryKey: ['users','me', 'jobs-all'] });

    setSignedIn(false);
  }, [queryClient]);

  useEffect(() => {
    if (isError) {
      toast.error('Sua sessão expirou!');
      signout();
    }
  }, [isError, signout]);

  return (
    <AuthContext.Provider
      value={{
        signedIn: isSuccess && signedIn,
        user: data,
        signin,
        signout
      }}
    >
      <LaunchScreen isLoading={isLoading} />

      {!isLoading && children}
    </AuthContext.Provider>
  )
}
