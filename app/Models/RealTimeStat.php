<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RealTimeStat extends Model
{
    use HasFactory;

    protected $table = 'real_time_stats';

    protected $fillable = [
        'metric_name',
        'metric_value',
    ];
}
