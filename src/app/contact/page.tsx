"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

const ContactSchema = z.object({
    fullName: z.string().min(3, "Full name must be at least 3 characters"),
    subject: z.string().min(3, "Subject must be at least 3 characters"),
    email: z.string().email("Please enter a valid email address"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});
type ContactForm = z.infer<typeof ContactSchema>;
export default function ContactPage() {
    const {
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting },
        reset, 
    } = useForm<ContactForm>({
        resolver: zodResolver(ContactSchema),
        mode: "onTouched",
    });

    const onSubmit: SubmitHandler<ContactForm> = async () => {
        try {
            await new Promise((r) => setTimeout(r, 500));
            toast.success("Message sent, we will get back to you soon!");
            reset();
        } catch {
            toast.error("Something went wrong, please try again later.");
        }
    };
    return (
        <main className="mx-auto max-w-xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">Contact us</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Full Name</label>
          <input
            className="w-full rounded border px-3 py-2"
            placeholder="Your full name"
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-rose-600">{errors.fullName.message}</p>
          )}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Subject</label>
          <input
            className="w-full rounded border px-3 py-2"
            placeholder="Subject"
            {...register("subject")}
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-rose-600">{errors.subject.message}</p>
          )}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input
            className="w-full rounded border px-3 py-2"
            placeholder="your@email.com"
            type="email"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-rose-600">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Message</label>
          <textarea
            className="h-32 w-full rounded border px-3 py-2"
            placeholder="Type your message here..."
            {...register("message")}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-rose-600">{errors.message.message}</p>
          )}
        </div>
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-neutral-800 hover:bg-neutral-600 px-5 py-3 text-white disabled:opacity-60"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
    </main>
  );
}