

interface clientProps {
 
    id: 0,
    avatar: string,
    username: string,
    email: string,
    active: true,
    createdAt: string,
    updatedAt: string,
    deletedAt: string

}



export default async function Home() {


  const response = await fetch('http://localhost:3333/client');
  const data: any = await response.json();


  console.log('RECEBENDO DADOS: ', data)



  return (
    
    <div>
      <h1>Hello World</h1>
    </div>
  );
}
