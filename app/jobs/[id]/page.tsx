'use client';

import { useState, useEffect } from 'react';
import { MapPin, DollarSign, Briefcase, Heart, Share2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface JobDetail {
  id: string;
  title: string;
  company_name?: string;
  description?: string;
  responsibilities?: string[];
  qualifications?: string[];
  location?: {
    city?: string;
    state?: string;
    country?: string;
  };
  min_salary?: number;
  max_salary?: number;
  currency?: string;
  employment_type?: string;
  remote?: boolean;
}

export default function JobDetailPage() {
  const params = useParams();
  const jobId = params.id as string;
  const [job, setJob] = useState<JobDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // TODO: Call API using NavilJobConnectClient
    // const client = new NavilJobConnectClient({ baseUrl: process.env.NEXT_PUBLIC_API_URL });
    // client.getJobDetails(jobId)
    //   .then(setJob)
    //   .catch(console.error)
    //   .finally(() => setLoading(false));

    // Mock data for demo
    setTimeout(() => {
      setJob({
        id: jobId,
        title: 'Senior Frontend Engineer',
        company_name: 'TechCorp Nigeria',
        description: 'We are looking for an experienced Frontend Engineer to join our growing team. You will work on cutting-edge web applications serving millions of users.',
        responsibilities: [
          'Design and implement responsive web interfaces using React',
          'Collaborate with backend engineers to optimize performance',
          'Conduct code reviews and mentor junior developers',
          'Participate in system architecture discussions',
        ],
        qualifications: [
          '5+ years of professional frontend development experience',
          'Expert proficiency in TypeScript and React',
          'Strong understanding of web performance optimization',
          'Experience with Redux or similar state management',
        ],
        location: { city: 'Lagos', state: 'Lagos', country: 'Nigeria' },
        min_salary: 2000000,
        max_salary: 3500000,
        currency: 'NGN',
        employment_type: 'full_time',
        remote: true,
      });
      setLoading(false);
    }, 500);
  }, [jobId]);

  if (loading) return <div className="text-center py-12">Loading job details...</div>;
  if (!job) return <div className="text-center py-12">Job not found</div>;

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Back Button */}
      <Link href="/jobs" className="flex items-center gap-2 text-primary-600 hover:text-primary-700">
        <ArrowLeft className="w-4 h-4" />
        Back to Jobs
      </Link>

      {/* Header */}
      <div className="card space-y-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-neutral-900">{job.title}</h1>
            <p className="text-xl text-neutral-600">{job.company_name}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              {job.location?.city && (
                <div className="flex items-center gap-1 text-neutral-600">
                  <MapPin className="w-4 h-4" />
                  {job.location.city}, {job.location.country}
                </div>
              )}
              {job.employment_type && (
                <div className="flex items-center gap-1 text-neutral-600">
                  <Briefcase className="w-4 h-4" />
                  {job.employment_type.replace('_', ' ').toUpperCase()}
                </div>
              )}
              {job.remote && (
                <span className="bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full text-sm">Remote</span>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSaved(!saved)}
              className={`p-3 rounded-lg border ${
                saved
                  ? 'bg-red-50 border-red-200 text-red-600'
                  : 'border-neutral-300 text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              <Heart className="w-5 h-5" fill={saved ? 'currentColor' : 'none'} />
            </button>
            <button className="p-3 rounded-lg border border-neutral-300 text-neutral-600 hover:bg-neutral-50">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
        {job.min_salary && (
          <div className="flex items-center gap-2 text-2xl font-bold text-primary-600">
            <DollarSign className="w-6 h-6" />
            {job.min_salary.toLocaleString()} - {job.max_salary?.toLocaleString()} {job.currency}
          </div>
        )}
      </div>

      {/* Description */}
      <div className="card space-y-4">
        <h2 className="text-2xl font-bold">About the Role</h2>
        <p className="text-neutral-700 leading-relaxed">{job.description}</p>
      </div>

      {/* Responsibilities */}
      {job.responsibilities && job.responsibilities.length > 0 && (
        <div className="card space-y-4">
          <h2 className="text-2xl font-bold">Responsibilities</h2>
          <ul className="space-y-2">
            {job.responsibilities.map((resp, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="text-primary-600 font-bold">•</span>
                <span className="text-neutral-700">{resp}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Qualifications */}
      {job.qualifications && job.qualifications.length > 0 && (
        <div className="card space-y-4">
          <h2 className="text-2xl font-bold">Qualifications</h2>
          <ul className="space-y-2">
            {job.qualifications.map((qual, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="text-secondary-600 font-bold">✓</span>
                <span className="text-neutral-700">{qual}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CTA */}
      <div className="card bg-gradient-to-r from-primary-600 to-primary-800 text-white space-y-4">
        <h3 className="text-2xl font-bold">Ready to Apply?</h3>
        <p>Take the next step in your career and apply for this position today.</p>
        <Link href="/auth/login" className="inline-block px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-primary-50">
          Sign In & Apply
        </Link>
      </div>
    </div>
  );
}
