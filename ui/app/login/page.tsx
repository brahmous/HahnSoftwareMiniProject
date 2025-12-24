'use client'

import axios from "axios";
import { Button } from "@/components/ui/button";
import { FieldGroup, Field } from "@/components/ui/field";
import { LoginForm } from "@/MyComponents/LoginForm";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  return (
    <div className="flex flex-col min-h-screen justify-start bg-zinc-50 font-sans">
      <div className="flex flex-row justify-between border-b-2 border-black p-2">
        <div className="font-bold text-2xl">ProjectM</div>
        <FieldGroup className="w-24">
          <Field orientation="horizontal">
            <Link href="/register">
              <Button type="submit" onClick={() => {
              }}>Register</Button>
            </Link>
          </Field>
        </FieldGroup>
      </div>
      <div className="flex justify-center items-center grow">
        <LoginForm handleLoginUser={async (loginData) => {
          alert("here");
          axios.post("http://localhost:5192/api/accounts/login", {
            Email: loginData.email,
            PlainTextPassword: loginData.password
          }).then((response) => {
            console.log("hello world: ", response.data);
            localStorage.setItem("Bearer", response.data);
            router.push("/projects");
          }).catch(error => {
            console.log(error)
          })
        }} />
      </div>
    </div>
  );
}