import Container from "./Container";
import { SpinnerCustom } from "./Loader";

interface LayoutProps {
    label: string
}

export default function LoadingLayout({ label }: LayoutProps) {
    return (
        <Container
            label={label}>
            <SpinnerCustom />
        </Container>
    )
}
