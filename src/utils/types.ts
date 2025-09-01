export interface Student {
  id: number
  firstName: string
  lastName: string
  school: string
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
  english?: string | null;
  math?: string | null;
  chemistry?: string | null;
  physics?: string | null;
  government?: string | null;
  economics?: string | null;
  biology?: string | null;
  commerce?: string | null;
  literature?: string | null;
  accounting?: string | null;
  year: number;
}
export interface GradeAddData extends Omit<Grade, 'id'> { }
export interface GradeEditData extends Partial<Grade> {

}

export interface Participation {
  participation_id: number
  participation_year: number;
  participation_quarter: number;
  program_program: string | number;
}
export interface ParticipationAddData extends Partial<Omit<Participation, 'participation_id'>> {
  studentId: number
}
export interface ParticipationEditData extends Partial<Participation> { }

export interface StudentDetail {
  id: number;
  school: string;
  currentClass: string;
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

export type EditStudentPayload = Omit<StudentDetail, 'grades' | 'participations'> & {}

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

export type Program = "ASCG" | "CBC" | "DSC" | "SSC"

export interface DashStats {
  year: string | number
  totalCount: number
  countByCountry: ({ country: string, count: number } | any)[]
  countByProgram: ({ program: Program, count: number } | any)[]
  countByYear: ({ year: number, count: number } | any)[]
  uniqueCount: number
  target: number
}

export interface ParticipationData {
  participationId: any
  year: any
  quarter: any
  studentId: any
  firstName: any
  lastName: any
  dob: any
  country: any
  program: any
}

export interface CreateStudentData {
  school: string;
  currentClass: string;
  firstName: string;
  lastName: string;
  dob: string;
  address?: string;
  country: string;
  phone?: string;
  email?: string;
  fatherLastName?: string;
  fatherFirstName?: string;
  fatherPhone?: string;
  fatherEducation?: string;
  fatherJob?: string;
  motherLastName?: string;
  motherFirstName?: string;
  motherPhone?: string;
  motherEducation?: string;
  motherJob?: string;
  noOfSisters?: string;
  noOfBrothers?: string;
  position?: string;
  focus?: string;
  favSubject?: string;
  difficultSubject?: string;
  careerChoice1?: string;
  careerChoice2?: string;
  program: string;
  year: string;
  quarter: string;
  english?: string;
  math?: string;
  chemistry?: string;
  physics?: string;
  government?: string;
  economics?: string;
  biology?: string;
  commerce?: string;
  literature?: string;
  accounting?: string;
}

export interface CreateStudentPayload {
  school: string;
  currentClass: string;
  firstName: string;
  lastName: string;
  dob: string;
  address?: string;
  country: string;
  phone?: string;
  email?: string;
  fatherLastName?: string;
  fatherFirstName?: string;
  fatherPhone?: string;
  fatherEducation?: string;
  fatherJob?: string;
  motherLastName?: string;
  motherFirstName?: string;
  motherPhone?: string;
  motherEducation?: string;
  motherJob?: string;
  noOfSisters?: number;
  noOfBrothers?: number;
  position?: string;
  focus?: string;
  favSubject?: string;
  difficultSubject?: string;
  careerChoice1?: string;
  careerChoice2?: string;
  program: string;
  year: number;
  quarter: number;
  grades: {
    english?: string;
    math?: string;
    chemistry?: string;
    physics?: string;
    government?: string;
    economics?: string;
    biology?: string;
    commerce?: string;
    literature?: string;
    accounting?: string;
  }
}

export interface ProgramStat {
  id: number
  program: Program
}

export interface CreateVolunteer {
  firstName: string
  lastName: string
  active: boolean
  type: string
  startDate?: Date
  endDate?: Date
  phone?: string
  email?: string
  address?: string
  location?: string
  skillSet?: string

  programId?: string | number
  year?: number
  quarter?: number

  // cp stands for contact person
  cpName1?: string
  cpRel1?: string
  cpPhone1?: string

  cpName2?: string
  cpRel2?: string
  cpPhone2?: string
}

export interface VolunteerDetails extends CreateVolunteer {
  id: number
  participations: VolunteerParticipation[]
}

export interface EditVolunteerDto extends Partial<Omit<CreateVolunteer, 'programId' | 'year' | 'quarter'>> {
}

export interface CreateStaff extends Omit<CreateVolunteer, 'program'> {
  staffId: string
  role: string
}

export interface StaffDetails extends CreateStaff {
  id: number
}

export interface StaffPayload {
  id: number
  staffId: string
  firstName: string
  lastName: string
  active: boolean
  role: string
}

export interface VolunteersPayload {
  id: number
  firstName: string
  lastName: string
  active: boolean
  type: string
}

export interface VolunteerParticipation {
  id?: number
  volunteerId: number | undefined
  program: string
  year: number
  quarter: number
  programId?: number

}

export type CallFn = () => void

export interface YearStat {
  year: number
  count: number | string
}

export interface Target {
  id: number
  target: number
  year: number
}

export interface CreateTargetDto extends Omit<Target, 'id'> { }

export interface EditTargetDto extends Partial<Target> { }

export interface Partner {
  id: number
  name: string
  logoUrl: string
  isActive: boolean
}

export interface Sponsorship {
  id: number
  year: number
  amount: number
  currency: string
  donation: string | null
  program: string
}

export interface PartnerDetails extends Partner {
  sponsorships: Sponsorship[];
  desc: string;
  logoPublicId: string;
  twitter: string;
  linkedIn: string;
  year: number;
}