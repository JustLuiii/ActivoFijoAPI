"use client"

import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface PasswordRequirement {
    text: string
    regex: RegExp
}

const passwordRequirements: PasswordRequirement[] = [
    {
        text: "Al menos 8 caracteres",
        regex: /.{8,}/,
    },
    {
        text: "Al menos una letra mayúscula",
        regex: /[A-Z]/,
    },
    {
        text: "Al menos una letra minúscula",
        regex: /[a-z]/,
    },
    {
        text: "Al menos un número",
        regex: /[0-9]/,
    },
    {
        text: "Al menos un carácter especial",
        regex: /[^A-Za-z0-9]/,
    },
]

interface PasswordStrengthIndicatorProps {
    password: string
}

export const PasswordStrengthIndicator = ({ password }: PasswordStrengthIndicatorProps) => {
    const calculateStrength = () => {
        if (!password) return 0

        const fulfilledRequirements = passwordRequirements.filter((requirement) => requirement.regex.test(password)).length

        return (fulfilledRequirements / passwordRequirements.length) * 100
    }

    const strength = calculateStrength()

    const getStrengthText = () => {
        if (strength === 0) return "Sin contraseña"
        if (strength < 40) return "Débil"
        if (strength < 80) return "Media"
        return "Fuerte"
    }

    const getStrengthColor = () => {
        if (strength === 0) return "bg-muted"
        if (strength < 40) return "bg-destructive"
        if (strength < 80) return "bg-yellow-500"
        return "bg-green-500"
    }

    return (
        <div className="space-y-3 mt-2">
            <div className="space-y-2">
                <div className="flex justify-between text-xs">
                    <p className="text-muted-foreground">Fortaleza: {getStrengthText()}</p>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div
                        className={cn("h-full transition-all duration-300", getStrengthColor())}
                        style={{ width: `${strength}%` }}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <p className="text-xs text-muted-foreground">La contraseña debe cumplir con:</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-1 text-xs">
                    {passwordRequirements.map((requirement, index) => {
                        const isFullFilled = requirement.regex.test(password)
                        return (
                            <li key={index} className="flex items-center gap-2">
                                {isFullFilled ? (
                                    <Check className="h-3.5 w-3.5 text-green-500" />
                                ) : (
                                    <X className="h-3.5 w-3.5 text-muted-foreground" />
                                )}
                                <span className={cn(isFullFilled ? "text-foreground" : "text-muted-foreground")}>
                                    {requirement.text}
                                </span>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

