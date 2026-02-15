import { ArrowBigDownDash, ArrowBigUpDash, MoveHorizontal } from "lucide-react";
import { Badge } from "./ui/badge";

export function Up() {
    return (
        <Badge className="bg-green-200 text-green-500">
            <ArrowBigUpDash className="text-green-500" />
            Improved
        </Badge>
    );
}

export function Down() {
    return (
        <Badge className="bg-red-200 text-red-500">
            <ArrowBigDownDash className="text-red-500" />
            Declined
        </Badge>
    );
}

export function NoChange() {
    return (
        <Badge className="bg-gray-200 text-gray-500">
            <MoveHorizontal className="text-gray-500" />
            No Change
        </Badge>
    );
}