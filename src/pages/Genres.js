import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import { Link } from "react-router-dom";

const Genres = () => {
  const ALL_GENRES = gql`
    query AllGenres {
      genres {
        id
        name
        landingFilms {
          id
          title
          poster
          year
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(ALL_GENRES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      {data.genres.map((genre) => (
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 mt-12 mb-12">
          <article>
            <Link to={`/genre/${genre.id}`}>
              <h2 class="text-2xl font-extrabold text-gray-900">
                {genre.name}
              </h2>
            </Link>
            <section class="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
              {genre.landingFilms.map((film) => (
                <Link to={`/film/${film.id}`} key={film.id}>
                  <article class="bg-white group relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform duration-200">
                    <div class="relative w-full h-80 md:h-64 lg:h-44">
                      <img
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
          </article>
        </section>
      ))}
    </div>
  );
};

export default Genres;
