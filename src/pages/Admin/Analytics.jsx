import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  PhoneIcon,
  CurrencyDollarIcon,
  UsersIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  DocumentChartBarIcon,
  EyeIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { Card, Button } from '../../components/common';

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockAnalytics = {
      overview: {
        totalCalls: 45230,
        successfulCalls: 38946,
        totalRevenue: 234567,
        activeUsers: 1456,
        avgCallDuration: 8.5,
        conversionRate: 18.2,
        trends: {
          callsChange: 12.5,
          revenueChange: 8.3,
          usersChange: -2.1,
          conversionChange: 4.7
        }
      },
      callMetrics: {
        daily: [
          { date: '2024-07-17', calls: 1890, successful: 1645, revenue: 8950 },
          { date: '2024-07-18', calls: 2150, successful: 1876, revenue: 10200 },
          { date: '2024-07-19', calls: 1945, successful: 1698, revenue: 9450 },
          { date: '2024-07-20', calls: 2280, successful: 1998, revenue: 11400 },
          { date: '2024-07-21', calls: 2010, successful: 1759, revenue: 9800 },
          { date: '2024-07-22', calls: 2345, successful: 2056, revenue: 12150 },
          { date: '2024-07-23', calls: 2190, successful: 1920, revenue: 10900 }
        ],
        hourly: [
          { hour: '00:00', calls: 45, success: 78 },
          { hour: '06:00', calls: 89, success: 82 },
          { hour: '09:00', calls: 245, success: 86 },
          { hour: '12:00', calls: 198, success: 84 },
          { hour: '15:00', calls: 267, success: 89 },
          { hour: '18:00', calls: 189, success: 81 },
          { hour: '21:00', calls: 98, success: 79 }
        ]
      },
      revenue: {
        monthly: [
          { month: 'Jan', revenue: 45000, target: 50000 },
          { month: 'Feb', revenue: 52000, target: 55000 },
          { month: 'Mar', revenue: 48000, target: 60000 },
          { month: 'Apr', revenue: 61000, target: 65000 },
          { month: 'May', revenue: 58000, target: 70000 },
          { month: 'Jun', revenue: 67000, target: 75000 },
          { month: 'Jul', revenue: 72000, target: 80000 }
        ],
        sources: [
          { source: 'Direct Calls', amount: 89450, percentage: 38.2 },
          { source: 'Lead Forms', amount: 67890, percentage: 29.0 },
          { source: 'Referrals', amount: 45670, percentage: 19.5 },
          { source: 'Social Media', amount: 23890, percentage: 10.2 },
          { source: 'Other', amount: 7567, percentage: 3.1 }
        ]
      },
      userEngagement: {
        retention: [
          { period: 'Day 1', rate: 89 },
          { period: 'Day 7', rate: 67 },
          { period: 'Day 14', rate: 45 },
          { period: 'Day 30', rate: 32 },
          { period: 'Day 60', rate: 28 },
          { period: 'Day 90', rate: 25 }
        ],
        activity: [
          { metric: 'Daily Active Users', current: 1456, previous: 1389, change: 4.8 },
          { metric: 'Weekly Active Users', current: 3240, previous: 3180, change: 1.9 },
          { metric: 'Monthly Active Users', current: 8950, previous: 8670, change: 3.2 },
          { metric: 'Avg Session Duration', current: 25.3, previous: 23.1, change: 9.5 }
        ]
      },
      growth: {
        userGrowth: [
          { month: 'Jan', newUsers: 234, churnedUsers: 45 },
          { month: 'Feb', newUsers: 287, churnedUsers: 52 },
          { month: 'Mar', newUsers: 345, churnedUsers: 38 },
          { month: 'Apr', newUsers: 423, churnedUsers: 67 },
          { month: 'May', newUsers: 398, churnedUsers: 54 },
          { month: 'Jun', newUsers: 456, churnedUsers: 41 },
          { month: 'Jul', newUsers: 512, churnedUsers: 38 }
        ],
        trends: {
          callVolume: { current: 45230, growth: 12.5 },
          revenue: { current: 234567, growth: 8.3 },
          userBase: { current: 8950, growth: 15.2 },
          avgDealSize: { current: 5.18, growth: -3.1 }
        }
      }
    };

    setTimeout(() => {
      setAnalytics(mockAnalytics);
      setLoading(false);
    }, 1000);
  }, [selectedPeriod]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const getChangeIcon = (change) => {
    if (change > 0) return <ArrowUpIcon className="w-4 h-4 text-green-500" />;
    if (change < 0) return <ArrowDownIcon className="w-4 h-4 text-red-500" />;
    return null;
  };

  const getChangeColor = (change) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading analytics...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics & Reporting</h1>
            <p className="text-gray-600 mt-2">
              Platform-wide analytics and insights
            </p>
          </div>
          <div className="flex space-x-2">
            {['24h', '7d', '30d', '90d'].map((period) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setSelectedPeriod(period)}
              >
                {period}
              </Button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Calls</p>
              <p className="text-3xl font-semibold text-gray-900">
                {formatNumber(analytics.overview?.totalCalls)}
              </p>
              <div className="flex items-center mt-2">
                {getChangeIcon(analytics.overview?.trends.callsChange)}
                <span className={`text-sm font-medium ml-1 ${getChangeColor(analytics.overview?.trends.callsChange)}`}>
                  {Math.abs(analytics.overview?.trends.callsChange)}%
                </span>
                <span className="text-sm text-gray-500 ml-1">vs last period</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-primary-gradient rounded-lg flex items-center justify-center">
              <PhoneIcon className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-3xl font-semibold text-gray-900">
                {formatCurrency(analytics.overview?.totalRevenue)}
              </p>
              <div className="flex items-center mt-2">
                {getChangeIcon(analytics.overview?.trends.revenueChange)}
                <span className={`text-sm font-medium ml-1 ${getChangeColor(analytics.overview?.trends.revenueChange)}`}>
                  {Math.abs(analytics.overview?.trends.revenueChange)}%
                </span>
                <span className="text-sm text-gray-500 ml-1">vs last period</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-secondary-gradient rounded-lg flex items-center justify-center">
              <CurrencyDollarIcon className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-3xl font-semibold text-gray-900">
                {formatNumber(analytics.overview?.activeUsers)}
              </p>
              <div className="flex items-center mt-2">
                {getChangeIcon(analytics.overview?.trends.usersChange)}
                <span className={`text-sm font-medium ml-1 ${getChangeColor(analytics.overview?.trends.usersChange)}`}>
                  {Math.abs(analytics.overview?.trends.usersChange)}%
                </span>
                <span className="text-sm text-gray-500 ml-1">vs last period</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-accent-gradient rounded-lg flex items-center justify-center">
              <UsersIcon className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="text-3xl font-semibold text-gray-900">
                {analytics.overview?.conversionRate}%
              </p>
              <div className="flex items-center mt-2">
                {getChangeIcon(analytics.overview?.trends.conversionChange)}
                <span className={`text-sm font-medium ml-1 ${getChangeColor(analytics.overview?.trends.conversionChange)}`}>
                  {Math.abs(analytics.overview?.trends.conversionChange)}%
                </span>
                <span className="text-sm text-gray-500 ml-1">vs last period</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <ArrowTrendingUpIcon className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
      </div>

      {/* Call Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Daily Call Volume</h3>
            <Button variant="ghost" size="sm">
              <EyeIcon className="w-4 h-4 mr-2" />
              View Details
            </Button>
          </div>
          
          <div className="space-y-4">
            {analytics.callMetrics?.daily.slice(-7).map((day) => (
              <div key={day.date} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">
                    {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">{formatNumber(day.calls)} calls</span>
                  <span className="text-sm text-green-600">{Math.round((day.successful / day.calls) * 100)}% success</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Peak Hours Analysis</h3>
            <Button variant="ghost" size="sm">
              <ArrowPathIcon className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
          
          <div className="space-y-4">
            {analytics.callMetrics?.hourly.map((hour) => (
              <div key={hour.hour} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <ClockIcon className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">{hour.hour}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">{hour.calls} calls</span>
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-500 h-2 rounded-full" 
                      style={{ width: `${hour.success}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500 w-8">{hour.success}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Revenue Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Monthly Revenue Trend</h3>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Actual</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <span className="text-sm text-gray-600">Target</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            {analytics.revenue?.monthly.map((month) => (
              <div key={month.month} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{month.month}</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">{formatCurrency(month.revenue)}</span>
                    <span className="text-sm text-gray-400">/ {formatCurrency(month.target)}</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-500 h-2 rounded-full" 
                    style={{ width: `${(month.revenue / month.target) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Revenue Sources</h3>
          
          <div className="space-y-4">
            {analytics.revenue?.sources.map((source, index) => (
              <div key={source.source} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{source.source}</span>
                  <span className="text-sm text-gray-600">{source.percentage}%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        index === 0 ? 'bg-primary-500' :
                        index === 1 ? 'bg-secondary-500' :
                        index === 2 ? 'bg-accent-500' :
                        index === 3 ? 'bg-green-500' : 'bg-gray-500'
                      }`}
                      style={{ width: `${source.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {formatCurrency(source.amount)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* User Engagement */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">User Retention</h3>
          
          <div className="space-y-4">
            {analytics.userEngagement?.retention.map((period) => (
              <div key={period.period} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{period.period}</span>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-500 h-2 rounded-full" 
                      style={{ width: `${period.rate}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-8">{period.rate}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Engagement Metrics</h3>
          
          <div className="space-y-4">
            {analytics.userEngagement?.activity.map((metric) => (
              <div key={metric.metric} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-700">{metric.metric}</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {metric.metric.includes('Duration') ? `${metric.current} min` : formatNumber(metric.current)}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {getChangeIcon(metric.change)}
                  <span className={`text-sm font-medium ${getChangeColor(metric.change)}`}>
                    {Math.abs(metric.change)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Growth Analytics */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Growth Trends</h3>
          <Button variant="ghost" size="sm">
            <DocumentChartBarIcon className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(analytics.growth?.trends || {}).map(([key, data]) => (
            <div key={key} className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-600 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </p>
              <p className="text-2xl font-semibold text-gray-900 mt-2">
                {key === 'revenue' ? formatCurrency(data.current) :
                 key === 'avgDealSize' ? `$${data.current}k` :
                 formatNumber(data.current)}
              </p>
              <div className="flex items-center justify-center mt-2">
                {getChangeIcon(data.growth)}
                <span className={`text-sm font-medium ml-1 ${getChangeColor(data.growth)}`}>
                  {Math.abs(data.growth)}% growth
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h4 className="text-md font-semibold text-gray-900 mb-4">User Growth vs Churn</h4>
          <div className="space-y-3">
            {analytics.growth?.userGrowth.map((month) => (
              <div key={month.month} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 w-12">{month.month}</span>
                <div className="flex-1 mx-4 flex items-center space-x-2">
                  <div className="flex-1 flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${(month.newUsers / 600) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-green-600 ml-2 w-8">+{month.newUsers}</span>
                  </div>
                  <div className="flex-1 flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full" 
                        style={{ width: `${(month.churnedUsers / 100) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-red-600 ml-2 w-8">-{month.churnedUsers}</span>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-900 w-16">
                  Net: +{month.newUsers - month.churnedUsers}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <Button variant="ghost">
          <ArrowPathIcon className="w-4 h-4 mr-2" />
          Refresh Data
        </Button>
        <Button>
          <DocumentChartBarIcon className="w-4 h-4 mr-2" />
          Export Full Report
        </Button>
      </div>
    </div>
  );
};

export default Analytics;