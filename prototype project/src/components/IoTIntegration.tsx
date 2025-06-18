
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QrCode, Smartphone, Recycle, Trophy, Activity } from 'lucide-react';
import { laravelAPI } from '@/services/api';
import { useAuth } from '@/hooks/useAuth';
import { DisposalSession } from '@/types/api';

// Component to demonstrate IoT integration for Cursor AI reference
const IoTIntegration = () => {
  const { user } = useAuth();
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [activeSession, setActiveSession] = useState<DisposalSession | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchQRCode();
      checkActiveSession();
    }
  }, [user]);

  const fetchQRCode = async () => {
    try {
      const response = await laravelAPI.getUserQRCode();
      setQrCodeUrl(response.data.qr_code_url);
    } catch (error) {
      console.error('Failed to fetch QR code:', error);
    }
  };

  const checkActiveSession = async () => {
    if (!user) return;
    
    try {
      const response = await laravelAPI.getUserLiveSession(user.id);
      setActiveSession(response.data);
    } catch (error) {
      console.error('Failed to check active session:', error);
    }
  };

  // Poll for active session updates every 3 seconds
  useEffect(() => {
    if (!activeSession) return;

    const interval = setInterval(checkActiveSession, 3000);
    return () => clearInterval(interval);
  }, [activeSession, user]);

  return (
    <div className="space-y-6">
      {/* IoT Integration Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-greensync-primary" />
            IoT Smart Bin Integration
          </CardTitle>
          <p className="text-gray-600">
            Scan your QR code at any GreenSync smart bin to start recycling bottles
          </p>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* User QR Code Display */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5" />
              Your QR Code
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            {qrCodeUrl ? (
              <div className="space-y-4">
                <img 
                  src={qrCodeUrl} 
                  alt="User QR Code" 
                  className="mx-auto w-48 h-48 border rounded-lg"
                />
                <p className="text-sm text-gray-600">
                  Show this QR code to the IoT device to start recycling
                </p>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs font-mono">{user?.qr_code}</p>
                </div>
              </div>
            ) : (
              <div className="w-48 h-48 mx-auto bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Loading QR Code...</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Active Session Monitor */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Recycle className="h-5 w-5" />
              Current Session
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activeSession && activeSession.status === 'active' ? (
              <div className="space-y-4">
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  Session Active
                </Badge>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-greensync-primary">
                      {activeSession.total_bottles}
                    </div>
                    <div className="text-sm text-gray-600">Bottles Recycled</div>
                  </div>
                  
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">
                      {activeSession.points_earned}
                    </div>
                    <div className="text-sm text-gray-600">Points Earned</div>
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  <p><strong>Device:</strong> {activeSession.device?.device_name}</p>
                  <p><strong>Location:</strong> {activeSession.device?.location}</p>
                  <p><strong>Started:</strong> {new Date(activeSession.started_at).toLocaleTimeString()}</p>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-800">
                    🤖 Keep adding bottles to the smart bin. Each bottle is automatically detected and awards you 5 eco-points!
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Smartphone className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No active recycling session</p>
                <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
                  <p className="font-medium mb-2">How to start recycling:</p>
                  <ol className="text-left space-y-1">
                    <li>1. Find a GreenSync smart bin</li>
                    <li>2. Scan your QR code on the device</li>
                    <li>3. Start adding bottles one by one</li>
                    <li>4. Watch your points grow in real-time!</li>
                  </ol>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* IoT Device Workflow Explanation */}
      <Card>
        <CardHeader>
          <CardTitle>How Smart Bins Work</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center p-4 border rounded-lg">
              <QrCode className="h-8 w-8 text-greensync-primary mx-auto mb-2" />
              <h4 className="font-medium mb-1">1. Scan QR</h4>
              <p className="text-sm text-gray-600">Authenticate with your unique QR code</p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <Activity className="h-8 w-8 text-greensync-primary mx-auto mb-2" />
              <h4 className="font-medium mb-1">2. Sensor Activated</h4>
              <p className="text-sm text-gray-600">IoT sensors start monitoring for bottles</p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <Recycle className="h-8 w-8 text-greensync-primary mx-auto mb-2" />
              <h4 className="font-medium mb-1">3. Detect Bottles</h4>
              <p className="text-sm text-gray-600">Each bottle is counted automatically</p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <Trophy className="h-8 w-8 text-greensync-primary mx-auto mb-2" />
              <h4 className="font-medium mb-1">4. Earn Points</h4>
              <p className="text-sm text-gray-600">Instant eco-points for each bottle</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IoTIntegration;
