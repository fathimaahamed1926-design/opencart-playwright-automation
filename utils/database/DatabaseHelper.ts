import {createPool, Pool,ResultSetHeader } from "mysql2/promise"
import { Env } from "../environment";

export class DatabaseHelper{
  private static readonly pool:Pool = createPool({
    host: Env.DB_HOST,
    user: Env.DB_USERNAME,
    password: Env.DB_PASSWORD,
    database: Env.DB_NAME,
    port: Number(Env.DB_PORT),

    waitForConnections: true,
    connectionLimit:5
  });

  static async query<T>(
    sql:string,
    params: unknown[]=[]
  ): Promise<T[]> {
    
    const [rows]= await this.pool.query(
      sql,
      params
    );

    return rows as T[];
  }

  static async execute(
    sql:string,
    params:any[]=[]
  ): Promise<ResultSetHeader> {

    const [result] = await this.pool.execute(
      sql,
      params
    );

    return result as ResultSetHeader;
  }

  static async close(): Promise<void> {
    await this.pool.end();
  }

}