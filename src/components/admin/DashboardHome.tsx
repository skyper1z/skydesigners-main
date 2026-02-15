import { TrendingUp, Image, Receipt, MessageSquare, Eye } from 'lucide-react';

interface DashboardHomeProps {
  stats: {
    totalProjects: number;
    totalInvoices: number;
    totalTestimonials: number;
    totalViews: number;
  };
  onRefresh: () => void;
}

export function DashboardHome({ stats, onRefresh }: DashboardHomeProps) {
  const statCards = [
    {
      label: 'Total Portfolio Projects',
      value: stats.totalProjects,
      icon: Image,
      color: 'blue',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      label: 'Invoices Generated',
      value: stats.totalInvoices,
      icon: Receipt,
      color: 'green',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      label: 'Client Testimonials',
      value: stats.totalTestimonials,
      icon: MessageSquare,
      color: 'purple',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
    {
      label: 'Page Views',
      value: stats.totalViews,
      icon: Eye,
      color: 'orange',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome to your SKYDESIGNERS admin console</p>
        </div>
        <button
          onClick={onRefresh}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Refresh Stats
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div key={stat.label} className={`${stat.bgColor} rounded-xl p-6`}>
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`w-8 h-8 ${stat.iconColor}`} />
              <TrendingUp className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-3xl mb-2">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-8">
        <h2 className="text-2xl mb-6">Quick Actions</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <button className="p-6 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition text-left">
            <Image className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="mb-2">Add Portfolio Project</h3>
            <p className="text-sm text-gray-600">Upload your latest design work</p>
          </button>
          <button className="p-6 border-2 border-gray-200 rounded-lg hover:border-green-600 hover:bg-green-50 transition text-left">
            <Receipt className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="mb-2">Create Invoice</h3>
            <p className="text-sm text-gray-600">Generate a new client invoice</p>
          </button>
          <button className="p-6 border-2 border-gray-200 rounded-lg hover:border-purple-600 hover:bg-purple-50 transition text-left">
            <MessageSquare className="w-8 h-8 text-purple-600 mb-3" />
            <h3 className="mb-2">Add Testimonial</h3>
            <p className="text-sm text-gray-600">Share client feedback</p>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-8">
        <h2 className="text-2xl mb-6">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Image className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Portfolio updated</p>
              <p className="text-sm text-gray-600">New project added to gallery</p>
            </div>
            <span className="text-sm text-gray-500">Today</span>
          </div>
        </div>
      </div>
    </div>
  );
}
