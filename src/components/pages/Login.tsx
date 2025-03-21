"use client";

import React from "react";
import Image from "next/image";
import banner from "../../../public/benner.png";
import logo from "../../../public/logo.svg";
import { useForm, FormProvider } from "react-hook-form"; // Import FormProvider
import { zodResolver } from "@hookform/resolvers/zod";
import { UsePostLogin } from "@/features/auth/api/use-post-login";
import { LoginFormSchema, loginFormSchema } from "@/features/auth/form/login";
import LoginForm from "@/features/auth/components/login-form";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  // Form Handling
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  });

  // Hook untuk navigasi
  const router = useRouter();

  // Handle Login
  const { mutate, isPending: loginLoading } = UsePostLogin({
    onSuccess: () => {
      alert("Login berhasil!");
      router.push("/dashboard"); // Redirect setelah login
      form.reset({
        username: "",
        phone: "",
        password: "",
      });
    },
    onError: (error: Error) => {
      console.log(error);
    },
  });

  const handleLogin = (data: LoginFormSchema) => {
    mutate(data);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full">
      {/* Banner */}
      <section className="relative hidden md:block">
        <Image
          src={banner}
          className="w-full h-screen"
          width={2000}
          height={2000}
          priority
          alt="banner"
        />
        <Image
          src={logo}
          className="absolute top-10 right-1/2 translate-x-1/2"
          width={300}
          height={200}
          alt="logo"
        />
      </section>

      {/* Form */}  
<section className="flex items-center justify-center flex-col max-w-xl h-screen md:h-auto w-full px-4 place-self-center">
  <div className="max-w-sm w-full md:max-w-72 lg:max-w-96">
    <Image
      src={logo}
      alt="logo"
      width={200}
      height={200}
      className="mx-auto mb-14 md:hidden"
    />
    <h1 className="text-2xl font-bold w-full">Masuk</h1>

    {/* Bungkus LoginForm dengan FormProvider */}
    <FormProvider {...form}>
      <LoginForm onLogin={handleLogin} loginLoading={loginLoading} />
    </FormProvider>
  </div>
</section>
    </div>
  );
};

export default LoginPage;
