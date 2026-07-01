'use client';

import { useState, useEffect } from 'react';
import { MapPin, DollarSign, Briefcase, Search as SearchIcon } from 'lucide-react';
import Link from 'next/link';

interface JobListing {
  id: string;
  title: string;
  company_name?: string;
  location?: {
    city?: string;
    country?: string;
  };
  min_salary?: number;
  max_salary?: number;
  currency?: string;
  employment_type?: string;
  remote?: boolean;
  summary?: string;
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [remote, setRemote] = useState(false);

  useEffect(() => {
    // TODO: Call API using NavilJobConnectClient
    // const client = new NavilJobConnectClient({ baseUrl: process.env.NEXT_PUBLIC_API_URL, currency: 'NGN' });
    // client.listJobs(query, location, undefined, remote, 1, 20)
    //   .then(result => setJobs(result.items))
    //   .catch(console.error)
    //   .finally(() => setLoading(false));

    // Mock data for demo
    setTimeout(() => {
      setJobs([
        {
          id: '1',
          title: 'Senior Frontend Engineer',
          company_name: 'TechCorp Nigeria',
          location: { city: 'Lagos', country: 'Nigeria' },
          min_salary: 2000000,
          max_salary: 3500000,
          currency: 'NGN',
          employment_type: 'full_time',
          remote: true,
          summary: 'Build scalable web applications with React and TypeScript',
        },
        {
          id: '2',
          title: 'Product Manager',
          company_name: 'StartupXYZ',
          location: { city: 'Accra', country: 'Ghana' },
          min_salary: 1800000,
          max_salary: 3000000,
          currency: 'NGN',
          employment_type: 'full_time',
          remote: false,
          summary: 'Lead product vision and strategy for our mobile platform',
        },
      ]);
      setLoading(false);
    }, 500);
  }, [query, location, remote]);

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-neutral-900">Find Your Next Opportunity</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 relative">
            <SearchIcon className="absolute left-3 top-3 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Job title, skills..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <label className="flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-lg cursor-pointer hover:bg-neutral-50">
            <input
              type="checkbox"
              checked={remote}
              onChange={(e) => setRemote(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm font-medium">Remote only</span>
          </label>
        </div>
      </div>

      {/* Job Results */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12 text-neutral-600">Loading jobs...</div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12 text-neutral-600">No jobs found. Try adjusting your search.</div>
        ) : (
          jobs.map((job) => (
            <Link key={job.id} href={`/jobs/${job.id}`}>
              <div className="card hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div className="space-y-2 flex-1">
                    <h3 className="text-xl font-semibold text-neutral-900 hover:text-primary-600">{job.title}</h3>
                    <p className="text-neutral-600">{job.company_name}</p>
                    <div className="flex flex-wrap gap-3 pt-2">
                      {job.location?.city && (
                        <div className="flex items-center gap-1 text-sm text-neutral-600">
                          <MapPin className="w-4 h-4" />
                          {job.location.city}, {job.location.country}
                        </div>
                      )}
                      {job.employment_type && (
                        <div className="flex items-center gap-1 text-sm text-neutral-600">
                          <Briefcase className="w-4 h-4" />
                          {job.employment_type.replace('_', ' ').toUpperCase()}
                        </div>
                      )}
                      {job.remote && (
                        <span className="text-sm bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full">Remote</span>
                      )}
                    </div>
                  </div>
                  {job.min_salary && (
                    <div className="flex items-center gap-1 text-lg font-semibold text-primary-600">
                      <DollarSign className="w-5 h-5" />
                      {job.min_salary.toLocaleString()} - {job.max_salary?.toLocaleString()}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
