import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { unbanUser, banUser } from "./actions";

export function DialogCloseButton({
  userId,
  banned,
  onUserUpdated,
}: {
  userId: string;
  banned: boolean | null;
  onUserUpdated: () => void;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">{banned ? "Enable" : "Disable"}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are You Sure</DialogTitle>
          <DialogDescription>
            {banned
              ? "Do You Want to Enable this user?"
              : "Do You Want to Disable this user?"}
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="mx-auto flex gap-6">
            <DialogClose asChild>
              <Button
                size="lg"
                variant="default"
                onClick={async () => {
                  if (banned) {
                    await unbanUser({ userId });
                  } else {
                    await banUser({ userId });
                  }
                  onUserUpdated(); // Trigger data refresh after the action
                }}
              >
                Confirm
              </Button>
            </DialogClose>

            <DialogClose asChild>
              <Button size="lg" type="button" variant="destructive">
                Close
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
