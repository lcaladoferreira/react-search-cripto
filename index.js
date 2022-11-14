import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import SearchBar from './SearchBar';
import './style.css';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&order=market_cap_desc&per_page=100&page=1&parktrne=false'
    )
      .then((resp) => resp.json())
      .then(setData);
  }, []);

  const filterNames = ({ id }) => {
    return id.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
  };
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  return (
    <div className="App">
      <SearchBar onSearch={setSearchValue} value={searchValue} />
      <table>
        {data.filter(filterNames).map((data) => {
          return (
            <tr key={data.id}>
              <td>{data.name}</td>
              <td>{formatter.format(data.current_price)}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

render(<App />, document.getElementById('root'));
