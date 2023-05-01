import { NextPage } from 'next';
import { Card, Grid, Row, Text } from '@nextui-org/react';
import { Layout } from '../components/layouts';
import { GetStaticProps } from 'next';
import { pokeApi } from '../api';
import { PokemonListResponse, SmallPokemon } from '../interfaces';
import { PokemonCard } from '../components/pokemon';

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title='Listado de Pokemons'>
      <Grid.Container gap={2} justify='flex-start'>
        {pokemons.map((pokemon) => {
          const { id, name, img } = pokemon;
          return <PokemonCard key={id} pokemon={pokemon} />;
        })}
      </Grid.Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
  console.log(data);

  const pokemons: SmallPokemon[] = data.results.map((pokemon, index) => ({
    ...pokemon,
    id: index + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
      index + 1
    }.svg`,
  }));

  return {
    props: {
      pokemons,
    },
  };
};

export default HomePage;
