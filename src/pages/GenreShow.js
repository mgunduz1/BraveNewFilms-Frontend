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

const GenreShow = ({ match }) => {
  const GET_GENRE = gql`
    query GetGenre {
      genre(id: ${match.params.id}) {
        id
        name
        films {
            id
            title
            year
            poster
        }
        followers {
          userId
        }
      }
    }
    `;

  const { loading, error, data } = useQuery(GET_GENRE);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  var button;

  if (token) {
    if (data.genre.followers.find((follower) => follower.userId == id)) {
      button = <UnFollow followableId={data.genre.id} followableType="Genre" />;
    } else {
      button = <Follow followableId={data.genre.id} followableType="Genre" />;
    }
  } else {
    button = null;
  }

  return (
    <div key={data.genre.id}>
      <div class="mx-auto w-50 mb-12 flex flex-row justify-center">
        <h1 class="font-bold text-5xl">{data.genre.name}</h1>

        {button}
      </div>
      <section class="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
        {data.genre.films.map((film) => (
          <Link to={`/film/${film.id}`} key={film.id}>
            <article class="bg-white group relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform duration-200">
              <div class="relative w-full h-80 md:h-64 lg:h-44">
                <img
                  loading="lazy"
                  src={film.poster}
                  alt={film.title}
                  class="w-full h-full object-scale-down"
                />
              </div>
              <div class="px-3 py-4">
                <h3 class="text-sm text-center font-bold text-gray-700 pb-2">
                  {film.title} ({film.year})
                </h3>
              </div>
            </article>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default GenreShow;
