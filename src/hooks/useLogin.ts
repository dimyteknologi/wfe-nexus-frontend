import { useState, useEffect } from "react";
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

  // Guard: redirect authenticated users away from login page
  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (status === "authenticated" && session?.user) {
      const userPermissions = session.user.permissions || [];
      const hasDashboard = Array.isArray(userPermissions)
        ? userPermissions.some((p: any) =>
            typeof p === "string"
              ? p === "read:dashboard"
              : p.permissionCode === "read:dashboard"
          )
        : false;

      if (hasDashboard) {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
      }
      return;
    }

    setIsCheckingAuth(false);
  }, [status, session]);

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
        throw result.error;
      }

      if (result?.ok) {
        const { getSession } = await import("next-auth/react");
        const freshSession = await getSession();

        console.log("Session after login:", freshSession);

        if (freshSession?.user) {
          dispatch(setUser({
            id: freshSession.user.id,
            email: freshSession.user.email || "",
            username: freshSession.user.username,
            role: freshSession.user.role,
            permissions: freshSession.user.permissions,
            cityId: freshSession.user.cityId,
            access_token: freshSession.accessToken
          }));
        }

        const userPermissions = freshSession?.user?.permissions || [];
        const hasDashboardPermission = Array.isArray(userPermissions)
          ? userPermissions.some((p: any) =>
              typeof p === "string"
                ? p === "read:dashboard"
                : p.permissionCode === "read:dashboard"
            )
          : false;

        // Use window.location.href for reliable full-page redirect
        // This ensures the browser sends the new session cookie and all
        // layouts/middleware evaluate the fresh authenticated state
        if (hasDashboardPermission) {
          window.location.href = "/admin";
        } else {
          window.location.href = "/";
        }
      }
    } catch (error: unknown) {
        console.warn("Login error:", error);

        let errorMessage = "An error occurred during login.";
        if (typeof error === "string") {
          errorMessage = error;
        } else if (error instanceof Error) {
          errorMessage = error.message;
        } else {
          errorMessage = t.login.authError;
        }

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
