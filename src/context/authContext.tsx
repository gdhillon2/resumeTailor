"use client"
import { createContext, useContext, useEffect, useState } from "react"
import { Session, User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

type AuthContextType = {
    session: Session | null
    user: User | null
    logOut: () => void
}

export type UserType = {
    id: string;
    [key: string]: any;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [session, setSession] = useState<Session | null>(null)
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const setData = async () => {
            const { data: { session }, error } = await supabase.auth.getSession()
            if (error) throw error
            setSession(session)
            setUser(session?.user ?? null)
            setLoading(false)
        }

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            setUser(session?.user ?? null)
            setLoading(false)
        })

        setData()

        return () => {
            subscription.unsubscribe()
        }
    }, [router])

    const value = {
        session,
        user,
        logOut: async () => {
            await supabase.auth.signOut()
            router.push("/")
        }
    }
    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
