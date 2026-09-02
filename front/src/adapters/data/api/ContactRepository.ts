import axios from "axios";
import type { ContactRepositoryInterface } from "../../../interfaces/repositories/ContactRepositoryInterface";
import type Contact from "../../../domain/entities/Contact";
import { convertContact } from "../../../utils/convertContact";

class ContactRepository implements ContactRepositoryInterface {
    async getContacts(): Promise<Contact[] | null> {
        try {
            const response = await axios.get("http://localhost:8000/api/contact", {
                withCredentials: true
            })
            // const response = await axios.get("/api/contact", {
            //     withCredentials: true
            // })

            if (!response.data.success) throw new Error(response.data.error.message || "Erreur inconnue");
            if (!response.data.data || response.data.data.length === 0) return null;

            return response.data.data.map((contact: any) => convertContact(contact));
        } catch (error) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }

    async createContact(requestId: string): Promise<Contact | null> {
        try {
            const response = await axios.post(`http://localhost:8000/api/contact/${requestId}`, {}, {
                withCredentials: true
            })
            // const response = await axios.post(`/api/contact/${requestId}`, {}, {
            //     withCredentials: true
            // })

            if (!response.data.success) throw new Error(response.data.error.message || "Erreur inconnue");
            if (!response.data.data || response.data.data.length === 0) return null;

            return convertContact(response.data.data);
        } catch (error) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }

    async deleteContact(contactId: string): Promise<void> {
        try {
            const response = await axios.delete(`http://localhost:8000/api/contact/${contactId}`, {
                withCredentials: true
            })
            // const response = await axios.delete(`/api/contact/${requestId}`, {
            //     withCredentials: true
            // })

            if (!response.data.success) throw new Error(response.data.error.message || "Erreur inconnue");
        } catch (error) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }
}

export default ContactRepository;