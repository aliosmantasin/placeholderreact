import { Container, Row } from "react-bootstrap";
import { Link, useLoaderData } from "react-router-dom";
import styled from "styled-components";


interface UserProps {
  id: number;
  name: string;
}

const Li = styled.li`
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  padding: 10px;
  list-style: none;
  margin-bottom: 10px;

  &:hover {
    background-color: #cbe3f7;
    cursor: pointer;
  }
`;

export const usersLoader = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const users: UserProps[] = await response.json();

  return users;
}

const Users = () => {

  const users = useLoaderData() as UserProps[];

  return (
    <>
      <Container>
        <h2 className="mt-5 bg-primary p-2 text-white" style={{ display: "inline-flex" }}>Users Page</h2>
        <Row className="mx-auto">
          <div className="mx-auto text-center mt-5 " style={{ width: "25rem" }}>
            <div>
              {users.map(user => (
                <Li key={user.id}>
                  <Link style={{ textDecoration: "none", display: "flex" }} to={`/users/${user.id}`}>
                    {user.id} - {user.name}
                  </Link>
                </Li>
              ))}
            </div>
          </div>
        </Row>
      </Container>
    </>
  )
}

export default Users
