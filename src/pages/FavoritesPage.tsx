import { Container, Row } from "react-bootstrap";
import { StarFill } from "react-bootstrap-icons";
import { ImgAlbum } from "../style/style";
import useFavoritesStore from "../stores/FavoritesStore";
import { Link } from "react-router-dom";

const Favorite = () => {
  const { favorites, favoritePosts, toggleFavorite, toggleFavoritePost } = useFavoritesStore();

  return (
    <Container>
      <h2 className="mt-5 bg-primary p-2 text-white" style={{ display: "inline-flex" }}>Favorite Store</h2>
      <Row className="mt-5">
        {favorites.map((photo) => (
          <div className="card m-3 p-2" style={{ width: "17rem" }} key={photo.id}>
            <Link to={`/users/${photo.albumId}/albums/${photo.id}`} style={{ textDecoration: "none" }}>
              <ImgAlbum src={photo.url} alt={photo.title} className="card-img-top" />
              <h5 className="card-title">{photo.title}</h5>
            </Link>
            <StarFill color="red" onClick={() => toggleFavorite(photo)} />
          </div>
        ))}
      </Row>
      <h2 className="mt-5 bg-primary p-2 text-white" style={{ display: "inline-flex" }}>Post Store</h2>
      <Row className="mt-5">
        
        {favoritePosts.map((post) => (
          <div key={post.id} className="card p-2 m-3 p-2" style={{ width: "20rem", height: "250px", marginBottom: "10px" }}>
            <Link to={`/users/${post.userId}/posts/${post.id}`} style={{ textDecoration: "none" }}>
              <h5>{post.title}</h5>
            </Link>
            <p>{post.body}</p>
            <StarFill color="red" onClick={() => toggleFavoritePost(post)} />
          </div>
        ))}
      </Row>
    
    </Container>
  );
};

export default Favorite;
