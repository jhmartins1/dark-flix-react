import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../services/api';
import './filme-info.css'
import { toast } from 'react-toastify'

function Filme() {
  const { id } = useParams();
  const navigation = useNavigate();

  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilme() {
      await api.get(`/movie/${id}`, {
        params: {
          api_key: '335bc4df550dd78e089ac9f71f71f692',
          language: 'pt-BR',
        }
      })
        .then((response) => {
          setFilme(response.data);
          setLoading(false);
        })
        .catch(() => {
          navigation('/', { replace: true });
          return;
        })
    }
    loadFilme();
    return () => {
      console.log('COMPONENTE FOI DESMONTADO')
    }
  }, [navigation, id])

  function salvarFilme() {
    const minhaLista = localStorage.getItem('@darkflix');
    let filmesSalvos = JSON.parse(minhaLista) || [];

    // Comparando se na sua lista de filmes é igual o filme
    const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id);
    if (hasFilme) {
      toast.warn("Esse filme ja está na sua lista");
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@darkflix", JSON.stringify(filmesSalvos));
    toast.success("Filme salvo com sucesso!");

  }

  if (loading) {
    return (
      <div>
        <h1 className='filme-info'>Carregando detalhes...</h1>
      </div>
    )
  }

  return (
    <div className='filme-info'>
      <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
      <h3>Sinopse</h3>
      <span>{filme.overview}</span>
      <strong>Avaliação: {filme.vote_average} / 10</strong>
      <div className='area-buttons'>
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a target="blank" rel="external noreferrer" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a>
        </button>
      </div>
    </div>
  )
}

export default Filme;