'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { Project, Task } from "../types";
import { ProjectsAccordion } from "@/MyComponents/ProjectsAccordion";
import { AccordionItem, AccordionTrigger, AccordionContent, Accordion } from "@radix-ui/react-accordion";
import { CreateProjectForm } from "@/MyComponents/CreateProjectForm";

export default function Projects() {

  const [state, setState] = useState<Project[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("Bearer");
    axios.get("http://localhost:5192/api/projects", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      setState(response.data);
    }).catch(error => {
      console.log(error);
    })
  }, [])

  return (
    <div className="flex flex-col min-h-screen justify-start bg-zinc-50 font-sans">
      <div className="flex flex-row justify-between border-b-2 border-black p-2">
        <div className="font-bold text-2xl">ProjectM</div>
        <div></div>
      </div>
      <div className="flex-col w-full justify-center p-4">
        <CreateProjectForm handleCreateProject={(createProjectFormData) => {
          const token = localStorage.getItem("Bearer");
          axios.post("http://localhost:5192/api/projects/create",
            {
              Title: createProjectFormData.title,
              Description: createProjectFormData.description
            }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }).then(response => {
            response.data
            setState([...state, {
              id: response.data.id,
              title: response.data.title,
              description: response.data.description,
              tasks: []
            }]);
          }).catch(error => {
            console.log(error);
          })
        }} />
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-1"
        >
          <AccordionItem value={`item-${1}`}>
            <AccordionTrigger className="flex w-full flex-row justify-evenly border-b-2 border-black"><h3 className="flex flex-row w-full justify-start text-left">Project Title</h3> <p className="w-full flex flex-row justify-start text-left font-light">Project Description</p></AccordionTrigger>
          </AccordionItem>
        </Accordion>
        {state.length == 0 ?
          <p>No projects to show for not!</p> :
          <ProjectsAccordion
            updateTaskState={(projectId, taskId) => {
              let project_id = state.findIndex(project => project.id == projectId);
              let task_id = state[project_id].tasks.findIndex(task => task.id == taskId);
              state[project_id].tasks[task_id].completed = true;
              setState([...state]);
            }}
            updateState={(task: Task) => {
              let project_id = state.findIndex(project => project.id == task.projectId);
              state[project_id].tasks.push(task);
              setState([...state]);
            }} projects={state} />}
      </div>
    </div>
  );
}
