import { AlertCircle, RefreshCw } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface ErrorProps {
    title?: string
    description?: string
    error?: Error | string
    onRetry?: () => void
    variant?: "default" | "alert" | "minimal"
}

export function UIError({
    title = "Error al cargar datos",
    description = "Ha ocurrido un error al intentar cargar la información.",
    error,
    onRetry,
    variant = "default",
}: ErrorProps) {
    const errorMessage = error
        ? typeof error === "string"
            ? error
            : error.message || "Error desconocido"
        : "Error desconocido"

    if (variant === "minimal") {
        return (
            <div className="flex items-center justify-center w-full py-4">
                <Alert variant="destructive" className="max-w-md">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>{title}</AlertTitle>
                    <AlertDescription className="mt-2">
                        {description}
                        {onRetry && (
                            <Button variant="outline" size="sm" onClick={onRetry} className="mt-2 w-full">
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Reintentar
                            </Button>
                        )}
                    </AlertDescription>
                </Alert>
            </div>
        )
    }

    if (variant === "alert") {
        return (
            <Alert variant="destructive" className="w-full">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{title}</AlertTitle>
                <AlertDescription>
                    {description}
                    <div className="mt-2 text-sm font-mono bg-destructive/10 p-2 rounded">{errorMessage}</div>
                    {onRetry && (
                        <Button variant="outline" size="sm" onClick={onRetry} className="mt-2">
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Reintentar
                        </Button>
                    )}
                </AlertDescription>
            </Alert>
        )
    }

    // Default variant with card
    return (
        <Card className="w-full border-destructive/50">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-destructive" />
                    <CardTitle>{title}</CardTitle>
                </div>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-sm font-mono bg-muted p-3 rounded overflow-auto max-h-[200px]">{errorMessage}</div>
            </CardContent>
            {onRetry && (
                <CardFooter>
                    <Button variant="outline" onClick={onRetry} className="w-full">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Reintentar
                    </Button>
                </CardFooter>
            )}
        </Card>
    )
}

