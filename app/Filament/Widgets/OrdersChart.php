<?php

namespace App\Filament\Widgets;

use Leandrocfe\FilamentApexCharts\Widgets\ApexChartWidget;
use App\Models\Order;
use Carbon\Carbon;

class OrdersChart extends ApexChartWidget
{
    protected static ?string $chartId = 'ordersChart';
    protected static ?string $heading = 'Orders';
    protected int | string | array $columnSpan = 'full';

    protected static ?int $sort = 2;

    protected function getOptions(): array
    {
        $startDate = request('start_date', now()->startOfMonth());
        $endDate = request('end_date', now()->endOfMonth());

        $orders = Order::whereBetween('created_at', [$startDate, $endDate])
            ->selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->groupBy('date')
            ->orderBy('date')
            ->pluck('count', 'date');

        $period = Carbon::parse($startDate)->daysUntil($endDate);
        $data = [];
        $categories = [];

        foreach ($period as $date) {
            $categories[] = $date->format('M j');
            $data[] = $orders->get($date->format('Y-m-d'), 0);
        }

        return [
            'chart' => [
                'type' => 'line',
                'height' => 300,
            ],
            'series' => [
                [
                    'name' => 'Orders',
                    'data' => $data,
                ],
            ],
            'xaxis' => [
                'categories' => $categories,
                'labels' => [
                    'style' => [
                        'fontFamily' => 'inherit',
                    ],
                ],
            ],
            'yaxis' => [
                'labels' => [
                    'style' => [
                        'fontFamily' => 'inherit',
                    ],
                ],
            ],
            'colors' => ['#f59e0b'],
            'stroke' => [
                'curve' => 'smooth',
            ],
        ];
    }
}
