<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class IoTDevice extends Model
{
    use HasFactory;

    protected $table = 'iot_devices';

    protected $fillable = [
        'device_id',
        'device_name',
        'location',
        'status',
        'last_heartbeat',
        'bottles_processed_today',
        'total_bottles_processed',
    ];

    public function disposalSessions(): HasMany
    {
        return $this->hasMany(DisposalSession::class, 'iot_device_id');
    }
}
