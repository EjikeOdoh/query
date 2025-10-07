/* eslint-disable react-refresh/only-export-components */

import { createColumnHelper } from "@tanstack/react-table";
import { type HistoryTable, type StaffPayload, type VolunteersPayload } from "../utils/types";
import { Active } from "./Tags";
import { Inactive } from "./Tags";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { Eye, Pencil, Trash2 } from "lucide-react";


// Actions cell
type ActionsCellProps = {
    id: number;
    onDelete: (id: number) => void;
    target?: string
};

function ActionsCell({ id, target = "volunteers", onDelete }: ActionsCellProps) {
    const navigate = useNavigate();

    return (
        <div className="flex items-center gap-2">
            <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(`/${target}/${id}`)}
            >
                <Eye color="#171717" />
            </Button>

            <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(`/${target}/${id}`, { state: { edit: true } })}
            >
                <Pencil color="#171717" />
            </Button>

            <Button variant="ghost" size="icon" onClick={() => onDelete(id)}>
                <Trash2 color="#171717" />
            </Button>
        </div>
    );
}


// For volunteer table
const vColumnHelper = createColumnHelper<VolunteersPayload>()

export const vColumns = (onDelete: (id: number) => void) => [
    vColumnHelper.accessor('firstName', {
        cell: info => info.getValue(),
        header: 'First Name'
    }
    ),
    vColumnHelper.accessor('lastName', {
        cell: info => info.getValue(),
        header: 'Last Name'
    }
    ),
    vColumnHelper.accessor('type', {
        cell: info => (info.getValue()[0] + info.getValue().slice(1).toLocaleLowerCase()),
        header: 'Type',
        filterFn: (row, columnId, filterValue) => {
            if (!filterValue || filterValue === "all") return true
            return row.getValue(columnId) === filterValue
        },
    }
    ),
    vColumnHelper.accessor('active', {
        cell: info => (info.getValue() ? <Active /> : <Inactive />),
        header: 'Status',
        filterFn: (row, columnId, filterValue) => {
            if (filterValue === undefined) return true
            return Boolean(row.getValue(columnId)) === Boolean(filterValue)
        },
    }),
    vColumnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: props => <ActionsCell id={props.row.original.id} onDelete={() => onDelete(props.row.original.id)} />
    })
]


// For staff table
const sColumnHelper = createColumnHelper<StaffPayload>()

export const sColumns = (onDelete: (id: number) => void) => [
    sColumnHelper.accessor('staffId', {
        cell: prop => prop.getValue(),
        header: 'Staff ID'
    }),
    sColumnHelper.accessor('firstName', {
        cell: prop => prop.getValue(),
        header: 'First Name'
    }),
    sColumnHelper.accessor('lastName', {
        cell: prop => prop.getValue(),
        header: 'Last Name'
    }),
    sColumnHelper.accessor('role', {
        cell: prop => prop.getValue(),
        header: 'Position'
    }),
    sColumnHelper.accessor('active', {
        cell: prop => (prop.getValue() ? <Active /> : <Inactive />),
        header: 'Status'
    }),
    sColumnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: props => <ActionsCell
            id={props.row.original.id}
            target="staff"
            onDelete={() => onDelete(props.row.original.id)}
        />
    })
]

// For history table
const hColumnHelper = createColumnHelper<HistoryTable>()

export const hColumns = (onDelete: (tag: string) => void) => [
    hColumnHelper.accessor('tag', {
        cell: prop => prop.getValue(),
        header: 'Tag'
    }),
    hColumnHelper.accessor('count', {
        cell: prop => prop.getValue(),
        header: 'Count'
    }),
    hColumnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: props => <Button
            variant='ghost'
            onClick={() => onDelete(props.row.original.tag)}
            size="icon">
            <Trash2 />
        </Button>
    })
]