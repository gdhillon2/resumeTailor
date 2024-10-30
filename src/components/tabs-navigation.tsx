import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import {
    FaHome,
    FaBriefcase,
    FaFolderOpen,
    FaCog,
    FaChartLine,
    FaSignOutAlt,
    FaAddressBook,
    FaFileAlt
} from "react-icons/fa"
import { Button } from "@/components/ui/button"

interface TabsNavigationProps {
    handleLogOut: () => void
}

export default function TabsNavigation({ handleLogOut }: TabsNavigationProps) {
    return (
        <TabsList className="flex flex-grow h-full justify-start items-start rounded-none border-r blue-grad">
            <Link
                className="flex w-full"
                href="/"
            >
                <TabsTrigger
                    value=""
                    className="flex justify-start items-center w-full"
                >
                    <FaHome className="mr-2" /> Home
                </TabsTrigger>
            </Link>
            <TabsTrigger
                value="contact"
                className="flex justify-start items-center w-full"
            >
                <FaAddressBook className="mr-2" /> Contact
            </TabsTrigger>
            <TabsTrigger
                value="summary"
                className="flex justify-start items-center w-full"
            >
                <FaFileAlt className="mr-2" /> Summary
            </TabsTrigger>
            <TabsTrigger
                value="work"
                className="flex justify-start items-center w-full"
            >
                <FaBriefcase className="mr-2" /> Work
            </TabsTrigger>
            <TabsTrigger
                value="projects"
                className="flex justify-start items-center w-full"
            >
                <FaFolderOpen className="mr-2" /> Projects
            </TabsTrigger>
            <TabsTrigger
                value="skills"
                className="flex justify-start items-center w-full"
            >
                <FaCog className="mr-2" /> Skills
            </TabsTrigger>
            <TabsTrigger
                value="analyze"
                className="flex justify-start items-center w-full"
            >
                <FaChartLine className="mr-2" /> Analyze
            </TabsTrigger>
            <div className="flex h-full items-end py-5 justify-end">
                <Button
                    onClick={handleLogOut}
                    variant={"ghost"}
                    className="rounded-md hover:bg-transparent text-lg px-3"
                >
                    <FaSignOutAlt className="mr-2" />Log Out
                </Button>
            </div>
        </TabsList>
    )
}