<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bottle_detections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('disposal_session_id')->constrained('disposal_sessions')->onDelete('cascade');
            $table->integer('bottle_number');
            $table->timestamp('detected_at');
            $table->integer('points_awarded')->default(5);
            $table->boolean('verified')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bottle_detections');
    }
};
