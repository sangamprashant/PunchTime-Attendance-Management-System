import React, { JSX, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { HiOutlineChartBar, HiOutlineClipboardList, HiOutlineOfficeBuilding, HiOutlineUserGroup, HiOutlineViewGrid, HiX } from "react-icons/hi";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { PiUserCircleGearLight } from "react-icons/pi";
import { TbLogout2 } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useAuth } from "../providers/AuthenticationContext";
import { useSidebar } from "../providers/SidebarContext";
import Logo from "./sidebar/Logo";
import SideLinks from "./sidebar/SideLinks";
import Title from "./sidebar/Title";
import Topbar from "./sidebar/Topbar";

interface SideBarProps {
    children: React.ReactNode;
}

interface SubLink {
    title: string;
    link: string;
}

interface NavLink {
    title: string;
    icon: JSX.Element;
    link?: string;
    subLinks?: SubLink[];
}

interface NavSection {
    title: string;
    links: NavLink[];
}

export const adminSections: NavSection[] = [
    {
        title: "Dashboard",
        links: [
            { title: "Dashboard", link: "/dashboard", icon: <HiOutlineViewGrid size={22} /> },
        ],
    },
    {
        title: "Employee Management",
        links: [
            {
                title: "Manage Employees",
                icon: <HiOutlineUserGroup size={22} />,
                subLinks: [
                    { title: "Add Employee", link: "/employee/add" },
                    { title: "All Employees", link: "/employees/view" },
                ],
            },
        ],
    },
    {
        title: "Announcements",
        links: [
            {
                title: "Manage Announcements",
                icon: <HiOutlineSpeakerWave size={22} />,
                subLinks: [
                    { title: "Add Announcements", link: "/announcements/add" },
                    { title: "All Announcements", link: "/announcements/view" },
                ],
            },
        ],
    },
    {
        title: "Branch",
        links: [
            {
                title: "Office Branches",
                icon: <HiOutlineOfficeBuilding size={22} />,
                subLinks: [
                    { title: "Create Branch", link: "/branch/create" },
                    { title: "View Branches", link: "/branch/view" },
                ],
            },
        ],
    },
];

export const managerSections: NavSection[] = [
    {
        title: "Dashboard",
        links: [
            { title: "Dashboard", link: "/dashboard", icon: <HiOutlineViewGrid size={22} /> },
        ],
    },
    {
        title: "Attendance",
        links: [
            {
                title: "Team Attendance",
                icon: <HiOutlineClipboardList size={22} />,
                subLinks: [
                    { title: "Branch Attendance", link: "/attendance/branch" },
                    { title: "Approve Requests", link: "/attendance/approve" },
                ],
            },
        ],
    },
    {
        title: "Reports",
        links: [
            { title: "Reports", link: "/reports", icon: <HiOutlineChartBar size={22} /> },
        ],
    },
];

const Dashboard = ({ children }: SideBarProps) => {
    const { isOpen, closeSidebar } = useSidebar();
    const { logout, user } = useAuth();
    const [activeSubMenu, setActiveSubMenu] = useState<string[]>([]);

    const toggleSubMenu = (index: string) => {
        activeSubMenu.includes(index) ? setActiveSubMenu(activeSubMenu.filter(i => i !== index)) : setActiveSubMenu([...activeSubMenu, index])
    };

    let sidebarSections: NavSection[] = [];

    if (user?.role === "admin") {
        sidebarSections = adminSections;
    } else {
        sidebarSections = managerSections;
    }

    return (
        <div className="flex h-screen w-full">
            {/* Sidebar */}
            <div
                className={`absolute md:relative bg-white dark:bg-gray-900 shadow-md border-r border-gray-700 transition-all duration-300 
                ${isOpen ? "w-64 translate-x-0" : "-translate-x-64"} md:w-64 md:translate-x-0 
                h-screen z-50 flex flex-col`}
            >
                <div className="flex items-center justify-between p-4">
                    <Link to="/" className="flex items-center gap-2">
                        <Logo />
                        <span className="text-xl font-semibold hidden md:block text-white uppercase">{user?.role || "CRM"}</span>
                    </Link>
                    <button onClick={() => closeSidebar()} className="md:hidden text-gray-700 dark:text-gray-300">
                        <HiX size={24} />
                    </button>
                </div>
                {/* Sidebar Navigation Links */}
                <nav className="flex flex-col px-2 flex-1 overflow-y-auto max-h-[calc(100vh-120px)]">
                    {sidebarSections.map((section, sIndex) => (
                        <div key={sIndex} className="mb-4">
                            <Title title={section.title} />
                            {section.links.map((link, index) => (
                                <div key={index} className="mt-2">
                                    {link.link ? (
                                        <SideLinks {...link} />
                                    ) : (
                                        <div
                                            className="cursor-pointer text-gray-300 flex items-center px-3 py-2 rounded-md hover:bg-gray-800 justify-between"
                                            onClick={() => toggleSubMenu(`${section.title}+${index}`)}
                                        >
                                            <div className="flex items-center">
                                                {link.icon} <span className="ml-3">{link.title}</span>
                                            </div>
                                            <FaChevronDown
                                                fontSize={12}
                                                className={`transform duration-500 ${activeSubMenu.includes(`${section.title}+${index}`)
                                                    ? "rotate-180"
                                                    : ""
                                                    }`}
                                            />
                                        </div>
                                    )}
                                    {link.subLinks &&
                                        activeSubMenu.includes(`${section.title}+${index}`) && (
                                            <div className="pl-6 space-y-1">
                                                {link.subLinks.map((subLink, subIndex) => (
                                                    <SideLinks
                                                        key={subIndex}
                                                        {...subLink}
                                                        className="text-gray-400 border-s rounded-none border-white/10"
                                                    />
                                                ))}
                                            </div>
                                        )}
                                </div>
                            ))}
                        </div>
                    ))}
                </nav>
                {/* Push items to bottom */}
                <nav className="flex flex-col px-2 mt-auto">
                    <SideLinks key="setting" title="Settings" link="/settings" icon={<PiUserCircleGearLight />} className="text-blue-400 hover:text-blue-600" />
                    <SideLinks
                        key="logout"
                        title="Logout"
                        link="/"
                        icon={<TbLogout2 />}
                        className="text-red-500 hover:text-red-700"
                        onPress={logout}
                    />
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-white overflow-auto transition-all duration-300 w-full">
                <Topbar />
                {children}
            </div>
        </div>
    );
};

export default Dashboard;
