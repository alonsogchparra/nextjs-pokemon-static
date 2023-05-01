import React, { FC } from 'react';
import { Card, Grid } from '@nextui-org/react';
import { FavoriteCardPokemon } from './FavoriteCardPokemon';
import { Pokemon } from '../../../repaso/pokemon-static/interfaces/pokemon-full';

interface Props {
  pokemons: number[];
}

export const FavoritePokemons: FC<Props> = ({ pokemons }) => {
  return (
    <Grid.Container gap={2} direction='row' justify='flex-start'>
      {pokemons.map((id) => (
        <FavoriteCardPokemon key={id} pokemonId={id} />
      ))}
    </Grid.Container>
  );
};
