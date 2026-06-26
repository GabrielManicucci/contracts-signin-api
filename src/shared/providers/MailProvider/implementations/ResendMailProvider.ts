import { Resend } from "resend";
import type { IMailProvider, ISendMailDTO } from "../IMailProvider";

export class ResendMailProvider implements IMailProvider {
  private client: Resend;

  constructor() {
    this.client = new Resend(process.env.RESEND_API_KEY);
  }

  async sendMail(data: ISendMailDTO): Promise<void> {
    await this.client.emails.send({
      from: "Contracts App <onboarding@resend.dev>",
      to: [data.to],
      subject: data.subject,
      html: data.body,
    });
  }
}
