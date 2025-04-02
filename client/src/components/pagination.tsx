import { useState, useMemo, JSX } from "react";
import { Button } from "@/components/ui/button";

interface PaginationProps<T> {
    data: T[];
    pageSize: number;
    renderItem: (item: T) => JSX.Element;
}
export const Pagination = <T,>({ data, pageSize, renderItem }: PaginationProps<T>) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = useMemo(() => Math.ceil(data.length / pageSize), [data, pageSize]);

    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return data.slice(start, start + pageSize);
    }, [currentPage, data, pageSize]);

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) setCurrentPage(page);
    };

    return (
        <>
            {paginatedData.map(renderItem)}
            <div className="flex items-center justify-center gap-2 mt-4">
                <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Anterior
                </Button>
                <span>Página {currentPage} de {totalPages}</span>
                <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    Siguiente
                </Button>
            </div>
        </>
    );
};