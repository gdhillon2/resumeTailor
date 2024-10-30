import { Label } from "@/components/ui/label"
import { InputWithLabel } from "../ui/input-with-label"
import { useState } from "react"

interface ContactTabProps { }

export default function ContactTab({ }: ContactTabProps) {
    const [contactInfo, setContactInfo] = useState<{
        fullName: string
        email: string
        phoneNumber: string
        relevantLink: string
    }>({
        fullName: "",
        email: "",
        phoneNumber: "",
        relevantLink: ""
    })

    const [location, setLocation] = useState<{
        country: string
        state: string
        city: string
    }>({
        country: "",
        state: "",
        city: ""
    })

    const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setContactInfo((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setLocation((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    return (
        <div className="flex flex-col items-start w-full">
            <div className="flex flex-col w-full">
                <div className="flex justify-end gap-5 p-5 border-b">
                    <Label className="text-xl flex w-full items-center font-bold">Contact Information</Label>
                </div>
                <div className="flex flex-col w-full h-full p-5 gap-5 lg:flex-row">
                    <div className="flex flex-col gap-5 px-5 w-[50%]">
                        <h3 className="text-lg font-semibold mt-5">Contact</h3>
                        <InputWithLabel
                            labelText="Full Name"
                            placeholderText="Enter your full name here"
                            handleChange={handleContactChange}
                            inputValue={contactInfo.fullName}
                            name="fullName"
                        />
                        <InputWithLabel
                            labelText="Email"
                            placeholderText="Enter your email"
                            handleChange={handleContactChange}
                            inputValue={contactInfo.email}
                            name="email"
                        />
                        <InputWithLabel
                            labelText="Phone Number"
                            placeholderText="Enter your phone number"
                            handleChange={handleContactChange}
                            inputValue={contactInfo.phoneNumber}
                            name="phoneNumber"
                        />
                        <InputWithLabel
                            labelText="Link"
                            placeholderText="Enter a personal website or relevant link"
                            handleChange={handleContactChange}
                            inputValue={contactInfo.relevantLink}
                            name="relevantLink"
                        />
                    </div>
                    <div className="flex flex-col gap-5 px-5 w-[50%]">
                        <h3 className="text-lg font-semibold mt-5">Location</h3>
                        <InputWithLabel
                            labelText="Country"
                            placeholderText="Enter your country"
                            handleChange={handleLocationChange}
                            inputValue={location.country}
                            name="country"
                        />
                        <InputWithLabel
                            labelText="State"
                            placeholderText="Enter your state or province"
                            handleChange={handleLocationChange}
                            inputValue={location.state}
                            name="state"
                        />
                        <InputWithLabel
                            labelText="City"
                            placeholderText="Enter your city"
                            handleChange={handleLocationChange}
                            inputValue={location.city}
                            name="city"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
