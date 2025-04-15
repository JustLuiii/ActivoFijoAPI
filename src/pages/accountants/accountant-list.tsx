import { Pagination } from "@/components/pagination";
import { UIError } from "@/components/ui-error";
import { UILoading } from "@/components/ui-loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetAllAccountantsQuery } from "@/features/accountants/accountantsApiSlice";
import { ChevronDown, Edit, PlusCircle } from "lucide-react";
import { Link } from "react-router";

export const AccountantList = () => {

    const { data = [], isLoading, isFetching, isError, refetch } = useGetAllAccountantsQuery(undefined, {
        refetchOnMountOrArgChange: true
    });

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Entrada Contable</h1>
                    <p className="text-muted-foreground">Gestione las entradas contables</p>
                </div>
                <Button asChild>
                    <Link to="/accountant-entrys/new" replace>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Nueva Entrada Contable
                    </Link>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Entradas Contables</CardTitle>
                    <CardDescription>Lista de entradas contables registradas en el sistema</CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading || isFetching ? (
                        <UILoading variant="skeleton" count={5} />
                    ) : isError ? (
                        <UIError onRetry={refetch} />
                    ) : (
                        <Table className="table-auto w-full">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Descripción</TableHead>
                                    <TableHead className="text-right">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <Pagination
                                    data={data}
                                    pageSize={5}
                                    renderItem={(entry) => (
                                        <Collapsible key={entry.id} asChild>
                                            <>
                                                <TableRow>
                                                    <TableCell>{entry.id}</TableCell>
                                                    <TableCell>{entry.descripcion}</TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <Button variant="ghost" size="icon" asChild>
                                                                <Link to={`/accountant-entrys/${entry.id}/edit`}>
                                                                    <Edit className="h-4 w-4" />
                                                                    <span className="sr-only">Editar</span>
                                                                </Link>
                                                            </Button>
                                                            <CollapsibleTrigger asChild>
                                                                <Button variant="ghost" size="icon">
                                                                    <ChevronDown className="h-4 w-4" />
                                                                    <span className="sr-only">Ver detalles</span>
                                                                </Button>
                                                            </CollapsibleTrigger>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                                <CollapsibleContent asChild>
                                                    <TableRow className="bg-muted/40">
                                                        <TableCell colSpan={3}>
                                                            <p className="mb-2 text-sm text-muted-foreground">
                                                                Fecha del Asiento: {entry.fechaAsiento}
                                                            </p>
                                                            <Table>
                                                                <TableHeader>
                                                                    <TableRow>
                                                                        <TableHead>Cuenta ID</TableHead>
                                                                        <TableHead>Tipo Movimiento</TableHead>
                                                                        <TableHead>Monto</TableHead>
                                                                    </TableRow>
                                                                </TableHeader>
                                                                <TableBody>
                                                                    {entry.detalles.map((detalle, index) => (
                                                                        <TableRow key={index}>
                                                                            <TableCell>{detalle.cuentaId}</TableCell>
                                                                            <TableCell>
                                                                                <Badge variant="outline" className={detalle.tipoMovimiento === 'DEBITO' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}>
                                                                                    {detalle.tipoMovimiento}
                                                                                </Badge>
                                                                            </TableCell>
                                                                            <TableCell>${detalle.montoAsiento.toFixed(2)}</TableCell>
                                                                        </TableRow>
                                                                    ))}
                                                                </TableBody>
                                                            </Table>
                                                        </TableCell>
                                                    </TableRow>
                                                </CollapsibleContent>
                                            </>
                                        </Collapsible>
                                    )}
                                />
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </>
    );
};
