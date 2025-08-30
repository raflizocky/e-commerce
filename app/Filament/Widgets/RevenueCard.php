<?php

namespace App\Filament\Widgets;

use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use App\Models\Order;

class RevenueCard extends BaseWidget
{
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        $startDate = session('dashboard_start_date', now()->startOfMonth());
        $endDate = session('dashboard_end_date', now()->endOfMonth());

        $revenue = Order::whereBetween('created_at', [$startDate, $endDate])->sum('total_amount');
        $orders = Order::whereBetween('created_at', [$startDate, $endDate])->count();

        return [
            Stat::make('Total Revenue', '$' . number_format($revenue, 2))
        ];
    }
}
