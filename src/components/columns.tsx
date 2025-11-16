/* eslint-disable react-refresh/only-export-components */

import { createColumnHelper } from "@tanstack/react-table";
import { type Callback, type HistoryTable, type StaffPayload, type User, type VolunteersPayload } from "../utils/types";
import { Active } from "./Tags";
import { Inactive } from "./Tags";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { Eye, Pencil, RotateCcw, Trash2, UserPlus, UserRoundX } from "lucide-react";
import { TooltipButton } from "./ButtonWithTip";


// Actions cell
type ActionsCellProps = {
    id: number
    onDelete: Callback
    onCreate: Callback
    onRemove: Callback
    hasAccount?: boolean
    active?: boolean
    target?: string

};

function ActionsCell({ id, target = "volunteers", onDelete, onCreate, onRemove, hasAccount, active }: ActionsCellProps) {
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

            <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(id)}>
                <Trash2 color="#171717" />
            </Button>
            {active && (!hasAccount ?
                <TooltipButton
                    tooltip="Create Account"
                    size='icon'
                    onClick={() => onCreate(id)}
                >
                    <UserPlus />
                </TooltipButton>
                :
                <TooltipButton
                    tooltip="Delete Account"
                    size='icon'
                    variant="destructive"
                    onClick={() => onRemove(id)}
                >
                    <UserRoundX />
                </TooltipButton>)
            }


        </div>
    );
}


// For volunteer table
const vColumnHelper = createColumnHelper<VolunteersPayload>()

export const vColumns = (onDelete: (id: number) => void, onCreate: Callback, onRemove: Callback) => [
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
        cell: props => <ActionsCell
            id={props.row.original.id}
            onDelete={() => onDelete(props.row.original.id)}
            onCreate={() => onCreate(props.row.original.id)}
            onRemove={() => onRemove(props.row.original.id)}
            hasAccount={props.row.original.hasAccount}
            active={props.row.original.active}
        />
    })
]


// For staff table
const sColumnHelper = createColumnHelper<StaffPayload>()

export const sColumns = (onDelete: (id: number) => void, onCreate: Callback, onRemove: Callback) => [
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
            onCreate={() => onCreate(props.row.original.id)}
            onRemove={() => onRemove(props.row.original.id)}
            hasAccount={props.row.original.hasAccount}
            active={props.row.original.active}
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


// For user table
const uColumnHelper = createColumnHelper<User>()

export const uColumns = (onReset: Callback, onDelete: Callback, onUpdate: Callback) => [

    uColumnHelper.accessor(
        row => row.firstName || row.staff?.firstName || row.volunteer?.firstName,
        {
            id: 'firstName',
            header: 'First Name',
            cell: prop => prop.getValue()
        }
    ),
    uColumnHelper.accessor(
        row => row.lastName || row.staff?.lastName || row.volunteer?.lastName,
        {
            id: 'lastName',
            header: 'Last Name',
            cell: prop => prop.getValue()
        }
    ),
    uColumnHelper.accessor('email', {
        cell: prop => prop.getValue(),
        header: 'Email'
    }),
    uColumnHelper.accessor('role', {
        cell: prop => prop.getValue(),
        header: 'Role'
    }),
    uColumnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: props => (
            <div className="space-x-2">
                <TooltipButton tooltip="Edit user" onClick={() => onUpdate(props.row.original.id)}>
                    <Pencil />
                </TooltipButton>
                <TooltipButton tooltip="Reset Password" variant="outline" onClick={() => onReset(props.row.original.id)}>
                    <RotateCcw color="#00AEEF" />
                </TooltipButton>
                <TooltipButton tooltip="Delete User" variant="destructive" onClick={() => onDelete(props.row.original.id)}>
                    <Trash2 />
                </TooltipButton>
            </div>)
    })
]