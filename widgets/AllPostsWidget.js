import { useEffect } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "store/reducers";
import NewPostWidget from "widgets/NewPostWidget";
import PostWidget from "widgets/PostWidget";

const AllPostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const theme = useTheme();

  const getPosts = async () => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 30 }}
      style={{ backgroundColor: theme.colors.background }}
    >
      {/* <SafeAreaView> */}
      <NewPostWidget />
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
      {/* </SafeAreaView> */}
    </ScrollView>
  );
};

export default AllPostsWidget;
