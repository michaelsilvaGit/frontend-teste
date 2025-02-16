'use client'

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { findClientById } from '@/app/services/api/clienteService';
import { useParams } from 'next/navigation';
import { formatDate } from '@/app/utils/formatDate';
import ImageDefault from '../../assets/images/withoutAvatar.webp'

interface Client {
    id: number,
    avatar: string,
    username: string,
    email: string,
    password: string,
    active: true,
    createdAt: string,
    updatedAt: string,
    deletedAt: string
}


export default function DetailClient() {

    const params = useParams();
    const [client, setClient] = useState<Client>();   
    const [loading, setLoading] = useState(true);
    const [imgSrc, setImgSrc] = useState(ImageDefault);


    useEffect(() => {

        async function fetchClientes() {
            try {
                const data = await findClientById(Number(params.id));
                setClient(data);

            } catch (error) {
                console.error('Erro ao carregar clientes:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchClientes();

    }, []);

    function isValidUrl(url: string): boolean {
        try {
          new URL(url); // Tenta construir uma URL válida
          return true;
        } catch (error) {
          return false; // Retorna false se a URL for inválida
        }
      }

    const validSrc = isValidUrl(client?.avatar || '') ? client?.avatar || '' : ImageDefault;

    function handleImageError() : void {
        setImgSrc(ImageDefault);
    };



    return (

        <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Dados do  Cliente</h2>
            <div className="space-y-4">  
                <div>
                    <Image
                        src={validSrc || ImageDefault}
                        alt={client?.username || 'Cliente'}
                        width={100}
                        height={100}
                        className="rounded-md"
                        onError={handleImageError}
                    />
                </div>
                <div className="flex">
                    <span className="font-semibold text-gray-700">Código:</span>
                    <span className="text-gray-500 ml-2">{client?.id}</span>
                </div>
                <div className="flex">
                    <span className="font-semibold text-gray-700">Usuário:</span>
                    <span className="text-gray-500 ml-2">{client?.username}</span>
                </div>
                <div className="flex">
                    <span className="font-semibold text-gray-700">Email:</span>
                    <span className="text-gray-500 ml-2">{client?.email}</span>
                </div>
                <div className="flex">
                    <span className="font-semibold text-gray-700">Status:</span>
                    <span className="text-gray-500 ml-2">{client?.active ? 'Ativo' : 'Inativo'}</span>
                </div>
                <div className="flex">
                    <span className="font-semibold text-gray-700">Data cadastro:</span>
                    <span className="text-gray-500 ml-2">{formatDate(client?.createdAt)}</span>
                </div>
                <div className="flex">
                    <span className="font-semibold text-gray-700">Ultima atualização:</span>
                    <span className="text-gray-500 ml-2">{formatDate(client?.updatedAt)}</span>
                </div>
            </div>
        </div>

    )

}