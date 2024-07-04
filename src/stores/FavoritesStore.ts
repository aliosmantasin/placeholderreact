import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
}

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface FavoritesStore {
  favorites: Photo[];
  favoritePosts: Post[];
  toggleFavorite: (photo: Photo) => void;
  toggleFavoritePost: (post: Post) => void;
  favoritesCount: () => number;  // Yeni eklenen selector
}

const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      favoritePosts: [],
      toggleFavorite: (photo: Photo) => {
        const { favorites } = get();
        const isFavorite = favorites.some((fav) => fav.id === photo.id);
        if (isFavorite) {
          set({
            favorites: favorites.filter((fav) => fav.id !== photo.id),
          });
        } else {
          set({
            favorites: [...favorites, photo],
          });
        }
      },
      toggleFavoritePost: (post: Post) => {
        const { favoritePosts } = get();
        const isFavorite = favoritePosts.some((fav) => fav.id === post.id);
        if (isFavorite) {
          set({
            favoritePosts: favoritePosts.filter((fav) => fav.id !== post.id),
          });
        } else {
          set({
            favoritePosts: [...favoritePosts, post],
          });
        }
      },
      favoritesCount: () => {
        const { favorites, favoritePosts } = get();
        return favorites.length + favoritePosts.length;  // Favori fotoğraf ve postların toplam sayısı
      },
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useFavoritesStore;