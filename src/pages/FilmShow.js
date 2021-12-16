import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import { Link } from "react-router-dom";
import Follow from "../components/Follow";
import UnFollow from "../components/UnFollow";

const FilmShow = ({ match }) => {
  const GET_FILM = gql`
            query GetFilm {
              film(id: ${match.params.id}) {
                id
                title
                year
                poster
                  individuals {
                    id
                    name
                  }
                followers {
                  userId
                }
              }
            }
            `;

  const { loading, error, data } = useQuery(GET_FILM);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  var button;

  if (token) {
    if (data.film.followers.find((follower) => follower.userId == id)) {
      button = <UnFollow followableId={data.film.id} followableType="Film" />;
    } else {
      button = <Follow followableId={data.film.id} followableType="Film" />;
    }
  } else {
    button = null;
  }

  return (
    <div key={data.film.id} class="mb-5">
      <div class="mx-auto w-50 mt-12 mb-3 flex flex-row justify-center">
        <h1 class="font-bold text-5xl">{data.film.title}</h1>

        {button}
      </div>
      <h3 class="text-center text-3xl text-gray-700">{data.film.year}</h3>
      <div class="mx-auto w-full md:w-4/5 mt-12 grid grid-cols-3 gap-4">
        <div class="col-span-2">
          <img class="" src={data.film.poster} alt={data.film.title} />
        </div>
        <div class="flex flex-col">
          <h3 class="text-center text-2xl md:text-3xl mb-8 font-bold">
            ↓ CAST ↓
          </h3>
          {data.film.individuals.map((individual) => (
            <p
              class="text-center text-xl md:text-2xl cursor-pointer shadow-lg hover:bg-blue-500 hover:text-white transform duration-200 shadow-blue-500/50 mb-5"
              key={individual.id}
            >
              <Link to={`/individual/${individual.id}`}>{individual.name}</Link>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
export default FilmShow;
