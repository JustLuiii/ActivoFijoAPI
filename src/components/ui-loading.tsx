import { Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface LoadingProps {
    title?: string
    description?: string
    variant?: "default" | "skeleton" | "spinner" | "minimal"
    count?: number
}

export const UILoading = ({
    title = "Cargando datos",
    description = "Por favor espere mientras cargamos la información...",
    variant = "default",
    count = 5,
}: LoadingProps) => {

    if (variant === "minimal") {
        return (
            <div className="flex items-center justify-center w-full h-24">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (variant === "spinner") {
        return (
            <div className="flex flex-col items-center justify-center w-full py-12 space-y-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <div className="text-center">
                    <h3 className="text-lg font-medium">{title}</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>
            </div>
        )
    }

    if (variant === "skeleton") {
        return (
            <div className="w-full space-y-3">
                {Array.from({ length: count }).map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                ))}
            </div>
        )
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {Array.from({ length: count }).map((_, i) => (
                        <div key={i} className="flex items-center space-x-4">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

