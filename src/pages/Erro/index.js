import { Link } from 'react-router-dom'
import './erro.css';

function Erro() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h1>Pagina não encontrada</h1>
      <Link to="/">Veja todos filmes!</Link>
    </div>
  )
}

export default Erro;