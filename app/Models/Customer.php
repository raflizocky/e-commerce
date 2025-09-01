<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Customer extends Model
{
    use HasApiTokens;

    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'address',
    ];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
