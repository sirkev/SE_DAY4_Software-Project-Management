// API base URL from environment variable
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/api';

export interface UserLeadData {
    name: string;
    email: string;
    location: string;
    frequency: string;
    services: string[];
}

export interface BusinessLeadData {
    business_name: string;
    owner_name: string;
    email: string;
    phone: string;
    location: string;
    services: string[];
}

export interface ApiResponse<T> {
    data?: T;
    error?: string;
}

export async function submitUserLead(data: UserLeadData): Promise<ApiResponse<any>> {
    try {
        const response = await fetch(`${API_URL}/leads/user/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { error: errorData.message || response.statusText };
        }

        const result = await response.json();
        return { data: result };
    } catch (error) {
        return { error: error instanceof Error ? error.message : 'Network error occurred' };
    }
}

export async function submitBusinessLead(data: BusinessLeadData): Promise<ApiResponse<any>> {
    try {
        const response = await fetch(`${API_URL}/leads/business/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { error: errorData.message || response.statusText };
        }

        const result = await response.json();
        return { data: result };
    } catch (error) {
        return { error: error instanceof Error ? error.message : 'Network error occurred' };
    }
}
