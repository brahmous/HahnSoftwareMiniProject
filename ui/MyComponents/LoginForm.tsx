import { LoginFormProps, LoginFormState } from "@/app/types";
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"


export function LoginForm({ handleLoginUser }: LoginFormProps) {
  const [formState, setState] = useState<LoginFormState>(
    {
      email: "",
      password: ""
    }
  );
  return (
    <div className="w-full max-w-md">
      <form>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Login</FieldLegend>
            {/* <FieldDescription>
              All transactions are secure and encrypted
            </FieldDescription> */}
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">
                  Email
                </FieldLabel>
                <Input
                  onChange={(e) => {
                    setState({ ...formState, email: e.target.value })
                  }}
                  id="email"
                  placeholder="example@gmail.com"
                  type="email"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">
                  Password
                </FieldLabel>
                <Input
                  onChange={(e) => {
                    setState({ ...formState, password: e.target.value })
                  }}
                  id="password"
                  placeholder="Enter password"
                  required
                  type="password"
                />
              </Field>
            </FieldGroup>
          </FieldSet>
          <FieldSeparator />
          <Field orientation="horizontal">
            <Button type="button" onClick={() => {
              handleLoginUser(formState);
            }}>Login</Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}
