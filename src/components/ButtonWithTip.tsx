import {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
} from "@/components/ui/tooltip"
import { Button } from "./ui/button"

type ButtonProps = React.ComponentProps<typeof Button>

interface TooltipButtonProps extends ButtonProps {
    tooltip: string
}

export function TooltipButton({ tooltip, children, ...props }: TooltipButtonProps) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button size="icon" {...props}>
                    {children}
                </Button>
            </TooltipTrigger>

            <TooltipContent>
                <p>{tooltip}</p>
            </TooltipContent>
        </Tooltip>
    )
}
