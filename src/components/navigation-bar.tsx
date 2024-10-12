"use client"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import "@/app/globals.css"
import { useEffect, useState } from "react"
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
                            className={`${navigationMenuTriggerStyle()} ${pathname === "/" ? "!font-bold" : ""}`}
                        >
                            Home
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink
                            href="/postResume"
                            className={`${navigationMenuTriggerStyle()} ${pathname === "/postResume" ? "!font-bold" : ""}`}
                        >
                            Dashboard
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link
                            href="/login"
                            className={`${pathname === "/login" ? "!font-bold" : ""}`}
                        >
                            <Button>Log In</Button>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </>
    )
}
