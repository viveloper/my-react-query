import { useState } from 'react';
import UserDetail from '../components/UserDetail';
import Posts from '../components/Posts';
import { useQuery } from '../hooks';
import { getUser } from '../apis/user';
import { getPosts } from '../apis/post';

const Home = () => {
  const [inputValue, setInputValue] = useState('');
  const [userId, setUserId] = useState('');

  const {
    data: user,
    isError: isUserError,
    isFetching: isUserFetching,
    isSuccess: isUserSuccess,
  } = useQuery(getUser, { id: userId }, { skip: !userId });

  const {
    data: posts,
    isError: isPostsError,
    isFetching: isPostsFetching,
    isSuccess: isPostsSuccess,
  } = useQuery(
    getPosts,
    { userId },
    {
      skip: !userId,
    }
  );

  if (isUserError || isPostsError) return <div>Error Occured!</div>;
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="user id"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={() => setUserId(inputValue)}>Search</button>
      </div>
      <div>
        {(isUserFetching || isPostsFetching) && <div>Loading...</div>}
        {isUserSuccess && isPostsSuccess && (
          <>
            <UserDetail user={user} />
            <Posts posts={posts} />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
