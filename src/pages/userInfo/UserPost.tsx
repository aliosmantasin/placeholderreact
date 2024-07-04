import { Container, Row } from "react-bootstrap";
import { Link, useLoaderData, LoaderFunctionArgs } from "react-router-dom";


interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Post {
  id: number;
  postId: string;
  title: string;
  body: string;
}

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface UserData {
  user: User;
  posts: Post[];
  comments: Comment[];
}

interface Params {
  userId: string;
}


export const userPostLoader = async ({ params }: LoaderFunctionArgs) => {
  const { userId } = params as unknown as Params;
  const [userResponse, postsResponse, commentsResponse] = await Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`),
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`),
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/comments`),
  ]);

  const user = await userResponse.json();
  const posts = await postsResponse.json();
  const comments = await commentsResponse.json();


  return { user, posts, comments };
};

const UserPost = () => {
  const { user, posts, comments } = useLoaderData() as UserData;

  return (
    <Container>
      <Row className="mt-5">
    <div>

          <div className="d-flex shadow-sm justify-content-around p-5">
            <div className="d-flex align-items-center">
              <Link to={`/users/${user.id}/profile`} style={{textDecoration:"none"}}>
                <h3><span className="text-muted fs-6" ></span>{user.name}</h3>
              </Link>
            </div>
         
        <div className="text-center">
        <img src="https://placehold.co/600x400/png" style={{ width: "150px", height: "150px", borderRadius:"100%" }} alt="profile photo" />  
       
        </div>
               
          </div>
     

    
      <h5 className="mt-2" style={{color:"#756d6d", fontSize:"0.7rem"}}>{user.name}'s Posts - Comments</h5>

  
            {posts.map((post) => (
              <div key={post.id}>
                <div style={{ border: "1px solid #c8c8c8", padding: "20px", backgroundColor: "#78b8f8", margin: "5px 0 5px 0" }}>
                  <h5 style={{ color: "#2168cc" }}>{post.id} - {post.title}</h5>
                  <p>{post.body}</p>
                </div>
                {comments
                  .filter((comment) => comment.postId === post.id)
                  .map((comment) => (
                    <div key={comment.id} style={{ border: "1px solid #e7e7e7", padding: "20px", backgroundColor: "#c4dbf1" }}>
                      <p>{comment.id} - {comment.name}</p>
                      <p>{comment.body}</p>
                    </div>
                  ))}
              </div>
            ))}
         

    </div>
    </Row>
    </Container>
  );
};

export default UserPost;
