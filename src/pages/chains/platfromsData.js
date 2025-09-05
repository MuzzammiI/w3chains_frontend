// platformsData.js

export const platformsChainsData = [
  {
    name: 'Ethereum',
    symbol: 'ETH',
    logo: 'https://placehold.co/40x40/4A4A4A/FFFFFF?text=ETH',
    backgroundImage: 'https://images.unsplash.com/photo-1645516484419-35a747c99474?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZXRoZXJldW18ZW58MHx8MHx8fDA%3D',
    buySellPlatforms: [
      { id: 1, name: 'Coinbase', type: 'CEX', link: 'https://www.coinbase.com', logo: 'https://placehold.co/50x50/0052FF/FFFFFF?text=CB' },
      { id: 2, name: 'Binance', type: 'CEX', link: 'https://www.binance.com', logo: 'https://placehold.co/50x50/F3BA2F/000000?text=BNB' },
      { id: 3, name: 'Kraken', type: 'CEX', link: 'https://www.kraken.com', logo: 'https://placehold.co/50x50/5B616E/FFFFFF?text=KR' },
      { id: 4, name: 'Uniswap', type: 'DEX', link: 'https://uniswap.org', logo: 'https://placehold.co/50x50/FF007A/FFFFFF?text=UNI' },
      { id: 5, name: 'SushiSwap', type: 'DEX', link: 'https://sushi.com', logo: 'https://placehold.co/50x50/EE6363/FFFFFF?text=SUSHI' },
      { id: 6, name: 'Gemini', type: 'CEX', link: 'https://www.gemini.com', logo: 'https://placehold.co/50x50/000000/FFFFFF?text=GM' },
      { id: 7, name: 'KuCoin', type: 'CEX', link: 'https://www.kucoin.com', logo: 'https://placehold.co/50x50/24A076/FFFFFF?text=KC' },
      { id: 8, name: 'Bybit', type: 'CEX', link: 'https://www.bybit.com', logo: 'https://placehold.co/50x50/000000/FFFFFF?text=BB' },
    ],
    transactionFees: [
      { platform: 'Ethereum Network (Gas)', fee: 15.0, type: 'Network', description: 'Average gas fee for a standard transaction.' },
      { platform: 'Uniswap (Swap)', fee: 0.3, type: 'DEX Fee', description: 'Standard swap fee on Uniswap V3.' },
      { platform: 'OpenSea (Sale)', fee: 2.5, type: 'NFT Marketplace', description: 'Platform fee for NFT sales.' },
      { platform: 'Coinbase (Buy/Sell)', fee: 1.49, type: 'Exchange Fee', description: 'Typical fee for buying/selling ETH on Coinbase.' },
      { platform: 'Binance (Trading)', fee: 0.1, type: 'Exchange Fee', description: 'Spot trading fee on Binance.' },
    ],
    recentTransactions: {
      senders: Array.from({ length: 15 }, (_, i) => ({
        id: i + 1, address: `0xSenderETH${i}abc...xyz`, value: (Math.random() * 10 + 0.1).toFixed(3), date: `2024-0${(i % 12) + 1}-1${(i % 9) + 1}`, type: 'ETH'
      })),
      receivers: Array.from({ length: 15 }, (_, i) => ({
        id: i + 1, address: `0xReceiverETH${i}def...uvw`, value: (Math.random() * 10 + 0.1).toFixed(3), date: `2024-0${(i % 12) + 1}-1${(i % 9) + 1}`, type: 'ETH'
      })),
    },
    topHolders: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1, address: `0xETHHolder${i}abc...xyz`, balance: (Math.random() * 100000 + 1000).toFixed(2), imageUrl: `https://placehold.co/60x60/4A4A4A/FFFFFF?text=H${i + 1}`
    })),
    trendingExchanges: [
      { id: 1, name: 'Uniswap', volume: '1.2B', change: 0.05, imageUrl: 'https://placehold.co/50x50/FF007A/FFFFFF?text=UNI' },
      { id: 2, name: 'OpenSea', volume: '800M', change: -0.02, imageUrl: 'https://placehold.co/50x50/2081E2/FFFFFF?text=OS' },
      { id: 3, name: 'Coinbase', volume: '500M', change: 0.03, imageUrl: 'https://placehold.co/50x50/0052FF/FFFFFF?text=CB' },
      { id: 4, name: 'Binance', volume: '450M', change: 0.01, imageUrl: 'https://placehold.co/50x50/F3BA2F/000000?text=BNB' },
    ],
    volumeChartData: [
      { name: 'Jan', Uniswap: 4000, OpenSea: 2400, Coinbase: 2000, Binance: 1800 },
      { name: 'Feb', Uniswap: 3000, OpenSea: 1398, Coinbase: 2200, Binance: 1900 },
      { name: 'Mar', Uniswap: 2000, OpenSea: 9800, Coinbase: 2500, Binance: 2100 },
      { name: 'Apr', Uniswap: 2780, OpenSea: 3908, Coinbase: 2300, Binance: 2000 },
      { name: 'May', Uniswap: 1890, OpenSea: 4800, Coinbase: 2100, Binance: 2200 },
      { name: 'Jun', Uniswap: 2390, OpenSea: 3800, Coinbase: 2400, Binance: 2300 },
      { name: 'Jul', Uniswap: 3490, OpenSea: 4300, Coinbase: 2600, Binance: 2500 },
    ],
    recentChainsPlatforms: [
      { id: 1, name: 'Polygon Bridge', type: 'Bridge', imageUrl: 'https://placehold.co/50x50/8247E5/FFFFFF?text=POLY', description: 'Bridge assets to Polygon for lower fees.' },
      { id: 2, name: 'Arbitrum One', type: 'L2 Rollup', imageUrl: 'https://placehold.co/50x50/2B374F/FFFFFF?text=ARB', description: 'Fast and cheap transactions on Arbitrum.' },
      { id: 3, name: 'Optimism Gateway', type: 'L2 Rollup', imageUrl: 'https://placehold.co/50x50/FF0420/FFFFFF?text=OP', description: 'Optimistic rollups for scalable Ethereum.' },
      { id: 4, name: 'BNB Chain Bridge', type: 'Bridge', imageUrl: 'https://placehold.co/50x50/F3BA2F/000000?text=BNB', description: 'Connects Ethereum to BNB Chain.' },
      { id: 5, name: 'Solana Wormhole', type: 'Bridge', imageUrl: 'https://placehold.co/50x50/00FF00/000000?text=SOL', description: 'Cross-chain bridge for Solana.' },
      { id: 6, name: 'Avalanche Bridge', type: 'Bridge', imageUrl: 'https://placehold.co/50x50/E84142/FFFFFF?text=AVAX', description: 'Transfer assets to Avalanche C-Chain.' },
      { id: 7, name: 'ZkSync Era', type: 'L2 Rollup', imageUrl: 'https://placehold.co/50x50/6C8EEF/FFFFFF?text=ZK', description: 'Zero-knowledge rollups for Ethereum.' },
      { id: 8, name: 'Base Network', type: 'L2 Rollup', imageUrl: 'https://placehold.co/50x50/0052FF/FFFFFF?text=BASE', description: 'Coinbase-incubated Ethereum L2.' },
    ],
  },
  {
    name: 'Binance',
    symbol: 'BNB',
    logo: 'https://placehold.co/40x40/F3BA2F/FFFFFF?text=BNB',
    backgroundImage: 'https://images.unsplash.com/photo-1621503936934-8c6f11414e21?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmluYW5jZSUyMG5ld3N8ZW58MHx8MHx8fDA%3D',
    buySellPlatforms: [
      { id: 1, name: 'Binance', type: 'CEX', link: 'https://www.binance.com', logo: 'https://placehold.co/50x50/F3BA2F/000000?text=BNB' },
      { id: 2, name: 'PancakeSwap', type: 'DEX', link: 'https://pancakeswap.finance', logo: 'https://placehold.co/50x50/D29B4D/FFFFFF?text=CAKE' },
      { id: 3, name: 'KuCoin', type: 'CEX', link: 'https://www.kucoin.com', logo: 'https://placehold.co/50x50/24A076/FFFFFF?text=KC' },
      { id: 4, name: 'Gate.io', type: 'CEX', link: 'https://www.gate.io', logo: 'https://placehold.co/50x50/000000/FFFFFF?text=GT' },
      { id: 5, name: 'BakerySwap', type: 'DEX', link: 'https://www.bakeryswap.org', logo: 'https://placehold.co/50x50/FF6347/FFFFFF?text=BKS' },
      { id: 6, name: 'Biswap', type: 'DEX', link: 'https://biswap.org', logo: 'https://placehold.co/50x50/FFD700/000000?text=BSW' },
    ],
    transactionFees: [
      { platform: 'BNB Chain Network (Gas)', fee: 0.05, type: 'Network', description: 'Average gas fee for a standard transaction on BNB Chain.' },
      { platform: 'PancakeSwap (Swap)', fee: 0.25, type: 'DEX Fee', description: 'Standard swap fee on PancakeSwap.' },
      { platform: 'Binance (Trading)', fee: 0.1, type: 'Exchange Fee', description: 'Spot trading fee on Binance.' },
      { platform: 'BakerySwap (Swap)', fee: 0.3, type: 'DEX Fee', description: 'Swap fee on BakerySwap.' },
    ],
    recentTransactions: {
      senders: Array.from({ length: 15 }, (_, i) => ({
        id: i + 1, address: `0xSenderBNB${i}abc...xyz`, value: (Math.random() * 50 + 1).toFixed(2), date: `2024-0${(i % 12) + 1}-1${(i % 9) + 1}`, type: 'BNB'
      })),
      receivers: Array.from({ length: 15 }, (_, i) => ({
        id: i + 1, address: `0xReceiverBNB${i}def...uvw`, value: (Math.random() * 50 + 1).toFixed(2), date: `2024-0${(i % 12) + 1}-1${(i % 9) + 1}`, type: 'BNB'
      })),
    },
    topHolders: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1, address: `0xBNBHolder${i}abc...xyz`, balance: (Math.random() * 50000 + 500).toFixed(2), imageUrl: `https://placehold.co/60x60/F3BA2F/000000?text=H${i + 1}`
    })),
    trendingExchanges: [
      { id: 1, name: 'PancakeSwap', volume: '900M', change: 0.03, imageUrl: 'https://placehold.co/50x50/D29B4D/FFFFFF?text=CAKE' },
      { id: 2, name: 'Binance', volume: '700M', change: 0.02, imageUrl: 'https://placehold.co/50x50/F3BA2F/000000?text=BNB' },
      { id: 3, name: 'BakerySwap', volume: '150M', change: -0.01, imageUrl: 'https://placehold.co/50x50/FF6347/FFFFFF?text=BKS' },
    ],
    volumeChartData: [
      { name: 'Jan', PancakeSwap: 3000, Binance: 2000, BakerySwap: 500 },
      { name: 'Feb', PancakeSwap: 2800, Binance: 2200, BakerySwap: 600 },
      { name: 'Mar', PancakeSwap: 3500, Binance: 2500, BakerySwap: 700 },
      { name: 'Apr', PancakeSwap: 3200, Binance: 2300, BakerySwap: 550 },
      { name: 'May', PancakeSwap: 3800, Binance: 2700, BakerySwap: 800 },
      { name: 'Jun', PancakeSwap: 3100, Binance: 2400, BakerySwap: 650 },
      { name: 'Jul', PancakeSwap: 4000, Binance: 2800, BakerySwap: 900 },
    ],
    recentChainsPlatforms: [
      { id: 1, name: 'Ethereum Bridge', type: 'Bridge', imageUrl: 'https://placehold.co/50x50/4A4A4A/FFFFFF?text=ETH', description: 'Bridge assets to Ethereum.' },
      { id: 2, name: 'Polygon Bridge', type: 'Bridge', imageUrl: 'https://placehold.co/50x50/8247E5/FFFFFF?text=POLY', description: 'Bridge assets to Polygon.' },
      { id: 3, name: 'Arbitrum Bridge', type: 'Bridge', imageUrl: 'https://placehold.co/50x50/2B374F/FFFFFF?text=ARB', description: 'Bridge assets to Arbitrum.' },
      { id: 4, name: 'Optimism Bridge', type: 'Bridge', imageUrl: 'https://placehold.co/50x50/FF0420/FFFFFF?text=OP', description: 'Bridge assets to Optimism.' },
      { id: 5, name: 'Solana Bridge', type: 'Bridge', imageUrl: 'https://placehold.co/50x50/00FF00/000000?text=SOL', description: 'Bridge assets to Solana.' },
      { id: 6, name: 'Avalanche Bridge', type: 'Bridge', imageUrl: 'https://placehold.co/50x50/E84142/FFFFFF?text=AVAX', description: 'Bridge assets to Avalanche.' },
    ],
  },
  {
    name: 'Solana',
    symbol: 'SOL',
    logo: 'https://placehold.co/40x40/00FF00/000000?text=SOL',
    backgroundImage: 'https://images.unsplash.com/photo-1650346380614-724d271f84d6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c29sYW5hJTIwYmxvY2tjaGFpbnxlbnwwfHwwfHx8MA%3D%3D',
    buySellPlatforms: [
      { id: 1, name: 'Coinbase', type: 'CEX', link: 'https://www.coinbase.com', logo: 'https://placehold.co/50x50/0052FF/FFFFFF?text=CB' },
      { id: 2, name: 'Kraken', type: 'CEX', link: 'https://www.kraken.com', logo: 'https://placehold.co/50x50/5B616E/FFFFFF?text=KR' },
      { id: 3, name: 'Raydium', type: 'DEX', link: 'https://raydium.io', logo: 'https://placehold.co/50x50/9945FF/FFFFFF?text=RAY' },
      { id: 4, name: 'Orca', type: 'DEX', link: 'https://www.orca.so', logo: 'https://placehold.co/50x50/20C997/FFFFFF?text=ORCA' },
      { id: 5, name: 'Phantom Wallet', type: 'Wallet', link: 'https://phantom.app', logo: 'https://placehold.co/50x50/512DA8/FFFFFF?text=PH' },
      { id: 6, name: 'Magic Eden', type: 'NFT Marketplace', link: 'https://magiceden.io', logo: 'https://placehold.co/50x50/1C1C1C/FFFFFF?text=ME' },
    ],
    transactionFees: [
      { platform: 'Solana Network (Gas)', fee: 0.0002, type: 'Network', description: 'Extremely low average transaction fee on Solana.' },
      { platform: 'Raydium (Swap)', fee: 0.25, type: 'DEX Fee', description: 'Standard swap fee on Raydium.' },
      { platform: 'Magic Eden (Sale)', fee: 2.0, type: 'NFT Marketplace', description: 'Platform fee for NFT sales on Magic Eden.' },
      { platform: 'Orca (Swap)', fee: 0.3, type: 'DEX Fee', description: 'Swap fee on Orca.' },
    ],
    recentTransactions: {
      senders: Array.from({ length: 15 }, (_, i) => ({
        id: i + 1, address: `0xSenderSOL${i}abc...xyz`, value: (Math.random() * 200 + 5).toFixed(2), date: `2024-0${(i % 12) + 1}-1${(i % 9) + 1}`, type: 'SOL'
      })),
      receivers: Array.from({ length: 15 }, (_, i) => ({
        id: i + 1, address: `0xReceiverSOL${i}def...uvw`, value: (Math.random() * 200 + 5).toFixed(2), date: `2024-0${(i % 12) + 1}-1${(i % 9) + 1}`, type: 'SOL'
      })),
    },
    topHolders: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1, address: `0xSOLHolder${i}abc...xyz`, balance: (Math.random() * 200000 + 2000).toFixed(2), imageUrl: `https://placehold.co/60x60/00FF00/000000?text=H${i + 1}`
    })),
    trendingExchanges: [
      { id: 1, name: 'Raydium', volume: '600M', change: 0.04, imageUrl: 'https://placehold.co/50x50/9945FF/FFFFFF?text=RAY' },
      { id: 2, name: 'Magic Eden', volume: '400M', change: 0.01, imageUrl: 'https://placehold.co/50x50/20C997/FFFFFF?text=ME' },
      { id: 3, name: 'Orca', volume: '100M', change: 0.02, imageUrl: 'https://placehold.co/50x50/20C997/FFFFFF?text=ORCA' },
    ],
    volumeChartData: [
      { name: 'Jan', Raydium: 2000, MagicEden: 1500, Orca: 300 },
      { name: 'Feb', Raydium: 1800, MagicEden: 1600, Orca: 350 },
      { name: 'Mar', Raydium: 2500, MagicEden: 1800, Orca: 400 },
      { name: 'Apr', Raydium: 2200, MagicEden: 1700, Orca: 380 },
      { name: 'May', Raydium: 2800, MagicEden: 2000, Orca: 450 },
      { name: 'Jun', Raydium: 2400, MagicEden: 1900, Orca: 420 },
      { name: 'Jul', Raydium: 3000, MagicEden: 2200, Orca: 500 },
    ],
    recentChainsPlatforms: [
      { id: 1, name: 'Wormhole Bridge', type: 'Bridge', imageUrl: 'https://placehold.co/50x50/9945FF/FFFFFF?text=WORM', description: 'Cross-chain bridge for Solana ecosystem.' },
      { id: 2, name: 'Serum DEX', type: 'DEX', imageUrl: 'https://placehold.co/50x50/00FF00/000000?text=SRM', description: 'High-performance DEX on Solana.' },
      { id: 3, name: 'Marinade Finance', type: 'Liquid Staking', imageUrl: 'https://placehold.co/50x50/FF4500/FFFFFF?text=MNDE', description: 'Liquid staking for SOL.' },
      { id: 4, name: 'Solend', type: 'Lending', imageUrl: 'https://placehold.co/50x50/00BFFF/FFFFFF?text=SLND', description: 'Decentralized lending protocol.' },
      { id: 5, name: 'Jupiter Aggregator', type: 'DEX Aggregator', imageUrl: 'https://placehold.co/50x50/800080/FFFFFF?text=JUP', description: 'Best swap rates on Solana.' },
      { id: 6, name: 'STEPN', type: 'GameFi', imageUrl: 'https://placehold.co/50x50/FFD700/000000?text=GMT', description: 'Move-to-earn game on Solana.' },
    ],
  },
];

export const getPlatformsChainData = (chainName) => {
  return platformsChainsData.find(chain => chain.name.toLowerCase() === chainName.toLowerCase());
};
