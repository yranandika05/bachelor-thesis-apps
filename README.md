# Bachelorarbeit – Vergleich von CSR und SSR

Dieses Repository enthält vier Blog-Anwendungen, die im Rahmen meiner Bachelorarbeit entwickelt wurden. Ziel ist es, **Client-Side Rendering (CSR)** und **Server-Side Rendering (SSR)** unter verschiedenen Netzwerkbedingungen miteinander zu vergleichen und den Einfluss ausgewählter Optimierungstechniken auf die **Performance** und die **User Experience** zu untersuchen.

## 📂 Struktur des Repositories

- `csr-original` – CSR mit React (Vite), ohne Optimierungen  
- `csr-optimized` – CSR mit React (Vite), mit Optimierungen (Preloading, Lazy Loading, HTTP-Caching)  
- `ssr-original` – SSR mit Next.js, ohne Optimierungen  
- `ssr-optimized` – SSR mit Next.js, mit Optimierungen (Preloading, Lazy Loading, HTTP-Caching)  

Alle vier Anwendungen nutzen dasselbe Supabase-Backend mit einer PostgreSQL-Datenbank und den Tabellen `posts` und `comments`.

## 🔗 Live-Demos (Vercel)

- [CSR Original](https://original-csr-app.vercel.app/)  
- [CSR Optimiert](https://optimized-csr-app.vercel.app/)  
- [SSR Original](https://original-ssr-app.vercel.app/)  
- [SSR Optimiert](https://optimized-ssr-app.vercel.app/)  

## ⚙️ Optimierungstechniken

Die optimierten Varianten enthalten ein praxisnahes Bündel von **Web Performance Optimierungen (WPO):**

- **Preloading** kritischer Ressourcen (Fonts, Logo, Hero-Bilder)  
- **Lazy Loading** für nicht-kritische Bilder  
- **HTTP-Caching** für statische Assets (Bundles, Fonts, Bilder), während HTML-Dokumente stets frisch mit `Cache-Control: no-store` ausgeliefert werden  

## 🚀 Deployment

Alle vier Anwendungen sind auf [Vercel](https://vercel.com) deployt.  
Jede Variante ist als eigenständige Anwendung verfügbar.

- CSR: React + Vite, Ausgabeordner `dist`  
- SSR: Next.js, Ausgabeordner `.next`  

## 🗄️ Backend

- [Supabase](https://supabase.com/) als Backend  
- PostgreSQL-Datenbank  
- Tabellen:  
  - `posts` – Blogbeiträge (Titel, Inhalt, Kategorie, Thumbnail-URL usw.)  
  - `comments` – Kommentare, inkl. `source_app` zur Unterscheidung der App-Variante  

## 📊 Performance-Messungen

- Test-Setup: drei Netzwerkprofile (schnell, mittel, langsam)  
- Tools: automatisierte Messungen mit Docker + Lighthouse/Sitespeed  
- Kennzahlen: FCP, LCP, TTFB, CLS  

Die vollständigen Messergebnisse sowie Auswertungen sind im Rahmen der Arbeit dokumentiert.  

## 📖 Kontext

Dieses Repository wurde im Rahmen der Bachelorarbeit  
**„Analyse der Webanwendungsleistung mit CSR und SSR unter verschiedenen Netzwerkbedingungen und der Einfluss von Optimierungstechniken auf die Benutzererfahrung“** an der Technischen Hochschule Mittelhessen (THM) erstellt.  

---

# Bachelor Thesis – CSR vs SSR Comparison

This repository contains four blog applications developed for my bachelor thesis.  
The goal is to compare **Client-Side Rendering (CSR)** and **Server-Side Rendering (SSR)** under different network conditions and to evaluate the impact of selected optimization techniques on **performance** and **user experience**.

## 📂 Repository Structure

- `csr-original` – CSR with React (Vite), without optimizations  
- `csr-optimized` – CSR with React (Vite), with optimizations (Preloading, Lazy Loading, HTTP Caching)  
- `ssr-original` – SSR with Next.js, no optimizations  
- `ssr-optimized` – SSR with Next.js, with optimizations (Preloading, Lazy Loading, HTTP Caching)  

All four applications share the same Supabase backend with a PostgreSQL database containing the tables `posts` and `comments`.

## 🔗 Live Demos (Vercel)

- [CSR Original](https://original-csr-app.vercel.app/)  
- [CSR Optimized](https://optimized-csr-app.vercel.app/)  
- [SSR Original](https://original-ssr-app.vercel.app/)  
- [SSR Optimized](https://optimized-ssr-app.vercel.app/)  

## ⚙️ Optimization Techniques

The optimized variants apply a practical bundle of **Web Performance Optimization (WPO)** techniques:

- **Preloading** of critical resources (fonts, logo, hero images)  
- **Lazy Loading** for non-critical images  
- **HTTP Caching** for static assets (bundles, fonts, images), while HTML documents are always delivered fresh using `Cache-Control: no-store`  

## 🚀 Deployment

All applications are deployed on [Vercel](https://vercel.com).  
Each variant is available as a separate app.

- CSR: React + Vite, output folder `dist`  
- SSR: Next.js, output folder `.next`  

## 🗄️ Backend

- [Supabase](https://supabase.com/) as backend  
- PostgreSQL database  
- Tables:  
  - `posts` – blog posts (title, content, category, thumbnail URL, etc.)  
  - `comments` – comments including `source_app` to distinguish app variants  

## 📊 Performance Testing

- Test setup: three network profiles (fast, medium, slow)  
- Tools: automated tests using Docker + Lighthouse/Sitespeed  
- Metrics: FCP, LCP, TTFB, CLS  

The full measurement results and evaluations are documented in the thesis.  

## 📖 Context

This repository was created as part of the bachelor thesis  
**“Analysis of Web Application Performance with CSR and SSR under Various Network Conditions and the Influence of Optimization Techniques on User Experience”**  
at Technische Hochschule Mittelhessen (THM).
