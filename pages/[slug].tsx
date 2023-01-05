import { GetStaticProps, GetStaticPaths } from 'next'
import React from 'react';
import Blocks from '../components/Blocks';
import { Hero } from '../components/Hero';
import type { MainMenu, Page } from '../payload-types';
import getPayload from '../payload.js';

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
  const payload = await getPayload();

  const pages = await payload.find({
    collection: 'pages',
    where: {
      slug: params?.slug || 'home',
    }
  });
  
  const page = pages.docs[0];

  const mainMenu = await payload.findGlobal({
    slug: 'main-menu'
  });

  return {
    props: {
      page: page || null,
      collection: 'pages',
      id: page?.id || null,
      mainMenu: mainMenu || null,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const payload = await getPayload();

  const pages = await payload.find({
    collection: 'pages',
  })

  return {
    paths: pages?.docs?.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: 'blocking',
  };
}

export default PageTemplate;
