import { JSX } from 'react';
import {
  HiOutlineUserGroup,
  HiOutlineOfficeBuilding,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
} from 'react-icons/hi';

interface StatItem {
  icon: JSX.Element;
  label: string;
  value: string | number;
}

interface StatsProps {
  role: Role;
  data: {
    totalEmployees?: number;
    presentToday?: number;
    absentToday?: number;
    lateToday?: number;
    totalBranches?: number;
  };
}

const Stats = ({ role, data }: StatsProps) => {
  const commonStats: StatItem[] = [
    {
      icon: <HiOutlineUserGroup size={36} className="text-blue-600" />,
      label: 'Total Employees',
      value: data.totalEmployees || 0,
    },
    {
      icon: <HiOutlineCheckCircle size={36} className="text-green-600" />,
      label: 'Present Today',
      value: data.presentToday || 0,
    },
    {
      icon: <HiOutlineExclamationCircle size={36} className="text-red-500" />,
      label: 'Absent Today',
      value: data.absentToday || 0,
    },
    {
      icon: <HiOutlineClock size={36} className="text-yellow-500" />,
      label: 'Late Comers',
      value: data.lateToday || 0,
    },
  ];

  const adminOnlyStats: StatItem[] = [
    {
      icon: <HiOutlineOfficeBuilding size={36} className="text-purple-600" />,
      label: 'Office Branches',
      value: data.totalBranches || 0,
    },
  ];

  const displayedStats =
    role === 'admin'
      ? [...commonStats, ...adminOnlyStats]
      : commonStats;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-2">
      {displayedStats.map((stat, index) => (
        <div
          key={index}
          className="bg-white p-5 rounded-xl shadow-md flex items-center gap-4 hover:shadow-lg transition-shadow"
        >
          <div className="p-3 rounded-full bg-gray-100">{stat.icon}</div>
          <div>
            <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
            <h3 className="text-2xl font-semibold text-gray-800">
              {stat.value}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
