import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.SUPABASE_DB_URL,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { content } = req.body;

  if (!content || typeof content !== 'string' || !content.trim()) {
    return res.status(400).json({ error: 'Content is required and must be a non-empty string' });
  }

  try {
    const client = await pool.connect();
    
    try {
      const query = 'INSERT INTO texts (content, created_at) VALUES ($1, NOW()) RETURNING id, content, created_at';
      const values = [content.trim()];
      
      const result = await client.query(query, values);
      const insertedText = result.rows[0];
      
      res.status(201).json({
        success: true,
        data: insertedText
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ 
      error: 'Failed to save text to database',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}