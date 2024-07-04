import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './root';
import ErrorPage from './ErrorPage';
import HomePage from './HomePage';
import Users, { usersLoader } from './UserPage';
import UserDetailPage, { userLoader } from './UserDetailPage';
import UserPost, { userPostLoader } from './userInfo/UserPost';
import UserAlbum, { userAlbumLoader } from './userInfo/UserAlbum';
import { UserProfile, userProfileLoader } from './userInfo/UserProfile';
import Favorite from './FavoritesPage';



const Routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "users",
        element: <Users />,
        loader: usersLoader,
      },
      {
        path: "users/:userId",
        element: <UserDetailPage />,
        loader: userLoader,
      },
      {
        path: "users/:userId/posts/:postId",
        element: <UserPost />,
        loader: userPostLoader
      },
      {
        path: "users/:userId/profile",
        element: <UserProfile/>,
        loader: userProfileLoader,
      },
      {
        path: "/users/:userId/albums/:albumId",
        element: <UserAlbum />,
        loader: userAlbumLoader
      },
      {
        path: "favorites",
        element: <Favorite />,
      },
    
    ],
  },
]);

export default Routes;
