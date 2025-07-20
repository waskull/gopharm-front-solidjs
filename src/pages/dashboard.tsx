import { createSignal, JSX } from "solid-js";
import DashboardLayout from "../layouts/dashboard-layout";

import { SolidApexCharts } from 'solid-apexcharts';

function Chart(): JSX.Element {
    const borderColor = "#374151";
    const labelColor = "#93ACAF";
    const opacityFrom = 0;
    const opacityTo = 0;
    const [options] = createSignal({
        chart: {
            fontFamily: "Inter, sans-serif",
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
            animations: {
                enabled: false,
            },

        },
        fill: {
            type: "gradient",
            gradient: {
                opacityFrom,
                opacityTo,
                type: "vertical",
            },
        },
        dataLabels: {
            enabled: false,
        },
        tooltip: {
            fillSeriesColor: false,
            theme: "mixed",
            style: {
                fontSize: "14px",
                fontFamily: "Inter, sans-serif",
                color: "#FFFFFF",
            },
            marker: {
                show: true
            },
            y: {
                formatter: undefined,
                title: {
                    formatter: (seriesName: any) => seriesName,
                },
            },
        },
        grid: {
            show: true,
            borderColor: borderColor,
            strokeDashArray: 1,
            padding: {
                left: 35,
                bottom: 15,
            },
        },
        markers: {
            size: 5,
            strokeColors: "#FFFFFF",
            strokeWidth: 2,
            hover: {
                size: undefined,
                sizeOffset: 5,
            },
        },
        xaxis: {
            categories: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((st) => st),
            labels: {
                style: {
                    colors: [labelColor],
                    fontSize: "12px",
                    fontWeight: 500,
                },
            },
            axisBorder: {
                color: borderColor,
            },
            axisTicks: {
                color: borderColor,
            },
            crosshairs: {
                show: true,
                position: "back",
                stroke: {
                    color: "#FFFFFF",
                    width: 1,
                    dashArray: 10,
                },
            },
        },
        yaxis: {
            labels: {
                background: {
                    enabled: false,
                    foreColor: '#fff',
                },
                style: {
                    colors: [labelColor],
                    fontSize: "14px",
                    fontWeight: 500,
                },
                formatter: function (value: any) {
                    return value + "  ventas";
                },
            },
        },
    });
    const [series] = createSignal([
        {
            name: 'Producto X',
            data: [50, 40, 35, 50, 49, 60, 72],
            color: "#31C48D"
        },
    ]);

    return <SolidApexCharts height={420} type="area" options={options()} series={series()} />;
}

export default function Dashboard(): JSX.Element {
    return (
        <DashboardLayout>
            <div class="">
                <div class="flex flex-col">
                    <div class="overflow-hidden">
                        <div class="inline-block min-w-full align-middle">
                            <div class="overflow-hidden min-h-screen max-w-screen bg-gray-50 dark:bg-gray-900 shadow pr-6 pl-6">
                                <div class="pt-6">
                                    <div>
                                        <div class="rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
                                            <div class="mb-2 flex items-center justify-between">
                                                <div class="shrink-0">
                                                    <span class="text-2xl font-bold leading-none text-gray-900 dark:text-white sm:text-3xl">
                                                        Productos mas populares<span class="text-2xl font-bold text-gray-700 dark:text-gray-300">.</span>
                                                    </span>
                                                    <h3 class="text-base font-normal text-gray-600 dark:text-gray-400">
                                                        Estos son los 5 productos populares
                                                    </h3>
                                                </div>
                                                <div class="flex flex-1 items-center justify-end text-base font-bold text-green-600 dark:text-green-400">
                                                    {/* 12.5% 
            <svg
              class="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            */}
                                                </div>
                                            </div>
                                            <Chart />
                                            <div class="flex items-center justify-between border-t border-gray-200 pt-3 dark:border-gray-700 sm:pt-6">
                                                {/* <Datepicker /> */}
                                                <div></div>
                                                <div class="shrink-0">
                                                    <a
                                                        href="/store"
                                                        class="inline-flex items-center rounded-lg p-2 text-xs font-medium uppercase text-zinc-800 dark:text-zinc-100 hover:bg-gray-100 dark:hover:bg-gray-700 sm:text-sm"
                                                    >
                                                        Ver productos
                                                        <svg
                                                            class="ml-1 h-4 w-4 sm:h-5 sm:w-5"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                stroke-width={2}
                                                                d="M9 5l7 7-7 7"
                                                            />
                                                        </svg>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}