
const API_URL = 'http://localhost:3333';


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


interface IFormInput {
  username: string;
  email: string;
  active: boolean;
  avatar: string;
  password: string;
}


export async function getClients() {


  try {
    const response = await fetch(`${API_URL}/client`);

    if (!response.ok) {
      throw new Error('Erro ao buscar clientes');
    }

    const data: Client[] = await response.json();

    console.log('CHMANDO: ', data)
    return data;

  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    throw error;
  }

}


export async function newClient(dataClient :IFormInput) {

  console.log('Envio cadastro Cliente: ', dataClient)

  try {
    const response = await fetch(`${API_URL}/client`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataClient)
    });

    if (!response.ok) {
      throw new Error('Erro ao cadastrar cliente');
    }

    const data: Client[] = await response.json();

    console.log('Retorno cadastro: ', data)

    return data;

  } catch (error) {
    console.error('Erro ao cadastrar cliente', error);
    throw error;
  }

}



export async function findClientById(id: number) {


  try {
    const response = await fetch(`${API_URL}/client/${id}`);

    if (!response.ok) {
      throw new Error('Erro ao buscar clientes');
    }

    const data: Client = await response.json();

    console.log('BUSCA CLIENTE POR ID: ', data)
    return data;

  } catch (error) {
    console.error('Erro ao buscar cliente:', error);
    throw error;
  }

}


export async function updateClient(id: number, clientData: Partial<IFormInput>) {

  console.log('DADOS PARA ENVIO: ', clientData)

  try {
    const response = await fetch(`${API_URL}/client/${id}`, {
      method: 'UPDATE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "username": "john_doe",
        "email": "john@example.com",
        "active": true,
        "avatar": "avatar_url",
        "password": "12345"
      }),
    });

    if (!response.ok) {
      throw new Error('Erro ao atualizar cliente');
    }

    const data: Client = await response.json();

    console.log('CLIENTE ATUALIZADO: ', data);
    return data;

  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    throw error;
  }

}


export async function deleteClient(id: number) {

  try {
    const response = await fetch(`${API_URL}/client/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Erro ao deletar cliente');
    }

    return true;

  } catch (error) {
    console.error('Erro ao deletar cliente:', error);
    throw error;
  }
}

