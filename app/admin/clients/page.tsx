import AdminPageWrapper from '@/components/admin/AdminPageWrapper';
import AddClientButton from '@/components/admin/clients/AddClientButton';
import ClientsTable from '@/components/admin/clients/ClientsTable';
import SpinnerLoading from '@/components/ui/SpinnerLoading';
import { getAllClients } from '@/src/services/users';
import { Suspense } from 'react';
import Pagination from "@/components/ui/Pagination";

type SearchParams = Promise<{
    page?: string;
    limit?: string;
    nombre?: string;
    email?: string;
    telefono?: string;
    numeroDocumento?: string;
}>;

export default async function ClientsPage({ searchParams }: { searchParams: SearchParams }) {
    const params = await searchParams;
    const currentPage = params.page ? parseInt(params.page, 10) : 1;
    const itemsPerPage = params.limit ? parseInt(params.limit, 10) : 10;

    const clients = await getAllClients({
        page: currentPage,
        limit: itemsPerPage,
    });

    const hasClients = clients && clients.users && clients.users.length > 0;

    return (
        <AdminPageWrapper
            title="Clientes"
            showBackButton={false}
            actions={<AddClientButton />}
        >
            <div className="w-full flex flex-col gap-4">
                <Suspense fallback={<SpinnerLoading />}>
                    <div className="flex flex-col flex-1 min-h-0 w-full gap-4">
                        {/* La tabla siempre se renderiza para mantener visibles los filtros de cabecera */}
                        <div className="flex-1 min-h-0 overflow-hidden rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-primary)]">
                            <ClientsTable clients={clients} />
                            
                            {!hasClients && (
                                <div className="text-center py-12 border-t border-[var(--color-border-default)] bg-[var(--color-bg-primary)]">
                                    <p className="text-sm text-[var(--color-text-secondary)]">
                                        No se encontraron clientes.
                                    </p>
                                </div>
                            )}
                        </div>

                        {hasClients && (
                            <div className="py-2 shrink-0 flex justify-center md:justify-end">
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={clients.totalPages ?? Math.ceil(10 / itemsPerPage)}
                                    limit={itemsPerPage}
                                    pathname="/admin/clients"
                                />
                            </div>
                        )}
                    </div>
                </Suspense>
            </div>
        </AdminPageWrapper>
    );
}