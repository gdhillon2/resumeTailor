"use client"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import "@/app/globals.css"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/authContext"

export default function NavigationLayout() {
    const pathname = usePathname();
    const { user, logOut } = useAuth()

    const handleLogOut = () => {
        logOut()
    }

    return (
        <>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink
                            href="/"
                            className={`${navigationMenuTriggerStyle()} ${pathname === "/" ? "glow-active" : ""}`}
                        >
                            Home
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    {user &&
                        <NavigationMenuItem>
                            <NavigationMenuLink
                                href="/dashboard"
                                className={`${navigationMenuTriggerStyle()} ${pathname === "/dashboard" ? "glow-active" : ""}`}
                            >
                                Dashboard
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    }
                    <NavigationMenuItem>
                        {!user ? (
                            <NavigationMenuLink
                                href="/login"
                                className={`${navigationMenuTriggerStyle()} ${pathname === "/login" ? "glow-active" : ""}`}
                            >
                                Log In
                            </NavigationMenuLink>) :
                            (
                                <Button
                                    onClick={handleLogOut}
                                    variant={"ghost"}
                                >
                                    Log Out
                                </Button>
                            )}
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </>
    )
}
