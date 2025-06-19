// Laravel API Response Types
export interface LaravelResponse<T> {
  data: T;
  message?: string;
  status: 'success' | 'error';
}

export interface LaravelPaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  links: {
    first?: string;
    last?: string;
    prev?: string;
    next?: string;
  };
}

// User Model (matches Laravel User model)
export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  role: 'user' | 'admin';
  eco_points: number;
  total_disposals: number;
  total_bottles_recycled: number;
  qr_code: string;
  avatar?: string;
  created_at: string;
  updated_at: string;
}

// IoT Device Model (Laravel IoTDevice model)
export interface IoTDevice {
  id: number;
  device_id: string;
  device_name: string;
  location: string;
  status: 'active' | 'inactive' | 'maintenance';
  last_heartbeat?: string;
  bottles_processed_today: number;
  total_bottles_processed: number;
  created_at: string;
  updated_at: string;
}

// Disposal Session Model (Laravel DisposalSession model)
export interface DisposalSession {
  id: number;
  user_id: number;
  device_id: number;
  session_token: string;
  started_at: string;
  ended_at?: string;
  total_bottles: number;
  points_earned: number;
  status: 'active' | 'completed' | 'cancelled';
  user?: User;
  device?: IoTDevice;
  bottle_detections?: BottleDetection[];
  created_at: string;
  updated_at: string;
}

// Bottle Detection Model (Laravel BottleDetection model)
export interface BottleDetection {
  id: number;
  session_id: number;
  bottle_number: number;
  detected_at: string;
  points_awarded: number;
  verified: boolean;
  session?: DisposalSession;
  created_at: string;
  updated_at: string;
}

// Partner Model (Laravel Partner model)
export interface Partner {
  id: number;
  name: string;
  type: string;
  contribution: string;
  logo: string;
  impact: string;
  website?: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

// Reward Model (Laravel Reward model)
export interface Reward {
  id: number;
  name: string;
  description: string;
  points_required: number;
  category: string;
  available_quantity: number;
  image?: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

// API Endpoints for Laravel Routes
export const API_ENDPOINTS = {
  // Authentication
  LOGIN: '/api/auth/login',
  REGISTER: '/api/register',
  LOGOUT: '/api/auth/logout',
  USER: '/api/auth/user',
  
  // Dashboard
  DASHBOARD_STATS: '/api/dashboard/stats',
  USER_QR_CODE: '/api/user/qr-code',
  
  // IoT Integration
  IOT_AUTHENTICATE: '/api/iot/authenticate',
  IOT_BOTTLE_DETECTED: '/api/iot/bottle-detected',
  IOT_END_SESSION: '/api/iot/end-session',
  IOT_DEVICE_HEARTBEAT: '/api/iot/heartbeat',
  
  // Real-time
  REAL_TIME_STATS: '/api/real-time-stats',
  USER_LIVE_SESSION: (userId: number) => `/api/user/${userId}/live-session`,
  
  // Data
  LEADERBOARD: '/api/leaderboard',
  PARTNERS: '/api/partners',
  USER_SESSIONS: '/api/user/sessions',
  USER_BOTTLE_STATS: '/api/user/bottle-stats',
  
  // Admin
  ADMIN_USERS: '/api/admin/users',
  ADMIN_DEVICES: '/api/admin/devices',
  ADMIN_IOT_MONITORING: '/api/admin/iot-monitoring',
  ADMIN_REWARDS: '/api/admin/rewards',
  ADMIN_PARTNERS: '/api/admin/partners',
} as const;
