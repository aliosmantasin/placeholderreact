import { useEffect, useState } from "react";
import { Container, Row, Tab, Tabs, Spinner, Table } from "react-bootstrap";
import { StarFill } from "react-bootstrap-icons";
import { Link, LoaderFunctionArgs, useLoaderData, useParams } from "react-router-dom";
import styled from "styled-components";
import useFavoritesStore from "../stores/FavoritesStore";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Params {
  userId: string;
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Album {
  userId: number;
  id: number;
  title: string;
}

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const userLoader = async ({ params }: LoaderFunctionArgs) => {
  const { userId } = params as unknown as Params;
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const user = await response.json();
  return user;
};

const UserDetailPage = () => {
  const user = useLoaderData() as User;
  const { userId } = useParams();
  const [isActive, setIsActive] = useState("home");
  const [posts, setPosts] = useState<Post[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { favoritePosts, toggleFavoritePost } = useFavoritesStore();

  const TodoItem = styled.li<{ completed: boolean }>`
    list-style: none;
    color: ${props => (props.completed ? 'blue' : 'red')};
  `;

  const isFavoritePost = (postId: number) => {
    return favoritePosts && favoritePosts.some(fav => fav.id === postId);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (isActive === "home") {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}/posts`
        );
        const data = await response.json();
        setPosts(data);
      } else if (isActive === "profile") {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}/albums`
        );
        const data = await response.json();
        setAlbums(data);
      } else if (isActive === "contact") {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}/todos`
        );
        const data = await response.json();
        setTodos(data);
      }
      setLoading(false);
    };

    fetchData();
  }, [isActive, userId]);

  return (
    <Container>
      <h2 className="mt-5 bg-primary p-2 text-white" style={{ display: "inline-flex" }}>User Detail Page</h2>
      <Row className="mt-3 p-3">
        <Tabs
          activeKey={isActive}
          onSelect={(k) => setIsActive(k!)}
          id="noanim-tab-example"
          className="mb-3"
        >
          <Tab eventKey="home" title="Post">
            {loading ? (
              <Spinner animation="border" />
            ) : (
              <>
                <h5>
                  {user.id} - {user.name}
                </h5>
                <Row>
                  {posts.map((post) => (
                    <div key={post.id} className="card p-2 mx-auto" style={{ width: "20rem", height: "250px", marginBottom: "10px" }}>
                      <Link to={`/users/${user.id}/posts/${post.id}`} style={{ textDecoration: "none" }}>
                        <h5>{post.title}</h5>
                      </Link>
                      <p>{post.body}</p>
                      <StarFill color={isFavoritePost(post.id) ? "red" : "black"} onClick={() => toggleFavoritePost(post)} />
                    </div>
                  ))}
                </Row>
              </>
            )}
          </Tab>
          <Tab eventKey="profile" title="Album">
            <div>
              {loading ? (
                <Spinner animation="border" />
              ) : (
                <>
                  <h5>
                    {user.id} - {user.name}
                  </h5>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>AlbumId</th>
                        <th>Album Title: </th>
                        <th>Album Photos</th>
                      </tr>
                    </thead>
                    <tbody>
                      {albums.map((album) => (
                        <tr>
                          <td>{album.id}</td>
                          <td>{album.title}</td>
                          <Link to={`/users/${user.id}/albums/${album.id}`} className="d-block">
                            <td>Show</td>
                          </Link>
                        </tr>
                      ))}
                    </tbody>
                  </Table>

                </>
              )}
            </div>
          </Tab>
          <Tab eventKey="contact" title="Todos">
            {loading ? (
              <Spinner animation="border" />
            ) : (
              <>
                  <h5>
                  {user.id} - {user.name}
                </h5>
                <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Todos Title: </th>
                        <th>isCompleted</th>
                      </tr>
                    </thead>
                    <tbody>
                    {todos.map((todo) => (
                        <tr>
                          <td>{todo.id}</td>
                          <td>{todo.title} </td>
  
                            <td><TodoItem completed={todo.completed}>{todo.completed ? "Completed" : "Not Completed"} </TodoItem> </td>

                        </tr>
                      ))}
                    </tbody>
                  </Table>
              </>
            )}
          </Tab>
        </Tabs>
      </Row>
    </Container>
  );
};

export default UserDetailPage;
