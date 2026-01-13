"use server";

import { z } from "zod";
import { explainCodeSnippet } from "@/ai/flows/explain-code-snippet";
import { createContactMessage } from '@/lib/contact';
import { revalidatePath } from 'next/cache';
import nodemailer from 'nodemailer';

// --- Code Explainer Action ---

export type CodeExplainerState = {
  explanation?: string;
  error?: string;
  fieldErrors?: {
    code?: string[];
  };
};

const CodeExplainerSchema = z.object({
  code: z.string().min(10, { message: "Code snippet must be at least 10 characters long." }),
});

export async function handleCodeExplanation(
  prevState: CodeExplainerState,
  formData: FormData
): Promise<CodeExplainerState> {
  const validatedFields = CodeExplainerSchema.safeParse({
    code: formData.get('code'),
  });

  if (!validatedFields.success) {
    return {
      error: "Invalid input.",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await explainCodeSnippet({ codeSnippet: validatedFields.data.code });
    revalidatePath('/');
    return { explanation: result.explanation };
  } catch (e) {
    console.error(e);
    return { error: "An error occurred while explaining the code. Please try again." };
  }
}

// --- Contact Form Action ---

export type ContactFormState = {
  message: string;
  error?: string;
  fieldErrors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  }
};

const ContactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters."}),
  email: z.string().email({ message: "Please enter a valid email."}),
  message: z.string().min(10, { message: "Message must be at least 10 characters."})
});

export async function handleContact(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const validatedFields = ContactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
        message: "",
        error: "Please fill out all fields correctly.",
        fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    // Save to database
    await createContactMessage({
      name: validatedFields.data.name,
      email: validatedFields.data.email,
      message: validatedFields.data.message,
      read: false,
    });

    // Send email notification
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false // Allow self-signed certificates
      }
    });

    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
      subject: `New Contact Message from ${validatedFields.data.name}`,
      text: `
        Name: ${validatedFields.data.name}
        Email: ${validatedFields.data.email}
        Message: ${validatedFields.data.message}
      `,
    };

    await transporter.sendMail(mailOptions);

    revalidatePath('/');
    return { message: "Thank you for your message! I'll get back to you soon." };
  } catch (error) {
    console.error('Error processing contact message:', error);
    return {
        message: "",
        error: "Failed to send message. Please try again.",
        fieldErrors: {},
    };
  }
}
