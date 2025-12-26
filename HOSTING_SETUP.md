# Hosting Setup Guide

## Current Architecture

### Admin Credentials
- **Location**: `server.js` (lines 33-34)
- **Username**: `admin`
- **Password**: `Newhaus#826991`
- **Note**: These are hardcoded. For production, consider using environment variables.

### Lead Storage
- **Local Development**: Leads saved to `data/leads.json` when `server.js` is running
- **Production**: Leads are sent to webhook: `https://build.goproxe.com/webhook/newhaus-website`

## The Problem with Hostinger Shared Hosting

Hostinger shared hosting only supports **static files** (HTML, CSS, JavaScript). It cannot run Node.js servers like `server.js`.

**What this means:**
- ✅ Your website will work (static files are served)
- ✅ Form submissions will work (they use the webhook)
- ❌ Admin panel won't work (requires the Node.js server)
- ❌ Leads won't be saved to `data/leads.json` (server isn't running)

## Solutions

### Option 1: Use Webhook Only (Current Setup - Recommended)

Your forms already send leads to the webhook, which works fine. You would manage leads through your webhook system instead of the admin panel.

**Pros:**
- ✅ Works immediately
- ✅ No additional setup needed
- ✅ Forms work perfectly

**Cons:**
- ❌ No admin panel on live site
- ❌ Can't view leads directly on the website

### Option 2: Host Node.js Server Separately (Recommended for Admin Panel)

Deploy `server.js` to a Node.js hosting service and update your frontend to point to it.

**Services you can use:**
- **Railway** (railway.app) - Easy setup, free tier available
- **Render** (render.com) - Free tier available
- **Heroku** (heroku.com) - Paid plans
- **DigitalOcean App Platform** - Paid
- **Vercel** (vercel.com) - Free tier for serverless functions

**Steps:**
1. Deploy `server.js` to one of these services
2. Get the URL (e.g., `https://your-server.railway.app`)
3. Update `vite.config.js` to proxy to production server URL
4. Update forms to use the production API URL

### Option 3: Use Backend-as-a-Service

Use a service like Supabase or Firebase for backend functionality.

**Pros:**
- ✅ Database included
- ✅ Authentication built-in
- ✅ Free tier available

**Cons:**
- ❌ Requires rewriting backend code
- ❌ More complex setup

## Recommendation

For now, **continue using the webhook** for lead collection. If you need the admin panel on live hosting:

1. **Deploy `server.js` to Railway or Render** (easiest option)
2. **Update your frontend** to point to the deployed server
3. **Access admin panel** at `yourdomain.com/admin/login`

## Quick Setup for Railway (Example)

1. Sign up at railway.app
2. Create new project
3. Connect your GitHub repository
4. Add `server.js` as a service
5. Set environment variables if needed
6. Deploy
7. Get the URL (e.g., `https://newhaus-api.railway.app`)
8. Update your frontend configuration

Would you like me to help set up one of these solutions?

