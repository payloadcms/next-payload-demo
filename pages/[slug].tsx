import { GetStaticProps, GetStaticPaths } from 'next'
import React from 'react';
import Blocks from '../components/Blocks';
import { Hero } from '../components/Hero';
import { getApolloClient } from '../graphql';
import { PAGE, PAGES } from '../graphql/pages';
import type { MainMenu, Page } from '../payload-types';

const PageTemplate: React.FC<{
  page: Page
  mainMenu: MainMenu
  preview?: boolean
}> = (props) => {
  const {
    page: {
      hero,
      layout,
    },
  } = props;

  return (
    <React.Fragment>
      <Hero {...hero} />
      <Blocks blocks={layout} />
    </React.Fragment>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = getApolloClient();
  const slug = params?.slug || 'home';

  const { data } = await apolloClient.query({
    query: PAGE,
    variables: {
      slug,
    },
  });

  if (!data.Pages.docs[0]) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      page: data.Pages.docs[0],
      mainMenu: data.MainMenu,
    },
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = getApolloClient();

  const { data } = await apolloClient.query({
    query: PAGES,
  });

  return {
    paths: data.Pages.docs.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: 'blocking',
  };
}

export default PageTemplate;
