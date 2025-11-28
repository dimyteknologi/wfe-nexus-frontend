"use client";

import { ArrowRight, Eye, EyeOff, Shield } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useLoginMutation } from "@/stores/api/auth";
import { setCredential } from "@/stores/slicers/api/authSlice";
import { useAppDispatch } from "@/stores/root-reducer";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [message, setMessage] = useState({
    type: "",
    content: "",
  });

  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // setIsLoading(isLoginLoading);
    try {
      const response = await login({ ...formData }).unwrap();
      if (response?.access_token) {
        setMessage({
          type: "success" as const,
          content: "Login success! Redirecting...",
        });
        dispatch(
          setCredential({
            access_token: response.access_token,
            email: formData.email,
            rememberMe: formData.rememberMe,
          }),
        );
      }
    } catch (error: unknown) {
      let errorMessage = "Login failed. Please try again.";

      if (error && typeof error === "object") {
        const apiError = error as {
          data?: { message?: string; error?: string };
          message?: string;
        };

        if (apiError.data?.message) {
          errorMessage = apiError.data.message;
        } else if (apiError.data?.error) {
          errorMessage = apiError.data.error;
        } else if (apiError.message) {
          errorMessage = apiError.message;
        }
      }

      setMessage({
        type: "error" as const,
        content: errorMessage,
      });
    } finally {
      setTimeout(() => {
        // setIsLoading(isLoginLoading);
      }, 1500);
    }
  };

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

        <div className="flex justify-center my-1">
          <span
            className={`text-xs font-medium ${message.type === "error" ? "text-red-500" : "text-green-700"}`}
          >
            {message.content}
          </span>
        </div>

        <form className="mt-2 space-y-6" onSubmit={handleSubmit}>
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
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 transition-colors"
                placeholder="nama@domain.com"
              />
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
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 transition-colors pr-12"
                  placeholder="Masukkan kata sandi"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
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

          <div>
            <button
              type="submit"
              disabled={isLoginLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-lg text-white bg-gradient-to-r from-green-700 to-teal-700 hover:from-green-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isLoginLoading ? (
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
