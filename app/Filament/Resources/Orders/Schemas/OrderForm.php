<?php

namespace App\Filament\Resources\Orders\Schemas;

use App\Models\Product;
use Filament\Schemas\Schema;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\TextInput;

class OrderForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
            Select::make('email')
                ->relationship('customer', 'email')
                ->searchable()
                ->preload()
                ->required(),
            Repeater::make('orderItems')
                ->label('Order Items')
                ->relationship()
                ->schema([
                Select::make('product_id')
                    ->label('Product')
                    ->options(Product::all()->pluck('name', 'id'))
                    ->searchable()
                    ->preload()
                    ->required()
                    ->live()
                    ->afterStateUpdated(function (callable $set, $state) {
                        if ($state) {
                            $product = Product::find($state);
                            $set('price', $product?->price ?? 0);
                        }
                    }),

                    TextInput::make('quantity')
                        ->label('Quantity')
                        ->required()
                        ->numeric()
                        ->minValue(1)
                        ->default(1),

                    TextInput::make('price')
                        ->label('Unit Price')
                        ->required()
                        ->numeric()
                        ->step(0.01),
                ])->columns(1)
                ->addActionLabel('Add Item')
                ->collapsible()
                ->collapsed(false)
                ->defaultItems(1)
                ->required(),
                TextInput::make('total_amount')
                    ->required()
                    ->numeric(),
                Select::make('status')
                    ->options(['pending' => 'Pending', 'paid' => 'Paid', 'shipped' => 'Shipped', 'delivered' => 'Delivered'])
                    ->default('pending')
                    ->required(),
            ]);
    }
}
