import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Grid, Text, Image } from '@nextui-org/react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import confetti from 'canvas-confetti';

import { Pokemon, PokemonListResponse } from '../../interfaces';
import { getPokemonInfo, localFavorites } from '../../utils';
import { notFound } from 'next/navigation';
import { Layout } from '../../components/layouts';
import { pokeApi } from '../../api';

interface Props {
  pokemon: Pokemon;
}

if (typeof window !== 'undefined') {
  localStorage.getItem('favorites');
}

export const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
  const [isInfavorites, setIsInfavorites] = useState(false);

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setIsInfavorites(!isInfavorites);

    if (isInfavorites) {
      return;
    }

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: { x: 1, y: 0 },
    });
  };

  useEffect(() => {
    setIsInfavorites(localFavorites.existFavorites(pokemon.id));
  }, [pokemon.id]);

  if (!pokemon) {
    notFound();
  }

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: '5px' }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{ padding: '30px' }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  '/no-image.png'
                }
                alt={pokemon.name}
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Text h1 transform='capitalize'>
                {pokemon.name}
              </Text>

              <Button
                color='gradient'
                ghost={!isInfavorites}
                onClick={onToggleFavorite}
              >
                {isInfavorites ? 'En Favoritos' : 'Guardar en favoritos'}
              </Button>
            </Card.Header>

            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container display='flex' direction='row'>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

  const pokemonNames: string[] = data.results.map((pokemon) => pokemon.name);

  return {
    paths: pokemonNames.map((name) => ({ params: { name } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };

  return {
    props: {
      pokemon: await getPokemonInfo(name),
    },
  };
};

export default PokemonByNamePage;
