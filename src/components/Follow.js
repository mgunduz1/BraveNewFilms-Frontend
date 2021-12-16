import { CREATE_FOLLOWING_MUTATION } from "./../GraphQL/Mutations";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  useMutation,
  gql,
} from "@apollo/client";

const Follow = (props) => {
  const userId = localStorage.getItem("id");
  const followableType = props.followableType;
  const followableId = props.followableId;

  const [createFollowing, { data, loading, error }] = useMutation(
    CREATE_FOLLOWING_MUTATION,
    {
      variables: {
        userId: userId,
        followableType: followableType,
        followableId: followableId,
      },
    }
  );

  if (loading) return <p>Loading...</p>;

  if (error) {
    console.log(error);
  }

  const refresh = () => {
    window.location.reload(false);
  };

  return (
    <>
      <div onClick={refresh}>
        <button
          class="ml-5 py-3 px-6 text-white rounded-lg bg-green-400 shadow-lg block md:inline-block"
          onClick={createFollowing}
        >
          FOLLOW
        </button>
      </div>
    </>
  );
};

export default Follow;
