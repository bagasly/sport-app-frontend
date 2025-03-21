"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import banner from "../../../public/benner.png";
import logo from "../../../public/logo.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

const ResetPassword = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = () => {
    if (!isChecked) {
      setError("Anda harus menyetujui syarat dan ketentuan.");
      return;
    }

    if (password.length < 6) {
      setError("Password harus memiliki minimal 6 karakter.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }

    setError("");
    alert("Password berhasil diubah!");
    router.push("/login");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full h-screen">
      {/* Banner */}
      <section className="relative hidden md:block">
        <Image
          src={banner}
          className="w-full h-screen object-cover"
          width={2000}
          height={2000}
          priority
          alt="banner"
        />
        <Image
          src={logo}
          className="absolute top-10 left-1/2 transform -translate-x-1/2"
          width={300}
          height={200}
          alt="logo"
        />
      </section>

      {/* Form Reset Password */}
      <div className="flex flex-col items-center justify-center max-w-md w-full px-6 md:px-12 mx-auto">
        <h2 className="text-2xl font-semibold text-gray-700 text-left w-full">
          Password Baru
        </h2>

        {/* Input Password Baru */}
        <div className="w-full mt-6 relative">
          <label className="block text-sm font-medium">Password Baru</label>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Masukkan password baru"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="button"
            tabIndex={-1}
            variant="ghost"
            onClick={() => setShowPassword(!showPassword)}
            size="icon"
            className="absolute top-10 right-3 -translate-y-1/2 hover:bg-transparent"
            aria-label={
              showPassword ? "Sembunyikan Password" : "Tampilkan Password"
            }
          >
            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
          </Button>
        </div>

        {/* Konfirmasi Password */}
        <div className="w-full mt-6 relative">
          <label className="block text-sm font-medium">
            Konfirmasi Password Baru
          </label>
          <Input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Konfirmasi password baru"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            type="button"
            tabIndex={-1}
            variant="ghost"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            size="icon"
            className="absolute top-10 right-3 -translate-y-1/2 hover:bg-transparent"
            aria-label={
              showConfirmPassword
                ? "Sembunyikan Password"
                : "Tampilkan Password"
            }
          >
            {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
          </Button>
        </div>

        {/* Checkbox Persetujuan */}
        <div className="text-left w-full mt-3 flex items-center">
          <Checkbox
            id="terms"
            checked={isChecked}
            onCheckedChange={(checked) => setIsChecked(checked === true)}
          />
          <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
            Saya setuju dengan{" "}
            <a href="#" className="text-blue-500">
              syarat dan ketentuan
            </a>
            .
          </label>
        </div>

        {/* Pesan Error */}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {/* Tombol Simpan */}
        <Button onClick={handleSubmit} className="w-full mt-4">
          Simpan
        </Button>
      </div>
    </div>
  );
};

export default ResetPassword;
