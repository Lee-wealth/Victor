/* Minimal TypeScript Axios client example */
import axios, { AxiosInstance } from 'axios';

export interface Job {
  id: string;
  title: string;
  description?: string;
  location?: any;
}

export interface PagedJobs {
  total: number;
  page: number;
  per_page: number;
  items: Job[];
}

export class NavilApiClient {
  private axios: AxiosInstance;
  constructor(baseUrl: string, accessToken?: string) {
    this.axios = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
    });
  }

  async listJobs(query?: string, page = 1, per_page = 20, currency?: string): Promise<PagedJobs> {
    const headers: any = {};
    if (currency) headers['X-Currency'] = currency;
    const resp = await this.axios.get<PagedJobs>(`/api/v1/jobs`, {
      params: { query, page, per_page },
      headers,
    });
    return resp.data;
  }
}

// Example usage:
// const client = new NavilApiClient('http://localhost:3000', process.env.NAVIL_TOKEN);
// client.listJobs('engineer', 1, 20, 'NGN').then(console.log).catch(console.error);
