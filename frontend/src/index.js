import React from 'react'
import ReactDOM from 'react-dom'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './styles.css'
import imagemCapa from './img_dieta_01.jpg'

const Cabecalho = () => {
  return (
    <header>
        <div className="header-content">
            <h1>Gerador de Dieta com IA</h1>
            <p>Crie sua dieta personalizada com a ajuda da inteligência artificial.</p>
        </div>
    </header>
  )
}

const FormPrincipal = () => {
  const subirAlert = (event) => {
    event.preventDefault()
    alert("Enviado!")
  }

  return (
    <div className="container">
        <section className="intro">
            <img src={imagemCapa} alt="Comida saudável" className="intro-image" />
            <p>Preencha o formulário abaixo para obter uma dieta personalizada baseada em suas necessidades e preferências. Nossa IA irá criar um plano de dieta ideal para você.</p>
        </section>

        <form id="dietForm" onSubmit={subirAlert}>
            <div className="form-group">
                <label htmlFor="age">Idade:</label>
                <input type="number" id="age" name="age" required />
            </div>
            <div className="form-group">
                <label htmlFor="gender">Gênero:</label>
                <select id="gender" name="gender" required>
                    <option value="male">Masculino</option>
                    <option value="female">Feminino</option>
                    <option value="other">Outro</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="activityLevel">Nível de Atividade:</label>
                <select id="activityLevel" name="activityLevel" required>
                    <option value="sedentary">Sedentário</option>
                    <option value="light">Leve</option>
                    <option value="moderate">Moderado</option>
                    <option value="active">Ativo</option>
                    <option value="very_active">Muito Ativo</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="goal">Objetivo:</label>
                <select id="goal" name="goal" required>
                    <option value="lose_weight">Perder Peso</option>
                    <option value="maintain_weight">Manter Peso</option>
                    <option value="gain_weight">Ganhar Peso</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="ingredients">Ingredientes:</label>
                <textarea id="ingredients" name="ingredients" rows="4" placeholder="Liste os ingredientes desejados para a dieta..." required></textarea>
            </div>
            <div className="form-group">
                <button type="submit">Gerar Dieta</button>
            </div>
        </form>

        <div className="results" id="results">
            <h2>Resultado da Dieta</h2>
            <p>Após preencher o formulário e clicar em "Gerar Dieta", a dieta personalizada aparecerá aqui.</p>
        </div>

        <div className="diet-history" id="dietHistory">
            <h2>Histórico de Dietas</h2>
            <ul id="historyList">
            </ul>
        </div>
    </div>
  )
}

const Rodape = () => {
  return (
    <footer>
      <div className="footer-content">
          <p>&copy; 2024 Montador de Dieta com IA. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}

const App = () => {
  return (
    <div>
      <Cabecalho />
      <FormPrincipal />
      <Rodape />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
)