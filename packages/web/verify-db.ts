import { eq } from 'drizzle-orm';
import { db } from './src/api/database';
import { waitlist } from './src/api/database/schema';

const rows = await db.select().from(waitlist).where(eq(waitlist.email, 'qa.scrimsync@example.com'));
console.log('Persisted QA email count:', rows.length);
if (rows.length !== 1) throw new Error('Expected exactly one normalized persisted email');
await db.delete(waitlist).where(eq(waitlist.email, 'qa.scrimsync@example.com'));
console.log('QA-only row removed');