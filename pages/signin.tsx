import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

type FormData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: "/", // ログイン後の遷移先
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold font-rounded text-center text-blue-600 mb-6">
          ログイン
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1 font-rounded">
              メールアドレス
            </label>
            <input
              type="email"
              placeholder="example@example.com"
              {...register("email", { required: "メールアドレスは必須です" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 font-rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 font-rounded">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1 font-rounded">
              パスワード
            </label>
            <input
              type="password"
              placeholder="********"
              {...register("password", { required: "パスワードは必須です" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 font-rounded"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1 font-rounded">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition font-rounded"
          >
            ログイン
          </button>
        </form>
      </div>
    </div>
  );
}
