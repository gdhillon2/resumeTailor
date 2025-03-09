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
    FaFileAlt,
    FaGraduationCap,
    FaSearch
} from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { UserType } from "@/context/authContext"

interface TabsNavigationProps {
    handleLogOut: () => void
    user: UserType | null
}

export default function TabsNavigation({ handleLogOut, user }: TabsNavigationProps) {
    console.log("tabs nav", user)
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
                value="education"
                className="flex justify-start items-center w-full"
            >
                <FaGraduationCap className="mr-2" /> Education
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
            <TabsTrigger
                value="generate"
                className="flex justify-start items-center w-full"
            >
                <FaSearch className="mr-2" /> Preview
            </TabsTrigger>
            <div className="flex h-full items-end py-5 justify-end">
                <Button
                    onClick={handleLogOut}
                    variant={"ghost"}
                    className="rounded-md hover:bg-transparent text-lg px-3"
                >
                    <FaSignOutAlt className="mr-2" /> { user ? "Log Out" : "Log In" }
                </Button>
            </div>
        </TabsList>
    )
}
