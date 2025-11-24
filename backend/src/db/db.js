import { Pool } from 'pg'
 
const db = new Pool({
  user: 'postgres',
  password: 'password',
  host: 'localhost',
  port: 5433,
  database: 'dreamarket_db',
})

export default db;