"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SignUp() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignUp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!id.trim() || !pw.trim() || !name.trim()) {
      setError("모든 항목을 입력해주세요.");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const isDuplicate = existingUsers.some((user: any) => user.id === id);
    if (isDuplicate) {
      setError("이미 사용 중인 아이디입니다.");
      return;
    }

    const newUser = { id, pw, name };
    localStorage.setItem("users", JSON.stringify([...existingUsers, newUser]));
    alert(`${name}님, 회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.`);
    router.push("/login");
  };

  return (
    <>
      <div className="max-w-md mt-10 mx-auto p-4 border border-slate-200 rounded shadow-2xl">
        <h2 className="text-2xl font-semibold mb-4">회원가입</h2>
        <form onSubmit={handleSignUp}>
          <div className="mb-2">
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
          <div className="mb-2">
            <input
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border px-3 py-2 w-full rounded"
            />
          </div>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded w-full cursor-pointer mb-2"
          >
            회원가입
          </button>
        </form>

        <div className="text-center mt-4">
          <span>이미 계정이 있으신가요? </span>
          <button
            onClick={() => router.push("/login")}
            className="ml-[10px] text-blue-500 hover:underline"
          >
            로그인
          </button>
        </div>
      </div>
    </>
  );
}
