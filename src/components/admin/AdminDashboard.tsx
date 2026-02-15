import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Image, FileText, Users, Briefcase, 
  Receipt, MessageSquare, Settings, LogOut, BarChart3 
} from 'lucide-react';
import { authAPI, analyticsAPI } from '../../utils/api';
import { DashboardHome } from './DashboardHome';
import { PortfolioManager } from './PortfolioManager';
import { InvoiceManager } from './InvoiceManager';
import { ContentEditor } from './ContentEditor';
import { TestimonialsManager } from './TestimonialsManager';

type TabType = 'dashboard' | 'portfolio' | 'invoices' | 'content' | 'testimonials' | 'analytics';

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalInvoices: 0,
    totalTestimonials: 0,
    totalViews: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await analyticsAPI.getStats();
      setStats(data.stats);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleLogout = () => {
    authAPI.signout();
    onLogout();
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'portfolio', label: 'Portfolio', icon: Image },
    { id: 'invoices', label: 'Invoices', icon: Receipt },
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold">SD</span>
            </div>
            <div>
              <h1 className="text-lg">Admin Console</h1>
              <p className="text-xs text-gray-400">SKYDESIGNERS</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as TabType)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition ${
                activeTab === item.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 transition"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {activeTab === 'dashboard' && <DashboardHome stats={stats} onRefresh={loadStats} />}
          {activeTab === 'portfolio' && <PortfolioManager onUpdate={loadStats} />}
          {activeTab === 'invoices' && <InvoiceManager onUpdate={loadStats} />}
          {activeTab === 'content' && <ContentEditor />}
          {activeTab === 'testimonials' && <TestimonialsManager onUpdate={loadStats} />}
          {activeTab === 'analytics' && (
            <div className="bg-white rounded-xl p-8">
              <h2 className="text-2xl mb-6">Analytics</h2>
              <div className="grid grid-cols-4 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Total Views</p>
                  <p className="text-3xl">{stats.totalViews}</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Projects</p>
                  <p className="text-3xl">{stats.totalProjects}</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Invoices</p>
                  <p className="text-3xl">{stats.totalInvoices}</p>
                </div>
                <div className="bg-orange-50 p-6 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Testimonials</p>
                  <p className="text-3xl">{stats.totalTestimonials}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
