import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,

} from "@/components/ui/dialog"

export default function Modal({
  width,
  isOpen,
  onClose,
  children,
}: {
  width?: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent aria-description="dialog-content" aria-describedby="dialog content" className={`max-h-[80%] overflow-y-auto ${width ? width : 'sm:max-w-lg'}`}>
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
