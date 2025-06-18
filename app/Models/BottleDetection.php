<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BottleDetection extends Model
{
    use HasFactory;

    protected $fillable = [
        'disposal_session_id',
        'bottle_number',
        'detected_at',
        'points_awarded',
        'verified',
    ];

    public function disposalSession(): BelongsTo
    {
        return $this->belongsTo(DisposalSession::class, 'disposal_session_id');
    }
}
