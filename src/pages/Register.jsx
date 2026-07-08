import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { AuthContext } from "../context/AuthContext";

const registerSchema = z
  .object({
    name: z.string().min(1, "Nama wajib diisi"),
    email: z
      .string()
      .min(1, "Email wajib diisi")
      .email("Format email tidak valid"),
    password: z.string().min(6, "Password minimal 6 karakter"),
    confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  });

function Register() {
  const { register: registerUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data) => {
    setRegisterError("");
    const result = registerUser(data.name, data.email, data.password);

    if (result.success) {
      alert("Akun berhasil dibuat! Silakan masuk.");
      navigate("/login");
    } else {
      setRegisterError(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-8">
      <div className="w-full max-w-sm bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h1 className="text-2xl font-bold text-white text-center">
          Buat Akun Baru
        </h1>
        <p className="text-gray-400 text-sm text-center mt-2">
          Daftar untuk mulai menggunakan AI Assistant
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mt-6"
        >
          <Input
            label="Nama Lengkap"
            type="text"
            placeholder="Nama kamu"
            error={errors.name?.message}
            {...register("name")}
          />
          <Input
            label="Email"
            type="email"
            placeholder="nama@email.com"
            error={errors.email?.message}
            {...register("email")}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Buat password"
            error={errors.password?.message}
            {...register("password")}
          />
          <Input
            label="Konfirmasi Password"
            type="password"
            placeholder="Ulangi password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          {registerError && (
            <p className="text-sm text-red-500 -mt-2">{registerError}</p>
          )}

          <Button type="submit" variant="primary">
            Daftar
          </Button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-4">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Masuk
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
