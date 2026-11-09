import { APIResponse, expect } from "@playwright/test";

export class CustomerApiAssertions {

  static async responseStatusIs(response:APIResponse, status:number) : Promise<void> {

    expect(response.status(), `Unexpected status from ${response.url()}`).toBe(status);

  };

  static async responseContainsExpectedMessage(response: APIResponse, message: string): Promise<void> {

    const responseBody = await response.text();

    expect(responseBody, `Message not found in response from ${response.url()}`).toContain(message);
  };
}