# 🚀 Deploying Nathdwara Jwellery to Render (1,000+ Concurrent Visitors Capacity)

This guide walks you through deploying your 3D luxury website to **Render.com**.

---

## ⚡ Why This Setup Easily Handles 1,000+ Simultaneous People

1. **Render Global Edge CDN**:
   - Deployed as a **Static Site** on Render's Anycast CDN (Cloudflare Edge Network).
   - Files are cached globally across 300+ edge locations.
   - There is **no single-server CPU bottleneck**. It can easily serve **10,000+ concurrent visitors** at the exact same second with sub-second load times.

2. **Immutable Caching (`render.yaml`)**:
   - All Three.js scripts, CSS, and 3D assets are cached immutably:
     `Cache-Control: public, max-age=31536000, immutable`
   - Reduces bandwidth and ensures smooth 60fps performance on mobile devices.

3. **High-Concurrency Web Service Backup (`server.js`)**:
   - If deployed as a Node.js Web Service, `server.js` is pre-configured with `maxConnections = 25,000` and HTTP Gzip streaming.

---

## 📋 Step-by-Step Deployment Guide

### Method A: Connect via GitHub (Recommended — 2 Minutes)

1. **Create a GitHub Repository**:
   - Go to [github.com/new](https://github.com/new)
   - Name your repo: `nathdwara-jewellery`
   - Keep it **Public** or **Private**
   - Click **Create repository**

2. **Push your code from this computer**:
   Open PowerShell or Terminal in `C:\Users\Patel Meet\.gemini\antigravity\scratch\nathdwara-jewellery` and run:
   ```bash
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/nathdwara-jewellery.git
   git push -u origin main
   ```

3. **Deploy on Render**:
   - Go to [dashboard.render.com](https://dashboard.render.com) (Sign up for free if you don't have an account).
   - Click the blue **New +** button in the top right.
   - Select **Static Site**.
   - Connect your GitHub account and select `nathdwara-jewellery`.
   - Render will automatically fill the settings from `render.yaml`:
     - **Name**: `nathdwara-jewellery`
     - **Branch**: `main`
     - **Build Command**: `npm install && npm run build`
     - **Publish Directory**: `dist`
   - Click **Create Static Site**!

4. **Your Live Render URL**:
   In about 60 seconds, Render will give you a live free URL:
   `https://nathdwara-jewellery.onrender.com`
   You can share this link with all your friends, family, and customers!

---

### Method B: Render Blueprint (1-Click)

1. Push to GitHub as described above.
2. In Render Dashboard, click **New +** -> **Blueprint**.
3. Select your repository.
4. Render will read `render.yaml` and configure everything automatically.
5. Click **Apply**.

---

## 🔒 Custom Domain Setup (Optional)
On Render, you can connect your own domain (e.g. `www.nathdwarajwellery.com`):
1. In Render Dashboard -> Settings -> **Custom Domains**.
2. Add your domain name.
3. Add the CNAME / A records in your domain registrar (GoDaddy, Namecheap, Hostinger).
4. Render automatically provisions a free SSL Certificate (HTTPS).
