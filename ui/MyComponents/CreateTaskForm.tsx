import { CreateProjectFormData, CreateProjectFormProps, LoginFormProps, LoginFormState } from "@/app/types";
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


export function CreateNewTaskForm({ handleCreateProject }: CreateProjectFormProps) {
  const [formState, setState] = useState<CreateProjectFormData>(
    {
      title: "",
      description: ""
    }
  );
  return (
    <div className="w-full max-w-md mb-8">
      <form>
        <FieldGroup className="flex flex-row gap-4">
          <FieldSet className="flex flex-row justify-evenly">
            <FieldLegend>Create New Project</FieldLegend>
            <FieldGroup>
              <Field>
                <Input
                  onChange={(e) => {
                    setState({ ...formState, title: e.target.value })
                  }}
                  id="title"
                  placeholder="Project title"
                  type="text"
                  required
                />
              </Field>
              <Field>
                <Input
                  onChange={(e) => {
                    setState({ ...formState, description: e.target.value })
                  }}
                  id="description"
                  placeholder="Enter project description"
                  required
                  type="text"
                />
              </Field>
            </FieldGroup>
          </FieldSet>
          <Field orientation="horizontal">
            <Button type="button" onClick={() => {
              handleCreateProject(formState);
            }}>Create Task</Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}
