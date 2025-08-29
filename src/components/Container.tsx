import Header from "./Header"

type ContainerProps = {
    label: string,
    children: React.ReactNode
    bgColor?: string
    padding?: string
}

export default function Container({ label, bgColor = 'white', children, padding='8' }: ContainerProps) {
    return (
        <div className="flex flex-col">
            <Header
                label={label}
            />
            <div className="flex-1 pb-20">
                <div style={{backgroundColor: bgColor}} className={`w-11/12 p-${padding} flex flex-col gap-10 m-auto rounded-2xl`}>
                    {children}
                </div>
            </div>
        </div>
    )
}