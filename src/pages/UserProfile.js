import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const userId = localStorage.getItem("id");
  const GET_FOLLOWEDS = gql`
        query GetFollowed {
          user(id: ${userId}) {
            id
            name
            email
            followedGenres {
                id
                name
            }
            followedFilms {
                id
                title
                year
            }
            followedIndividuals {
                id
                name
            }
          }
        }
        `;

  const { loading, error, data } = useQuery(GET_FOLLOWEDS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <h1 class="text-center font-bold text-5xl mb-10">{data.user.name}</h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        <div class="container">
          <div class="flex justify-center p-4 mb-5">
            <h1 class="text-xl font-bold">Genres you follow</h1>
          </div>
          <div class="flex justify-center">
            <div class="shadow-xl rounded-lg w-80">
              <ul>
                {data.user.followedGenres.map((genre) => (
                  <Link to={`/genre/${genre.id}`}>
                    <li
                      class="text-center border-solid border-4 text-lg text-bolder py-4 hover:bg-gray-100 cursor-pointer"
                      key={genre.id}
                    >
                      {genre.name}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div class="container">
          <div class="flex justify-center p-4 mb-5">
            <h1 class="text-xl font-bold">Films you follow</h1>
          </div>
          <div class="flex justify-center">
            <div class="shadow-xl rounded-lg w-80">
              <ul>
                {data.user.followedFilms.map((film) => (
                  <Link to={`/film/${film.id}`}>
                    <li
                      class="text-center border-solid border-4 text-lg text-bolder py-4 hover:bg-gray-100 cursor-pointer"
                      key={film.id}
                    >
                      {film.title} ({film.year})
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div class="container">
          <div class="flex justify-center p-4 mb-5">
            <h1 class="text-xl font-bold">Individuals you follow</h1>
          </div>
          <div class="flex justify-center">
            <div class="shadow-xl rounded-lg w-80">
              <ul>
                {data.user.followedIndividuals.map((individual) => (
                  <Link to={`/individual/${individual.id}`}>
                    <li
                      class="text-center border-solid border-4 text-lg text-bolder py-4 hover:bg-gray-100 cursor-pointer"
                      key={individual.id}
                    >
                      {individual.name}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
