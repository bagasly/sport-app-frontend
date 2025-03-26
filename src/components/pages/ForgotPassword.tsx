"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; 
import banner from "../../../public/benner.png";
import logo from "../../../public/logo.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const ForgotPassword = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const router = useRouter(); // Inisialisasi useRouter

  const handleSendOtp = () => {
    console.log("Mengirim OTP ke:", phone);
    // Simulasi pengiriman OTP, di real-world ini harus menggunakan API
  };

  const handleVerifyOtp = () => {
    console.log("OTP yang dimasukkan:", otp);
    
    // Simulasi validasi OTP (gantilah dengan pengecekan OTP dari backend)
    const correctOtp = "123456"; // Contoh OTP yang benar

    if (otp === correctOtp) {
      router.push("/reset-password"); // Arahkan ke halaman Reset Password
    } else {
      alert("Kode OTP salah, silakan coba lagi."); // Tampilkan peringatan jika OTP salah
    }
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

      {/* Form Lupa Password */}
      <div className="flex flex-col items-center justify-center max-w-md w-full px-6 md:px-12 mx-auto">
        <h2 className="text-2xl font-semibold text-gray-700 text-left w-full">
          Lupa Password
        </h2>
        <p className="text-sm text-gray-500 text-left w-full mt-1">
          Masukkan nomor HP Anda untuk mendapatkan kode OTP.
        </p>

        {/* Input Nomor HP */}
        <div className="w-full mt-6">
          <Label htmlFor="phone" className="mb-2 block text-gray-600">
            Nomor Ponsel
          </Label>
          <div className="relative">
            <Input
              id="phone"
              className="h-11 w-full pr-24"
              type="tel"
              pattern="[0-9]*"
              placeholder="Masukkan Nomor Ponsel WhatsApp"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Button
              onClick={handleSendOtp}
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              Kirim OTP
            </Button>
          </div>
        </div>

        {/* Input OTP */}
        <div className="w-full mt-6">
          <Label htmlFor="otp" className="mb-2 block text-gray-600">
            Kode OTP
          </Label>
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        {/* Tombol Lanjutkan */}
        <Button onClick={handleVerifyOtp} className="w-full mt-6">
          Lanjutkan
        </Button>
      </div>
    </div>
  );
};

export default ForgotPassword;
