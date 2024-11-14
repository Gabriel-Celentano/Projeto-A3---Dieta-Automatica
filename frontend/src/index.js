import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './styles.css'
import imagemCapa from './img_dieta_01.jpg'
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

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
  const [dietResult, setDietResult] = useState("Após preencher o formulário e clicar em 'Gerar Dieta', a dieta personalizada aparecerá aqui.");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const idade = event.target.age.value
    const genero = event.target.gender.value
    const nivelDeAtividade = event.target.activityLevel.value
    const objetivo = event.target.goal.value
    const ingredientes = event.target.ingredients.value

    try {
      const response = await axios.post('http://localhost:3001/consultar', {
        prompt: `Gere uma dieta de uma semana para uma pessoa do gênero ${genero}, que tem ${idade} anos de idade, possui um nivel de atividade ${nivelDeAtividade} e tem o objetivo de ${objetivo}, os ingredientes que essa pessoa tem disponivel para usar em sua semana são: ${ingredientes}. Me responda com um código em markdown. No final, sempre inclua o seguinte aviso: "Lembre-se: Esta é apenas uma sugestão de dieta. É importante consultar um nutricionista para um plano alimentar personalizado.", onde apenas o "Lembre-se" ficará em negrito.`
      });

      if (response.status === 200) {
        setDietResult(response.data.resposta || 'Dieta personalizada gerada com sucesso!');
      } else {
        setDietResult('Erro ao gerar a dieta. Tente novamente mais tarde.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setDietResult('Erro ao gerar a dieta. Verifique sua conexão e tente novamente.');
    }
  };

  return (
    <div className="container">
        <section className="intro">
            <img src={imagemCapa} alt="Comida saudável" className="intro-image" />
            <p>Preencha o formulário abaixo para obter uma dieta personalizada baseada em suas necessidades e preferências. Nossa IA irá criar um plano de dieta ideal para você.</p>
        </section>

        <form id="dietForm" onSubmit={handleSubmit}>
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
                    <option value="lose_weight">Perder peso</option>
                    <option value="maintain_weight">Manter o peso</option>
                    <option value="gain_weight">Ganhar massa mascular</option>
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
            <ReactMarkdown>{dietResult}</ReactMarkdown>
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