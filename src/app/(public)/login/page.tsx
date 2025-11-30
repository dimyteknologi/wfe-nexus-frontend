"use client";

import { ArrowRight, Eye, EyeOff, Shield } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useLogin } from "@/hooks/useLogin";

const LoginPage = () => {
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

  console.log("errors", errors);
  console.log("authError", authError);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 opacity-10">
        <img
          className="w-full h-full object-cover"
          src="./assets/image-demo-3.svg"
          alt="background pattern"
        />
      </div>

      <div className="max-w-md w-full space-y-8 bg-white/90 backdrop-blur-sm p-10 mt-12 rounded-2xl shadow-xl border border-gray-100 z-10">
        <div className="mb-2">
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-green-700 to-teal-700 p-3 rounded-full">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-800">
            Masuk ke Akun Anda
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Atau{" "}
            <Link
              href="#"
              className="font-medium text-green-700 hover:text-green-600 transition-colors"
            >
              daftar akun baru
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Alamat Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                {...register("email")}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 transition-colors"
                placeholder="nama@domain.com"
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
                Kata Sandi
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  {...register("password")}
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 transition-colors pr-12"
                  placeholder="Masukkan kata sandi"
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
                  Ingat saya
                </label>
              </div>

              <div className="text-sm">
                <Link
                  href="#"
                  className="font-medium text-green-700 hover:text-green-600 transition-colors"
                >
                  Lupa kata sandi?
                </Link>
              </div>
            </div>
          </div>

          {authError && (
            <div className="text-red-500 text-sm text-center">{authError}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-lg text-white bg-gradient-to-r from-green-700 to-teal-700 hover:from-green-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Memproses...
                </div>
              ) : (
                <div className="flex items-center">
                  Masuk{" "}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 bg-green-50/50 p-4 rounded-lg border border-green-100">
          <p className="text-xs text-center text-green-800">
            Dengan masuk, Anda menyetujui{" "}
            <Link href="#" className="font-medium underline">
              Syarat & Ketentuan
            </Link>{" "}
            dan{" "}
            <Link href="#" className="font-medium underline">
              Kebijakan Privasi
            </Link>{" "}
            kami.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
