import { useMemo } from 'react';
import Head from 'next/head';

import { Button, Box } from '@chakra-ui/react';
import { useInfiniteQuery } from 'react-query';

import { api } from '../services/api';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

type fetchImagesResponse = {
  data: Card[];
  after: string | null;
};

export default function Home(): JSX.Element {
  async function fetchImages({
    pageParam = null,
  }): Promise<fetchImagesResponse> {
    if (pageParam) {
      const { data } = await api.get(`/api/images`, {
        params: {
          after: pageParam,
        },
      });

      return data;
    }
    const { data } = await api.get(`/api/images`);
    return data;
  }

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchImages, {
    getNextPageParam: lastPage => lastPage.after ?? null,
  });

  const formattedData = useMemo(() => {
    let formattedDataTotal = [] as Card[];
    const dataPages = data?.pages;

    dataPages?.map(page => {
      formattedDataTotal = [...formattedDataTotal, ...page.data];
      // eslint-disable-next-line no-useless-return
      return;
    });

    return formattedDataTotal;
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Head>
        <title>Upfi</title>
      </Head>

      <Header />

      <Box maxW={1120} px={['0.5rem', 20]} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Button
            mt="1rem"
            onClick={() => fetchNextPage()}
            role="button"
            w={['100%', 'auto']}
          >
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
