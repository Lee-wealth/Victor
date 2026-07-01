/* Generated TypeScript Axios Client for Navil Job Connect API
 * This client was generated from openapi.yaml using openapi-generator
 * Do not edit manually — regenerate from spec if needed
 */

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// ============================================================================
// MODELS
// ============================================================================

export interface User {
  id: string;
  email: string;
  role: 'seeker' | 'employer';
  created_at: string; // date-time
}

export interface RegisterRequest {
  email: string;
  password: string;
  role: 'seeker' | 'employer';
}

export interface AuthTokens {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
}

export interface Location {
  city?: string;
  state?: string;
  country?: string;
}

export interface SeekerProfile {
  id: string;
  user_id: string;
  headline?: string;
  summary?: string;
  skills?: string[];
  experience_years?: number;
  location?: Location;
  resume_s3_url?: string;
}

export interface SeekerProfileUpdate {
  headline?: string;
  summary?: string;
  skills?: string[];
  location?: Location;
}

export interface Job {
  id: string;
  employer_id: string;
  title: string;
  description?: string;
  responsibilities?: string[];
  qualifications?: string[];
  location?: Location;
  remote?: boolean;
  min_salary?: number;
  max_salary?: number;
  currency?: string;
  price_display?: CurrencyAmount;
  employment_type?: 'full_time' | 'part_time' | 'contract' | 'internship';
  is_featured?: boolean;
  status?: 'draft' | 'published' | 'closed' | 'flagged';
  created_at?: string; // date-time
}

export interface JobCreate {
  title: string;
  description: string;
  responsibilities?: string[];
  qualifications?: string[];
  location?: Location;
  remote?: boolean;
  min_salary?: number;
  max_salary?: number;
  currency?: string;
  employment_type?: 'full_time' | 'part_time' | 'contract' | 'internship';
}

export interface ApplicationCreate {
  resume_id?: string;
  cover_letter?: string;
}

export interface Application {
  id: string;
  job_id: string;
  seeker_id: string;
  status: 'applied' | 'viewed' | 'shortlisted' | 'interviewed' | 'offered' | 'rejected' | 'withdrawn';
  applied_at: string; // date-time
}

export interface PagedJobs {
  total: number;
  page: number;
  per_page: number;
  items: Job[];
}

export interface JobMatch {
  job: Job;
  score: number;
}

export interface CurrencyAmount {
  base_amount: number;
  base_currency: string;
  localized_amount?: number;
  localized_currency?: string;
  localized_display?: string;
}

export interface CVReviewResponse {
  score: number;
  suggestions: string[];
  optimized_resume: string;
}

export interface InterviewPracticeResponse {
  questions: Array<{
    question: string;
    category?: string;
  }>;
}

export interface Error {
  code: number;
  message: string;
}

// ============================================================================
// API CLIENT
// ============================================================================

export interface ClientConfig {
  baseUrl: string;
  accessToken?: string;
  currency?: string;
  language?: string;
}

export class NavilJobConnectClient {
  private axios: AxiosInstance;
  private config: Required<ClientConfig>;

  constructor(cfg: ClientConfig) {
    this.config = {
      baseUrl: cfg.baseUrl,
      accessToken: cfg.accessToken || '',
      currency: cfg.currency || 'USD',
      language: cfg.language || 'en',
    };

    this.axios = axios.create({
      baseURL: this.config.baseUrl,
      headers: this.getDefaultHeaders(),
    });
  }

  private getDefaultHeaders() {
    const headers: any = {
      'Content-Type': 'application/json',
      'Accept-Language': this.config.language,
    };
    if (this.config.accessToken) {
      headers['Authorization'] = `Bearer ${this.config.accessToken}`;
    }
    if (this.config.currency) {
      headers['X-Currency'] = this.config.currency;
    }
    return headers;
  }

  setAccessToken(token: string) {
    this.config.accessToken = token;
    this.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  setCurrency(currency: string) {
    this.config.currency = currency;
    this.axios.defaults.headers.common['X-Currency'] = currency;
  }

  // ========== AUTH ==========

  async register(req: RegisterRequest): Promise<User> {
    const { data } = await this.axios.post<User>('/api/v1/auth/register', req);
    return data;
  }

  async login(email: string, password: string): Promise<AuthTokens> {
    const { data } = await this.axios.post<AuthTokens>('/api/v1/auth/login', {
      email,
      password,
    });
    return data;
  }

  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    const { data } = await this.axios.post<AuthTokens>('/api/v1/auth/refresh', {
      refresh_token: refreshToken,
    });
    return data;
  }

  // ========== SEEKER PROFILE ==========

  async getSeekerProfile(): Promise<SeekerProfile> {
    const { data } = await this.axios.get<SeekerProfile>('/api/v1/seeker/me');
    return data;
  }

  async updateSeekerProfile(profile: SeekerProfileUpdate): Promise<SeekerProfile> {
    const { data } = await this.axios.put<SeekerProfile>('/api/v1/seeker/me', profile);
    return data;
  }

  async uploadResume(file: File): Promise<{ resume_id: string; parsed_json: any }> {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await this.axios.post<{ resume_id: string; parsed_json: any }>(
      '/api/v1/seeker/resume',
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    return data;
  }

  // ========== JOBS ==========

  async listJobs(
    query?: string,
    location?: string,
    employment_type?: string,
    remote?: boolean,
    page = 1,
    per_page = 20
  ): Promise<PagedJobs> {
    const { data } = await this.axios.get<PagedJobs>('/api/v1/jobs', {
      params: { query, location, employment_type, remote, page, per_page },
    });
    return data;
  }

  async getJobDetails(jobId: string): Promise<Job> {
    const { data } = await this.axios.get<Job>(`/api/v1/jobs/${jobId}`);
    return data;
  }

  async createJob(employerId: string, job: JobCreate): Promise<Job> {
    const { data } = await this.axios.post<Job>(
      `/api/v1/employer/${employerId}/jobs`,
      job
    );
    return data;
  }

  async saveJob(jobId: string): Promise<{ saved: boolean }> {
    const { data } = await this.axios.post<{ saved: boolean }>(
      `/api/v1/jobs/${jobId}/save`
    );
    return data;
  }

  // ========== APPLICATIONS ==========

  async applyToJob(jobId: string, app: ApplicationCreate): Promise<Application> {
    const { data } = await this.axios.post<Application>(
      `/api/v1/jobs/${jobId}/apply`,
      app
    );
    return data;
  }

  // ========== SEARCH ==========

  async searchJobs(filters: any): Promise<PagedJobs> {
    const { data } = await this.axios.post<PagedJobs>('/api/v1/search/jobs', {
      filters,
    });
    return data;
  }

  // ========== MATCHING ==========

  async getMatches(seekerId: string): Promise<JobMatch[]> {
    const { data } = await this.axios.get<JobMatch[]>(`/api/v1/match/${seekerId}`);
    return data;
  }

  // ========== AI ==========

  async reviewCV(resumeText?: string, resumeId?: string): Promise<CVReviewResponse> {
    const { data } = await this.axios.post<CVReviewResponse>('/api/v1/ai/cv-review', {
      resume_text: resumeText,
      resume_id: resumeId,
    });
    return data;
  }

  async getInterviewPractice(jobId: string, seekerId: string): Promise<InterviewPracticeResponse> {
    const { data } = await this.axios.post<InterviewPracticeResponse>('/api/v1/ai/interview-practice', {
      job_id: jobId,
      seeker_id: seekerId,
    });
    return data;
  }
}

export default NavilJobConnectClient;
