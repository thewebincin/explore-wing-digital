# Explore Wings Digital Technologies — Complete Multi-Page Marketing Website (Trivandrum, Kerala)

A complete, Shopify-inspired multi-page marketing website built with plain HTML5, CSS3, and vanilla JavaScript (with GSAP + ScrollTrigger support) for **Explore Wings Digital Technologies** in Thiruvananthapuram (Trivandrum), Kerala, India.

---

## 📁 Files Included

- `index.html` — Home page following the exact 13-step section order (Top bar → Sticky navbar with `Services`, `Industries`, `Resources` mega-menus → Hero with conversion input & floating mockups → Static logo row + big claim numbers + animated bar/line charts & progress ring → Alternating feature blocks + opposite-direction kinetic marquees → 5-Tab showcase → Two-row `"Brands that trust us"` scroller + LuLu & Munch spotlight → Draggable client stories carousel → 4-step `"How it works"` (`Listen`, `Create`, `Launch`, `Grow`) → 3 Resource article cards → FAQ accordion → Closing CTA band → Mega footer with giant outlined `"EXPLORE WINGS"` watermark)
- `services.html` — Six core services (**Website Design**, **Branding & Logos**, **Social Media**, **Photo & Video**, **Digital Marketing**, **Business Websites**) in alternating layouts with a sticky side navigation
- `pricing.html` — **Essential**, **Signature** (middle highlighted), and **Premium** tiers, One-Time / Monthly toggle with animated prices, side-by-side comparison table, and FAQ accordion
- `portfolio.html` — Category filter tabs with animated reshuffle, large rounded cards, **Case Study Detail Modal (Challenge, Work, Result + Next/Previous navigation)**, `"Brands that trust us"` scroller, and right-side slide-in Client Detail Drawer
- `about.html` — Company story, Mission/Vision/Values bento grid, placeholder team cards, vertical growth timeline, `"Proudly from Trivandrum, Kerala"` map section, and `"Brands that trust us"` scroller
- `contact.html` — Placeholder contact cards, preferred call slot pills, floating-label enquiry form with live validation & animated thank-you (Formspree/EmailJS ready), embedded Google Map of Trivandrum, WhatsApp button, and `"Book a free consultation"` strip
- `404.html` — Friendly custom 404 page with theme controls, navigation, and chatbot
- `style.css` — CSS variable architecture for **Red & Green themes** × **Light & Dark modes**, circular reveal wipe, custom desktop cursor (`"View"` / `"Drag"`), multi-directional scroll reveals, animated charts/rings, and built-in chatbot styling
- `script.js` — Organized into labelled sections (`BRANDS`, `THEMES`, `AUTO SCROLL`, `PRELOADER & TRANSITIONS`, `MARQUEE & CLIENT DRAWER`, `REVEAL DIRECTIONS`, `TABS`, `CAROUSEL`, `MODAL & FILTER`, `CURSOR, SCROLL RING, FORM, PRICING & NAV`)
- `chatbot.js` — Built-in **Wing Assistant** chatbot present on every page

---

## 🚀 How to Run the Site

1. Open `index.html` directly in any modern browser, or serve the folder with a local static server (e.g. VS Code Live Server or `npx serve .`).
2. Both `C:\Users\NAVANEETH\Downloads\explore-wing-digital` and `C:\Users\NAVANEETH\.gemini\antigravity\scratch\explore-wing-digital` contain the complete project files and assets.

---

## 🎨 Themes: Red & Green × Light & Dark

Driven by `data-theme="green|red"` and `data-mode="light|dark"` on `<html>`:

- **Green Theme (Default)**: Primary `#00A36C`, Deep `#0B3D2E`, Tint `#ECFDF5`, Accent `#B7E34D`
- **Red Theme**: Primary `#E11D2E`, Deep `#7A0A14`, Tint `#FFF1F2`, Accent `#F6C744`
- **Surfaces**: Light `#FBF9F4`, Dark `#0B1020`
- **Persistence**: Saved in `localStorage` inside `try/catch`. Respects system dark mode (`prefers-color-scheme: dark`) on first visit if no saved preference exists.

---

## 🤖 Built-In Chatbot (`chatbot.js`)

The **Wing Assistant** chatbot appears at the bottom-right (directly above the WhatsApp button) on every page:

- **Edit Answers**: Open `chatbot.js` and edit the `KNOWLEDGE_BASE` array at the top of the file to update answers for services, pricing, turnaround time, Trivandrum location, working hours, or clients.
- **Lead Capture Endpoint**: Update `leadEndpoint: 'https://formspree.io/f/your-placeholder-id'` in `CHATBOT_CONFIG` inside `chatbot.js` (and `data-formspree` on `#luxuryContactForm` in `contact.html`) with your live Formspree or EmailJS endpoint.
- **Optional AI Mode**: Set `aiMode.enabled = true` and `aiMode.proxyEndpoint = '/api/wing-assistant-chat'` in `CHATBOT_CONFIG` (`chatbot.js`) to route questions through your own backend AI proxy (so API keys are never placed in frontend code). If disabled or unreachable, the chatbot automatically falls back to the built-in `KNOWLEDGE_BASE`.

---

## 🤝 Editing Client Logos & `BRANDS` Array (`script.js`)

All client logo strips, scrollers, customer story cards, and the right-side slide-in Client Detail Drawer are built from the single `BRANDS` array at the top of `script.js`:

- `assets/logos/aadisaktthi-resorts-spa.png` — **Aadisaktthi Resorts & Spa** (Kovalam, Trivandrum — 227/A KS Road, Vellar)
- `assets/logos/terrace-by-makkawao.png` — **Terrace by Makkawao** (Kazhakkoottam, Trivandrum — open daily 12 pm to 12 am)
- `assets/logos/transorze.png` — **Transorze**
- `assets/logos/edustudy-international.png` — **Edustudy International**
- `assets/logos/global-fitness.png` — **Global Fitness**
- `assets/logos/elaf.png` — **Elaf** (*"Flavors that Unite"*)
- `assets/logos/lulu-mall.png` — **LuLu** (*"Where the world comes to shop"*)
- `assets/logos/munch.png` — **Munch (Nestlé)**

To add a new client, drop their logo into `assets/logos/` and add one object entry to `BRANDS` in `script.js`. If an image file is missing, each card automatically falls back to displaying the brand's name in clean typography.
