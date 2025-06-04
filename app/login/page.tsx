import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

export default function Login() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id === "team2" && pw === "1234") {
      Login();
      router.push("/");
    } else {
      setError("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <>
      <div className="max-w-md mt-10  mx-auto p-4 border border-slate-200 rounded shadow-2xl">
        <h2>로그인</h2>
        <div>
          <input
            type="text"
            placeholder="아이디"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="border px-3 py-2 w-full rounded"
          />
        </div>
        <div className="mb-2">
          <input
            type="password"
            placeholder="비밀번호"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            className="border px-3 py-2 w-full rounded"
          />
        </div>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full cursor-pointer"
        >
          로그인
        </button>
      </div>
    </>
  );
}
