import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Users, MessageCircle, TrendingUp, Calendar, Filter } from 'lucide-react';
import Button from '../components/shared/Button';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [leads, setLeads] = useState([]);
  const [whatsappClicks, setWhatsappClicks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('leads');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    loadData();
  }, [navigate]);

  const loadData = async () => {
    try {
      const [statsRes, leadsRes, clicksRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/leads'),
        fetch('/api/admin/whatsapp-clicks'),
      ]);

      const statsData = await statsRes.json();
      const leadsData = await leadsRes.json();
      const clicksData = await clicksRes.json();

      if (statsData.success) setStats(statsData.stats);
      if (leadsData.success) setLeads(leadsData.leads.reverse()); // Most recent first
      if (clicksData.success) setWhatsappClicks(clicksData.clicks.reverse()); // Most recent first
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filteredLeads = filter === 'all' 
    ? leads 
    : leads.filter(lead => lead.form_type === filter);

  if (loading) {
    return (
      <div className="min-h-screen bg-nh-charcoal flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-nh-charcoal">
      {/* Header */}
      <div className="bg-nh-grey border-b border-nh-copper/20 px-6 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-heading font-bold text-white">Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="secondary" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-nh-grey p-6 rounded-lg border border-nh-copper/20">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-8 h-8 text-nh-copper" />
                <span className="text-3xl font-bold text-white">{stats.totalLeads}</span>
              </div>
              <p className="text-gray-400 text-sm">Total Leads</p>
              <p className="text-nh-copper text-xs mt-1">{stats.recentLeads} in last 7 days</p>
            </div>

            <div className="bg-nh-grey p-6 rounded-lg border border-nh-copper/20">
              <div className="flex items-center justify-between mb-2">
                <MessageCircle className="w-8 h-8 text-nh-copper" />
                <span className="text-3xl font-bold text-white">{stats.totalClicks}</span>
              </div>
              <p className="text-gray-400 text-sm">WhatsApp Clicks</p>
              <p className="text-nh-copper text-xs mt-1">{stats.recentClicks} in last 7 days</p>
            </div>

            <div className="bg-nh-grey p-6 rounded-lg border border-nh-copper/20">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-8 h-8 text-nh-copper" />
                <span className="text-3xl font-bold text-white">
                  {Object.keys(stats.leadsByType).length}
                </span>
              </div>
              <p className="text-gray-400 text-sm">Form Types</p>
            </div>

            <div className="bg-nh-grey p-6 rounded-lg border border-nh-copper/20">
              <div className="flex items-center justify-between mb-2">
                <Calendar className="w-8 h-8 text-nh-copper" />
                <span className="text-3xl font-bold text-white">
                  {stats.recentLeads + stats.recentClicks}
                </span>
              </div>
              <p className="text-gray-400 text-sm">Recent Activity</p>
              <p className="text-nh-copper text-xs mt-1">Last 7 days</p>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-nh-grey rounded-lg border border-nh-copper/20 mb-6">
          <div className="flex border-b border-nh-copper/20">
            <button
              onClick={() => setActiveTab('leads')}
              className={`px-6 py-4 font-semibold transition-colors ${
                activeTab === 'leads'
                  ? 'text-nh-copper border-b-2 border-nh-copper'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Leads ({leads.length})
            </button>
            <button
              onClick={() => setActiveTab('whatsapp')}
              className={`px-6 py-4 font-semibold transition-colors ${
                activeTab === 'whatsapp'
                  ? 'text-nh-copper border-b-2 border-nh-copper'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              WhatsApp Clicks ({whatsappClicks.length})
            </button>
          </div>
        </div>

        {/* Leads Tab */}
        {activeTab === 'leads' && (
          <div className="bg-nh-grey rounded-lg border border-nh-copper/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-heading font-bold text-white">All Leads</h2>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="bg-nh-charcoal border border-gray-600 text-white rounded-md px-3 py-2 text-sm"
                >
                  <option value="all">All Types</option>
                  <option value="signup">Sign Up</option>
                  <option value="contact">Contact</option>
                  <option value="site_visit_booking">Site Visit</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-nh-copper/20">
                    <th className="text-left py-3 px-4 text-white font-semibold">Date</th>
                    <th className="text-left py-3 px-4 text-white font-semibold">Name</th>
                    <th className="text-left py-3 px-4 text-white font-semibold">Email</th>
                    <th className="text-left py-3 px-4 text-white font-semibold">Phone</th>
                    <th className="text-left py-3 px-4 text-white font-semibold">Type</th>
                    <th className="text-left py-3 px-4 text-white font-semibold">Property</th>
                    <th className="text-left py-3 px-4 text-white font-semibold">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-8 text-gray-400">
                        No leads found
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead) => (
                      <tr key={lead.id} className="border-b border-nh-copper/10 hover:bg-nh-charcoal/50">
                        <td className="py-3 px-4 text-gray-300 text-sm">{formatDate(lead.timestamp)}</td>
                        <td className="py-3 px-4 text-white">{lead.name || '-'}</td>
                        <td className="py-3 px-4 text-gray-300 text-sm">{lead.email || '-'}</td>
                        <td className="py-3 px-4 text-gray-300">{lead.phone || '-'}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-nh-copper/20 text-nh-copper rounded text-xs">
                            {lead.form_type || 'unknown'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-300 text-sm">
                          {lead.property_interest || '-'}
                        </td>
                        <td className="py-3 px-4 text-gray-300 text-sm">
                          {lead.page_name || '-'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* WhatsApp Clicks Tab */}
        {activeTab === 'whatsapp' && (
          <div className="bg-nh-grey rounded-lg border border-nh-copper/20 p-6">
            <h2 className="text-xl font-heading font-bold text-white mb-4">WhatsApp Clicks</h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-nh-copper/20">
                    <th className="text-left py-3 px-4 text-white font-semibold">Date</th>
                    <th className="text-left py-3 px-4 text-white font-semibold">Page</th>
                    <th className="text-left py-3 px-4 text-white font-semibold">Property</th>
                    <th className="text-left py-3 px-4 text-white font-semibold">User Agent</th>
                    <th className="text-left py-3 px-4 text-white font-semibold">Referrer</th>
                  </tr>
                </thead>
                <tbody>
                  {whatsappClicks.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-8 text-gray-400">
                        No WhatsApp clicks recorded
                      </td>
                    </tr>
                  ) : (
                    whatsappClicks.map((click) => (
                      <tr key={click.id} className="border-b border-nh-copper/10 hover:bg-nh-charcoal/50">
                        <td className="py-3 px-4 text-gray-300 text-sm">{formatDate(click.timestamp)}</td>
                        <td className="py-3 px-4 text-white">{click.page_name || click.source_page || '-'}</td>
                        <td className="py-3 px-4 text-gray-300">{click.property_name || '-'}</td>
                        <td className="py-3 px-4 text-gray-300 text-xs max-w-xs truncate">
                          {click.user_agent || '-'}
                        </td>
                        <td className="py-3 px-4 text-gray-300 text-xs max-w-xs truncate">
                          {click.referrer || '-'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;


