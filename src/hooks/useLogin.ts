import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession, signIn } from "next-auth/react";
import { clearError, setError, setRememberMe } from "@/stores/slicers/auth/AuthSlice";
import { useAppDispatch, useAppSelector } from "@/stores/root-reducer";
import { LoginFormValues, loginSchema } from "@/lib/schema/loginSchema";

export const useLogin = () => {
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

  console.log("Form values:", form.getValues());

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
        const dest = searchParams.get("callbackUrl") || "/";
        router.push(dest);
      }
    } catch (error: any) {
      console.error("Login error:", error);
      const errorMessage = error?.message || "Login failed. Please try again.";
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
