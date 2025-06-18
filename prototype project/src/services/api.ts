import { API_ENDPOINTS, LaravelResponse, LaravelPaginatedResponse, User, IoTDevice, DisposalSession, Partner } from '@/types/api';

// Laravel API Service Class
export class LaravelAPIService {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string = 'http://localhost:8000') {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('auth_token');
  }

  // Set authentication token
  setToken(token: string) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  // Remove authentication token
  clearToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  // Generic API request method
  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<LaravelResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
  }

  // Generic paginated request method
  private async paginatedRequest<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<LaravelPaginatedResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
  }

  // Authentication methods
  async login(email: string, password: string): Promise<LaravelResponse<{ user: User; token: string }>> {
    return this.request(API_ENDPOINTS.LOGIN, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData: { name: string; email: string; password: string; password_confirmation: string }): Promise<LaravelResponse<{ user: User; token: string }>> {
    return this.request(API_ENDPOINTS.REGISTER, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout(): Promise<LaravelResponse<null>> {
    return this.request(API_ENDPOINTS.LOGOUT, { method: 'POST' });
  }

  async getCurrentUser(): Promise<LaravelResponse<User>> {
    return this.request(API_ENDPOINTS.USER);
  }

  // Dashboard methods
  async getDashboardStats(): Promise<LaravelResponse<{
    eco_points: number;
    total_bottles_recycled: number;
    rank: number;
    recent_sessions: DisposalSession[];
  }>> {
    return this.request(API_ENDPOINTS.DASHBOARD_STATS);
  }

  async getUserQRCode(): Promise<LaravelResponse<{ qr_code: string; qr_code_url: string }>> {
    return this.request(API_ENDPOINTS.USER_QR_CODE);
  }

  // Real-time methods
  async getRealTimeStats(): Promise<LaravelResponse<{
    total_bottles: number;
    active_sessions: number;
    online_devices: number;
  }>> {
    return this.request(API_ENDPOINTS.REAL_TIME_STATS);
  }

  async getUserLiveSession(userId: number): Promise<LaravelResponse<DisposalSession | null>> {
    return this.request(API_ENDPOINTS.USER_LIVE_SESSION(userId));
  }

  // Data methods
  async getLeaderboard(): Promise<LaravelResponse<{
    overall_points: User[];
    bottle_champions: User[];
    weekly_bottles: User[];
  }>> {
    return this.request(API_ENDPOINTS.LEADERBOARD);
  }

  async getPartners(): Promise<LaravelResponse<Partner[]>> {
    return this.request(API_ENDPOINTS.PARTNERS);
  }

  async getUserSessions(): Promise<LaravelPaginatedResponse<DisposalSession>> {
    return this.paginatedRequest(API_ENDPOINTS.USER_SESSIONS);
  }

  async getUserBottleStats(): Promise<LaravelResponse<{
    bottles_today: number;
    bottles_this_week: number;
    favorite_device: IoTDevice | null;
    longest_session: DisposalSession | null;
    plastic_impact: number;
  }>> {
    return this.request(API_ENDPOINTS.USER_BOTTLE_STATS);
  }

  // IoT methods (for mobile/device integration)
  async authenticateDevice(qrCode: string, deviceId: string): Promise<LaravelResponse<{
    session_token: string;
    user: User;
    device: IoTDevice;
  }>> {
    return this.request(API_ENDPOINTS.IOT_AUTHENTICATE, {
      method: 'POST',
      body: JSON.stringify({ qr_code: qrCode, device_id: deviceId }),
    });
  }

  async recordBottleDetection(sessionId: string, deviceId: string): Promise<LaravelResponse<{
    bottle_number: number;
    points_earned: number;
    total_bottles: number;
  }>> {
    return this.request(API_ENDPOINTS.IOT_BOTTLE_DETECTED, {
      method: 'POST',
      body: JSON.stringify({ 
        session_id: sessionId, 
        device_id: deviceId,
        timestamp: new Date().toISOString()
      }),
    });
  }
}

// Export singleton instance
export const laravelAPI = new LaravelAPIService();
