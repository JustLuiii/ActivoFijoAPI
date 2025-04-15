import { toast as sonnerToast } from "sonner";

interface IToast {
    title: string,
    description: string,
    variant:"default" | "destructive"
}

export const useToast = () => {
    const toast = ({ title, description, variant = "default" } : IToast) => {
        sonnerToast[variant === "destructive" ? "error" : "success"](title, {
            description,
        });
    };

    return { toast };
}
