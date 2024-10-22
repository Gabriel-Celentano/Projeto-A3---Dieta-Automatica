import React from 'react'
import ReactDOM from 'react-dom'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const Cabecalho = () => {
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid d-flex justify-content-center align-items-center">
        <a className="navbar-brand" href="#" style={{ fontSize: '2rem' }}>
          <i class="fa-solid fa-bowl-food"></i>
          &nbsp;Dieta Automática
        </a>
      </div>
    </nav>
  )
}

const FormPrincipal = () => {
  const subirAlert = (event) => {
    event.preventDefault()
    alert("Enviado!")
  }

  return (
    <div className='container' style={{ marginTop: 30 }}>
      <h3 className='text-center'>Formulário para Geração de Dieta</h3>
      <form onSubmit={subirAlert}>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">Liste os alimentos que você comprou para a semana (se possível, com quantidades, peso)</label>
          <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea2" className="form-label">Liste alimentos que você não gosta, é alérgico, possui restrição, etc.</label>
          <textarea className="form-control" id="exampleFormControlTextarea2" rows="3"></textarea>
        </div>
        <label className='form-label'>Selecione o seu objetivo</label>
        <select class="form-select" aria-label="Default select example">
          <option selected>Escolher</option>
          <option value="1">Emagrecimento/Défcit Calórico</option>
          <option value="2">Ganho de Massa Muscular</option>
          <option value="3">Energia (para competições de corrida, maratonas, etc.)</option>
          <option value="4">Aumento da Imunidade</option>
        </select> 
        <div className="col-12 mt-3">
          <button class="btn btn-primary" type="submit">Gerar Dieta</button>
        </div>
      </form>
    </div>
  )
}

const App = () => {
  return (
    <div>
      <Cabecalho />
      <FormPrincipal />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
)