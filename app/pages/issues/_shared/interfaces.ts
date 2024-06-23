
export interface Issue {
    id: number;
    title: string;
    description: string;
    status: 'OPEN' | 'CLOSED' | 'IN_PROGRESS';
    createdAt: string;
    updatedAt: string;
}
