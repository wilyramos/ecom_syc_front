/* File: frontend/app/(pos-v3)/reportes/page.tsx */
"use client";

import React, { useState, useEffect, ReactElement } from 'react';
import { getDashboardStatsAction, DashboardStats, ReportFilters } from '@/actions/report-actions';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';
import {
    TrendingUp, Package, ShoppingCart, DollarSign,
    AlertCircle, Calendar, Loader2, ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

// --- IMPORTS DE REACT-DATE-RANGE ---
import { DateRange, Range, RangeKeyDict } from "react-date-range";
import { es } from 'date-fns/locale';
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const METHOD_COLORS: Record<string, string> = {
    CASH: '#10B981',     // Emerald
    CARD: '#3B82F6',     // Blue
    YAPE: '#8B5CF6',     // Violet
    PLIN: '#F59E0B',     // Amber
    TRANSFER: '#64748B', // Slate
};

interface TopProduct {
    _id: string;
    name: string;
    image?: string;
    soldUnits: number;
    revenue: number;
}

export default function ReportesPage() {
    const [period, setPeriod] = useState<string>('today');
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<DashboardStats | null>(null);

    // Estados para el Selector de Fechas
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
    const [customDates, setCustomDates] = useState<{ start: string; end: string } | null>(null);
    const [dateSelection, setDateSelection] = useState<Range[]>([{
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    }]);

    useEffect(() => {
        let isMounted = true;
        
        const fetchStats = async () => {
            setLoading(true);
            const filters: ReportFilters = {};

            if (period === 'custom' && customDates) {
                filters.startDate = customDates.start;
                filters.endDate = customDates.end;
            } else {
                filters.period = period;
            }

            const res = await getDashboardStatsAction(filters);
            if (isMounted && res.success && res.data) {
                setData(res.data);
            }
            if (isMounted) setLoading(false);
        };

        fetchStats();
        return () => { isMounted = false; };
    }, [period, customDates]);

    const formatMoney = (amount: number) => 
        new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(amount || 0);

    const formatYMD = (date: Date) => {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    };

    const handleDateSelect = (ranges: RangeKeyDict) => {
        setDateSelection([ranges.selection]);
    };

    const applyCustomRange = () => {
        const start = dateSelection[0].startDate;
        const end = dateSelection[0].endDate;
        if (start && end) {
            setCustomDates({ start: formatYMD(start), end: formatYMD(end) });
            setPeriod('custom');
            setShowDatePicker(false);
        }
    };

    const handlePresetClick = (selectedPeriod: string) => {
        setPeriod(selectedPeriod);
        setCustomDates(null);
        setShowDatePicker(false);
    };

    return (
        <div className="min-h-screen bg-[var(--color-bg-secondary)] p-4 md:p-8 overflow-y-auto custom-scrollbar">
            <div className="max-w-7xl mx-auto space-y-6">
                
                {/* --- HEADER Y FILTROS --- */}
                {/* Se añade z-30 y relative al header para que el calendario se sobreponga correctamente */}
                <header className="relative z-30 flex flex-col md:flex-row md:items-end justify-between gap-4 bg-[var(--color-bg-primary)] p-6 rounded-3xl shadow-sm border border-[var(--color-border-subtle)]">
                    <div>
                        
                    </div>

                    <div className="flex flex-wrap items-center gap-2 bg-[var(--color-bg-secondary)] p-1.5 rounded-2xl border border-[var(--color-border-subtle)]">
                        {[
                            { id: 'today', label: 'Hoy' },
                            { id: 'week', label: '7 Días' },
                            { id: 'month', label: 'Este Mes' },
                            { id: 'year', label: 'Este Año' }
                        ].map(p => (
                            <button
                                key={p.id}
                                onClick={() => handlePresetClick(p.id)}
                                className={cn(
                                    "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                    period === p.id 
                                        ? "bg-[var(--color-bg-inverse)] text-[var(--color-text-inverse)] shadow-md" 
                                        : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-white"
                                )}
                            >
                                {p.label}
                            </button>
                        ))}

                        <button
                            onClick={() => setShowDatePicker(true)}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                period === 'custom'
                                    ? "bg-[var(--color-accent)] text-white shadow-md" 
                                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-white"
                            )}
                        >
                            <Calendar size={12} />
                            {period === 'custom' && customDates 
                                ? `${customDates.start.slice(8,10)}/${customDates.start.slice(5,7)} - ${customDates.end.slice(8,10)}/${customDates.end.slice(5,7)}` 
                                : 'Personalizado'}
                            <ChevronDown size={12} />
                        </button>
                    </div>

                    {/* POPOVER DEL CALENDARIO (Ubicado fuera del flujo normal con Absolute) */}
                    {showDatePicker && (
                        <>
                            {/* Backdrop transparente para cerrar al hacer clic afuera */}
                            <div 
                                className="fixed inset-0 z-40"
                                onClick={() => setShowDatePicker(false)}
                            />
                            {/* Menú Flotante */}
                            <div className="absolute top-full right-0 mt-4 z-50 bg-white p-4 rounded-[2rem] shadow-2xl border border-gray-200 animate-in fade-in slide-in-from-top-4">
                                <DateRange
                                    ranges={dateSelection}
                                    onChange={handleDateSelect}
                                    months={1}
                                    direction="horizontal"
                                    locale={es}
                                    rangeColors={['#3098b3']} 
                                    showDateDisplay={false}
                                />
                                <div className="flex justify-end gap-2 mt-4 border-t pt-4">
                                    <button 
                                        onClick={() => setShowDatePicker(false)}
                                        className="px-4 py-2 rounded-xl text-[10px] font-black uppercase text-gray-500 hover:bg-gray-100 transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                    <button 
                                        onClick={applyCustomRange}
                                        className="px-6 py-2 rounded-xl text-[10px] font-black uppercase bg-[var(--color-bg-inverse)] text-white shadow-md hover:opacity-90 transition-opacity"
                                    >
                                        Aplicar Rango
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </header>

                {loading ? (
                    <div className="h-[60vh] flex flex-col items-center justify-center space-y-4 text-[var(--color-text-tertiary)]">
                        <Loader2 className="animate-spin" size={48} strokeWidth={1.5} />
                        <p className="text-[10px] font-black uppercase tracking-widest">Analizando datos...</p>
                    </div>
                ) : !data ? (
                    <div className="h-[40vh] flex items-center justify-center text-[var(--color-error)] font-bold">
                        Error al cargar los reportes.
                    </div>
                ) : (
                    <>
                        {/* --- KPIs PRINCIPALES --- */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            <KpiCard 
                                title="Ventas Totales" 
                                value={formatMoney(data.summary.totalSales)} 
                                icon={<DollarSign />} 
                                color="bg-emerald-500" 
                            />
                            <KpiCard 
                                title="Utilidad Bruta" 
                                value={formatMoney(data.summary.netProfit)} 
                                icon={<TrendingUp />} 
                                color="bg-blue-500" 
                            />
                            <KpiCard 
                                title="Operaciones" 
                                value={data.summary.totalOrders.toString()} 
                                icon={<ShoppingCart />} 
                                color="bg-purple-500" 
                                subtitle={`${data.summary.totalUnits} unidades vendidas`}
                            />
                            <KpiCard 
                                title="Valor Inventario" 
                                value={formatMoney(data.summary.inventoryValue)} 
                                icon={<Package />} 
                                color="bg-slate-800" 
                                subtitle={`${data.summary.lowStockCount} ítems en stock bajo`}
                                alert={data.summary.lowStockCount > 0}
                            />
                        </div>

                        {/* --- GRÁFICOS --- */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
                            
                            {/* Gráfico de Barras: Ventas por fecha */}
                            <div className="lg:col-span-2 bg-[var(--color-bg-primary)] p-6 rounded-3xl shadow-sm border border-[var(--color-border-subtle)]">
                                <h3 className="text-[11px] font-black uppercase tracking-widest text-[var(--color-text-secondary)] mb-6 flex items-center gap-2">
                                    <Calendar size={14} /> Dinámica de Ingresos
                                </h3>
                                <div className="h-72 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={data.salesByDate} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                            <XAxis 
                                                dataKey="date" 
                                                tickFormatter={(str: string) => {
                                                    const parts = str.split('-');
                                                    if(parts.length !== 3) return str;
                                                    return `${parts[2]}/${parts[1]}`;
                                                }}
                                                axisLine={false} 
                                                tickLine={false} 
                                                tick={{ fontSize: 10, fontWeight: 700, fill: '#9CA3AF' }} 
                                                dy={10}
                                            />
                                            <YAxis 
                                                axisLine={false} 
                                                tickLine={false} 
                                                tick={{ fontSize: 10, fontWeight: 700, fill: '#9CA3AF' }} 
                                                tickFormatter={(val: number) => `S/${val >= 1000 ? (val/1000).toFixed(1)+'k' : val}`}
                                            />
                                            <Tooltip 
                                                cursor={{ fill: '#F3F4F6' }}
                                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', fontWeight: 'bold', fontSize: '12px' }}
                                                formatter={(value: number) => [formatMoney(value), 'Total Venta']}
                                                labelFormatter={(label: string) => `Fecha: ${label}`}
                                            />
                                            <Bar dataKey="total" fill="var(--color-bg-inverse)" radius={[6, 6, 0, 0]} maxBarSize={50} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Gráfico Donut: Métodos de Pago */}
                            <div className="bg-[var(--color-bg-primary)] p-6 rounded-3xl shadow-sm border border-[var(--color-border-subtle)] flex flex-col">
                                <h3 className="text-[11px] font-black uppercase tracking-widest text-[var(--color-text-secondary)] mb-2">
                                    Flujo de Caja por Método
                                </h3>
                                <div className="flex-1 min-h-[250px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={data.salesByMethod}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={80}
                                                paddingAngle={5}
                                                dataKey="amount"
                                                nameKey="method"
                                                stroke="none"
                                            >
                                                {data.salesByMethod.map((entry: { method: string; amount: number }, index: number) => (
                                                    <Cell key={`cell-${index}`} fill={METHOD_COLORS[entry.method] || '#000'} />
                                                ))}
                                            </Pie>
                                            <Tooltip 
                                                formatter={(value: number) => formatMoney(value)}
                                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                                            />
                                            <Legend 
                                                verticalAlign="bottom" 
                                                height={36} 
                                                iconType="circle"
                                                formatter={(value: string) => <span className="text-[10px] font-bold text-gray-600">{value}</span>}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        {/* --- TOP PRODUCTOS --- */}
                        <div className="bg-[var(--color-bg-primary)] p-6 rounded-3xl shadow-sm border border-[var(--color-border-subtle)] relative z-10">
                            <h3 className="text-[11px] font-black uppercase tracking-widest text-[var(--color-text-secondary)] mb-6 flex items-center gap-2">
                                <Package size={14} /> Top 10 Productos Más Vendidos
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {data.topProducts.map((prod: TopProduct, index: number) => (
                                    <div key={prod._id} className="flex items-center gap-4 p-3 rounded-2xl bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-tertiary)] transition-colors">
                                        <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center overflow-hidden shrink-0 border border-[var(--color-border-subtle)] relative">
                                            <div className="absolute top-0 left-0 bg-black text-white text-[8px] font-black px-1.5 py-0.5 rounded-br-lg z-10">
                                                #{index + 1}
                                            </div>
                                            {prod.image ? (
                                                <Image src={prod.image} alt={prod.name} width={48} height={48} className="object-contain w-full h-full p-1" />
                                            ) : (
                                                <Package size={20} className="text-gray-300" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-[11px] font-black uppercase text-[var(--color-text-primary)] truncate" title={prod.name}>
                                                {prod.name}
                                            </h4>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                                                    {prod.soldUnits} uds
                                                </span>
                                                <span className="text-[10px] font-bold text-[var(--color-text-tertiary)]">
                                                    Ingreso: {formatMoney(prod.revenue)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

// --- SUBCOMPONENTE KPI ESTRICTAMENTE TIPADO ---
interface IconProps {
    size?: number | string;
    className?: string;
}

interface KpiCardProps {
    title: string;
    value: string;
    icon: ReactElement<IconProps>;
    color: string;
    subtitle?: string;
    alert?: boolean;
}

function KpiCard({ title, value, icon, color, subtitle, alert }: KpiCardProps) {
    return (
        <div className="bg-[var(--color-bg-primary)] p-5 rounded-3xl shadow-sm border border-[var(--color-border-subtle)] relative overflow-hidden group">
            <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform ${color.replace('bg-', 'text-')}`}>
                {React.cloneElement(icon, { size: 64 })}
            </div>
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                    <div className={cn("p-1.5 rounded-lg text-white", color)}>
                        {React.cloneElement(icon, { size: 14 })}
                    </div>
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text-secondary)]">
                        {title}
                    </h3>
                </div>
                <div className="text-2xl lg:text-3xl font-black tracking-tighter text-[var(--color-text-primary)]">
                    {value}
                </div>
                {subtitle && (
                    <div className="mt-2 flex items-center gap-1.5">
                        {alert && <AlertCircle size={12} className="text-red-500" />}
                        <p className={cn("text-[9px] font-bold uppercase", alert ? "text-red-500" : "text-[var(--color-text-tertiary)]")}>
                            {subtitle}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}