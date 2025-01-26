import { toast } from "@/hooks/use-toast";
import { authClient } from "@/lib/auth-client";
import { Check, LoaderCircle } from "lucide-react";

export async function unbanUser({ userId }: { userId: string }) {
  await authClient.admin.unbanUser(
    { userId },
    {
      onRequest: () => {
        toast({
          title: "Please Wait",
          description: (
            <div className="flex items-center space-x-2">
              <LoaderCircle className="animate-spin w-4 h-4" />
              <span>Performing Action...</span>
            </div>
          ),
        });
      },
      onSuccess: () => {
        toast({
          title: "Success",
          description: (
            <div className="flex items-center space-x-2">
              <Check className="w-6 h-6" />
              <span className="font-bold">User Activated.</span>
            </div>
          ),
        }); // Execute the callback passed from the component
      },
    }
  );
}

export async function banUser({ userId }: { userId: string }) {
  await authClient.admin.banUser(
    { userId },
    {
      onRequest: () => {
        toast({
          title: "Please Wait",
          description: (
            <div className="flex items-center space-x-2">
              <LoaderCircle className="animate-spin w-4 h-4" />
              <span>Performing Action...</span>
            </div>
          ),
        });
      },
      onSuccess: () => {
        toast({
          title: "Success",
          description: (
            <div className="flex items-center space-x-2">
              <Check className="w-6 h-6" />
              <span className="font-bold">User Disabled.</span>
            </div>
          ),
        }); // Execute the callback passed from the component
      },
    }
  );
}
