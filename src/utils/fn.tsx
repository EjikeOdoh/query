interface Student {
    country: string
    dob: Date
    firstName: string
    lastName: string
    id: number
    yearJoined: number
  }
  
interface Meta {
    hasNextPage: boolean
    hasPreviousPage: boolean
    limit: number
    nextPage: number
    page: number
    total: number
    totalPages: number
  }
  
interface StudentResponse {
    data: Student[]
    meta: Meta
  }
  

export async function getStudents() {
    try {
      const res = await fetch('http://localhost:3000/students')
      const data: StudentResponse = await res.json()
  
      return data;
    } catch (error) {
      throw error
    }

  }