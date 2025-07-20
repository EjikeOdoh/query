export interface Student {
  id: number
  firstName: string
  lastName: string
  dob: Date
  country: string
  yearJoined: number
}

export interface LoginForm {
  name: string
  password: string
}

export interface Meta {
  hasNextPage: boolean
  hasPreviousPage: boolean
  limit: number
  nextPage: number
  page: number
  total: number
  totalPages: number
}

export interface StudentResponse {
  data: Student[]
  meta: Meta
}

export interface StudentPagination {
  page: number
  limit: number
}

export interface Grade {
  id: number;
  english: number | null;
  math: number | null;
  chemistry: number | null;
  physics: number | null;
  government: number | null;
  economics: number | null;
  biology: number | null;
  commerce: number | null;
  literature: number | null;
  accounting: number | null;
  year: number;
}

export interface Participation {
  participation_year: number;
  participation_quarter: number;
  program_program: string;
}

export interface StudentDetail {
  id: number;
  school: string;
  class: string;
  firstName: string;
  lastName: string;
  dob: Date
  address: string | null;
  phone: string;
  email: string | null;
  fatherLastName: string | null;
  country: string;
  fatherFirstName: string | null;
  fatherPhone: string | null;
  fatherEducation: string | null;
  fatherJob: string | null;
  motherLastName: string | null;
  motherFirstName: string | null;
  motherPhone: string | null;
  motherEducation: string | null;
  motherJob: string | null;
  noOfSisters: number | null;
  noOfBrothers: number | null;
  position: string | null;
  focus: string | null;
  favSubject: string | null;
  difficultSubject: string | null;
  careerChoice1: string | null;
  careerChoice2: string | null;
  yearJoined: number;
  grades: Grade[];
  participations: Participation[];
}

export interface SearchResult {
  count: number
  students: Student[]
}

export type TokenState = {
  token: string | null;
};

export interface ProfileState {
  role: "admin" | "editor" | "viewer" | null
  name?: string
}

export interface ProfileAction {
  type: 'loggedIn' | 'loggedOut'
  value?: ProfileState | null
}

export type TokenAction = { type: 'login' | 'logout'; value: string | null }

export type Program =  "ASCG" | "CBC" | "DSC" | "SSC"

export interface DashStats {
  year: string | number;
  totalCount: number;
  countByCountry: ({ country: string, count: number } | any)[];
  countByProgram: ({ program: Program, count: number } | any)[];
  uniqueCount: number;
  target: number;
}