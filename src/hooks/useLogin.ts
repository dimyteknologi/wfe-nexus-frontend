import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession, signIn } from "next-auth/react";
import { clearError, setError, setRememberMe, setUser } from "@/stores/slicers/auth/AuthSlice";
import { useAppDispatch, useAppSelector } from "@/stores/root-reducer";
import { LoginFormValues, loginSchema } from "@/lib/schema/loginSchema";
import { useTranslation } from "@/hooks/useTranslation";

export const useLogin = () => {
  const { t } = useTranslation();
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const { error: authError, rememberMe } = useAppSelector(
    (state) => state.auth
  );

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRememberMeChange = (checked: boolean) => {
    dispatch(setRememberMe(checked));
  };

  const onSubmit = async (data: LoginFormValues) => {
    dispatch(clearError());

    try {
      console.log("Attempting NextAuth signIn...");

      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: "/",
      });

      console.log("Result:", result);

      if (result?.error) {
        throw new Error(result.error);
      }

      if (result?.ok) {
        const { getSession } = await import("next-auth/react");
        const session = await getSession();
        
        console.log("Session after login:", session);
      
        if (session?.user) {
          dispatch(setUser({
            id: session.user.id,
            email: session.user.email || "",
            username: session.user.username,
            role: session.user.role,
            permissions: session.user.permissions,
            cityId: session.user.cityId,
            access_token: session.accessToken
          }));
        }
        
        const userRole = session?.user?.role;
        
        if (userRole === "Admin") {
          window.location.href = "/admin";
        } else {
          const callbackUrl = searchParams.get("callbackUrl") || "/";
          const dest = (callbackUrl.startsWith("/") && !callbackUrl.startsWith("//")) 
            ? callbackUrl 
            : "/";
          window.location.href = dest;
        }
      }
    } catch (error: unknown) {
        console.error("Login error:", error);
        let errorMessage =
          error instanceof Error ? error?.message : t.login.authError;
        
        if (errorMessage === "CredentialsSignin") {
            errorMessage = t.login.invalidCredentials;
        }

        dispatch(setError(errorMessage));
        form.setError("password", { type: "manual", message: errorMessage });
    }

  };

  return {
    session,
    status,
    router,
    showPassword,
    isCheckingAuth,
    setIsCheckingAuth,
    authError,
    rememberMe,
    form,
    togglePasswordVisibility,
    handleRememberMeChange,
    onSubmit,
  };
};
