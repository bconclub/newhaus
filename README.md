# NewHaus - Luxury Real Estate Curation Website

A sophisticated luxury property curation website for NewHaus, built with React, Vite, and Tailwind CSS. This website showcases premium Embassy properties in Bangalore with a focus on exceptional design and investment value.

## Features

- 🏡 **Curated Property Listings** - 5 carefully selected Embassy properties
- 🎨 **Luxury Design** - Sophisticated UI with custom color palette and typography
- 📱 **Fully Responsive** - Optimized for all devices
- ⚡ **Fast Performance** - Built with Vite for optimal loading speeds
- 🎭 **Smooth Animations** - Powered by Framer Motion
- 📝 **Lead Generation** - Comprehensive contact forms with n8n webhook integration
- 🧭 **SEO Optimized** - Proper meta tags and semantic HTML

## Tech Stack

- **Framework:** React 18+ with Vite
- **Styling:** Tailwind CSS v4
- **Routing:** React Router v6
- **Animations:** Framer Motion
- **Forms:** React Hook Form
- **Icons:** Lucide React

## Project Structure

```
newhaus/
├── public/
│   ├── images/         # Property images, logos, icons
│   └── .htaccess       # Apache config for SPA routing
├── src/
│   ├── components/
│   │   ├── layout/     # Header, Footer, Layout
│   │   ├── home/       # Home page sections
│   │   └── shared/     # Reusable components
│   ├── pages/          # Page components
│   ├── data/           # Property data
│   ├── utils/          # Utility functions
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles + Tailwind
├── dist/               # Production build (generated)
└── package.json
```

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd newhaus
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure n8n webhook:**
   - Open `src/components/shared/ContactForm.jsx`
   - Replace `YOUR_N8N_WEBHOOK_URL_HERE` with your actual n8n webhook URL

4. **Add property images:**
   - Place property images in `public/images/properties/`
   - Naming convention: `[property-slug]-hero.jpg`, `[property-slug]-1.jpg`, etc.
   - Add hero images in `public/images/hero/`

## Development

**Start development server:**
```bash
npm run dev
```

The site will be available at `http://localhost:5173/`

## Build for Production

**Create production build:**
```bash
npm run build
```

This generates optimized files in the `dist/` folder.

**Preview production build locally:**
```bash
npm run preview
```

## Deployment

### Deploy to cPanel/Shared Hosting

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Upload to server:**
   - Upload the contents of the `dist/` folder to your `public_html` directory
   - Ensure `.htaccess` is included for proper routing

3. **Verify .htaccess:**
   The `.htaccess` file should contain:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

## Configuration

### Brand Colors

The color palette is defined in `src/index.css`:

- **Deep Charcoal** (#2B2B2B) - Primary text, backgrounds
- **Warm Copper** (#C87533) - CTAs, accents
- **Soft Cream** (#F5F3EF) - Secondary backgrounds
- **Warm Orange** (#FF6B35) - Highlights, hover states
- **Deep Blue-Grey** (#3D4852) - Secondary elements

### Typography

- **Headings:** Playfair Display (serif)
- **Body Text:** Inter (sans-serif)

### Pages

- **Home (/)** - Hero, Brand Pillars, Featured Properties, Services, How It Works, CTA
- **About (/about)** - Company story, approach, and vision
- **Services (/services)** - Detailed service offerings
- **Properties (/properties)** - All property listings
- **Property Detail (/properties/:slug)** - Individual property pages
- **Contact (/contact)** - Contact form and information
- **Thank You (/thank-you)** - Post-submission confirmation

## Contact Form Integration

The contact form submits to an n8n webhook with the following payload:

```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "budget_range": "string",
  "property_interest": "string",
  "timeline": "string",
  "message": "string",
  "submitted_at": "ISO 8601 timestamp",
  "source_page": "string (URL)"
}
```

## Customization

### Adding New Properties

Edit `src/data/properties.js` and add a new property object following the existing structure.

### Updating Contact Information

Edit `src/components/layout/Footer.jsx` to update phone, email, and address.

### Changing n8n Webhook URL

Edit `src/components/shared/ContactForm.jsx` and replace the placeholder webhook URL.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- ✅ Code splitting by route
- ✅ Lazy loading images
- ✅ Optimized bundle size
- ✅ Smooth animations with Framer Motion
- ✅ Custom scrollbar styling

## Future Enhancements

- [ ] Virtual property tours (360° images)
- [ ] Blog section for real estate insights
- [ ] Mortgage calculator
- [ ] Property comparison tool
- [ ] Video testimonials
- [ ] Live chat integration
- [ ] Advanced property filtering
- [ ] Investment calculator

## License

© 2024 NewHaus. All rights reserved.

## Support

For technical support or questions:
- Email: hello@newhaus.in
- Phone: +91 98765 43210

---

**Built with ❤️ for NewHaus**
