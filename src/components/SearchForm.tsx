import { Button } from "@/components/ui/button"
import { CircleFadingPlus, Search } from "lucide-react"

type SearchFormProps = {
  action: string | ((formData: FormData) => void | Promise<void>) | undefined
}

export function SearchForm({ action }: SearchFormProps) {
  return (
    <form action={action} className="flex min-w-1/2 max-w-sm items-center gap-2 h-12">
      <div className="flex-1 flex items-center gap-4 border border-[#E5E5E5] h-full px-4 rounded-xl">
        <Search color="#808080" />
        <input
          name="name"
          type="text"
          placeholder="Search"
          className="flex-1 border-none shadow-none outline-none focus:outline-none focus:border-none focus:ring-0 p-0 font-light text-[#808080]"
          required
        />
      </div>
      <Button type="submit" variant="outline" className="h-full w-32 bg-[#00AEFF] text-white font-light rounded-xl cursor-pointer">
        Add
        <CircleFadingPlus />
      </Button>
    </form>
  )
}
