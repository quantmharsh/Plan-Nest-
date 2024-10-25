import {
  createApi,
  CreateApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
 
export interface Project {
  id: number;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

export enum Priority {
  Urgent = "Urgent",
  High = "High",
  Medium = "Medium",
  Low = "Low",
  Backlog = "Backlog",
}

export enum Status {
  ToDo = "To Do",
  WorkInProgress = "Work In Progress",
  UnderReview = "Under Review",
  Completed = "Completed",
}

export interface User {
  userId?: number;
  username: string;
  email: string;
  profilePictureUrl?: string;
  cognitoId?: string;
  teamId?: number;
}

export interface Attachment {
  id: number;
  fileURL: string;
  fileName: string;
  taskId: number;
  uploadedById: number;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  status?: Status;
  priority?: Priority;
  tags?: string;
  startDate?: string;
  dueDate?: string;
  points?: number;
  projectId: number;
  authorUserId?: number;
  assignedUserId?: number;

  author?: User;
  assignee?: User;
  comments?: Comment[];
  attachments?: Attachment[];
}

export interface SearchResults {
  tasks?: Task[];
  projects?: Project[];
  users?: User[];
}

export interface Team {
  teamId: number;
  teamName: string;
  productOwnerUserId?: number;
  projectManagerUserId?: number;
}

//Using Redux toolkit RTK Query

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: "api",
  
  tagTypes: ["Projects" ,"Tasks", "Users", "Teams"],
  /**
   * The "endpoints" object defines three API endpoints:
   *
   * 1. `getProjects`: Retrieves a list of all projects.
   *    - The `query` function returns the URL for the request.
   *    - The `providesTags` function specifies that this endpoint provides data for the "Projects" tag.
   * 2. `createProject`: Creates a new project.
   *    - The `query` function returns the URL and request body for the request.
   *    - The `invalidatesTags` function specifies that this endpoint invalidates the "Projects" tag.
   */
  // what invalidatesTgs , providesTgs means 
  endpoints: (build) => ({
    getProjects: build.query<Project[], void>({
      query: () => "projects",
      providesTags: ["Projects"],
    }),

    createProject: build.mutation<Project, Partial<Project>>({
      query: (project) => ({
        url: "projects",
        method: "POST",
        body: project,
      }),
      invalidatesTags: ["Projects"],
    }),

    getTasks:build.query<Task[], {projectId:number} >({
      query:({projectId})=>
          `tasks?projectId=${projectId}` ,
      providesTags:(result)=>  result ? result.map(({id})=>({ type: "Tasks" as const , id})):[{type:"Tasks"as const}]
      
    }),
    getTasksByUser:build.query<Task[] , number >({

      query:(userId)=> `tasks/user/${userId}`, 
      providesTags:(result , error , userId)=> result ? result.map(({id})=> ({type:"Tasks"  ,id})):[{type:"Tasks" , id:userId}],
      
    }) ,
    createTask: build.mutation<Task, Partial<Task>>({
      
      query: (task) => ({
        url: "tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateTaskStatus: build.mutation<Task,{taskId:number , status:string}>({
      query: ({taskId , status}) => ({
        url: `tasks/${taskId}/status`,
        method: "PATCH",
        body: {status},
      }),
      invalidatesTags:(result  ,error ,{taskId})=>[{type:"Tasks" ,id:taskId }],
    }),
    getUsers: build.query<User[], void>({
      query: () => "users",
      providesTags: ["Users"],
    }),
    getTeams: build.query<Team[], void>({
      query: () => "teams",
      providesTags: ["Teams"],
    }),
    search:build.query<SearchResults ,string>({
      query:(query)=>`search?query=${query}`,
    })
  
  }),
});

export const {useGetProjectsQuery ,  useGetUsersQuery, useGetTeamsQuery , useCreateProjectMutation , useGetTasksQuery , useCreateTaskMutation , useUpdateTaskStatusMutation , useSearchQuery} = api;
