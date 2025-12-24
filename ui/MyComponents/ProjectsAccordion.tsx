import { ProjectsAccordionProps, Task } from "@/app/types"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { TasksTable } from "./TasksTable";

export function ProjectsAccordion({ updateTaskState, updateState, projects }: ProjectsAccordionProps) {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
    >
      {
        projects.map((project, key) => {
          console.log(project);
          return <AccordionItem key={key} value={`item-${key + 1}`}>
            <AccordionTrigger><h3>{project.title}</h3> <p className="font-light">{project.description}</p></AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <TasksTable updateTaskState={updateTaskState} updateState={updateState} ProjectId={project.id} tasks={project.tasks} />
            </AccordionContent>
          </AccordionItem>
        })
      }
    </Accordion>
  )
}
