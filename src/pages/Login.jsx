import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { AuthContext } from "../context/AuthContext";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    setLoginError("");
    const result = login(data.email, data.password);

    if (result.success) {
      navigate("/");
    } else {
      setLoginError(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-8">
      <div className="w-full max-w-sm bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h1 className="text-2xl font-bold text-white text-center">
          Masuk ke AI Assistant
        </h1>
        <p className="text-gray-400 text-sm text-center mt-2">
          Silakan masuk untuk melanjutkan
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mt-6"
        >
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
            placeholder="Masukkan password"
            error={errors.password?.message}
            {...register("password")}
          />

          {loginError && (
            <p className="text-sm text-red-500 -mt-2">{loginError}</p>
          )}

          <Button type="submit" variant="primary">
            Masuk
          </Button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-4">
          Belum punya akun?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Daftar
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
