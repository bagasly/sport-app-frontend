import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { useFormContext } from "react-hook-form";
  import { Input } from "@/components/ui/input";
  import { LoginFormSchema } from "@/features/auth/form/login";
  import { Button } from "@/components/ui/button";
  import { useState } from "react";
  import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
  import Link from "next/link";
  
  type LoginFormProps = {
    onLogin: (data: LoginFormSchema) => void;
    loginLoading: boolean;
  };
  
  const LoginForm = ({ onLogin, loginLoading }: LoginFormProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const { control, handleSubmit } = useFormContext<LoginFormSchema>();
    const handleShowPassword = () => setShowPassword((prev) => !prev);
  
    return (
      <form
        onSubmit={handleSubmit(onLogin)}
        className="flex flex-col gap-2 w-full max-w-sm md:max-w-72 lg:max-w-96"
      >
        <FormField
          control={control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username / Nomor Ponsel</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Username/Phone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
  
  <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan Password"
                    {...field}
                  />
                  <Button
                    type="button"
                    tabIndex={-1}
                    variant="ghost"
                    onClick={handleShowPassword}
                    size="icon"
                    className="absolute top-4 right-1 -translate-y-1/2 hover:bg-transparent"
                    aria-label={
                      showPassword ? "Sembunyikan Password" : "Tampilkan Password"
                    }
                  >
                    {showPassword ? (
                      <FaRegEye className="text-secondary-foreground" />
                    ) : (
                      <FaRegEyeSlash className="text-secondary-foreground" />
                    )}
                  </Button>
  
                  {/* Link Lupa Password dipindahkan ke bawah form */}
                      <div className="mt-3 text-right">
                        <Link href="/forgot-password" className="text-sm mb-10">
                          Lupa Password?
                        </Link>
                      </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
  
  <Button type="submit" className="my-4" disabled={loginLoading}>
          {loginLoading ? "Loading..." : "Masuk"}
        </Button>
      </form>
    )
  };
  
  export default LoginForm;
  