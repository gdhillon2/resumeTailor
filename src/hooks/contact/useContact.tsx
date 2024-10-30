import { UserType } from "@/context/authContext"
import { useCallback, useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export type ContactType = {
    fullName: string
    email: string
    phoneNumber: string
    relevantLink: string
    country: string
    state: string
    city: string
}


export const useContact = (user: UserType | null) => {
    const [hasChanges, setHasChanges] = useState<boolean>(false)

    const [contact, setContact] = useState<ContactType>({
        fullName: "",
        email: "",
        phoneNumber: "",
        relevantLink: "",
        country: "",
        state: "",
        city: ""
    })

    const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setContact((prev) => ({
            ...prev,
            [name]: value,
        }))
        setHasChanges(true)
    }

    const fetchContact = useCallback(async () => {
        if (!user) {
            console.error("user is not authenticated")
            return
        }

        const { data: contactData, error: selectError } = await supabase
            .from("user_profile")
            .select("contact")
            .eq("user_id", user.id)
            .maybeSingle()

        if (selectError) {
            console.error("error getting contact info")
        } else {
            if (contactData) {
                const { contact: data } = contactData
                setContact({
                    fullName: data.fullName,
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                    relevantLink: data.relevantLink,
                    country: data.country,
                    state: data.state,
                    city: data.city
                })
            }
        }
    }, [user])

    useEffect(() => {
        fetchContact()
        setHasChanges(false)
    }, [fetchContact])


    return {
        contact,
        fetchContact,
        handleContactChange,
        hasChanges,
        setHasChanges
    }
}
