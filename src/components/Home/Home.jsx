import style from "./Home.module.css";
import { CardPerson } from "../User/CardPerson";
import { CardContato, Delete, Update } from "../Contato/CardContatos";
import { BsFillTrash3Fill } from "react-icons/bs";
import { IoPencil, IoSearchOutline, IoAdd } from "react-icons/io5";
import { useEffect, useState } from "react";
import { api, server } from "../../api/axios";



export function Home() {

  let [persons, setPersons] = useState([]);
  let [valor, setValor] = useState('');

  useEffect(() => {
    Load()
  }, []);

  async function Load() {
    const temp = await server.get("user/");

    setPersons(temp.data);
    console.log({persons});
  }

  async function Adicionar() {
    event.preventDefault();

    const resultAPI = await api.get("/");

    const user = resultAPI.data.results[0];

    const nomeCompleto = `${user.name.first} ${user.name.last}`;
    const avatar = user.picture.large;
    const cell = user.cell;

    await server.post("user/", {
      name: nomeCompleto,
      avatar: avatar,
      celular: cell,
    });

    Load();
  }

  async function Deletar() {
    event.preventDefault();

    Delete();
    Load();
  }

  function Pesquisar() {
    event.preventDefault();  

    if (valor === '') { Load(); }
    else{
      console.log(`Nome procurado: ${valor}`);
      let results = [];

    persons.map((person => {
  
      if(person.name.toLowerCase().includes(valor.toLowerCase())) {
        results.push(person);
        return
      }
    }))

    console.log({results})
    setPersons(results)
    }
  }

  async function Editar() {
    event.preventDefault();

    const resultAPI = await api.get("/");

    const user = resultAPI.data.results[0];

    Update(user);
    Load();
  }

  return (
    <div className={style.container}>

      <CardPerson
        cover="https://images.ecycle.com.br/wp-content/uploads/2021/05/20195924/o-que-e-paisagem.jpg"
        avatar="https://github.com/henriquewagner.png"
        name="Henrique Bernard Wagner"
        office='Web Developer' />

      <div className={style.contatos}>
        <div className={style.controles}>
          <form >

            <div className={style.headerContatos}>
              <h1 className={style.title}>Meus contatos</h1>
              <div className={style.buttons}>
                <button className={style.buttom} onClick={Adicionar}> <IoAdd /> </button>
                <button className={style.buttom} onClick={Editar}> <IoPencil /> </button>
                <button className={style.buttom} onClick={Deletar}> <BsFillTrash3Fill /> </button>

              </div>
            </div>

            <div className={style.pesquisa}>
              <button className={style.buttomPesquisa} onClick={Pesquisar}> <IoSearchOutline /> </button>

              <input type='text' name='pesquisa' className={style.inputPesquisa} placeholder="Busque por nome ou por dados de contato..." value={valor} onChange={() => { setValor(event.target.value) }} />
            </div>

          </form>
        </div>

        <div className={style.listaContatos}>

          <div className={style.listaCatalogo}>
            
            <div className={style.contatoCatalogo}>

              {
                persons.map((person, index) => (
                  <CardContato key={index}
                    avatar={person.avatar}
                    name={person.name}
                    celular={person.celular}

                    id={person.id}
                  />

                ))
              }

            </div>
          </div>


        </div>
      </div>
    </div>
  );
}