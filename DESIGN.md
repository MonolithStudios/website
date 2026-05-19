Create a website for my personal portfolio. It should be a one-pager built with Vue.js. I Trade as "Monolith Studios". Content below:

Colors:
 - Orange: #fe5944
 - Blue: #03a6eb
 - Green: #4c6d5b
 - Purple: #474f9c
 - Beige: #e3cbc7

Fonts:
 - Major: League Spartan
 - Minor: DM Sans (Google Fonts)

Styling:
 - Plain CSS with scoped styles per Vue component (no Tailwind or CSS framework)

Navbar:
- Rounded corners
- Floating, fixed/sticky — stays pinned at top while scrolling
- From left to right:
  -- Logo (found in assets as logo.svg)
  -- Name (MONOLITH STUDIOS)
  -- anchored to RHS: "Contact Us" Button leading to contact section (smooth scroll)
- Collapses to hamburger menu on mobile

Hero Section:
 - LHS:
  -- Big text: "Up your website game"
  -- Small text beneath: "Let us build a beautiful, performant website to elevate your business"
 - RHS:
  -- 3 Cards. Two squares on top, one rectangle below:
    --- Left square: tech stack, purple card with icons for [Vue, Next.Js, Figma, Netlify] arranged in a grid. Icons sourced from simple-icons npm package.
    --- Right Square: visible placeholder card (dashed border, brand beige background). Content will go here later.
    --- Bottom: Pricing: R2000 for design + R300/mo hosting. star next to design price + undertext saying "Pricing may vary for larger sites"

Section 1:
 - LHS:
  -- Large text saying "Its $CURRENT_YEAR, your business needs a website" where $CURRENT_YEAR is not hardcoded but taken from today's date.
  -- Smaller text saying "A Website helps your business stand out, provides a central communication point, and gives your business an identity"
 - RHS:
  -- 3 vertical cards, one per client type, each with an icon, bold label, and short descriptor:
    --- Local Businesses — "Stand out online"
    --- Holiday Homes — "Attract guests"
    --- Personal Portfolios — "Show your work"
  -- Each card has a distinct brand color accent

Section 2:
 - Heading: "Our Happy Customers"
 - Combination of reviews and portfolios. Each combo contains:
  -- Client name + picture (placeholder via placehold.co for now).
  -- Small review paragraph.
  -- Clickable photo of site (placeholder via placehold.co), which will take them to the actual site.
 - Section is a list of these (generate three for now)

Section 3:
 - Heading: "Get in touch"
 - LHS:
  -- Email: ethan@mlith.co.za
  -- Phone: +27739048474
 - RHS:
  -- Message box. Name, Message and Send button
  -- Send is wired to EmailJS (no backend). Credentials stored in .env as:
       VITE_EMAILJS_SERVICE_ID
       VITE_EMAILJS_TEMPLATE_ID
       VITE_EMAILJS_PUBLIC_KEY

Site Footer:
 - Minimal single-row layout
 - Background: green (#4c6d5b)
 - Left: logo
 - Center: copyright string (© YYYY Monolith Studios, year dynamic)
 - Right: email icon linking to mailto:ethan@mlith.co.za

General:
 - Fully responsive (mobile-first breakpoints, stacked layouts on small screens)
 - Subtle fade-in scroll animations via IntersectionObserver (no extra dependencies)