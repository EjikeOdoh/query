import Header from "./Header"

type ContainerProps = {
    label: string,
    children: React.ReactNode
}

export default function Container({ label, children }: ContainerProps) {
    return (
        <div className="flex flex-col">
            <Header
                label={label}
            />
            <div className="flex-1 pb-20">
                <div className="w-11/12 p-8 flex flex-col gap-10 m-auto bg-white rounded-2xl">
                    {children}
                </div>
            </div>
        </div>
    )
}