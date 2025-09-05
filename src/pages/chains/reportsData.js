// reportsData.js

// Helper to generate mock data for a given period
const generateMockData = (startDate, numDays, valueFn) => {
  const data = [];
  let currentDate = new Date(startDate);
  for (let i = 0; i < numDays; i++) {
    const dateString = currentDate.toISOString().split('T')[0];
    data.push({
      date: dateString,
      value: valueFn(i),
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return data;
};

// Generate data for the last 365 days (approx 1 year)
const NUM_DAYS = 365;
const START_DATE_ETH = '2023-07-01';
const START_DATE_BNB = '2023-07-01';
const START_DATE_SOL = '2023-07-01';

export const reportsChainsData = [
  {
    name: 'Ethereum',
    logo: 'https://placehold.co/40x40/4A4A4A/FFFFFF?text=ETH',
    reports: {
      transactionVolume: generateMockData(START_DATE_ETH, NUM_DAYS, (i) => Math.floor(1000000 + Math.sin(i / 15) * 500000 + Math.random() * 100000)),
      activeUsers: generateMockData(START_DATE_ETH, NUM_DAYS, (i) => Math.floor(200000 + Math.cos(i / 20) * 100000 + Math.random() * 20000)),
      developerActivity: generateMockData(START_DATE_ETH, NUM_DAYS, (i) => ({
        commits: Math.floor(50 + Math.sin(i / 10) * 20 + Math.random() * 5),
        newContracts: Math.floor(1000 + Math.cos(i / 12) * 300 + Math.random() * 50),
      })),
      tvl: generateMockData(START_DATE_ETH, NUM_DAYS, (i) => parseFloat((50 + Math.sin(i / 30) * 20 + Math.random() * 5).toFixed(2))), // in Billions
      nftSalesVolume: generateMockData(START_DATE_ETH, NUM_DAYS, (i) => Math.floor(500000 + Math.cos(i / 18) * 200000 + Math.random() * 50000)),
    },
  },
  {
    name: 'Binance',
    logo: 'https://placehold.co/40x40/F3BA2F/FFFFFF?text=BNB',
    reports: {
      transactionVolume: generateMockData(START_DATE_BNB, NUM_DAYS, (i) => Math.floor(2000000 + Math.cos(i / 10) * 800000 + Math.random() * 150000)),
      activeUsers: generateMockData(START_DATE_BNB, NUM_DAYS, (i) => Math.floor(400000 + Math.sin(i / 18) * 150000 + Math.random() * 30000)),
      developerActivity: generateMockData(START_DATE_BNB, NUM_DAYS, (i) => ({
        commits: Math.floor(70 + Math.cos(i / 11) * 25 + Math.random() * 7),
        newContracts: Math.floor(1500 + Math.sin(i / 13) * 400 + Math.random() * 70),
      })),
      tvl: generateMockData(START_DATE_BNB, NUM_DAYS, (i) => parseFloat((30 + Math.cos(i / 25) * 15 + Math.random() * 3).toFixed(2))), // in Billions
      nftSalesVolume: generateMockData(START_DATE_BNB, NUM_DAYS, (i) => Math.floor(300000 + Math.sin(i / 16) * 100000 + Math.random() * 30000)),
    },
  },
  {
    name: 'Solana',
    logo: 'https://placehold.co/40x40/00FF00/000000?text=SOL',
    reports: {
      transactionVolume: generateMockData(START_DATE_SOL, NUM_DAYS, (i) => Math.floor(5000000 + Math.sin(i / 8) * 2000000 + Math.random() * 300000)),
      activeUsers: generateMockData(START_DATE_SOL, NUM_DAYS, (i) => Math.floor(300000 + Math.cos(i / 15) * 120000 + Math.random() * 25000)),
      developerActivity: generateMockData(START_DATE_SOL, NUM_DAYS, (i) => ({
        commits: Math.floor(60 + Math.sin(i / 9) * 22 + Math.random() * 6),
        newContracts: Math.floor(1200 + Math.cos(i / 11) * 350 + Math.random() * 60),
      })),
      tvl: generateMockData(START_DATE_SOL, NUM_DAYS, (i) => parseFloat((10 + Math.sin(i / 28) * 5 + Math.random() * 1).toFixed(2))), // in Billions
      nftSalesVolume: generateMockData(START_DATE_SOL, NUM_DAYS, (i) => Math.floor(700000 + Math.cos(i / 14) * 250000 + Math.random() * 60000)),
    },
  },
];

export const getReportsChainData = (chainName) => {
  return reportsChainsData.find(chain => chain.name.toLowerCase() === chainName.toLowerCase());
};

export const getAllChainNames = () => {
  return reportsChainsData.map(chain => chain.name);
};
