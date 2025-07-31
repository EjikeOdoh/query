import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,

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
      <DialogContent aria-description="dialog-content" aria-describedby="dialog content" className="max-h-[80%] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="hidden">
            Popup
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="hidden">
          This is a popup
        </DialogDescription>
        {children}
      </DialogContent>
    </Dialog>
  );
}
