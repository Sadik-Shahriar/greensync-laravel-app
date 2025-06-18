<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\IoTDevice;

class IoTDeviceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        IoTDevice::create(['device_id' => 'GS-BIN-001', 'device_name' => 'Library Entrance Bin', 'location' => 'University Library']);
        IoTDevice::create(['device_id' => 'GS-BIN-002', 'device_name' => 'Cafeteria Bin', 'location' => 'Main Cafeteria']);
        IoTDevice::create(['device_id' => 'GS-BIN-003', 'device_name' => 'Engineering Block Bin', 'location' => 'Block C, Engineering Dept.']);
        IoTDevice::create(['device_id' => 'GS-BIN-004', 'device_name' => 'Student Dorm A Bin', 'location' => 'Student Dormitory A']);
        IoTDevice::create(['device_id' => 'GS-BIN-005', 'device_name' => 'Sports Complex Bin', 'location' => 'University Sports Complex', 'status' => 'maintenance']);
    }
}
