<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Partner;

class PartnerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Partner::create(['name' => 'EcoSolutions Ltd.', 'type' => 'Recycling Partner', 'contribution' => 'Processes recycled materials.', 'logo' => 'logos/ecosolutions.png', 'impact' => '10 tons CO2 saved']);
        Partner::create(['name' => 'GreenTech Foundation', 'type' => 'Sponsor', 'contribution' => 'Provides funding for new bins.', 'logo' => 'logos/greentech.png', 'impact' => '5 new bins deployed']);
    }
}
