import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql,
  } from "@apollo/client";
  import { Link } from "react-router-dom";

const Recommendation = () => {

    const userId = localStorage.getItem('id');

    const GET_RECOMMENDATIONS = gql`
    query getRecommendations {
        recommended(id: ${userId}) {
            id
            title
            poster
            year
        }
    }
    `;


  const { loading, error, data } = useQuery(GET_RECOMMENDATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <h1 class="mt-12 text-center text-3xl">You need to follow at least 10 films, people or genres to get recommendations</h1>;



    return (
        <>
        <h1 class="text-center font-bold text-3xl md:text-5xl my-12">
        { data.recommended.length === 0 ? "You need to follow at least 10 films, people or genres to get recommendations" : "Recommended films based on your followings" }
      </h1>
      
      <div class="w-4/5 mx-auto px-4 mb-3">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.recommended.map((film) => (
            <Link to={`/film/${film.id}`} key={film.id}>
            <div
              class="w-full bg-white rounded-lg sahdow-lg overflow-hidden flex flex-col justify-center items-center"
            >
              <div>
                <img
                  class="object-center object-cover h-auto w-full"
                  src={film.poster}
                  alt={film.title}
                />
              </div>
              <div class="text-center py-8 sm:py-6">
                <p class="text-xl text-gray-700 font-bold mb-2">{film.title}</p>
                <p class="text-base text-gray-400 font-normal">({film.year})</p>
              </div>
            </div>
            </Link>
          ))}
        </div>
      </div>

</>
    )
}

export default Recommendation
