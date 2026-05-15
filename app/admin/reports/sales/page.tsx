import React, { Suspense } from 'react';
import SalesReportsResultsAdmin from '@/components/admin/reports/SalesReportsResultsAdmin';
import SpinnerLoading from '@/components/ui/SpinnerLoading';

type SalesReportsPageProps = {
    searchParams: Promise<{
        startDate?: string;
        endDate?: string;
    }>;
};

export default async function SalesReportsPage({ searchParams }: SalesReportsPageProps) {
    const { startDate, endDate } = await searchParams;

    return (
        <div className="space-y-6">
            <Suspense fallback={
                <div className="flex justify-center py-20">
                    <SpinnerLoading />
                </div>
            }>
                <SalesReportsResultsAdmin 
                    startDate={startDate} 
                    endDate={endDate} 
                />
            </Suspense>
        </div>
    );
}