import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SearchForm() {
  return (
    <form className="flex w-full max-w-sm items-center gap-2">
      <Input type="text" placeholder="Enter student name" required />
      <Button type="submit" variant="outline">
        Subscribe
      </Button>
    </form>
  )
}
