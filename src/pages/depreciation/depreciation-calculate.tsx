import { DepreciationForm } from "@/components/depreciation-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const DepreciationCalculate = () => {


    return (
        <>

            <Card>
                <CardHeader>
                    <CardTitle>Depreciación de Activos</CardTitle>
                    <CardDescription>Cálculo detallado de la depreciación por activo</CardDescription>
                </CardHeader>

                <CardContent>
                    <DepreciationForm />
                </CardContent>
            </Card>
        </>
    )
}
