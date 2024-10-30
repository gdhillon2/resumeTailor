import { Label } from "@/components/ui/label"
import { InputWithLabel } from "../ui/input-with-label"
import { ContactType } from "@/hooks/contact/useContact"
import TabActions from "../tab-actions"

interface ContactTabProps {
    contact: ContactType
    fetchContact: () => Promise<void>
    handleContactChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    contactChanges: boolean
    submitContact: () => Promise<void>
    savingContact: boolean
}

export default function ContactTab({
    contact,
    fetchContact,
    handleContactChange,
    contactChanges,
    submitContact,
    savingContact
}: ContactTabProps) {
    return (
        <div className="flex flex-col items-start w-full">
            <div className="flex flex-col w-full">
                <div className="flex justify-end gap-5 p-5 border-b">
                    <Label className="text-xl flex w-full items-center font-bold">Add Your Contact Information</Label>
                    <TabActions
                        onAdd={null}
                        onRevert={fetchContact}
                        onSave={submitContact}
                        saving={savingContact}
                        hasChanges={contactChanges}
                    />
                </div>
                <div className="flex flex-col w-full h-full p-5 gap-5 lg:flex-row">
                    <div className="flex flex-col gap-5 px-5 w-[50%]">
                        <InputWithLabel
                            labelText="Full Name"
                            placeholderText="Enter your full name here"
                            handleChange={handleContactChange}
                            inputValue={contact.fullName}
                            name="fullName"
                        />
                        <InputWithLabel
                            labelText="Email"
                            placeholderText="Enter your email"
                            handleChange={handleContactChange}
                            inputValue={contact.email}
                            name="email"
                        />
                        <InputWithLabel
                            labelText="Phone Number"
                            placeholderText="Enter your phone number"
                            handleChange={handleContactChange}
                            inputValue={contact.phoneNumber}
                            name="phoneNumber"
                        />
                        <InputWithLabel
                            labelText="Link"
                            placeholderText="Enter a link to a personal or relevant website"
                            handleChange={handleContactChange}
                            inputValue={contact.relevantLink}
                            name="relevantLink"
                        />
                    </div>
                    <div className="flex flex-col gap-5 px-5 w-[50%]">
                        <InputWithLabel
                            labelText="Country"
                            placeholderText="Enter your country"
                            handleChange={handleContactChange}
                            inputValue={contact.country}
                            name="country"
                        />
                        <InputWithLabel
                            labelText="State"
                            placeholderText="Enter your state or province"
                            handleChange={handleContactChange}
                            inputValue={contact.state}
                            name="state"
                        />
                        <InputWithLabel
                            labelText="City"
                            placeholderText="Enter your city"
                            handleChange={handleContactChange}
                            inputValue={contact.city}
                            name="city"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
