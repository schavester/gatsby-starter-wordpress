import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';

const searchClient = algoliasearch(
  'SSYK40PHE9',
  '384da4f3282a73ac96087428492234c2'
)

const AlgoliaSearch = () => (
  <InstantSearch
    indexName="instant_search"
    searchClient={searchClient}
  >
    <SearchBox />
    <Hits />
  </InstantSearch>
)

export default AlgoliaSearch
