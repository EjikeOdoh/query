import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type SearchFormProps = {
  action: string | ((formData: FormData) => void | Promise<void>) | undefined
}

export function SearchForm({action}:SearchFormProps) {
  return (
    <form action={action} className="flex w-full max-w-sm items-center gap-2">
      <Input name="name" type="text" placeholder="Enter student name" required />
      <Button type="submit" variant="outline">
        Search
      </Button>
    </form>
  )
}
