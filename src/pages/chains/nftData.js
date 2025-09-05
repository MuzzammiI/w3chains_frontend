// nftData.js

export const nftChainsData = [
  {
    name: 'Ethereum',
    symbol: 'ETH',
    logo: 'https://placehold.co/40x40/4A4A4A/FFFFFF?text=ETH',
    backgroundImages: [
      "https://images.unsplash.com/photo-1645516484419-35a747c99474?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZXRoZXJldW18ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1627914046761-46487e41d8e1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmxvY2tjaGFpbnxlbnwwfHwwfHx8MA%3D%3D"
    ],
    topHolders: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `Name ${i + 1}`,
      address: `0xHolder${i}abc...xyz`,
      imageUrl: 'https://media.istockphoto.com/id/1365200314/photo/crypto-virtual-museum.webp?a=1&b=1&s=612x612&w=0&k=20&c=Ec8DwsSg7xolcqVUrDa5x7F-grbVxR3GA4J3sjUWJTo=',
    })),
    featuredNfts: [ // Now an array for sliding functionality
      {
        id: 1,
        name: '8 by Bård Ionson',
        artist: 'Art Blocks',
        imageUrl: 'https://plus.unsplash.com/premium_photo-1682124811402-53d3081a5fb7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fE5GVHN8ZW58MHx8MHx8fDA%3D',
        currentBid: '0.06', // ETH
        floorPrice: '33.35', // ETH
        volume: '8.9', // M
        statusIndicators: [ // Mock data for circular indicators (percentage values)
          { id: 1, color: '#4CAF50', value: 80, label: 'Minted' },
          { id: 2, color: '#FFD700', value: 60, label: 'Listed' },
          { id: 3, color: '#00BFFF', value: 90, label: 'Owners' },
        ]
      },
      {
        id: 2,
        name: 'The Wanderer',
        artist: 'Digital Dreamer',
        imageUrl: 'https://media.istockphoto.com/id/1307372676/photo/nft-non-fungible-token.webp?a=1&b=1&s=612x612&w=0&k=20&c=J8eUzq8Om0SHqSRVAGUQD3n3h2LzpWkU8xK6Ejim5Vc=',
        currentBid: '0.12',
        floorPrice: '28.10',
        volume: '5.2',
        statusIndicators: [
          { id: 1, color: '#FF6347', value: 70, label: 'Minted' },
          { id: 2, color: '#9ACD32', value: 85, label: 'Listed' },
          { id: 3, color: '#FFD700', value: 75, label: 'Owners' },
        ]
      },
      {
        id: 3,
        name: 'Mystic Realm',
        artist: 'Pixel Sorcerer',
        imageUrl: 'https://media.istockphoto.com/id/1365200314/photo/crypto-virtual-museum.webp?a=1&b=1&s=612x612&w=0&k=20&c=Ec8DwsSg7xolcqVUrDa5x7F-grbVxR3GA4J3sjUWJTo=',
        currentBid: '0.09',
        floorPrice: '40.00',
        volume: '10.5',
        statusIndicators: [
          { id: 1, color: '#00BFFF', value: 95, label: 'Minted' },
          { id: 2, color: '#4CAF50', value: 70, label: 'Listed' },
          { id: 3, color: '#FF6347', value: 80, label: 'Owners' },
        ]
      }
    ],
    featuredCollections: Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      name: `Collection ${i + 1}`,
      imageUrl: `https://placehold.co/80x80/38B2AC/FFFFFF?text=FC${i + 1}`,
      floorPrice: (0.1 + i * 0.02).toFixed(2),
      volume: (100 + i * 5).toFixed(2),
      items: 1000 + i * 100,
      owners: 500 + i * 50,
      description: `A diverse collection featuring unique digital assets.`,
    })),
    trendingTokens: Array.from({ length: 10 }, (_, i) => ({ // Represents trending collections/tokens with mini charts
      id: i + 1,
      name: `Token ${i + 1}`,
      symbol: `TOK${i + 1}`,
      price: (100 + i * 5).toFixed(2),
      change: (Math.random() * 0.1 - 0.05).toFixed(4), // -0.05 to 0.05
      imageUrl: `https://placehold.co/40x40/4A4A4A/FFFFFF?text=T${i + 1}`,
      chartData: [{x:0,y:10},{x:20,y:15},{x:40,y:12},{x:60,y:18},{x:80,y:16},{x:100,y:20}], // Mock chart data
    })),
    topMoversToday: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `Mover NFT ${i + 1}`,
      collection: `Mover Collection ${i + 1}`,
      imageUrl: `https://placehold.co/150x150/FF6347/FFFFFF?text=MOVER+${i + 1}`,
      floorPrice: (5 + i * 0.5).toFixed(2),
      change: (Math.random() * 0.2 - 0.1).toFixed(4), // -0.1 to 0.1
      description: `An NFT that has seen significant price movement today.`,
    })),
    highestWeeklySales: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `Top Sale NFT ${i + 1}`,
      collection: `Rare Collection ${i + 1}`,
      imageUrl: `https://placehold.co/200x200/6A5ACD/FFFFFF?text=SALE+${i + 1}`,
      description: `This highly sought-after NFT achieved a record sale this week.`,
      salePrice: (100 + i * 20).toFixed(2),
      buyer: `0xBuyer${i}abc`,
    })),
    topMints: Array.from({ length: 25 }, (_, i) => ({ // Increased count for pagination
      id: i + 1,
      name: `Fresh Mint #${i + 1}`,
      collection: 'New Art Drops',
      imageUrl: `https://placehold.co/150x150/38B2AC/FFFFFF?text=MINT+${i + 1}`,
      mintPrice: (0.05 + i * 0.005).toFixed(3),
      totalMinted: 1000 + i * 50,
      mintDate: `2023-0${(i % 12) + 1}-15`, // Cycle through months
      description: `A brand new NFT series just launched, offering unique digital art pieces.`,
    })),
    topSenders: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      address: `0xSender${i}abc...xyz`,
      totalNftsSent: 100 + i * 5,
      totalValueSent: (500 + i * 20).toFixed(2),
      lastActivity: `2023-0${i + 1}-10`,
    })),
    topReceivers: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      address: `0xReceiver${i}def...uvw`,
      totalNftsReceived: 90 + i * 6,
      totalValueReceived: (480 + i * 25).toFixed(2),
      lastActivity: `2023-0${i + 1}-12`,
    })),
    exchangeComparison: [
      { name: 'OpenSea', price: 75, volume: 1200 },
      { name: 'LooksRare', price: 73, volume: 1100 },
      { name: 'X2Y2', price: 74, volume: 950 },
      { name: 'Blur', price: 76, volume: 1500 },
    ],
    transactionFees: [
      { exchange: 'OpenSea', fee: 2.5, type: 'Platform' },
      { exchange: 'LooksRare', fee: 2.0, type: 'Platform' },
      { exchange: 'X2Y2', fee: 0.5, type: 'Platform' },
      { exchange: 'Blur', fee: 0.0, type: 'Platform' },
      { exchange: 'Ethereum Gas', fee: 5.0, type: 'Network' },
    ],
    relatedChains: [
      { id: 1, name: 'Polygon', symbol: 'MATIC', price: 0.75, change: 0.02, imageUrl: 'https://placehold.co/40x40/8247E5/FFFFFF?text=P' },
      { id: 2, name: 'Arbitrum', symbol: 'ARB', price: 1.10, change: -0.01, imageUrl: 'https://placehold.co/40x40/2B374F/FFFFFF?text=A' },
      { id: 3, name: 'Optimism', symbol: 'OP', price: 2.50, change: 0.05, imageUrl: 'https://placehold.co/40x40/FF0420/FFFFFF?text=O' },
      { id: 4, name: 'BNB Chain', symbol: 'BNB', price: 600.00, change: -0.02, imageUrl: 'https://placehold.co/40x40/F3BA2F/FFFFFF?text=B' },
      { id: 5, name: 'Solana', symbol: 'SOL', price: 150.00, change: 0.03, imageUrl: 'https://placehold.co/40x40/00FF00/000000?text=S' },
      { id: 6, name: 'Avalanche', symbol: 'AVAX', price: 30.00, change: 0.01, imageUrl: 'https://placehold.co/40x40/E84142/FFFFFF?text=AV' },
    ],
  },
  {
    name: 'Binance',
    symbol: 'BNB',
    logo: 'https://placehold.co/40x40/F3BA2F/FFFFFF?text=BNB',
    backgroundImages: [
      "https://images.unsplash.com/photo-1621503936934-8c6f11414e21?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmluYW5jZSUyMG5ld3N8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1640340434753-af2f2323e20e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmluYW5jZSUyMGchoYWlufGVufDB8fDB8fHww"
    ],
    topHolders: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `BNB Holder ${i + 1}`,
      address: `0xBNBH${i}abc...xyz`,
      imageUrl: `https://placehold.co/60x60/F3BA2F/000000?text=BH${i + 1}`,
    })),
    featuredNfts: [
      {
        id: 1,
        name: 'Binance Genesis NFT',
        artist: 'Binance Originals',
        imageUrl: 'https://images.unsplash.com/photo-1621503936934-8c6f11414e21?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        currentBid: '0.5', // BNB
        floorPrice: '10.00', // BNB
        volume: '1.2', // M
        statusIndicators: [
          { id: 1, color: '#00BFFF', value: 75, label: 'Minted' },
          { id: 2, color: '#FF6347', value: 50, label: 'Listed' },
          { id: 3, color: '#9ACD32', value: 85, label: 'Owners' },
        ]
      },
    ],
    featuredCollections: Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      name: `BSC Collection ${i + 1}`,
      imageUrl: `https://placehold.co/80x80/008080/FFFFFF?text=FBC${i + 1}`,
      floorPrice: (0.05 + i * 0.01).toFixed(2),
      volume: (50 + i * 3).toFixed(2),
      items: 500 + i * 50,
      owners: 200 + i * 20,
      description: `A vibrant collection from the Binance Smart Chain ecosystem.`,
    })),
    trendingTokens: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `BNB Token ${i + 1}`,
      symbol: `BTOK${i + 1}`,
      price: (50 + i * 2).toFixed(2),
      change: (Math.random() * 0.08 - 0.04).toFixed(4),
      imageUrl: `https://placehold.co/40x40/F3BA2F/000000?text=BT${i + 1}`,
      chartData: [{x:0,y:20},{x:20,y:18},{x:40,y:22},{x:60,y:19},{x:80,y:21},{x:100,y:20}],
    })),
    topMoversToday: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `BNB Mover NFT ${i + 1}`,
      collection: `BSC Movers ${i + 1}`,
      imageUrl: `https://placehold.co/150x150/FFD700/000000?text=BNB+MOVER+${i + 1}`,
      floorPrice: (2 + i * 0.2).toFixed(2),
      change: (Math.random() * 0.15 - 0.07).toFixed(4),
      description: `This NFT is making waves on the Binance Smart Chain today.`,
    })),
    highestWeeklySales: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `BNB Top Sale NFT ${i + 1}`,
      collection: `BNB Rare Collection ${i + 1}`,
      imageUrl: `https://placehold.co/200x200/008080/FFFFFF?text=BNB+SALE+${i + 1}`,
      description: `A high-value NFT sale recorded on BNB Chain this week.`,
      salePrice: (50 + i * 10).toFixed(2),
      buyer: `0xBNBBuyer${i}def`,
    })),
    topMints: Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `Fresh Mint #${i + 1}`,
      collection: 'New Art Drops',
      imageUrl: `https://placehold.co/150x150/38B2AC/FFFFFF?text=MINT+${i + 1}`,
      mintPrice: (0.05 + i * 0.01).toFixed(3),
      totalMinted: 1000 + i * 50,
      mintDate: `2023-0${(i % 12) + 1}-15`,
      description: `A brand new NFT series just launched, offering unique digital art pieces.`,
    })),
    topSenders: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      address: `0xSender${i}abc...xyz`,
      totalNftsSent: 100 + i * 5,
      totalValueSent: (500 + i * 20).toFixed(2),
      lastActivity: `2023-0${i + 1}-10`,
    })),
    topReceivers: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      address: `0xReceiver${i}def...uvw`,
      totalNftsReceived: 90 + i * 6,
      totalValueReceived: (480 + i * 25).toFixed(2),
      lastActivity: `2023-0${i + 1}-12`,
    })),
    exchangeComparison: [
      { name: 'PancakeSwap NFT', price: 12, volume: 300 },
      { name: 'BakerySwap NFT', price: 11, volume: 250 },
      { name: 'Galleria', price: 12.5, volume: 350 },
    ],
    transactionFees: [
      { exchange: 'PancakeSwap NFT', fee: 0.2, type: 'Platform' },
      { exchange: 'BakerySwap NFT', fee: 0.1, type: 'Platform' },
      { exchange: 'Galleria', fee: 0.3, type: 'Platform' },
      { exchange: 'BNB Chain Gas', fee: 0.05, type: 'Network' },
    ],
    relatedChains: [
      { id: 1, name: 'Ethereum', symbol: 'ETH', price: 3500.00, change: 0.01, imageUrl: 'https://placehold.co/40x40/4A4A4A/FFFFFF?text=ETH' },
      { id: 2, name: 'Polygon', symbol: 'MATIC', price: 0.75, change: 0.02, imageUrl: 'https://placehold.co/40x40/8247E5/FFFFFF?text=P' },
      { id: 3, name: 'Solana', symbol: 'SOL', price: 150.00, change: 0.03, imageUrl: 'https://placehold.co/40x40/00FF00/000000?text=S' },
      { id: 4, name: 'Arbitrum', symbol: 'ARB', price: 1.10, change: -0.01, imageUrl: 'https://placehold.co/40x40/2B374F/FFFFFF?text=A' },
      { id: 5, name: 'Optimism', symbol: 'OP', price: 2.50, change: 0.05, imageUrl: 'https://placehold.co/40x40/FF0420/FFFFFF?text=O' },
      { id: 6, name: 'Avalanche', symbol: 'AVAX', price: 30.00, change: 0.01, imageUrl: 'https://placehold.co/40x40/E84142/FFFFFF?text=AV' },
    ],
  },
  {
    name: 'Solana',
    symbol: 'SOL',
    logo: 'https://placehold.co/40x40/00FF00/000000?text=SOL',
    backgroundImages: [
      "https://images.unsplash.com/photo-1650346380614-724d271f84d6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c29sYW5hJTIwYmxvY2tjaGFpbnxlbnwwfHwwfHx8MA%3D%3D"
    ],
    topHolders: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `SOL Holder ${i + 1}`,
      address: `0xSOLH${i}abc...xyz`,
      imageUrl: `https://placehold.co/60x60/00FF00/000000?text=SH${i + 1}`,
    })),
    featuredNfts: [
      {
        id: 1,
        name: 'Solana Genesis Pass',
        artist: 'Solana Labs',
        imageUrl: 'https://images.unsplash.com/photo-1650346380614-724d271f84d6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        currentBid: '0.1', // SOL
        floorPrice: '5.00', // SOL
        volume: '0.8', // M
        statusIndicators: [
          { id: 1, color: '#FFD700', value: 95, label: 'Minted' },
          { id: 2, color: '#00BFFF', value: 70, label: 'Listed' },
          { id: 3, color: '#4CAF50', value: 88, label: 'Owners' },
        ]
      },
    ],
    featuredCollections: Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      name: `Solana Collection ${i + 1}`,
      imageUrl: `https://placehold.co/80x80/FF4500/FFFFFF?text=FSC${i + 1}`,
      floorPrice: (0.01 + i * 0.005).toFixed(2),
      volume: (20 + i * 1).toFixed(2),
      items: 2000 + i * 200,
      owners: 800 + i * 80,
      description: `A collection of high-speed NFTs on the Solana blockchain.`,
    })),
    trendingTokens: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `SOL Token ${i + 1}`,
      symbol: `STOK${i + 1}`,
      price: (20 + i * 1).toFixed(2),
      change: (Math.random() * 0.07 - 0.035).toFixed(4),
      imageUrl: `https://placehold.co/40x40/00FF00/000000?text=ST${i + 1}`,
      chartData: [{x:0,y:15},{x:20,y:17},{x:40,y:14},{x:60,y:20},{x:80,y:18},{x:100,y:22}],
    })),
    topMoversToday: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `SOL Mover NFT ${i + 1}`,
      collection: `Solana Movers ${i + 1}`,
      imageUrl: `https://placehold.co/150x150/800080/FFFFFF?text=SOL+MOVER+${i + 1}`,
      floorPrice: (1 + i * 0.1).toFixed(2),
      change: (Math.random() * 0.18 - 0.09).toFixed(4),
      description: `This Solana NFT has seen significant activity today.`,
    })),
    highestWeeklySales: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `SOL Top Sale NFT ${i + 1}`,
      collection: `SOL Rare Collection ${i + 1}`,
      imageUrl: `https://placehold.co/200x200/FF00FF/FFFFFF?text=SOL+SALE+${i + 1}`,
      description: `A top-selling NFT on the Solana network this week.`,
      salePrice: (20 + i * 5).toFixed(2),
      buyer: `0xSOLBuyer${i}def`,
    })),
    topMints: Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `Fresh Mint #${i + 1}`,
      collection: 'New Art Drops',
      imageUrl: `https://placehold.co/150x150/38B2AC/FFFFFF?text=MINT+${i + 1}`,
      mintPrice: (0.05 + i * 0.01).toFixed(3),
      totalMinted: 1000 + i * 50,
      mintDate: `2023-0${(i % 12) + 1}-15`,
      description: `A brand new NFT series just launched, offering unique digital art pieces.`,
    })),
    topSenders: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      address: `0xSender${i}abc...xyz`,
      totalNftsSent: 100 + i * 5,
      totalValueSent: (500 + i * 20).toFixed(2),
      lastActivity: `2023-0${i + 1}-10`,
    })),
    topReceivers: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      address: `0xReceiver${i}def...uvw`,
      totalNftsReceived: 90 + i * 6,
      totalValueReceived: (480 + i * 25).toFixed(2),
      lastActivity: `2023-0${i + 1}-16`,
    })),
    exchangeComparison: [
      { name: 'Magic Eden', price: 21, volume: 500 },
      { name: 'Solanart', price: 20.5, volume: 450 },
      { name: 'OpenSea (Solana)', price: 21.5, volume: 550 },
    ],
    transactionFees: [
      { exchange: 'Magic Eden', fee: 0.02, type: 'Platform' },
      { exchange: 'Solanart', fee: 0.01, type: 'Platform' },
      { exchange: 'OpenSea (Solana)', fee: 0.025, type: 'Platform' },
      { exchange: 'Solana Gas', fee: 0.0001, type: 'Network' },
    ],
    relatedChains: [
      { id: 1, name: 'Ethereum', symbol: 'ETH', price: 3500.00, change: 0.01, imageUrl: 'https://placehold.co/40x40/4A4A4A/FFFFFF?text=ETH' },
      { id: 2, name: 'Polygon', symbol: 'MATIC', price: 0.75, change: 0.02, imageUrl: 'https://placehold.co/40x40/8247E5/FFFFFF?text=P' },
      { id: 3, name: 'BNB Chain', symbol: 'BNB', price: 600.00, change: -0.02, imageUrl: 'https://placehold.co/40x40/F3BA2F/FFFFFF?text=B' },
      { id: 4, name: 'Arbitrum', symbol: 'ARB', price: 1.10, change: -0.01, imageUrl: 'https://placehold.co/40x40/2B374F/FFFFFF?text=A' },
      { id: 5, name: 'Optimism', symbol: 'OP', price: 2.50, change: 0.05, imageUrl: 'https://placehold.co/40x40/FF0420/FFFFFF?text=O' },
      { id: 6, name: 'Avalanche', symbol: 'AVAX', price: 30.00, change: 0.01, imageUrl: 'https://placehold.co/40x40/E84142/FFFFFF?text=AV' },
    ],
  },
];

export const getNftChainData = (chainName) => {
  return nftChainsData.find(chain => chain.name.toLowerCase() === chainName.toLowerCase());
};
