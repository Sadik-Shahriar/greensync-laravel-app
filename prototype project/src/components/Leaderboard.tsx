
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpIcon, ArrowDownIcon, TrendingUpIcon, Medal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

interface ProfileData {
  id: string;
  full_name: string | null;
  eco_points: number | null;
  waste_saved: number | null;
  avatar_url?: string | null;
  created_at?: string;
}

interface LeaderboardProps {
  className?: string;
  limit?: number;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ className, limit = 10 }) => {
  const { user } = useAuth();
  const [leaderboardData, setLeaderboardData] = useState<Array<{
    rank: number;
    name: string;
    points: number;
    wasteSaved: string;
    trend: 'up' | 'down' | 'stable';
  }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('Users')
          .select('*')
          .order('eco_points', { ascending: false })
          .limit(limit);

        if (error) {
          throw error;
        }

        // Check if data is valid and has items
        if (data && Array.isArray(data)) {
          const processedData = data.map((profile: ProfileData, index: number) => ({
            rank: index + 1,
            name: profile.full_name || 'Anonymous User',
            points: profile.eco_points || 0,
            wasteSaved: `${profile.waste_saved || 0} kg`,
            trend: Math.random() > 0.5 ? 'up' : Math.random() > 0.5 ? 'down' : 'stable' as 'up' | 'down' | 'stable',
          }));
          
          setLeaderboardData(processedData);
        }
      } catch (err: any) {
        console.error('Error fetching leaderboard data:', err);
        setError(err.message);
        toast.error('Failed to load leaderboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, [user, limit]);

  if (!user) {
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

  return (
    <section id="leaderboard" className={cn("py-12 md:py-16", className)}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Campus Leaderboard</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
              See who's leading the way in sustainable waste management across campus.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle>Top Eco Contributors</CardTitle>
              <CardDescription>Based on eco points earned from proper waste disposal</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-6">Loading leaderboard data...</div>
              ) : error ? (
                <div className="flex justify-center py-6 text-red-500">
                  Error loading leaderboard: {error}
                </div>
              ) : (
                <div className="overflow-auto">
                  <table className="w-full text-left border-separate border-spacing-y-2">
                    <thead>
                      <tr className="text-gray-500">
                        <th className="pb-2 pl-4">Rank</th>
                        <th className="pb-2">Name</th>
                        <th className="pb-2 text-right">Eco Points</th>
                        <th className="pb-2 text-right">Waste Saved</th>
                        <th className="pb-2 text-right pr-4">Trend</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboardData.map((item, idx) => (
                        <tr
                          key={idx}
                          className={cn(
                            "bg-white hover:bg-gray-50 dark:bg-gray-950 hover:dark:bg-gray-900/60",
                            idx < 3 ? "font-medium" : ""
                          )}
                        >
                          <td className="pl-4 py-3 rounded-l-lg">
                            {idx === 0 ? (
                              <div className="inline-block bg-yellow-400 p-1 rounded-full">
                                <Medal size={16} className="text-white" />
                              </div>
                            ) : idx === 1 ? (
                              <div className="inline-block bg-gray-300 p-1 rounded-full">
                                <Medal size={16} className="text-white" />
                              </div>
                            ) : idx === 2 ? (
                              <div className="inline-block bg-amber-700 p-1 rounded-full">
                                <Medal size={16} className="text-white" />
                              </div>
                            ) : (
                              item.rank
                            )}
                          </td>
                          <td className="py-3">{item.name}</td>
                          <td className="py-3 text-right font-medium">{item.points}</td>
                          <td className="py-3 text-right">{item.wasteSaved}</td>
                          <td className="py-3 text-right pr-4 rounded-r-lg">
                            {item.trend === "up" ? (
                              <ArrowUpIcon className="ml-auto text-green-500" />
                            ) : item.trend === "down" ? (
                              <ArrowDownIcon className="ml-auto text-red-500" />
                            ) : (
                              <TrendingUpIcon className="ml-auto text-gray-500" />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;
