import { Container, Row } from "react-bootstrap";
import { Link, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { ImgAlbum } from "../../style/style";
import { StarFill } from "react-bootstrap-icons";
import useFavoritesStore from "../../stores/FavoritesStore";


interface Params {
  userId: string;
  albumId: string;
}

interface User {
  username: string;
  id: number;
}

interface Album {
  userId: string;
  id: number;
  title: string;
}

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
}

interface UserData {
  user: User;
  album: Album;
  photos: Photo[];
}

export const userAlbumLoader = async ({ params }: LoaderFunctionArgs) => {
  const { userId, albumId } = params as unknown as Params;
  const [userResponse, albumResponse, photosResponse] = await Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`),
    fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`),
    fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`),
  ]);

  const user = await userResponse.json();
  const album = await albumResponse.json();
  const photos = await photosResponse.json();

  return { user, album, photos };
};

const UserAlbum = () => {
  const { user, album, photos } = useLoaderData() as UserData;
  const { favorites, toggleFavorite } = useFavoritesStore();

  const isFavorite = (photoId: number) => {
    return favorites.some(fav => fav.id === photoId);
  };

  return (
    <Container>
        <h2 className="mt-5 bg-primary p-2 text-white" style={{display:"inline-flex"}}>Seçili Albüm</h2>
      <div className="d-flex justify-content-between">
        <h6>{album.id} - {album.title}</h6>
        <Link to={`/users/${user.id}/profile`}>
          <h5><span className="text-muted fs-6">username: </span>{user.username}</h5> 
        </Link>
      </div>

      <Row>
        {photos.map((photo) => (
          <div className="card mx-auto p-2" style={{ width: "17rem", marginBottom:"10px" }} key={photo.id}>
            <ImgAlbum src={`${photo.url}`} alt="photo" />
            <div className="card-body">
              <p className="card-title" style={{height:"75px", maxHeight:"75px"}}>{photo.id} - {photo.title}</p>
              <span onClick={() => toggleFavorite(photo)} style={{cursor:"pointer"}}>
                <StarFill color={isFavorite(photo.id) ? "red": "black"} />
              </span>
            </div>
          </div>
        ))}
      </Row>
    </Container>
  );
};

export default UserAlbum;
