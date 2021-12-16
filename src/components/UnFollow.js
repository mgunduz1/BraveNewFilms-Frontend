import { DESTROY_FOLLOWING_MUTATION } from "./../GraphQL/Mutations";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  useMutation,
  gql,
} from "@apollo/client";

const UnFollow = (props) => {
  const userId = localStorage.getItem("id");
  const followableType = props.followableType;
  const followableId = props.followableId;

  const [destroyFollowing, { data, loading, error }] = useMutation(
    DESTROY_FOLLOWING_MUTATION,
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
          class="ml-5 py-3 px-6 text-white rounded-lg bg-red-500 shadow-lg block md:inline-block"
          onClick={destroyFollowing}
        >
          UNFOLLOW
        </button>
      </div>
    </>
  );
};

export default UnFollow;
