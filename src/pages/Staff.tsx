import Modal from "@/components/Dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function Staff() {

    const [modalOpen, setModalOpen] = useState<boolean>(false)

    function closeModal() {
        setModalOpen(false)
    }

    return (
        <div>

            <Button onClick={() => setModalOpen(true)}>Open</Button>
            <Modal
                isOpen={modalOpen}
                onClose={closeModal}
            >
                What's going on?
            </Modal>
        </div>
    )
}