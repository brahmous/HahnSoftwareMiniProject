import { RegisterFormProps, RegisterFormState } from "@/app/types"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export function RegisterForm({ handleRegisterNewUser }: RegisterFormProps) {
  const [formState, setFormState] = useState<RegisterFormState>({
    email: "",
    first_name: "",
    last_name: "",
    password: ""
  });
  return (
    <div className="w-full max-w-md">
      <form>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Register</FieldLegend>
            <FieldDescription>
              Create a New Account.
            </FieldDescription>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="first_name">
                  First Name
                </FieldLabel>
                <Input
                  onChange={(e) => { setFormState({ ...formState, first_name: e.target.value }) }}
                  id="first_name"
                  placeholder="John"
                  required
                  type="text"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="last_name">
                  Last Name
                </FieldLabel>
                <Input
                  onChange={(e) => { setFormState({ ...formState, last_name: e.target.value }) }}
                  id="last_name"
                  placeholder="Rabbit"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">
                  Email
                </FieldLabel>
                <Input
                  onChange={(e) => { setFormState({ ...formState, email: e.target.value }) }}
                  id="email"
                  placeholder="example@gmail.com"
                  required
                  type="email"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">
                  Password
                </FieldLabel>
                <Input
                  onChange={(e) => { setFormState({ ...formState, password: e.target.value }) }}
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
            <Button variant="outline" type="button" onClick={() => {
              handleRegisterNewUser(formState);
            }}>
              Register
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}
