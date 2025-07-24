import PTable from "@/components/PTable"
import { Button } from "@/components/ui/button"
import { useGetParticipation } from "@/hooks/use-admin"
import type { Participation } from "@/utils/types"
import { useState } from "react"

export default function Participation() {

      const [token] = useState(()=>{
       return window.sessionStorage.getItem("myToken")
      })

        const [meta, setMeta] = useState <Participation>({
            year: 0,
            quarter:0,
            program:"All"
        })

    const {isPending, isError, error, data } = useGetParticipation(meta, token!)

    if (isPending) {
        return <span>Loading...</span>
      }
    
      if (isError) {
        console.log(error)
        return <span>Error: {error.message}</span>
      }

      const programs = [ "A", "ASCG",  "CBC" , "DSC" , "SSC"]
      const quarters = ["All", 1, 2, 3, 4]
      const options = programs.map(program=>(<option key={program} value={program}>{program}</option>))
      const quarterOptions = quarters.map(quarter=>(<option key={quarter} value={quarter}>{quarter}</option>))

      function handleFilter(formData: FormData) {
        console.log(Object.fromEntries(formData))
      }

    return (
        <div>
            <h1>Participation</h1>
            {/* Filter options */}
            <form action={handleFilter}>
              <div>
              <label htmlFor="program"></label>
              <select name="program" id="program">
                {options}
              </select>

              </div>

              <div>
              <label htmlFor="quarter"></label>
              <select name="quarter" id="quarter">
                {quarterOptions}
              </select>
              </div>

              <Button>
                Apply Filter
              </Button>
            </form>
            <PTable data={data!} />
            </div>
    )
}