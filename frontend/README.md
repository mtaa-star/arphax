# ArphaxTech Website

**"Our Tech, Your Solution"**

A full React + Tailwind CSS frontend for ArphaxTech — a technology shop based in Mombasa, Kenya.

---

## Pages

| Route | Page |
|---|---|
| `/` | Homepage — Hero, Featured Products, Services, Why Choose, Blog, Testimonials, CTA |
| `/products` | Product Catalogue — filter by category, search by name/brand |
| `/products/:id` | Product Detail — specs, price, availability, inquiry buttons |
| `/repairs` | Repair Booking Form — 8-field form with service list & pricing |
| `/blog` | Blog Listing — filter by category |
| `/blog/:id` | Blog Post Detail |
| `/about` | About — Mission, Vision, Values |
| `/contact` | Contact Form + contact info |

---

## Tech Stack

- **React 18** with React Router v6
- **Tailwind CSS v3** (custom gold/black theme)
- **Vite** (build tool)

---

## Getting Started

```bash
npm install
npm run dev        # Development server → http://localhost:5173
npm run build      # Production build → /dist
npm run preview    # Preview production build
```

---

## Brand Colors

| Color | Hex | Usage |
|---|---|---|
| Gold | `#FFD700` | Buttons, accents, highlights, price labels |
| Black | `#000000` | Background, headers, footer |
| White | `#FFFFFF` | Body text, card content |
| Gray-900 | `#111827` | Card backgrounds |

---

## Deployment (Render)

1. Push this folder to a GitHub repo
2. On [render.com](https://render.com), create a **Static Site**
3. Set Build Command: `npm run build`
4. Set Publish Directory: `dist`
5. Done — your site will be live!

> Add a `_redirects` file in `/public` with `/* /index.html 200` for SPA routing on Render.

---

## Version 2 Roadmap

Per spec, the following can be added without restructuring:
- Customer accounts & login
- Shopping cart
- M-Pesa payments & online checkout
- Order tracking
- Product reviews & wishlist

---

## Contact

📞 0746 747 775 · 📍 Mombasa, Kenya · 💬 WhatsApp
