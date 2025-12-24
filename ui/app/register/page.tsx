'use client'

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
} from "@/components/ui/field"
import { RegisterForm } from "@/MyComponents/RegisterForm";
import Link from "next/link";

export default function Register() {
  return (
    <div className="flex flex-col min-h-screen justify-start bg-zinc-50 font-sans">
      <div className="flex flex-row justify-between border-b-2 border-black p-2">
        <div className="font-bold text-2xl">ProjectM</div>
        <FieldGroup className="w-24">
          <Field orientation="horizontal">
            <Link href="/login">
              <Button type="submit">Login</Button>
            </Link>
          </Field>
        </FieldGroup>
      </div>
      <div className="flex justify-center items-center grow">
        <RegisterForm handleRegisterNewUser={(registerUserData) => {
          console.log(registerUserData);
        }} />
      </div>
    </div>
  );
}
