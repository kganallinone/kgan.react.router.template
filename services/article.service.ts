import type { Article } from "@/types/article.types";

const mockArticles: Article[] = [
  {
    id: "1",
    title: "Memorandum Of Agreement Signing in Sual, Pangasinan",
    summary: "Discover simple ways to improve your daily habits and boost your overall well-being.",
    image: "./assets/imgs/moa.sual/MOA-SUAL-1.jpg?w=800",
    images: [
      "../assets/imgs/moa.sual/MOA-SUAL-1.jpg?w=800",
      "../assets/imgs/moa.sual/MOA-SUAL-2.jpg?w=800",
      "../assets/imgs/moa.sual/MOA-SUAL-3.jpg?w=800",
      "../assets/imgs/moa.sual/MOA-SUAL-4.jpg?w=800",
      "../assets/imgs/moa.sual/MOA-SUAL-5.jpg?w=800",
      "../assets/imgs/moa.sual/MOA-SUAL-6.jpg?w=800",
      "../assets/imgs/moa.sual/MOA-SUAL-7.jpg?w=800",
      "../assets/imgs/moa.sual/MOA-SUAL-8.jpg?w=800",
      "../assets/imgs/moa.sual/MOA-SUAL-9.jpg?w=800"
    ],
    date: "2024-06-01",
    author: { name: "FTCC Writer" },
    content: "Full article content here...",
    tags: ["health", "lifestyle", "wellness", "tips"],
    category: "Wellness"
  },
  {
    id: "2",
    title: "Presentation of Konsulta Program in Zambales",
    summary: "Learn why regular check-ups and screenings are essential for long-term health.",
    image: "./assets/imgs/konsulta.zambales/KONSULTA-ZAMBALES-3.jpg?w=800",
    images: [
      "../assets/imgs/konsulta.zambales/KONSULTA-ZAMBALES-3.jpg?w=800",
      "../assets/imgs/konsulta.zambales/KONSULTA-ZAMBALES-4.jpg?w=800",
      "../assets/imgs/konsulta.zambales/KONSULTA-ZAMBALES-5.jpg?w=800"
    ],
    date: "2025-03-18",
    author: { name: "FTCC Writer" },
    content: "Full article content here...",
    tags: ["preventive care", "checkup", "screening", "health"],
    category: "Primary Care"
  },
  {
    id: "3",
    title: "Presentation of Konsulta Program in Pitogo",
    summary: "Explore practical strategies for reducing stress and improving mental health.",
    image: "./assets/imgs/konsulta.pitogo/KONSULTA-PITOGO-1.jpg?w=800",
    images: [
      "../assets/imgs/konsulta.pitogo/KONSULTA-PITOGO-1.jpg?w=800",
      "../assets/imgs/konsulta.pitogo/KONSULTA-PITOGO-2.jpg?w=800",
      "../assets/imgs/konsulta.pitogo/KONSULTA-PITOGO-3.jpg?w=800",
      "../assets/imgs/konsulta.pitogo/KONSULTA-PITOGO-4.jpg?w=800"
    ],
    date: "2024-05-20",
    author: { name: "FTCC Writer" },
    content: "Full article content here...",
    tags: ["stress", "mental health", "wellness", "tips"],
    category: "Mental Health"
  },
  {
    id: "4",
    title: "Orientation of Konsulta Program in Nueva Ecija",
    summary: "Explore practical strategies for reducing stress and improving mental health.",
    image: "./assets/imgs/orientation.nueva.ecija/ORIENTATION-NUEVA-ECIJA-1.jpg?w=800",
    images: [
      "../assets/imgs/orientation.nueva.ecija/ORIENTATION-NUEVA-ECIJA-1.jpg?w=800",
      "../assets/imgs/orientation.nueva.ecija/ORIENTATION-NUEVA-ECIJA-2.jpg?w=800",
      "../assets/imgs/orientation.nueva.ecija/ORIENTATION-NUEVA-ECIJA-3.jpg?w=800",
      "../assets/imgs/orientation.nueva.ecija/ORIENTATION-NUEVA-ECIJA-4.jpg?w=800"
    ],
    date: "2024-05-20",
    author: { name: "FTCC Writer" },
    content: "Full article content here...",
    tags: ["stress", "mental health", "wellness", "tips"],
    category: "Mental Health"
  }
];

export const articleService = {
  getAll: async (): Promise<Article[]> => Promise.resolve(mockArticles),
  getById: async (id: string): Promise<Article | undefined> => Promise.resolve(mockArticles.find(a => a.id === id)),
}; 