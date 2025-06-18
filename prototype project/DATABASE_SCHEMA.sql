
-- GreenSync Database Schema for Laravel/MySQL
-- This schema matches the TypeScript interfaces in the React frontend

-- Users table (extends Laravel's default users table)
CREATE TABLE users (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    email_verified_at TIMESTAMP NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    eco_points INT NOT NULL DEFAULT 0,
    total_disposals INT NOT NULL DEFAULT 0,
    total_bottles_recycled INT NOT NULL DEFAULT 0,
    qr_code VARCHAR(255) NOT NULL UNIQUE,
    avatar VARCHAR(255) NULL,
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    PRIMARY KEY (id),
    KEY users_email_index (email),
    KEY users_qr_code_index (qr_code)
);

-- IoT Devices table
CREATE TABLE iot_devices (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    device_id VARCHAR(255) NOT NULL UNIQUE,
    device_name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    status ENUM('active', 'inactive', 'maintenance') NOT NULL DEFAULT 'active',
    last_heartbeat TIMESTAMP NULL,
    bottles_processed_today INT NOT NULL DEFAULT 0,
    total_bottles_processed INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    PRIMARY KEY (id),
    KEY iot_devices_device_id_index (device_id),
    KEY iot_devices_status_index (status)
);

-- Disposal Sessions table
CREATE TABLE disposal_sessions (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id BIGINT UNSIGNED NOT NULL,
    device_id BIGINT UNSIGNED NOT NULL,
    session_token VARCHAR(255) NOT NULL UNIQUE,
    started_at TIMESTAMP NOT NULL,
    ended_at TIMESTAMP NULL,
    total_bottles INT NOT NULL DEFAULT 0,
    points_earned INT NOT NULL DEFAULT 0,
    status ENUM('active', 'completed', 'cancelled') NOT NULL DEFAULT 'active',
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    PRIMARY KEY (id),
    KEY disposal_sessions_user_id_foreign (user_id),
    KEY disposal_sessions_device_id_foreign (device_id),
    KEY disposal_sessions_session_token_index (session_token),
    KEY disposal_sessions_status_index (status),
    CONSTRAINT disposal_sessions_user_id_foreign FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT disposal_sessions_device_id_foreign FOREIGN KEY (device_id) REFERENCES iot_devices (id) ON DELETE CASCADE
);

-- Bottle Detections table
CREATE TABLE bottle_detections (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    session_id BIGINT UNSIGNED NOT NULL,
    bottle_number INT NOT NULL,
    detected_at TIMESTAMP NOT NULL,
    points_awarded INT NOT NULL DEFAULT 5,
    verified BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    PRIMARY KEY (id),
    KEY bottle_detections_session_id_foreign (session_id),
    KEY bottle_detections_detected_at_index (detected_at),
    CONSTRAINT bottle_detections_session_id_foreign FOREIGN KEY (session_id) REFERENCES disposal_sessions (id) ON DELETE CASCADE
);

-- Disposals table (updated for compatibility)
CREATE TABLE disposals (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id BIGINT UNSIGNED NOT NULL,
    session_id BIGINT UNSIGNED NULL,
    bin_id VARCHAR(255) NOT NULL,
    waste_type ENUM('plastic_bottles', 'paper', 'metal', 'organic') NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    points_earned INT NOT NULL,
    verified BOOLEAN NOT NULL DEFAULT FALSE,
    location VARCHAR(255) NOT NULL,
    disposal_method ENUM('manual', 'iot_sensor') NOT NULL DEFAULT 'manual',
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    PRIMARY KEY (id),
    KEY disposals_user_id_foreign (user_id),
    KEY disposals_session_id_foreign (session_id),
    KEY disposals_waste_type_index (waste_type),
    KEY disposals_disposal_method_index (disposal_method),
    CONSTRAINT disposals_user_id_foreign FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT disposals_session_id_foreign FOREIGN KEY (session_id) REFERENCES disposal_sessions (id) ON DELETE SET NULL
);

-- Partners table
CREATE TABLE partners (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    contribution TEXT NOT NULL,
    logo VARCHAR(255) NOT NULL,
    impact VARCHAR(255) NOT NULL,
    website VARCHAR(255) NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    PRIMARY KEY (id),
    KEY partners_active_index (active),
    KEY partners_type_index (type)
);

-- Rewards table
CREATE TABLE rewards (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    points_required INT NOT NULL,
    category VARCHAR(100) NOT NULL,
    available_quantity INT NOT NULL,
    image VARCHAR(255) NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    PRIMARY KEY (id),
    KEY rewards_active_index (active),
    KEY rewards_category_index (category),
    KEY rewards_points_required_index (points_required)
);

-- User Rewards table
CREATE TABLE user_rewards (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id BIGINT UNSIGNED NOT NULL,
    reward_id BIGINT UNSIGNED NOT NULL,
    redeemed_at TIMESTAMP NOT NULL,
    status ENUM('pending', 'claimed', 'expired') NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    PRIMARY KEY (id),
    KEY user_rewards_user_id_foreign (user_id),
    KEY user_rewards_reward_id_foreign (reward_id),
    KEY user_rewards_status_index (status),
    CONSTRAINT user_rewards_user_id_foreign FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT user_rewards_reward_id_foreign FOREIGN KEY (reward_id) REFERENCES rewards (id) ON DELETE CASCADE
);

-- Achievements table
CREATE TABLE achievements (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id BIGINT UNSIGNED NOT NULL,
    achievement_type VARCHAR(100) NOT NULL,
    achievement_name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    badge_icon VARCHAR(255) NOT NULL,
    earned_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    PRIMARY KEY (id),
    KEY achievements_user_id_foreign (user_id),
    KEY achievements_achievement_type_index (achievement_type),
    CONSTRAINT achievements_user_id_foreign FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- Real-time Stats table
CREATE TABLE real_time_stats (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    metric_name VARCHAR(100) NOT NULL,
    metric_value INT NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY real_time_stats_metric_name_unique (metric_name)
);

-- Insert default partners data
INSERT INTO partners (name, type, contribution, logo, impact, active, created_at, updated_at) VALUES
('BRAC University', 'Educational Institution', 'Pilot program with 500+ active users', '🎓', '2,450 kg waste processed', TRUE, NOW(), NOW()),
('TechShop BD', 'Technology Partner', 'Smart bin sensors and IoT infrastructure', '🔧', '15 smart bins installed', TRUE, NOW(), NOW()),
('Origin Of Hopes', 'Environmental Partner', 'Educational content and sustainability workshops', '🌱', '12 workshops conducted', TRUE, NOW(), NOW()),
('Printora', 'Industry Partner', 'PETG filament recycling and processing', '♻️', '85% plastic recycling rate', TRUE, NOW(), NOW());

-- Insert default IoT devices
INSERT INTO iot_devices (device_id, device_name, location, status, created_at, updated_at) VALUES
('DEVICE001', 'Library Smart Bin', 'Main Library Entrance', 'active', NOW(), NOW()),
('DEVICE002', 'Cafeteria Recycler', 'Student Cafeteria', 'active', NOW(), NOW()),
('DEVICE003', 'Dorm Station Alpha', 'Residential Hall A', 'active', NOW(), NOW()),
('DEVICE004', 'Lab Building Unit', 'Engineering Lab Building', 'maintenance', NOW(), NOW());

-- Initialize real-time stats
INSERT INTO real_time_stats (metric_name, metric_value, updated_at) VALUES
('total_bottles', 0, NOW()),
('active_sessions', 0, NOW()),
('online_devices', 4, NOW()),
('total_users', 0, NOW());
