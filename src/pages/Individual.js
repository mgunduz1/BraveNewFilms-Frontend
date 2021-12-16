import React from "react";
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

const Individual = ({ match }) => {
  const GET_INDIVIDUAL = gql`
            query GetIndividual {
              individual(id: ${match.params.id}) {
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

  const { loading, error, data } = useQuery(GET_INDIVIDUAL);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  var button;

  if (token) {
    if (data.individual.followers.find((follower) => follower.userId == id)) {
      button = (
        <UnFollow
          followableId={data.individual.id}
          followableType="Individual"
        />
      );
    } else {
      button = (
        <Follow followableId={data.individual.id} followableType="Individual" />
      );
    }
  } else {
    button = null;
  }

  return (
    <>

<div class="mx-auto w-50 mb-12 flex flex-row justify-center">
  <h1 class="font-bold text-5xl">
        {data.individual.name}
      </h1>
      {button}

      </div>
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
        <div class="text-center pb-12">
          <h1 class="font-bold text-lg md:text-xl lg:text-2xl font-heading text-gray-900">
            Films of {data.individual.name}
          </h1>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.individual.films.map((film) => (
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
  );
};
export default Individual;
