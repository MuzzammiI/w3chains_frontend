// components/DashboardPage.js
import { useState } from "react";
import PropTypes from "prop-types";
import {

  ChartPieIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  BriefcaseIcon,
  PlusCircleIcon,
  EyeIcon,
  AdjustmentsHorizontalIcon,
//   CurrencyDollarIcon, // Placeholder for balance icon
  UsersIcon,
  BoltIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
//   ShieldCheckIcon,
  SparklesIcon,
//   CreditCardIcon,
//   BanknotesIcon,
} from "@heroicons/react/24/outline";

// Helper for Calendar
const Calendar = () => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);

  const daysInMonth = (m, y) => new Date(y, m + 1, 0).getDate();
  const firstDayOfMonth = (m, y) => new Date(y, m, 1).getDay(); // 0 for Sunday, 1 for Monday etc.

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayNames = ["S", "M", "T", "W", "T", "F", "S"]; // Note: Two 'T's for Tuesday/Thursday

  const numDays = daysInMonth(month, year);
  const startDay = firstDayOfMonth(month, year);
  const blanks = Array(startDay).fill(null);
  const daysArray = Array.from({ length: numDays }, (_, i) => i + 1);

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  return (
    <div className="bg-slate-800 p-3 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <button onClick={handlePrevMonth}> </button>
        <h3 className="text-sm font-semibold text-gray-200">
          {monthNames[month]} {year}
        </h3>
        <button onClick={handleNextMonth}></button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-400">
        {dayNames.map((day, index) => (
          <div key={`${day}-${index}`}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs mt-1">
        {blanks.map((_, i) => (
          <div key={`blank-${i}`}></div>
        ))}
        {daysArray.map((day) => (
          <div
            key={day}
            className={`p-1 rounded ${
              day === today.getDate() &&
              month === currentMonth &&
              year === currentYear
                ? "bg-indigo-500 text-white font-semibold"
                : "hover:bg-slate-700"
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

const DashboardPage = ({ navigateTo }) => {
  // Mock Data
  const overviewStats = [
    { label: "Total Posts", value: "40", icon: DocumentTextIcon },
    { label: "Active Tasks", value: "24", icon: BriefcaseIcon },
    { label: "Completed This Month", value: "16", icon: CheckCircleIcon },
  ];

  const engagementData = {
    value: "$20,000",
    label: "Assets",
    comparison: "+12.5%",
    comparisonPeriod: "last month",
  };

  const quickActions = [
    {
      label: "Create New Post",
      icon: PlusCircleIcon,
      action: () => navigateTo("writePost"),
      color: "indigo",
    },
    {
      label: "View My Posts",
      icon: EyeIcon,
      action: () => navigateTo("myTasks"),
      color: "sky",
    }, // Assuming a 'myTasks' page
    {
      label: "Drafts / Publish / Public",
      icon: DocumentTextIcon,
      // icon: AdjustmentsHorizontalIcon,
      action: () => navigateTo("settings"),
      color: "teal",
    },
  ];

  const projectGoals = [
    {
      name: 'Launch "Adoddle Project Alpha"',
      progress: 70,
      target: "End of Q3",
      value: "$12,500 (Budget)",
      icon: BoltIcon,
    },
    {
      name: "Write 20 Technical Articles",
      progress: 45,
      target: "End of July",
      value: "Knowledge Share",
      icon: DocumentTextIcon,
    },
  ];

  const recentActivity = [
    {
      id: 1, // Added ID for unique key
      type: "New Post",
      title: "Adoddle Project Alpha Launched",
      date: "May 30, 2025",
      user: "Yash G.",
      status: "Published",
      icon: DocumentTextIcon,
      iconBg: "bg-green-500",
    },
    {
      id: 2, // Added ID for unique key
      type: "Task Update",
      title: "UI Design for Web3 App - In Review",
      date: "May 29, 2025",
      status: "Pending",
      icon: BriefcaseIcon,
      iconBg: "bg-yellow-500",
    },
    {
      id: 3, // Added ID for unique key
      type: "Comment",
      title: 'On "Future of Decentralized IDs"',
      date: "May 28, 2025",
      user: "Anima A.",
      status: "Approved",
      icon: ChatBubbleLeftRightIcon,
      iconBg: "bg-blue-500",
    },
    {
      id: 4, // Added ID for unique key
      type: "Joined",
      title: "Rifqy A. joined a new project",
      date: "May 27, 2025",
      user: "Rifqy A.",
      status: "Active",
      icon: UsersIcon,
      iconBg: "bg-purple-500",
    },
  ];

  return (
    <div className="space-y-6 mt-5 sm:space-y-8">
      {/* Top Row: Overview, Engagement, Quick Actions, Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Overview Section (Stats + Calendar) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-800 p-4 sm:p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-100 mb-4">
              Overview
            </h2>
            <div className="space-y-4">
              {overviewStats.map((stat) => (
                <div
                  key={stat.label} // Assuming stat.label is unique
                  className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg"
                >
                  <div className="flex items-center">
                    <stat.icon className="h-6 w-6 text-indigo-400 mr-3" />
                    <span className="text-sm text-gray-300">{stat.label}</span>
                  </div>
                  <span className="text-lg font-bold text-gray-100">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <Calendar />{" "}
          {/* No need for key here, as Calendar handles its own internal keys */}
        </div>

        {/* Engagement & Quick Actions Column */}
        <div className="lg:col-span-4 space-y-6 sm:space-y-8">
          {/* Platform Engagement */}
          <div className="bg-slate-800 p-4 sm:p-6 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-1">
              <h2 className="text-xl font-semibold text-gray-100">
                Total Assets
              </h2>
              <select className="bg-slate-700 text-xs text-gray-300 rounded px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500">
                <option>USD</option> <option>Points</option>
              </select>
            </div>
            <p className="text-3xl sm:text-4xl font-bold text-gray-50 mb-1">
              {engagementData.value}
            </p>
            <p className="text-sm text-green-400 mb-3">
              {engagementData.comparison}{" "}
              <span className="text-gray-400">
                compared to {engagementData.comparisonPeriod}
              </span>
            </p>
            <div className="h-20 bg-slate-700 rounded-lg flex items-center justify-center">
              {/* Placeholder for a small chart or visual */}
              <ChartPieIcon className="h-10 w-10 text-indigo-500 opacity-50" />
              <p className="text-xs text-gray-500 ml-2">
                Engagement trend updating...
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-slate-800 p-4 sm:p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-100 mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              {quickActions.map((action) => (
                <button
                  key={action.label} // Assuming action.label is unique
                  onClick={action.action}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ease-in-out
                                bg-slate-700 hover:bg-${action.color}-600 text-gray-200 hover:text-white group`}
                >
                  <div className="flex items-center">
                    <action.icon
                      className={`h-5 w-5 mr-3 text-${action.color}-400 group-hover:text-white`}
                    />
                    <span className="text-sm font-medium">{action.label}</span>
                  </div>
                  <ChevronRightIcon className="h-5 w-5 text-gray-400 group-hover:text-white transition-transform group-hover:translate-x-1" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Project Goals */}
        <div className="lg:col-span-4 bg-slate-800 p-4 sm:p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-100">
              Project Goals
            </h2>
            <button className="text-xs text-indigo-400 hover:text-indigo-300">
              Manage
            </button>
          </div>
          <div className="space-y-5">
            {projectGoals.map((goal) => (
              <div key={goal.name}>
                {" "}
                {/* Assuming goal.name is unique */}
                <div className="flex items-center mb-1.5">
                  <goal.icon className="h-6 w-6 text-indigo-400 mr-2 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-200">
                      {goal.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {goal.target} -{" "}
                      <span className="text-green-400">{goal.value}</span>
                    </p>
                  </div>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2.5">
                  <div
                    className="bg-green-500 h-2.5 rounded-full"
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row: Recent Activity, Premium Upsell */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-8 bg-slate-800 p-4 sm:p-6 rounded-xl shadow-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <h2 className="text-xl font-semibold text-gray-100">
              Recent Activity
            </h2>
            <button className="flex items-center text-xs text-gray-400 hover:text-gray-200 bg-slate-700 px-3 py-1.5 rounded-md">
              <AdjustmentsHorizontalIcon className="h-4 w-4 mr-1.5" /> Filter
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-700">
              <thead className="bg-slate-800">
                <tr>
                  <th
                    scope="col"
                    className="py-3 px-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    Details
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden md:table-cell"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    Status/User
                  </th>
                </tr>
              </thead>
              <tbody className="bg-slate-800 divide-y divide-slate-700">
                {recentActivity.map((activity) => (
                  <tr
                    key={activity.id}
                    className="hover:bg-slate-700/50 transition-colors"
                  >
                    <td className="px-3 py-3.5 whitespace-nowrap text-sm">
                      <div className="flex items-center">
                        <span
                          className={`p-1.5 rounded-full mr-2.5 ${activity.iconBg}`}
                        >
                          <activity.icon className="h-4 w-4 text-white" />
                        </span>
                        <span className="text-gray-300">{activity.type}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3.5 whitespace-nowrap text-sm text-gray-300">
                      {activity.title}
                    </td>
                    <td className="px-3 py-3.5 whitespace-nowrap text-sm text-gray-400 hidden md:table-cell">
                      {activity.date}
                    </td>
                    <td className="px-3 py-3.5 whitespace-nowrap text-sm">
                      {activity.status === "Published" && (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {activity.status}
                        </span>
                      )}
                      {activity.status === "Pending" && (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          {activity.status}
                        </span>
                      )}
                      {activity.status === "Approved" && (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {activity.status}
                        </span>
                      )}
                      {activity.status === "Active" && (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                          {activity.status}
                        </span>
                      )}
                      {activity.user && (
                        <span className="ml-1 text-gray-400">
                          ({activity.user})
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Premium Upsell */}
        <div className="lg:col-span-4 bg-slate-800 p-4 sm:p-6 rounded-xl shadow-lg flex flex-col items-center text-center">
          <SparklesIcon className="h-12 w-12 text-yellow-400 mb-3" />
          <h2 className="text-xl font-semibold text-gray-100 mb-2">
            More with Premium
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            Our premium subscription elevates your experience and unlocks
            exclusive benefits and features for the Web3 Hub.
          </p>
          <p className="text-3xl font-bold text-gray-50 mb-0.5">
            $9<span className="text-xl">.99</span>
            <span className="text-sm font-normal text-gray-400"> / Month</span>
          </p>
          <button
            onClick={() => alert("Learn More Clicked!")}
            className="mt-5 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors"
          >
            Learn More
          </button>
          <button
            onClick={() => alert("View Details Clicked!")}
            className="mt-2 text-xs text-gray-400 hover:text-indigo-400"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

DashboardPage.propTypes = {
  navigateTo: PropTypes.func.isRequired,
};

export default DashboardPage;
