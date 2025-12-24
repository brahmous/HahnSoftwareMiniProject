import { CreateNewTaskFormState, Task, TasksTableProps } from "@/app/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CreateTaskDatePicker } from "./CreateTaskDatePicker"
import { useState } from "react"
import axios from "axios"

export function TasksTable({ updateTaskState, updateState, ProjectId, tasks }: TasksTableProps) {

  const [formState, setFormState] = useState<CreateNewTaskFormState>({
    Completed: false,
    Description: "",
    DueDate: new Date().toISOString(),
    ProjectId: ProjectId
  });

  return (
    <Table>
      <TableCaption>Project Task List.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Description</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task, key) => (
          <TableRow key={key}>
            <TableCell className={`font-medium ${task.completed && "line-through"}`}>{task.description}</TableCell>
            <TableCell>{task.dueDate}</TableCell>
            <TableCell className={`text-right`}><Button disabled={task.completed}
              onClick={() => {
                const token = localStorage.getItem("Bearer");
                axios.post(`http://localhost:5192/api/tasks/complete/${task.id}`, {}, {
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                }).then(response => {
                  updateTaskState(task.projectId, task.id);
                }).catch(error => {
                  console.log(error);
                });
              }}
            >Complete</Button></TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell className="font-medium">
            <Input
              onChange={(e) => {
                setFormState({ ...formState, Description: e.target.value });
              }}
              placeholder="Task Description"
              type="text"
              required
              value={formState.Description}
            />
          </TableCell>
          <TableCell>
            <CreateTaskDatePicker />
          </TableCell>
          <TableCell>
            <Button type="button" onClick={() => {
              console.log({ formState });
              const token = localStorage.getItem("Bearer");
              setFormState({ ...formState, Description: "" });
              axios.post("http://localhost:5192/api/tasks/create", {
                Description: formState.Description,
                DueDate: formState.DueDate,
                Completed: false,
                ProjectId: formState.ProjectId
              }, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }).then(response => {
                updateState(response.data);
              }).catch(error => {
                console.log(error);
              })
            }}>Create New Task</Button>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
