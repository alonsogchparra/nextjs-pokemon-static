const toggleFavorite = (id: number) => {
  console.log('toggleFavorite Llamado');

  let favorites: number[] = JSON.parse(
    localStorage.getItem('favorites') || '[]'
  );

  if (favorites.includes(id)) {
    favorites = favorites.filter((pokeId) => pokeId !== id);
  } else {
    favorites.push(id);
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));
};

const existFavorites = (id: number): boolean => {
  if (typeof window === undefined) return false;

  const favorites: number[] = JSON.parse(
    localStorage.getItem('favorites') || '[]'
  );
  return favorites.includes(id);
};

const pokemons = (): number[] => {
  return JSON.parse(localStorage.getItem('favorites') || '[]');
};

export default { toggleFavorite, existFavorites, pokemons };
