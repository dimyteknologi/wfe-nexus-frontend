"use client";

import { ArrowRight, Eye, EyeOff, Shield } from "lucide-react";
import { useLogin } from "@/hooks/useLogin";
import Image from "next/image";
import Button from "@/components/atoms/Button";
import { useTranslation } from "@/hooks/useTranslation";

const LoginPage = () => {
  const { t } = useTranslation();
  const { login } = t;

  const {
    showPassword,
    authError,
    rememberMe,
    form: {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
    },
    togglePasswordVisibility,
    handleRememberMeChange,
    onSubmit,
  } = useLogin();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 opacity-10">
        <Image
          className="w-full h-full object-cover"
          src="./assets/image-demo-3.svg"
          alt="background pattern"
          fill
        />
      </div>

      <div className="max-w-md w-full space-y-8 bg-white/90 backdrop-blur-sm p-10 mt-12 rounded-2xl shadow-xl border border-gray-100 z-10">
        <div className="mb-2">
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-green-600 to-green-700 p-3 rounded-full shadow-md">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-800">
            {login.title}
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {login.emailLabel}
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                {...register("email")}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 transition-colors"
                placeholder={login.emailPlaceholder}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {login.passwordLabel}
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  {...register("password")}
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 transition-colors pr-12"
                  placeholder={login.passwordPlaceholder}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => handleRememberMeChange(e.target.checked)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 block text-sm text-gray-700"
                >
                  {login.rememberMe}
                </label>
              </div>
            </div>
          </div>

          {authError && (
            <div className="text-red-500 text-sm text-center bg-red-50 border border-red-200 rounded-lg p-3">
              {authError}
            </div>
          )}

          <div>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={isSubmitting}
              disabled={isSubmitting}
              icon={!isSubmitting ? <ArrowRight size={20} /> : undefined}
              iconPosition="right"
            >
              {isSubmitting ? login.processingButton : login.submitButton}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
