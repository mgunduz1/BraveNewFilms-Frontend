import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

const Landing = () => {
  const ALL_FILMS = gql`
    query allFilms {
      films {
        id
        title
        year
      }
    }
  `;

  const { loading, error, data } = useQuery(ALL_FILMS);

  const searchFilms = (searchText) => {
    var datas = data.films;
    var includes = datas
      .filter((dat) => {
        return dat.title.toLowerCase().includes(searchText);
      })
      .slice(0, 10);
    if (searchText.length === 0) {
      includes = [];
      document.getElementById("inputFilm").innerHTML = "";
    }
    outputHtml(includes);
  };

  const outputHtml = (films) => {
    if (films.length > 0) {
      const html = films
        .map(
          (film) => `
          <li style="cursor:pointer;" class="mb-2 shadow hover:bg-blue-500 hover:text-white font-bolder" id=${film.title}><a href="/film/${film.id}">${film.title}</a></li>
        `
        )
        .join("");
      document.getElementById("inputFilm").innerHTML = html;
    } else {
      document.getElementById("inputFilm").innerHTML = "";
    }
    const ul = document.getElementById("inputFilm");
    const searchbox = document.getElementById("filter-film");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <div class="min-h-screen flex justify-center items-center">
        <div class="container mx-auto bg-blue-500 rounded-lg p-14">
          <form class="py-10">
            <h1 class="text-center font-bold text-white text-4xl mb-8">
              BROWSE FILMS IN BRAVE NEW FILMS
            </h1>
            <div class="sm:flex items-center bg-white rounded-lg overflow-hidden px-2 py-1">
              <input
                class="text-base text-gray-400 flex-grow outline-none p-2 "
                type="text"
                id="filter-film"
                onChange={(e) => searchFilms(e.target.value.toLowerCase())}
                placeholder="Search film titles"
              />
            </div>
            <ul id="inputFilm" class="bg-white rounded-lg"></ul>
          </form>
        </div>
      </div>
    </>
  );
};

export default Landing;
