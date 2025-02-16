'use client'

import { useState, useEffect } from "react";
import EditClientForm from "./components/clientForm";
import { useParams } from 'next/navigation';
import { findClientById, updateClient } from "@/app/services/api/clienteService";


interface Client {
  id: number,
  avatar: string,
  username: string,
  email: string,
  password: string,
  active: boolean,
  createdAt: string,
  updatedAt: string,
  deletedAt: string
}


interface IFormInput {
  username: string;
  email: string;
  active: string;
  avatar: string;
  password: string;
}



export default function EditClient() {

  const params = useParams();
  const [client, setClient] = useState<Client>();   
  const [loading, setLoading] = useState(true);



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


  function onSubmit(data: IFormInput) : void{

    const updatedData = {
      ...data,
      active: data.active === 'true',
    };

    updateClient(Number(params.id), updatedData);

  }


  return (

    <div className="w-full h-scree flex items-center justify-center">
      <div className="mt-16 w-full max-w-4xl">
        <h2 className="text-center text-2xl font-semibold text-gray-800">Editar Cliente</h2>
        <div className="w-full">
          <EditClientForm client={client} onSubmit={onSubmit}/>
        </div>
      </div>
    </div>

  );
}
