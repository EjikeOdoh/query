import Container from "./Container";

interface ErrorLayoutProps {
    label: string
    text: string
}

export default function ErrorLayout({ label, text }: ErrorLayoutProps) {
    return (
        <Container label={label}>
            <div>
            <h3 className="text-3xl font-bold text-destructive">
                {text}
            </h3>
            <p>Please contact admin</p>
            </div>
        </Container>
    )
}
