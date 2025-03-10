"use client"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import "@/app/globals.css"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/authContext"

export default function NavigationLayout() {
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
                            href="/dashboard"
                            className={navigationMenuTriggerStyle()}
                        >
                            { user ? "Dashboard" : "Demo" }
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        {!user ? (
                            <NavigationMenuLink
                                href="/login"
                                className={`${navigationMenuTriggerStyle()}`}
                            >
                                Log In
                            </NavigationMenuLink>) :
                            (
                                <Button
                                    onClick={handleLogOut}
                                    variant={"ghost"}
                                    className="rounded-md"
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
