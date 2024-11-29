<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Order extends Model
{
    use HasFactory, HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'transaction_id',
        'user_id',
        'status',
        'product',
        'payment_method',
        'price',
        'quantity',
        'qrcode',
        'qrcode_url',
        'expires_at_qrcode',
        'brand',
        'last_four_digits',
    ];

    public static function createFromPagarMe($pagarMeTransaction)
    {
        return self::updateOrCreate(
            ['transaction_id' => $pagarMeTransaction->id],
            [
                'payment_method' => $pagarMeTransaction->payment_method,
                'price' => $pagarMeTransaction->amount / 100,
                'status' => $pagarMeTransaction->status,
                'product' => $pagarMeTransaction->product,
                'user_id' => Auth::user()->id,
            ]
        );
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
