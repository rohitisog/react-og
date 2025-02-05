import React, { useState, useEffect } from 'react';
import { fetchCoins } from '../api/coinGecko';
import InfiniteScroll from 'react-infinite-scroll-component';

// Function to generate a random ID for unique keys
const generateRandomId = () => Math.random().toString(36).substr(2, 9);

const CoinTok = () => {
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreCoins = async () => {
    const newCoins = await fetchCoins(page);
    setCoins((prevCoins) => [...prevCoins, ...newCoins]);
    setPage((prevPage) => prevPage + 1);
    if (newCoins.length < 10) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    loadMoreCoins();
  }, []);

  const getPriceChangeColor = (change) => {
    return change < 0 ? 'text-red-500' : 'text-green-500';
  };

  // Cursor trail effect
  useEffect(() => {
    const cursorTrail = (e) => {
      const trail = document.createElement('div');
      trail.classList.add('sparkle');
      document.body.appendChild(trail);

      const x = e.pageX;
      const y = e.pageY;

      trail.style.left = `${x - 5}px`;
      trail.style.top = `${y - 5}px`;

      setTimeout(() => {
        trail.remove();
      }, 500); // Remove the sparkle after 500ms
    };

    window.addEventListener('mousemove', cursorTrail);

    return () => {
      window.removeEventListener('mousemove', cursorTrail);
    };
  }, []);

  return (
    <InfiniteScroll
      dataLength={coins.length}
      next={loadMoreCoins}
      hasMore={hasMore}
      loader={<h4 className="text-white">Loading...</h4>}
      endMessage={<p className="text-white">No more coins to show</p>}
      scrollThreshold={0.9} // Trigger next scroll when 90% of current card is scrolled
    >
      <div className="flex flex-col items-center mt-6">
        {coins.map((coin) => (
          <div
            key={generateRandomId()} // Use random ID to avoid duplicate keys
            className="bg-gradient-to-r from-blue-900 to-purple-800 text-white rounded-lg w-[98vw] h-[98vh] mb-0 flex flex-col items-center justify-center p-6 transition-all transform border-4 border-transparent hover:opacity-90 hover:ring-4 hover:ring-blue-500"
          >
            <img
              src={coin.image}
              alt={coin.name}
              className="w-24 h-24 mb-6 rounded-full transition-all transform scale-110 animate-pulse"
            />
            <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-center">{coin.name}</h2>
            <p className="text-xl mb-4 text-center">Price: ${coin.current_price}</p>
            <div className="mt-4 flex gap-4 justify-center">
              <p className={`text-sm ${getPriceChangeColor(coin.price_change_percentage_24h)}`}>
                24h Change: {coin.price_change_percentage_24h}%
              </p>
            </div>
            <p className="text-sm mt-2 text-center">Market Cap: ${coin.market_cap}</p>
            <p className="text-sm mt-2 text-center">Volume: ${coin.total_volume}</p>
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default CoinTok;
