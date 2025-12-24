export interface LoginFormState {
  email: string;
  password: string
}

export interface LoginFormProps {
  handleLoginUser: (loginData: LoginFormState) => void
}

export interface RegisterFormState {
  first_name: string;
  last_name: string;
  email: string;
  password: string
}

export interface RegisterFormProps {
  handleRegisterNewUser: (formData: RegisterFormState) => void
}

export interface Project {
  id: number;
  title: string;
  description?: string;
  tasks: Task[];
}

export interface Task {
  id: number;
  description: string;
  dueDate: string;
  completed: boolean;
  projectId: number;
}

export interface ProjectsAccordionProps {
  updateState: (task: Task) => void;
  updateTaskState: (projectid: number, taskId: number) => void
  projects: Project[];
}

export interface TasksTableProps {
  ProjectId: number;
  tasks: Task[];
  updateState: (task: Task) => void
  updateTaskState: (projectid: number, taskId: number) => void
}

export interface CreateProjectFormData {
  title: string;
  description: string;
}

export interface CreateProjectFormProps {
  handleCreateProject: (project: CreateProjectFormData) => void
}

export interface CreateNewTaskFormState {
  Description: string;
  DueDate: string;
  Completed: boolean;
  ProjectId: number;
}