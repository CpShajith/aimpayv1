import { useNavigate } from "react-router";
import { ContactForm } from "./ContactForm";

export function ContactPage() {
    const navigate = useNavigate();

    return (
        <div className="pt-24 pb-12 w-full">
            {/* 
        The ContactForm component acts like a standalone page taking up full viewport height. 
        We pass navigate('/') to return home when the user clicks the back button.
      */}
            <ContactForm onBack={() => navigate('/')} />
        </div>
    );
}
