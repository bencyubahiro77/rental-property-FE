import { useToast } from "@/hooks/use-toast"
import { useEffect } from "react";
import {ToastProps} from "../types/types"


export const Toast: React.FC<ToastProps> = ({ message, type }) => {
  const { toast } = useToast();
  // Display the toast when the component renders with a message
  useEffect(() => {
    if (message) {
      toast({
        description: message,
        variant: type, // Display it as an error message
      });
    }
  }, [message, toast]);

  return null; // No visible component; toasts are shown automatically
};
