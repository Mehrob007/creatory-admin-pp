"use client";
import Input from "@/components/element-tags/Input";
import { useFormStore } from "@/hooks/useFormStore";
import { apiClient } from "@/utils/apiClient";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ValidData = {
  login: { required: true },
  password: { required: true, minLength: 4 },
};
export default function Login() {
  const router = useRouter();
  const { data, errors, setData, validate, checked } = useFormStore();
  const [valid, setValid] = useState<boolean>();

  const onSend = async () => {
    const isValid = validate(ValidData);
    if (isValid) {
      try {
        const res = await apiClient.post("api/auth", data);
        console.log("res login:", res.data.data);
        const { accessToken } = res.data.data;
        localStorage.setItem("token", accessToken);
        router.replace("/");
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    const isValid = checked(ValidData);
    setValid(isValid);
    console.log("isValid", isValid);
  }, [data, setValid, checked]);

  console.log("valid", valid);
  console.log("errors", errors);

  return (
    <div className="login">
      <div className="login-content">
        <div className="login-content-header">
          <h1>ADMIN PANEL</h1>
          <h3>PRIME PARKING</h3>
        </div>
        <div className="login-content-form">
          <div>
            <Input
              title="Логин"
              id="login"
              onChange={(e) => {
                setData("login", e);
              }}
              value={data?.login as string}
              errors={errors}
            />
            <Input
              title="Пароль"
              id="password"
              type="password"
              onChange={(e) => {
                setData("password", e);
              }}
              value={data?.password as string}
              errors={errors}
            />
          </div>
          <button
            onClick={() => valid && onSend()}
            className={valid ? "active-button" : ""}
          >
            Войти
          </button>
        </div>
      </div>
      <Image
        className="logo-creatory"
        src="/icons/logo-creatory.svg"
        alt="logo-creatory"
        width={194}
        height={52.96}
      />
    </div>
  );
}
