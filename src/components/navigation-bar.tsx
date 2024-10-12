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

export default function NavigationLayout() {
    const pathname = usePathname();

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
                    <NavigationMenuItem>
                        <NavigationMenuLink
                            href="/postResume"
                            className={`${navigationMenuTriggerStyle()} ${pathname === "/postResume" ? "glow-active" : ""}`}
                        >
                            Dashboard
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink
                            href="/login"
                            className={`${navigationMenuTriggerStyle()} ${pathname === "/login" ? "glow-active" : ""}`}
                        >
                            Log In
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </>
    )
}
