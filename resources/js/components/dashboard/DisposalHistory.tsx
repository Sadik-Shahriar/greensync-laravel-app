import React, { useEffect, useState, useCallback } from 'react';
import { apiClient } from '@/services/api';
import { Button } from '@/components/ui/button';

// Define types for our data for better TypeScript support
interface Session {
  id: number;
  started_at: string;
  total_bottles: number;
  points_earned: number;
  iot_device: {
    location: string;
  };
}

interface PaginatedResponse {
  data: Session[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number | null; // Can be null if no items
    last_page: number;
    to: number | null; // Can be null if no items
    total: number;
  };
}

const DisposalHistory = () => {
  const [paginatedData, setPaginatedData] = useState<PaginatedResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchHistory = useCallback(async (page: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.get<{ data: PaginatedResponse }>(`/api/user/sessions?page=${page}`);
      setPaginatedData(response.data.data); // Correctly access the nested paginated data
    } catch (err) {
      setError('Failed to fetch disposal history.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory(currentPage);
  }, [currentPage, fetchHistory]);

  if (isLoading) {
    return <div className="p-8 text-center">Loading disposal history...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  if (!paginatedData || paginatedData.data.length === 0) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold">Disposal History</h1>
        <p className="mt-4">You have no disposal history yet. Go find a GreenSync bin!</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold leading-6 text-gray-900">Disposal History</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all your past recycling sessions.
          </p>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Date & Time</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Bottles</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Location</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedData.data.map((session) => (
                  <tr key={session.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {new Date(session.started_at).toLocaleString()}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{session.total_bottles}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{session.iot_device?.location || 'N/A'}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-greensync-dark font-semibold">+{session.points_earned}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{paginatedData.meta.from}</span> to <span className="font-medium">{paginatedData.meta.to}</span> of{' '}
                <span className="font-medium">{paginatedData.meta.total}</span> results
              </div>
              <div className="flex items-center gap-x-2">
                <Button onClick={() => setCurrentPage(currentPage - 1)} disabled={!paginatedData.links.prev}>
                    Previous
                </Button>
                <Button onClick={() => setCurrentPage(currentPage + 1)} disabled={!paginatedData.links.next}>
                    Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisposalHistory;
