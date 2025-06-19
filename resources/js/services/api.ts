import axios from 'axios';
import { API_ENDPOINTS, User, IoTDevice, DisposalSession, Partner, LaravelResponse, LaravelPaginatedResponse } from '../types/api';

export const apiClient = axios.create({
  baseURL: 'https://www.greensync.live',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Token management
export function setToken(token: string) {
  localStorage.setItem('auth_token', token);
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export function clearToken() {
  localStorage.removeItem('auth_token');
  delete apiClient.defaults.headers.common['Authorization'];
}

// Auth endpoints
export async function login(credentials: { email: string; password: string }) {
  const { data } = await apiClient.post(API_ENDPOINTS.LOGIN, credentials);
  return data;
}

export async function register(userData: { name: string; email: string; password: string; password_confirmation: string }) {
  const { data } = await apiClient.post(API_ENDPOINTS.REGISTER, userData);
  return data;
}

export async function logout() {
  const { data } = await apiClient.post(API_ENDPOINTS.LOGOUT);
  return data;
}

export async function getAuthenticatedUser() {
  const { data } = await apiClient.get(API_ENDPOINTS.USER);
  return data;
}

// Dashboard endpoints
export async function getDashboardStats() {
  const { data } = await apiClient.get(API_ENDPOINTS.DASHBOARD_STATS);
  return data;
}

export async function getUserQRCode() {
  const { data } = await apiClient.get(API_ENDPOINTS.USER_QR_CODE);
  return data;
}

// Real-time endpoints
export async function getRealTimeStats() {
  const { data } = await apiClient.get(API_ENDPOINTS.REAL_TIME_STATS);
  return data;
}

export async function getUserLiveSession(userId: number) {
  const { data } = await apiClient.get(API_ENDPOINTS.USER_LIVE_SESSION(userId));
  return data;
}

// Data endpoints
export async function getLeaderboard() {
  const { data } = await apiClient.get(API_ENDPOINTS.LEADERBOARD);
  return data;
}

export async function getPartners() {
  const { data } = await apiClient.get(API_ENDPOINTS.PARTNERS);
  return data;
}

export async function getUserSessions() {
  const { data } = await apiClient.get(API_ENDPOINTS.USER_SESSIONS);
  return data;
}

export async function getUserBottleStats() {
  const { data } = await apiClient.get(API_ENDPOINTS.USER_BOTTLE_STATS);
  return data;
}

// IoT endpoints
export async function authenticateDevice(qrCode: string, deviceId: string) {
  const { data } = await apiClient.post(API_ENDPOINTS.IOT_AUTHENTICATE, { qr_code: qrCode, device_id: deviceId });
  return data;
}

export async function recordBottleDetection(sessionId: string, deviceId: string) {
  const { data } = await apiClient.post(API_ENDPOINTS.IOT_BOTTLE_DETECTED, {
    session_id: sessionId,
    device_id: deviceId,
    timestamp: new Date().toISOString(),
  });
  return data;
}
