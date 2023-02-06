import {useState} from 'react'
import {FiSearch} from 'react-icons/fi'
import './style.css'
import api from './api'

function App() {

  const [input, setInput] = useState('')
  const [cep, setCEP] = useState({})

  async function resultado() {
    if (input == ''){
      alert('preencha algum cep')
      return
    }

    try {
      const response = await api.get(`${input}/json`)
      setCEP(response.data)
      setInput('')
    } catch {
      alert('Não foi possível localizar o CEP informado')
      setInput('')
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscar CEP</h1>

      <div className="containerI">
        <input type='text' placeholder="Digite o CEP" value={input} onChange= {(e) => setInput(e.target.value)}/>
        <button className="buttonS" onClick={resultado}><FiSearch size={25}/></button>
      </div>


    {Object.keys(cep).length > 0 && (
    <main className='main'>
      <h2>CEP: {cep.cep}</h2>
  
      <span>{cep.logradouro}</span>
      <span>Bairro: {cep.bairro}</span>
      <span>Cidade: {cep.localidade}</span>
      <span> Estado: {cep.uf}</span>
      <span>DDD: {cep.ddd}</span>
    
    </main>
    )}

    </div>
  );
}

export default App;
