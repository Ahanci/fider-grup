import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Lütfen adınızı yazın").max(100),
  phone: z.string().trim().min(7, "Geçerli bir telefon girin").max(30),
  email: z.string().trim().email("Geçerli bir e-posta girin").max(150),
  message: z.string().trim().min(10, "Mesajınız en az 10 karakter olmalı").max(4000),
  website: z.string().max(0).optional(), // honeypot
});

export type ContactInput = z.infer<typeof contactSchema>;
