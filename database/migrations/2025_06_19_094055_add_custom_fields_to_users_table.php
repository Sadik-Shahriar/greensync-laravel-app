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
        Schema::table('users', function (Blueprint $table) {
            // Add the columns only if they don't already exist
            if (!Schema::hasColumn('users', 'role')) {
                $table->enum('role', ['user', 'admin'])->default('user')->after('password');
            }
            if (!Schema::hasColumn('users', 'eco_points')) {
                $table->integer('eco_points')->default(0)->after('role');
            }
            if (!Schema::hasColumn('users', 'total_disposals')) {
                $table->integer('total_disposals')->default(0)->after('eco_points');
            }
            if (!Schema::hasColumn('users', 'total_bottles_recycled')) {
                $table->integer('total_bottles_recycled')->default(0)->after('total_disposals');
            }
            if (!Schema::hasColumn('users', 'qr_code')) {
                $table->string('qr_code')->unique()->nullable()->after('total_bottles_recycled');
            }
            if (!Schema::hasColumn('users', 'avatar')) {
                $table->string('avatar')->nullable()->after('qr_code');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Define how to reverse the changes if needed
            $table->dropColumn(['role', 'eco_points', 'total_disposals', 'total_bottles_recycled', 'qr_code', 'avatar']);
        });
    }
};
