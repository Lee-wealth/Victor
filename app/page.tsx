import Link from 'next/link';
import { Search, Briefcase, Users, TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="space-y-8 py-16">
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 leading-tight">
            Find Your Dream Job<br />
            <span className="text-primary-600">or Hire Top Talent</span>
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Navil Job Connect connects job seekers and employers across Africa with AI-powered matching and premium recruitment tools.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/jobs" className="btn-primary text-center">
            Browse Jobs
          </Link>
          <Link href="/auth/register?role=employer" className="btn-outline text-center">
            Post a Job
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="card space-y-4">
          <Search className="w-12 h-12 text-primary-600" />
          <h3 className="text-xl font-semibold">Smart Job Search</h3>
          <p className="text-neutral-600">
            AI-powered recommendations matched to your skills and preferences.
          </p>
        </div>
        <div className="card space-y-4">
          <Briefcase className="w-12 h-12 text-secondary-600" />
          <h3 className="text-xl font-semibold">Premium Tools</h3>
          <p className="text-neutral-600">
            Access AI CV reviews, interview prep, and career guidance.
          </p>
        </div>
        <div className="card space-y-4">
          <Users className="w-12 h-12 text-accent-600" />
          <h3 className="text-xl font-semibold">Direct Connection</h3>
          <p className="text-neutral-600">
            Message employers directly or find candidates that match your needs.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-2xl p-12 space-y-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Trusted by Thousands</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold">50K+</div>
            <p className="text-primary-100">Active Users</p>
          </div>
          <div>
            <div className="text-4xl font-bold">10K+</div>
            <p className="text-primary-100">Jobs Posted</p>
          </div>
          <div>
            <div className="text-4xl font-bold">5K+</div>
            <p className="text-primary-100">Placements</p>
          </div>
          <div>
            <div className="text-4xl font-bold">15+</div>
            <p className="text-primary-100">Countries</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center space-y-6 py-16">
        <h2 className="text-4xl font-bold">Ready to Get Started?</h2>
        <p className="text-xl text-neutral-600">Join Navil Job Connect today and transform your career.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/register?role=seeker" className="btn-primary">
            Register as Job Seeker
          </Link>
          <Link href="/auth/register?role=employer" className="btn-primary">
            Register as Employer
          </Link>
        </div>
      </section>
    </div>
  );
}
