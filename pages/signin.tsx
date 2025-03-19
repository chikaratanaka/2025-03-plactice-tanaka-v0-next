import { useState } from "react";
import { signIn } from "next-auth/react"; // ✅ 追加

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("✅ ログインボタンが押された！", email, password);

    const result = await signIn("credentials", {
      redirect: true, // ログイン成功後、自動で遷移する
      email,
      password,
      callbackUrl: "/", // ログイン後に飛ぶページ
    });

    console.log("🔍 signIn の結果:", result);
  };

  return (
    <div>
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">ログイン</button>
      </form>
    </div>
  );
}
