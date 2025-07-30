import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,

} from "@/components/ui/dialog"

export default function Modal({
    isOpen,
    onClose,
    children,
  }: {
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
  }) {
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-h-[80%] overflow-y-auto">
          {children}
        </DialogContent>
      </Dialog>
    );
  }
  