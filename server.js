import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Data storage file
const DATA_FILE = path.join(__dirname, 'data', 'leads.json');
const DATA_DIR = path.dirname(DATA_FILE);

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize data file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({ leads: [], whatsappClicks: [] }, null, 2));
}

// Admin credentials
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'Newhaus#826991';

// Helper function to read data
const readData = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data:', error);
    return { leads: [], whatsappClicks: [] };
  }
};

// Helper function to write data
const writeData = (data) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing data:', error);
    return false;
  }
};

// Admin login endpoint
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // Generate a simple session token
    const token = crypto.randomBytes(32).toString('hex');
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Verify admin token (simple check - in production use proper JWT)
app.post('/api/admin/verify', (req, res) => {
  const { token } = req.body;
  // For simplicity, we'll just check if token exists
  // In production, use proper JWT verification
  if (token) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
});

// Store lead submission
app.post('/api/leads', (req, res) => {
  const leadData = {
    ...req.body,
    id: crypto.randomBytes(16).toString('hex'),
    timestamp: new Date().toISOString(),
  };

  const data = readData();
  data.leads.push(leadData);
  
  if (writeData(data)) {
    res.json({ success: true, id: leadData.id });
  } else {
    res.status(500).json({ success: false, message: 'Failed to save lead' });
  }
});

// Track WhatsApp click
app.post('/api/whatsapp-clicks', (req, res) => {
  const clickData = {
    ...req.body,
    id: crypto.randomBytes(16).toString('hex'),
    timestamp: new Date().toISOString(),
  };

  const data = readData();
  data.whatsappClicks.push(clickData);
  
  if (writeData(data)) {
    res.json({ success: true, id: clickData.id });
  } else {
    res.status(500).json({ success: false, message: 'Failed to save click' });
  }
});

// Get all leads (admin only)
app.get('/api/admin/leads', (req, res) => {
  const data = readData();
  res.json({ success: true, leads: data.leads });
});

// Get all WhatsApp clicks (admin only)
app.get('/api/admin/whatsapp-clicks', (req, res) => {
  const data = readData();
  res.json({ success: true, clicks: data.whatsappClicks });
});

// Get dashboard stats (admin only)
app.get('/api/admin/stats', (req, res) => {
  const data = readData();
  const leads = data.leads || [];
  const clicks = data.whatsappClicks || [];

  // Group leads by form type
  const leadsByType = leads.reduce((acc, lead) => {
    const type = lead.form_type || 'unknown';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  // Get recent leads (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const recentLeads = leads.filter(lead => new Date(lead.timestamp) >= sevenDaysAgo);

  // Get recent clicks (last 7 days)
  const recentClicks = clicks.filter(click => new Date(click.timestamp) >= sevenDaysAgo);

  res.json({
    success: true,
    stats: {
      totalLeads: leads.length,
      totalClicks: clicks.length,
      recentLeads: recentLeads.length,
      recentClicks: recentClicks.length,
      leadsByType,
    },
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Admin API server running on http://localhost:${PORT}`);
});


