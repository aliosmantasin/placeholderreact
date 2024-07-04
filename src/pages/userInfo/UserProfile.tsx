import { Container, Row, Table } from "react-bootstrap";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: number;
      lng: number;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  }
}



interface Params {
  userId: string;
}

export const userProfileLoader = async ({ params }: LoaderFunctionArgs) => {
  const { userId } = params as unknown as Params;
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);

  const userProfile = await response.json();
  return userProfile;
};

export const UserProfile = () => {

  const user = useLoaderData() as User;

  return (

    <Container>
      <Row className="mt-3">
        <div className="d-flex shadow-sm justify-content-around p-5">
          <div className="d-flex align-items-center">
            <h3><span className="text-muted fs-6" ></span>{user.name}</h3>
          </div>
          <div className="text-center">
            <img src="https://placehold.co/600x400/png" style={{ width: "150px", height: "150px", borderRadius: "100%" }} alt="profile photo" />
          </div>
        </div>
      </Row>

      <Row className="mt-3">
        <h5>Main Info</h5>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>username</th>
              <th>email</th>
              <th>phone</th>
              <th>website</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.website}</td>
            </tr>
          </tbody>
        </Table>
      </Row>

      <Row className="mt-3">
        <h5>Adress</h5>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>street</th>
              <th>suite</th>
              <th>city</th>
              <th>zipcode</th>
              <th>geo: lat</th>
              <th>geo: lng</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{user.address.street}</td>
              <td>{user.address.suite}</td>
              <td>{user.address.city}</td>
              <td>{user.address.zipcode}</td>
              <td>{user.address.geo.lat}</td>
              <td>{user.address.geo.lng}</td>
            </tr>
          </tbody>
        </Table>
      </Row>

      <Row className="mt-3">
        <h5>Company</h5>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>name</th>
              <th>catchPhrase</th>
              <th>bs</th>

            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{user.company.name}</td>
              <td>{user.company.catchPhrase}</td>
              <td>{user.company.bs}</td>

            </tr>
          </tbody>
        </Table>
      </Row>


    </Container>

  )
}
