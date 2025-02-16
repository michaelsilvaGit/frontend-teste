'use client'

import EditClientForm from "../edit/[id]/components/clientForm";
import { useRouter } from 'next/navigation';
import { newClient } from "@/app/services/api/clienteService";


interface IFormInput {
    username: string;
    email: string;
    active: string;
    avatar: string;
    password: string;
}



export default function NewClient() {

    const router = useRouter();

    function onSubmit(data: IFormInput) : void {

        const updatedData = {
            ...data,
            active: data.active === 'true',
        };

        newClient(updatedData);
        router.push(`/clients`);

    }

    return (

        <div className="w-full h-scree flex items-center justify-center">
            <div className="mt-16 w-full max-w-4xl">
                <h2 className="text-center text-2xl font-semibold text-gray-800">Novo Cliente</h2>
                <div className="w-full">
                    <EditClientForm onSubmit={onSubmit} />
                </div>
            </div>
        </div>
    )



}