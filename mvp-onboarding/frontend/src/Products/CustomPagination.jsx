import React, { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { ITEMS_PER_PAGE } from '../Utilities';

export default function CustomPagination({ records, setCurrentItems }) {
  const [activePagination, setActivePagination] = useState(1);

  const renderPagination = () => {
    let items = [];
    for (
      let number = 1;
      number < records.length / ITEMS_PER_PAGE + 1;
      number++
    ) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === activePagination}
          onClick={() => clickPagination(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    return items;
  };

  const clickPagination = (number) => {
    setActivePagination(number);
    setCurrentItems(
      records.slice((number - 1) * ITEMS_PER_PAGE, number * ITEMS_PER_PAGE)
    );
  };

  return <Pagination>{renderPagination()}</Pagination>;
}
