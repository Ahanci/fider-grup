"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/contact";

const field =
  "w-full rounded-xl border border-line bg-surface2 px-4 py-3 text-sm outline-none transition focus:border-accent";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(data: ContactInput) {
    setStatus("idle");
    try {
      const res = await fetch("/api/iletisim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      reset();
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="grid place-items-center rounded-2xl border border-line bg-surface p-10 text-center">
        <CheckCircle2 className="size-12 text-accent" />
        <h3 className="mt-4 font-display text-xl font-semibold">Mesajınız alındı</h3>
        <p className="mt-1 text-sm text-muted">En kısa sürede size dönüş yapacağız.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-4 rounded-2xl border border-line bg-surface p-6 md:p-8"
    >
      {/* Honeypot: botlar doldurur, insanlar görmez */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute -left-[9999px]"
        {...register("website")}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1.5 block text-muted">Ad Soyad</span>
          <input className={field} autoComplete="name" {...register("name")} />
          {errors.name && <span className="mt-1 block text-xs text-red-400">{errors.name.message}</span>}
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block text-muted">Telefon</span>
          <input className={field} type="tel" autoComplete="tel" {...register("phone")} />
          {errors.phone && <span className="mt-1 block text-xs text-red-400">{errors.phone.message}</span>}
        </label>
      </div>
      <label className="block text-sm">
        <span className="mb-1.5 block text-muted">E-posta</span>
        <input className={field} type="email" autoComplete="email" {...register("email")} />
        {errors.email && <span className="mt-1 block text-xs text-red-400">{errors.email.message}</span>}
      </label>
      <label className="block text-sm">
        <span className="mb-1.5 block text-muted">Mesajınız</span>
        <textarea rows={5} className={field} {...register("message")} />
        {errors.message && <span className="mt-1 block text-xs text-red-400">{errors.message.message}</span>}
      </label>
      {status === "error" && (
        <p role="alert" className="text-sm text-red-400">
          Gönderilemedi. Lütfen tekrar deneyin veya bizi arayın.
        </p>
      )}
      <button
        disabled={isSubmitting}
        className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3 font-semibold text-brandink transition hover:brightness-110 disabled:opacity-60"
      >
        {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
        Gönder
      </button>
    </form>
  );
}
