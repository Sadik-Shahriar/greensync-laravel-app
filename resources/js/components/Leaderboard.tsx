import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ArrowUpIcon, ArrowDownIcon, TrendingUpIcon, Medal } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';
import { getLeaderboard } from '../services/api';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

interface LeaderboardProps {
  className?: string;
  limit?: number;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ className, limit = 10 }) => {
  const { isAuthenticated, user } = useAuth();
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }
      try {
        const data = await getLeaderboard();
        // Assume data.data.overall_points is the main leaderboard array
        setLeaderboardData((data.data.overall_points || []).slice(0, limit));
      } catch (err: any) {
        setError(err.message);
        toast.error('Failed to load leaderboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboardData();
  }, [isAuthenticated, limit]);

  if (!isAuthenticated) {
    return (
      <section id="leaderboard" className={cn("py-12 md:py-16", className)}>
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Campus Leaderboard</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                Please login to view the campus leaderboard and see how you rank against others.
              </p>
            </div>
            <Link to="/login">
              <Button className="bg-greensync-primary hover:bg-greensync-secondary">
                Login to View Leaderboard
              </Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (loading) {
    return <div className="h-screen w-full flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <section id="leaderboard" className={cn("py-12 md:py-16", className)}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Campus Leaderboard</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
              See how you rank against other eco-champions on campus!
            </p>
          </div>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {leaderboardData.map((profile, index) => (
            <Card key={profile.id} className="flex flex-col items-center p-6">
              <Medal className="h-8 w-8 text-greensync-primary mb-2" />
              <CardTitle className="text-xl font-bold">{profile.name || profile.email || 'Anonymous'}</CardTitle>
              <CardDescription className="mb-2">Rank #{index + 1}</CardDescription>
              <CardContent className="flex flex-col items-center">
                <div className="text-2xl font-bold text-greensync-primary mb-1">{profile.eco_points} pts</div>
                <div className="text-sm text-gray-600">{profile.total_bottles_recycled} bottles recycled</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;
