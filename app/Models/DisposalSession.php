<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DisposalSession extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'iot_device_id',
        'session_token',
        'started_at',
        'ended_at',
        'total_bottles',
        'points_earned',
        'status',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function iotDevice(): BelongsTo
    {
        return $this->belongsTo(IoTDevice::class, 'iot_device_id');
    }

    public function bottleDetections(): HasMany
    {
        return $this->hasMany(BottleDetection::class, 'disposal_session_id');
    }
}
