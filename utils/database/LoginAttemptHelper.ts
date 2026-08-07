import {expect} from "@playwright/test";
import { DatabaseHelper } from "./DatabaseHelper";

interface LoginAttempt {
  total: number;
}

export class LoginAttemptHelper{

  static async clearAttempts(username:string): Promise<void> {
    await DatabaseHelper.execute(
      `DELETE FROM oc_customer_login
       WHERE email = ?`,
      [username]
    );
  }

  static async getAttempts(username:string): Promise<number> {
    const rows= await DatabaseHelper.query<LoginAttempt>(
      `SELECT total FROM oc_customer_login
       WHERE email = ?`,
      [username]
    );

    if(rows.length==0) {
      return 0;
    }
    
    return rows[0].total;

  }

  static async verifyAttempts(username:string, expectedAttempts:number): Promise<void> {
    const actualAttempts = await this.getAttempts(username);
    expect(actualAttempts).toBe(expectedAttempts);
  }
}