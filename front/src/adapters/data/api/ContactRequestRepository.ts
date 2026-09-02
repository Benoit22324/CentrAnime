import axios from "axios";
import type ContactRequest from "../../../domain/entities/ContactRequest";
import type { ContactRequestRepositoryInterface } from "../../../interfaces/repositories/ContactRequestRepositoryInterface";
import { convertContactRequest } from "../../../utils/convertContactRequest";

class ContactRequestRepository implements ContactRequestRepositoryInterface {
    async getContactRequests(): Promise<ContactRequest[] | null> {
        try {
            const response = await axios.get("http://localhost:8000/api/contactRequest", {
                withCredentials: true
            })
            // const response = await axios.get("/api/contact", {
            //     withCredentials: true
            // })

            if (!response.data.success) throw new Error(response.data.error.message || "Erreur inconnue");
            if (!response.data.data || response.data.data.length === 0) return null;

            return response.data.data.map((contactRequest: any) => convertContactRequest(contactRequest));
        } catch (error) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }

    async createContactRequest(email: string): Promise<string | void> {
        try {
            const response = await axios.post("http://localhost:8000/api/contactRequest", { email }, {
                withCredentials: true
            })
            // const response = await axios.post("/api/contact", { email }, {
            //     withCredentials: true
            // })

            if (!response.data.success) throw new Error(response.data.error.message || "Erreur inconnue");
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data.error.message) return error.response.data.error.message;

            throw new Error("Une erreur inattendue est survenue");
        }
    }

    async deleteContactRequest(requestId: string): Promise<void> {
        try {
            const response = await axios.delete(`http://localhost:8000/api/contactRequest/${requestId}`, {
                withCredentials: true
            })
            // const response = await axios.delete(`/api/contactRequest/${requestId}`, {
            //     withCredentials: true
            // })

            if (!response.data.success) throw new Error(response.data.error.message || "Erreur inconnue");
        } catch (error) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }
}

export default ContactRequestRepository;