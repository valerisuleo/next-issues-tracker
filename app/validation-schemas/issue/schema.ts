import { z } from 'zod';

const issueSchema = z.object({
    title: z
        .string()
        .min(1, 'Title is required')
        .max(255, 'Title must be at most 255 characters long'),
    description: z.string().min(1, 'Description is required'),
});

export default issueSchema;
