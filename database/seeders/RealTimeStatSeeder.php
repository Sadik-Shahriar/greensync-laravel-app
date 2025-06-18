<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\RealTimeStat;

class RealTimeStatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        RealTimeStat::create(['metric_name' => 'total_campus_bottles', 'metric_value' => 0]);
        RealTimeStat::create(['metric_name' => 'total_active_users', 'metric_value' => 0]);
        RealTimeStat::create(['metric_name' => 'carbon_offset_kg', 'metric_value' => 0]);
    }
}
