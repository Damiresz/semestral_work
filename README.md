# Semestrální práce

## Cíl projektu
Moderní webová aplikace vyvinutá pomocí Next.js frameworku, která demonstruje použití moderních webových technologií a best practices.

## Postup implementace
1. Inicializace Next.js projektu
2. Nastavení základní struktury aplikace
3. Implementace layoutu a globálních stylů
4. Využití moderních webových technologií:
   - Next.js pro server-side rendering
   - TypeScript pro typovou bezpečnost
   - Tailwind CSS pro styling
   - Google Fonts (Inter) pro typografii

## Popis funkčnosti
Aplikace je postavena na moderním stacku technologií:
- **Next.js**: Framework pro React aplikace s podporou server-side renderingu
- **TypeScript**: Zajišťuje typovou bezpečnost kódu
- **Inter font**: Moderní sans-serif font od Google Fonts
- **Tailwind CSS**: Utility-first CSS framework pro rychlý vývoj UI

### Hlavní komponenty
- `layout.tsx`: Hlavní layout aplikace obsahující:
  - Meta tagy pro SEO optimalizaci
  - Nastavení fontu
  - Základní strukturu HTML dokumentu

## Komentáře ve zdrojovém kódu
```typescript
// Import potřebných závislostí
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Konfigurace Inter fontu
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Metadata pro SEO
export const metadata: Metadata = {
  title: "Semestral Work",
  description: "Modern web application",
};

// Hlavní layout komponenta
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Meta tag pro správné škálování na různých zařízeních */}
        <meta name="next-size-adjust" content="100%" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

## Instalace a spuštění
1. Nainstalujte závislosti:
```bash
npm install
```

2. Spusťte vývojový server:
```bash
npm run dev
```

3. Otevřete [http://localhost:3000](http://localhost:3000) ve vašem prohlížeči

## Technologie
- Next.js
- TypeScript
- Tailwind CSS
- Google Fonts (Inter)
