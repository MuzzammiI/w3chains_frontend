import { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Mock Data for NFT Collections
import ScrollToTopButton from "../components/ScrollToTopButton";

const initialNftCollections = [
  {
    id: 1,
    name: "CryptoPunks",
    floorPrice: 40.95,
    change1d: 2.4,
    topOffer: null,
    vol1d: 223.27,
    sales1d: 5,
    owners: 3870,
    isNew: false,
    icon: "https://placehold.co/24x24/E0E7FF/000?text=CP",
    banner: "https://placehold.co/1200x200/4F46E5/FFF?text=CryptoPunks+Banner",
    description:
      "CryptoPunks are 10,000 unique collectible characters with proof of ownership stored on the Ethereum blockchain. They were launched in 2017 by Larva Labs and are one of the earliest examples of non-fungible tokens (NFTs).",
    listedItems: 2168,
    uniqueOwners: "126 (5.8%)",
    totalVolume: "353.7K ETH",
    nfts: [
      {
        id: "cp_7938",
        name: "W#7938",
        image: "https://placehold.co/300x300/007bff/fff?text=PUNK+7938",
        price: 44.33,
        owner: "0x0a1...312b",
        lastSale: "38.10 WETH",
        rarity: "Common",
        endingIn: "4 hours",
        traits: [
          { type: "Head", value: "Green" },
          { type: "Eyes", value: "Eyepatch" },
          { type: "Mouth", value: "Smile" },
        ],
        priceHistory: [
          { date: "2023-01-01", price: 30 },
          { date: "2024-01-01", price: 44.33 },
        ],
        blockchainDetails: "Ethereum, Token ID: 7938",
      },
      {
        id: "cp_4449",
        name: "W#4449",
        image: "https://placehold.co/300x300/28a745/fff?text=PUNK+4449",
        price: 63.4,
        owner: "0x0a2...456c",
        lastSale: "55.00 WETH",
        rarity: "Rare",
        endingIn: "2 days",
        traits: [
          { type: "Head", value: "Orange Beanie" },
          { type: "Eyes", value: "Big Shades" },
          { type: "Mouth", value: "Chubby Cheeks" },
        ],
        priceHistory: [
          { date: "2022-06-15", price: 40 },
          { date: "2023-10-20", price: 63.4 },
        ],
        blockchainDetails: "Ethereum, Token ID: 4449",
      },
      {
        id: "cp_9881",
        name: "W#9881",
        image: "https://placehold.co/300x300/ffc107/fff?text=PUNK+9881",
        price: 63.8,
        owner: "0x0a3...789d",
        lastSale: "60.00 WETH",
        rarity: "Uncommon",
        endingIn: "1 day",
        traits: [
          { type: "Head", value: "Bandana" },
          { type: "Eyes", value: "3D Glasses" },
          { type: "Mouth", value: "Smile" },
        ],
        priceHistory: [
          { date: "2023-03-01", price: 50 },
          { date: "2024-02-10", price: 63.8 },
        ],
        blockchainDetails: "Ethereum, Token ID: 9881",
      },
      {
        id: "cp_379",
        name: "W#379",
        image: "https://placehold.co/300x300/dc3545/fff?text=PUNK+379",
        price: 70.0,
        owner: "0x0a4...012e",
        lastSale: "65.00 WETH",
        rarity: "Legendary",
        endingIn: "5 hours",
        traits: [
          { type: "Head", value: "Mohawk Thin" },
          { type: "Eyes", value: "Regular" },
          { type: "Mouth", value: "Frown" },
        ],
        priceHistory: [
          { date: "2023-05-20", price: 60 },
          { date: "2024-04-05", price: 70.0 },
        ],
        blockchainDetails: "Ethereum, Token ID: 379",
      },
      {
        id: "cp_3037",
        name: "W#3037",
        image: "https://placehold.co/300x300/6c757d/fff?text=PUNK+3037",
        price: 85.0,
        owner: "0x0a5...345f",
        lastSale: "80.00 WETH",
        rarity: "Mythic",
        endingIn: "12 hours",
        traits: [
          { type: "Head", value: "Red Hair" },
          { type: "Eyes", value: "Blue Eye Shadow" },
          { type: "Mouth", value: "Regular" },
        ],
        priceHistory: [
          { date: "2023-07-10", price: 75 },
          { date: "2024-06-01", price: 85.0 },
        ],
        blockchainDetails: "Ethereum, Token ID: 3037",
      },
      {
        id: "cp_1234",
        name: "W#1234",
        image: "https://placehold.co/300x300/17a2b8/fff?text=PUNK+1234",
        price: 55.0,
        owner: "0x0a6...678g",
        lastSale: "50.00 WETH",
        rarity: "Uncommon",
        endingIn: "8 hours",
        traits: [
          { type: "Head", value: "Cap Forward" },
          { type: "Eyes", value: "Big Eyes" },
          { type: "Mouth", value: "Open Mouth" },
        ],
        priceHistory: [
          { date: "2023-02-20", price: 45 },
          { date: "2024-01-15", price: 55.0 },
        ],
        blockchainDetails: "Ethereum, Token ID: 1234",
      },
      {
        id: "cp_5678",
        name: "W#5678",
        image: "https://placehold.co/300x300/e83e8c/fff?text=PUNK+5678",
        price: 72.5,
        owner: "0x0a7...901h",
        lastSale: "68.00 WETH",
        rarity: "Rare",
        endingIn: "3 days",
        traits: [
          { type: "Head", value: "Hoodie" },
          { type: "Eyes", value: "Laser Eyes" },
          { type: "Mouth", value: "Smile" },
        ],
        priceHistory: [
          { date: "2023-09-01", price: 60 },
          { date: "2024-05-12", price: 72.5 },
        ],
        blockchainDetails: "Ethereum, Token ID: 5678",
      },
      {
        id: "cp_9101",
        name: "W#9101",
        image: "https://placehold.co/300x300/6f42c1/fff?text=PUNK+9101",
        price: 48.99,
        owner: "0x0a8...234i",
        lastSale: "45.00 WETH",
        rarity: "Common",
        endingIn: "6 hours",
        traits: [
          { type: "Head", value: "Wild Hair" },
          { type: "Eyes", value: "Regular" },
          { type: "Mouth", value: "Vape" },
        ],
        priceHistory: [
          { date: "2023-11-05", price: 40 },
          { date: "2024-03-20", price: 48.99 },
        ],
        blockchainDetails: "Ethereum, Token ID: 9101",
      },
    ],
  },
  {
    id: 2,
    name: "Wrapped Cryptopunks",
    floorPrice: 44.33,
    change1d: 0,
    topOffer: 38.16,
    vol1d: 121.13,
    sales1d: 3,
    owners: 126,
    isNew: false,
    icon: "https://placehold.co/24x24/D1E7DD/000?text=WC",
    banner:
      "https://placehold.co/1200x200/10B981/FFF?text=Wrapped+Punks+Banner",
    description:
      "Wrapped CryptoPunks are ERC-721 tokens that represent ownership of original CryptoPunks, allowing them to be traded on decentralized exchanges like OpenSea.",
    listedItems: 1500,
    uniqueOwners: "80 (10.2%)",
    totalVolume: "200.5K ETH",
    nfts: [
      {
        id: "wcp_111",
        name: "WC#111",
        image: "https://placehold.co/300x300/007bff/fff?text=WCP+111",
        price: 45.0,
        owner: "0x0a9...567j",
        lastSale: "40.00 WETH",
        rarity: "Common",
        endingIn: "1 day",
        traits: [
          { type: "Type", value: "Female" },
          { type: "Hair", value: "Orange Side" },
        ],
        priceHistory: [
          { date: "2023-04-01", price: 38 },
          { date: "2024-02-28", price: 45.0 },
        ],
        blockchainDetails: "Ethereum, Token ID: 111",
      },
      {
        id: "wcp_222",
        name: "WC#222",
        image: "https://placehold.co/300x300/28a745/fff?text=WCP+222",
        price: 50.0,
        owner: "0x0aa...890k",
        lastSale: "48.00 WETH",
        rarity: "Rare",
        endingIn: "6 hours",
        traits: [
          { type: "Type", value: "Male" },
          { type: "Accessory", value: "Cigarette" },
        ],
        priceHistory: [
          { date: "2023-08-10", price: 45 },
          { date: "2024-03-15", price: 50.0 },
        ],
        blockchainDetails: "Ethereum, Token ID: 222",
      },
      {
        id: "wcp_333",
        name: "WC#333",
        image: "https://placehold.co/300x300/ffc107/fff?text=WCP+333",
        price: 48.0,
        owner: "0x0ab...123l",
        lastSale: "45.00 WETH",
        rarity: "Uncommon",
        endingIn: "2 days",
        traits: [
          { type: "Type", value: "Zombie" },
          { type: "Beard", value: "Big Beard" },
        ],
        priceHistory: [
          { date: "2023-01-20", price: 40 },
          { date: "2024-01-05", price: 48.0 },
        ],
        blockchainDetails: "Ethereum, Token ID: 333",
      },
    ],
  },
  {
    id: 3,
    name: "Pudgy Penguins",
    floorPrice: 8.82,
    change1d: -1.8,
    topOffer: 8.71,
    vol1d: 83.84,
    sales1d: 9,
    owners: 4979,
    isNew: false,
    icon: "https://placehold.co/24x24/FBE8A0/000?text=PP",
    banner:
      "https://placehold.co/1200x200/FACC15/000?text=Pudgy+Penguins+Banner",
    description:
      "Pudgy Penguins are a collection of 8,888 unique NFTs on the Ethereum blockchain. They represent a community-driven project with a focus on web3 innovation.",
    listedItems: 500,
    uniqueOwners: "4000 (80%)",
    totalVolume: "75.0K ETH",
    nfts: [
      {
        id: "pp_1",
        name: "PP#1",
        image: "https://placehold.co/300x300/007bff/fff?text=PP+1",
        price: 9.0,
        owner: "0x0ac...456m",
        lastSale: "8.50 WETH",
        rarity: "Rare",
        endingIn: "1 day",
        traits: [
          { type: "Head", value: "Fisherman Hat" },
          { type: "Body", value: "Sweater" },
        ],
        priceHistory: [
          { date: "2023-03-01", price: 8 },
          { date: "2024-01-01", price: 9.0 },
        ],
        blockchainDetails: "Ethereum, Token ID: 1",
      },
      {
        id: "pp_2",
        name: "PP#2",
        image: "https://placehold.co/300x300/28a745/fff?text=PP+2",
        price: 9.5,
        owner: "0x0ad...789n",
        lastSale: "9.00 WETH",
        rarity: "Common",
        endingIn: "5 hours",
        traits: [
          { type: "Head", value: "Crown" },
          { type: "Body", value: "Scarf" },
        ],
        priceHistory: [
          { date: "2023-06-10", price: 9 },
          { date: "2024-04-15", price: 9.5 },
        ],
        blockchainDetails: "Ethereum, Token ID: 2",
      },
      {
        id: "pp_3",
        name: "PP#3",
        image: "https://placehold.co/300x300/ffc107/fff?text=PP+3",
        price: 8.8,
        owner: "0x0ae...012o",
        lastSale: "8.60 WETH",
        rarity: "Uncommon",
        endingIn: "10 hours",
        traits: [
          { type: "Head", value: "None" },
          { type: "Body", value: "Vest" },
        ],
        priceHistory: [
          { date: "2023-09-20", price: 8.5 },
          { date: "2024-05-01", price: 8.8 },
        ],
        blockchainDetails: "Ethereum, Token ID: 3",
      },
    ],
  },
  {
    id: 4,
    name: "Milady Maker",
    floorPrice: 1.9939,
    change1d: -0.8,
    topOffer: 1.96,
    vol1d: 70.63,
    sales1d: 31,
    owners: 5255,
    isNew: false,
    icon: "https://placehold.co/24x24/CCE5FF/000?text=MM",
    banner: "https://placehold.co/1200x200/93C5FD/000?text=Milady+Maker+Banner",
    description:
      "Milady Maker is a collection of 10,000 PFP NFTs. Known for their distinct aesthetic and strong community.",
    listedItems: 800,
    uniqueOwners: "4800 (90%)",
    totalVolume: "150.0K ETH",
    nfts: [
      {
        id: "mm_1",
        name: "MM#1",
        image: "https://placehold.co/300x300/007bff/fff?text=MM+1",
        price: 2.0,
        owner: "0x0af...345p",
        lastSale: "1.90 WETH",
        rarity: "Rare",
        endingIn: "1 day",
        traits: [
          { type: "Hair", value: "Long" },
          { type: "Accessory", value: "Glasses" },
        ],
        priceHistory: [
          { date: "2023-02-01", price: 1.8 },
          { date: "2024-01-01", price: 2.0 },
        ],
        blockchainDetails: "Ethereum, Token ID: 1",
      },
      {
        id: "mm_2",
        name: "MM#2",
        image: "https://placehold.co/300x300/28a745/fff?text=MM+2",
        price: 2.1,
        owner: "0x0b0...678q",
        lastSale: "2.00 WETH",
        rarity: "Common",
        endingIn: "8 hours",
        traits: [
          { type: "Hair", value: "Short" },
          { type: "Expression", value: "Smiling" },
        ],
        priceHistory: [
          { date: "2023-05-10", price: 2 },
          { date: "2024-03-20", price: 2.1 },
        ],
        blockchainDetails: "Ethereum, Token ID: 2",
      },
      {
        id: "mm_3",
        name: "MM#3",
        image: "https://placehold.co/300x300/ffc107/fff?text=MM+3",
        price: 1.95,
        owner: "0x0b1...901r",
        lastSale: "1.90 WETH",
        rarity: "Uncommon",
        endingIn: "15 hours",
        traits: [
          { type: "Hair", value: "Pigtails" },
          { type: "Accessory", value: "Headband" },
        ],
        priceHistory: [
          { date: "2023-07-25", price: 1.85 },
          { date: "2024-04-10", price: 1.95 },
        ],
        blockchainDetails: "Ethereum, Token ID: 3",
      },
    ],
  },
  {
    id: 5,
    name: "Larvva Lads",
    floorPrice: 0.0037,
    change1d: 10.9,
    topOffer: 0.0036,
    vol1d: 67.1,
    sales1d: 19647,
    owners: 4643,
    isNew: false,
    icon: "https://placehold.co/24x24/FFDDC1/000?text=LL",
    banner: "https://placehold.co/1200x200/FDBA74/000?text=Larvva+Lads+Banner",
    description:
      "Larvva Lads are an experimental NFT project exploring generative art.",
    listedItems: 25000,
    uniqueOwners: "4000 (87%)",
    totalVolume: "80.0 ETH",
    nfts: [
      {
        id: "ll_1",
        name: "LL#1",
        image: "https://placehold.co/300x300/007bff/fff?text=LL+1",
        price: 0.004,
        owner: "0x0b2...234s",
        lastSale: "0.0035 WETH",
        rarity: "Common",
        endingIn: "1 day",
        traits: [
          { type: "Background", value: "Blue" },
          { type: "Shape", value: "Circle" },
        ],
        priceHistory: [
          { date: "2023-01-01", price: 0.003 },
          { date: "2024-01-01", price: 0.004 },
        ],
        blockchainDetails: "Ethereum, Token ID: 1",
      },
      {
        id: "ll_2",
        name: "LL#2",
        image: "https://placehold.co/300x300/28a745/fff?text=LL+2",
        price: 0.0042,
        owner: "0x0b3...567t",
        lastSale: "0.0038 WETH",
        rarity: "Uncommon",
        endingIn: "12 hours",
        traits: [
          { type: "Background", value: "Green" },
          { type: "Shape", value: "Square" },
        ],
        priceHistory: [
          { date: "2023-03-15", price: 0.0035 },
          { date: "2024-02-20", price: 0.0042 },
        ],
        blockchainDetails: "Ethereum, Token ID: 2",
      },
    ],
  },
  {
    id: 6,
    name: "Sylix Genesis Ca... NEW",
    floorPrice: 0.0232,
    change1d: 0,
    topOffer: 0.0188,
    vol1d: 62.19,
    sales1d: 1805,
    owners: 484,
    isNew: true,
    icon: "https://placehold.co/24x24/C1F0C1/000?text=SG",
    banner:
      "https://placehold.co/1200x200/6EE7B7/000?text=Sylix+Genesis+Banner",
    description:
      "Sylix Genesis is a brand new collection aiming to push the boundaries of digital art.",
    listedItems: 2000,
    uniqueOwners: "450 (93%)",
    totalVolume: "50.0 ETH",
    nfts: [
      {
        id: "sg_1",
        name: "SG#1",
        image: "https://placehold.co/300x300/007bff/fff?text=SG+1",
        price: 0.025,
        owner: "0x0b4...890u",
        lastSale: "0.022 WETH",
        rarity: "Rare",
        endingIn: "1 day",
        traits: [
          { type: "Element", value: "Fire" },
          { type: "Form", value: "Crystal" },
        ],
        priceHistory: [
          { date: "2023-05-01", price: 0.02 },
          { date: "2024-01-01", price: 0.025 },
        ],
        blockchainDetails: "Ethereum, Token ID: 1",
      },
      {
        id: "sg_2",
        name: "SG#2",
        image: "https://placehold.co/300x300/28a745/fff?text=SG+2",
        price: 0.023,
        owner: "0x0b5...123v",
        lastSale: "0.020 WETH",
        rarity: "Common",
        endingIn: "6 hours",
        traits: [
          { type: "Element", value: "Water" },
          { type: "Form", value: "Liquid" },
        ],
        priceHistory: [
          { date: "2023-08-20", price: 0.021 },
          { date: "2024-03-10", price: 0.023 },
        ],
        blockchainDetails: "Ethereum, Token ID: 2",
      },
    ],
  },
  {
    id: 7,
    name: "Bored Ape Yacht Club",
    floorPrice: 11.63,
    change1d: 0.4,
    topOffer: 11.16,
    vol1d: 57.3,
    sales1d: 5,
    owners: 5497,
    isNew: false,
    icon: "https://placehold.co/24x24/E0E0E0/000?text=BA",
    banner: "https://placehold.co/1200x200/C0C0C0/000?text=Bored+Ape+Banner",
    description:
      "Bored Ape Yacht Club (BAYC) is a collection of 10,000 unique Bored Ape NFTs—unique digital collectibles living on the Ethereum blockchain.",
    listedItems: 1000,
    uniqueOwners: "5000 (91%)",
    totalVolume: "800.0K ETH",
    nfts: [
      {
        id: "bayc_1",
        name: "BAYC#1",
        image: "https://placehold.co/300x300/007bff/fff?text=BAYC+1",
        price: 12.0,
        owner: "0x0b6...456w",
        lastSale: "11.00 WETH",
        rarity: "Rare",
        endingIn: "1 day",
        traits: [
          { type: "Fur", value: "Blue" },
          { type: "Mouth", value: "Grin" },
        ],
        priceHistory: [
          { date: "2023-02-01", price: 10 },
          { date: "2024-01-01", price: 12.0 },
        ],
        blockchainDetails: "Ethereum, Token ID: 1",
      },
      {
        id: "bayc_2",
        name: "BAYC#2",
        image: "https://placehold.co/300x300/28a745/fff?text=BAYC+2",
        price: 11.5,
        owner: "0x0b7...789x",
        lastSale: "10.50 WETH",
        rarity: "Common",
        endingIn: "10 hours",
        traits: [
          { type: "Fur", value: "Brown" },
          { type: "Eyes", value: "Sad" },
        ],
        priceHistory: [
          { date: "2023-07-15", price: 10.5 },
          { date: "2024-04-01", price: 11.5 },
        ],
        blockchainDetails: "Ethereum, Token ID: 2",
      },
    ],
  },
  {
    id: 8,
    name: "Replicandy by Ma... NEW",
    floorPrice: 0.0035,
    change1d: -93.2,
    topOffer: 0.0031,
    vol1d: 53.84,
    sales1d: 4309,
    owners: 822,
    isNew: true,
    icon: "https://placehold.co/24x24/D9EDF7/000?text=RM",
    banner: "https://placehold.co/1200x200/BFDBFE/000?text=Replicandy+Banner",
    description:
      "Replicandy by Manifold is a generative art collection pushing the boundaries of on-chain aesthetics.",
    listedItems: 5000,
    uniqueOwners: "700 (85%)",
    totalVolume: "40.0 ETH",
    nfts: [
      {
        id: "rc_1",
        name: "RC#1",
        image: "https://placehold.co/300x300/007bff/fff?text=RC+1",
        price: 0.0038,
        owner: "0x0b8...012y",
        lastSale: "0.0033 WETH",
        rarity: "Common",
        endingIn: "1 day",
        traits: [
          { type: "Color", value: "Red" },
          { type: "Pattern", value: "Stripes" },
        ],
        priceHistory: [
          { date: "2023-01-01", price: 0.003 },
          { date: "2024-01-01", price: 0.0038 },
        ],
        blockchainDetails: "Ethereum, Token ID: 1",
      },
      {
        id: "rc_2",
        name: "RC#2",
        image: "https://placehold.co/300x300/28a745/fff?text=RC+2",
        price: 0.0032,
        owner: "0x0b9...345z",
        lastSale: "0.0028 WETH",
        rarity: "Rare",
        endingIn: "8 hours",
        traits: [
          { type: "Color", value: "Green" },
          { type: "Pattern", value: "Dots" },
        ],
        priceHistory: [
          { date: "2023-04-10", price: 0.0025 },
          { date: "2024-02-15", price: 0.0032 },
        ],
        blockchainDetails: "Ethereum, Token ID: 2",
      },
    ],
  },
  {
    id: 9,
    name: "Otherdeed for Otherside",
    floorPrice: 0.1774,
    change1d: 7.4,
    topOffer: 0.161,
    vol1d: 44.57,
    sales1d: 26,
    owners: 14484,
    isNew: false,
    icon: "https://placehold.co/24x24/FFE0B2/000?text=OO",
    banner: "https://placehold.co/1200x200/FED7AA/000?text=Otherside+Banner",
    description:
      "Otherdeed for Otherside are dynamic NFTs that represent plots of land in the Otherside metaverse, Yuga Labs upcoming MMORPG.",
    listedItems: 3000,
    uniqueOwners: "14000 (96%)",
    totalVolume: "200.0K ETH",
    nfts: [
      {
        id: "oo_1",
        name: "OO#1",
        image: "https://placehold.co/300x300/007bff/fff?text=OO+1",
        price: 0.18,
        owner: "0x0ba...678a",
        lastSale: "0.16 WETH",
        rarity: "Common",
        endingIn: "2 days",
        traits: [
          { type: "Environment", value: "Swamp" },
          { type: "Sediment", value: "Acid" },
        ],
        priceHistory: [
          { date: "2023-03-01", price: 0.15 },
          { date: "2024-01-01", price: 0.18 },
        ],
        blockchainDetails: "Ethereum, Token ID: 1",
      },
      {
        id: "oo_2",
        name: "OO#2",
        image: "https://placehold.co/300x300/28a745/fff?text=OO+2",
        price: 0.175,
        owner: "0x0bb...901b",
        lastSale: "0.15 WETH",
        rarity: "Rare",
        endingIn: "1 day",
        traits: [
          { type: "Environment", value: "Volcano" },
          { type: "Sediment", value: "Lava" },
        ],
        priceHistory: [
          { date: "2023-06-20", price: 0.16 },
          { date: "2024-04-05", price: 0.175 },
        ],
        blockchainDetails: "Ethereum, Token ID: 2",
      },
    ],
  },
  {
    id: 10,
    name: "Mutant Ape Yacht Club",
    floorPrice: 1.8454,
    change1d: -0.6,
    topOffer: 1.8,
    vol1d: 40.98,
    sales1d: 22,
    owners: 11812,
    isNew: false,
    icon: "https://placehold.co/24x24/C8E6C9/000?text=MA",
    banner: "https://placehold.co/1200x200/A7F3D0/000?text=Mutant+Ape+Banner",
    description:
      "The Mutant Ape Yacht Club (MAYC) is a collection of up to 20,000 Mutant Apes that can only be created by exposing an existing Bored Ape to a vial of MUTANT SERUM or by minting a Mutant Ape in the public sale.",
    listedItems: 2500,
    uniqueOwners: "11000 (93%)",
    totalVolume: "150.0K ETH",
    nfts: [
      {
        id: "mayc_1",
        name: "MAYC#1",
        image: "https://placehold.co/300x300/007bff/fff?text=MAYC+1",
        price: 1.85,
        owner: "0x0bc...234c",
        lastSale: "1.75 WETH",
        rarity: "Rare",
        endingIn: "1 day",
        traits: [
          { type: "Mouth", value: "Vomit" },
          { type: "Eyes", value: "Mutant" },
        ],
        priceHistory: [
          { date: "2023-01-01", price: 1.7 },
          { date: "2024-01-01", price: 1.85 },
        ],
        blockchainDetails: "Ethereum, Token ID: 1",
      },
      {
        id: "mayc_2",
        name: "MAYC#2",
        image: "https://placehold.co/300x300/28a745/fff?text=MAYC+2",
        price: 1.8,
        owner: "0x0bd...567d",
        lastSale: "1.70 WETH",
        rarity: "Common",
        endingIn: "12 hours",
        traits: [
          { type: "Mouth", value: "Grin" },
          { type: "Eyes", value: "Zombie" },
        ],
        priceHistory: [
          { date: "2023-05-15", price: 1.7 },
          { date: "2024-03-25", price: 1.8 },
        ],
        blockchainDetails: "Ethereum, Token ID: 2",
      },
    ],
  },
];

// Reusable Button Component with hover effects
const DashboardButton = ({
  children,
  isActive = false,
  onClick = () => {},
  disabled = false,
  className = "",
}) => (
  <button
    className={`lg:px-4 lg:py-2 px-3   py-1 rounded-lg cursor-pointer text-sm font-medium transition-all duration-300
      ${
        isActive
          ? "bg-purple-600 text-white shadow-lg"
          : "bg-purple-900 text-gray-300 hover:bg-purple-600 hover:text-white"
      }
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
      ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      ${className}`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

DashboardButton.propTypes = {
  children: PropTypes.node.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

// Icon for starred items
const StarIcon = ({ isStarred, onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-5 w-5 cursor-pointer transition-colors duration-200 ${
      isStarred ? "text-yellow-400" : "text-gray-500 hover:text-yellow-300"
    }`}
    viewBox="0 0 20 20"
    fill="currentColor"
    onClick={onClick}
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.92 8.725c-.783-.57-.381-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

StarIcon.propTypes = {
  isStarred: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

// Custom chevron icon for expand/collapse
const ChevronIcon = ({ direction }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-5 w-5 transform transition-transform duration-300 ${
      direction === "up" ? "rotate-180" : "rotate-0"
    }`}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

ChevronIcon.propTypes = {
  direction: PropTypes.string.isRequired,
};

// Individual NFT Detail Page Component
const NFTDetailPage = ({
  nft,
  collectionName,
  onBackToCollection,
  onNextNFT,
  onPrevNFT,
}) => {
  const [activeTab, setActiveTab] = useState("Details");
  const [triggerAnimation, setTriggerAnimation] = useState(false); // For page transitions

  useEffect(() => {
    setTriggerAnimation(false);
    setTimeout(() => setTriggerAnimation(true), 50);
  }, [nft]);

  if (!nft) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-400">
        NFT not found.
      </div>
    );
  }

  return (
    <div
      className={`w-full max-w-7xl bg-purple-800 rounded-xl shadow-2xl p-6 md:p-8 space-y-6 overflow-hidden ${
        triggerAnimation ? "animate-fade-in" : ""
      }`}
    >
      {/* Top Bar for Navigation */}
      <div className="flex justify-between items-center pb-4 border-b">
        <button
          onClick={onBackToCollection}
          className="flex items-center text-gray-300 hover:text-purple-400 transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Back to Collection
        </button>
        <div className="flex items-center space-x-2">
          <DashboardButton onClick={onPrevNFT} className="px-3 py-1 text-sm">
            Prev NFT
          </DashboardButton>
          <DashboardButton onClick={onNextNFT} className="px-3 py-1 text-sm">
            Next NFT
          </DashboardButton>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Section: NFT Image */}
        <div className="lg:w-1/2 flex justify-center items-center bg-purple-700 rounded-lg p-4 shadow-md">
          <img
            src={nft.image}
            alt={nft.name}
            className="w-full max-w-md h-auto rounded-lg object-contain"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/400x400/555/FFF?text=NFT+Image";
            }}
          />
        </div>

        {/* Right Section: NFT Details */}
        <div className="lg:w-1/2 space-y-6">
          <h2 className="text-3xl font-bold text-white">{nft.name}</h2>
          <div className="text-gray-400 text-sm flex items-center space-x-2">
            <span>
              Owned by <span className="text-blue-400">{nft.owner}</span>
            </span>
            {/* Add more icons as per the figure */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.879a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.102 1.101"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              />
            </svg>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-300">
            <span className="bg-purple-700 px-3 py-1 rounded-full">
              ERC-721
            </span>
            <span className="bg-purple-700 px-3 py-1 rounded-full flex items-center">
              <img
                src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1696501628"
                alt="ETH"
                className="h-4 w-4 mr-1"
              />
              Ethereum
            </span>
            <span className="bg-purple-700 px-3 py-1 rounded-full">
              Token #{nft.blockchainDetails.split(": ")[1]}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 bg-purple-700 p-4 rounded-lg shadow-inner">
            <div className="flex flex-col">
              <span className="text-gray-400 text-xs uppercase">TOP OFFER</span>
              <span className="text-lg font-semibold text-white">
                {nft.lastSale}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-400 text-xs uppercase">
                COLLECTION FLOOR
              </span>
              <span className="text-lg font-semibold text-white">
                {collectionName.floorPrice} ETH
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-400 text-xs uppercase">RARITY</span>
              <span className="text-lg font-semibold text-white">
                {nft.rarity}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-400 text-xs uppercase">LAST SALE</span>
              <span className="text-lg font-semibold text-white">
                {nft.lastSale}
              </span>
            </div>
          </div>

          <div className="bg-purple-700 p-4 rounded-lg shadow-inner">
            <p className="text-gray-400 text-xs uppercase">BUY FOR</p>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-white">
                {nft.price} ETH
              </span>
              <span className="text-green-400 text-sm">
                (${(nft.price * 2000 * 1.1).toFixed(2)})
              </span>{" "}
              {/* Random USD equivalent */}
              <span className="text-gray-400 text-sm">
                LISTING ENDING IN {nft.endingIn.toUpperCase()}
              </span>
            </div>
            <div className="flex space-x-4 mt-4">
              <DashboardButton className="flex-1 py-3 bg-blue-600 text-white hover:bg-blue-700">
                Buy now
              </DashboardButton>
              <DashboardButton className="flex-1 py-3 bg-purple-600 text-gray-200 hover:bg-purple-500">
                Make offer
              </DashboardButton>
            </div>
          </div>

          {/* Collapsible Sections (Accordion) */}
          <AccordionItem
            title="Details"
            content={
              <p className="text-gray-300">
                This is a unique NFT from the {collectionName.name} collection.
                It features{" "}
                {nft.traits.map((t) => `${t.type}: ${t.value}`).join(", ")}.
                This NFT is a digital collectible with provable ownership on the
                blockchain.
              </p>
            }
            defaultOpen={true}
          />
          <AccordionItem
            title="Orders"
            content={
              <p className="text-gray-300">No active orders for this NFT.</p>
            }
          />
          <AccordionItem
            title="Activity"
            content={
              <p className="text-gray-300">No recent activity for this NFT.</p>
            }
          />
          <AccordionItem
            title="Traits"
            content={
              <div className="grid grid-cols-2 gap-2 text-gray-300">
                {nft.traits.map((trait, index) => (
                  <div
                    key={index}
                    className="bg-purple-700 p-3 rounded-lg flex flex-col items-center"
                  >
                    <span className="text-gray-400 text-xs">{trait.type}</span>
                    <span className="font-medium text-white">
                      {trait.value}
                    </span>
                  </div>
                ))}
              </div>
            }
          />
          <AccordionItem
            title="Price history"
            content={
              <div className="text-gray-300">
                {nft.priceHistory.map((history, index) => (
                  <p key={index}>
                    {history.date}: {history.price} ETH
                  </p>
                ))}
              </div>
            }
          />
          <AccordionItem
            title="About"
            content={
              <p className="text-gray-300">{collectionName.description}</p>
            }
          />
          <AccordionItem
            title="Blockchain details"
            content={<p className="text-gray-300">{nft.blockchainDetails}</p>}
          />
          <AccordionItem
            title="More from this collection"
            content={
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {collectionName.nfts
                  .filter((item) => item.id !== nft.id)
                  .slice(0, 3)
                  .map((relatedNft) => (
                    <div
                      key={relatedNft.id}
                      className="bg-purple-700 rounded-lg overflow-hidden shadow-lg"
                    >
                      <img
                        src={relatedNft.image}
                        alt={relatedNft.name}
                        className="w-full h-24 object-cover"
                      />
                      <div className="p-2 text-center text-sm text-gray-300">
                        {relatedNft.name}
                      </div>
                    </div>
                  ))}
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

NFTDetailPage.propTypes = {
  nft: PropTypes.object.isRequired,
  collectionName: PropTypes.object.isRequired,
  onBackToCollection: PropTypes.func.isRequired,
  onNextNFT: PropTypes.func.isRequired,
  onPrevNFT: PropTypes.func.isRequired,
};

// Accordion Item Component
const AccordionItem = ({ title, content, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden">
      <button
        className="w-full flex justify-between items-center p-4 text-left text-gray-200 bg-purple-900 hover:bg-purple-600 focus:outline-none transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold">{title}</span>
        <ChevronIcon direction={isOpen ? "up" : "down"} />
      </button>
      <div className={`accordion-item ${isOpen ? "open" : ""}`}>
        <div className="p-4 bg-purple-800 border-t border-gray-700">
          {content}
        </div>
      </div>
    </div>
  );
};

AccordionItem.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  defaultOpen: PropTypes.bool,
};

const CollectionDetailPage = ({
  collection,
  onBack,
  onNextCollection,
  onPrevCollection,
  onNFTClick,
}) => {
  const [activeTab, setActiveTab] = useState("Offers");
  const [triggerAnimation, setTriggerAnimation] = useState(false); // For page transitions

  useEffect(() => {
    // Trigger animation when component mounts or collection changes
    setTriggerAnimation(false);
    setTimeout(() => setTriggerAnimation(true), 50);
  }, [collection]); // Re-run animation if collection prop changes

  if (!collection) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-400">
        Collection not found.
      </div>
    );
  }

  return (
    <div
      className={`w-full max-w-7xl bg-purple-900 rounded-xl shadow-2xl p-6 md:p-8 space-y-6 overflow-hidden ${
        triggerAnimation ? "animate-fade-in" : ""
      }`}
    >
      {/* Top Bar for Navigation and Wallet */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-500">
        <button
          onClick={onBack}
          className="flex items-center cursor-pointer border p-2 rounded-lg hover:bg-purple-500 hover:text-black text-gray-300 transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Back to Dashboard
        </button>
        <div className="flex items-center space-x-2">
          <DashboardButton
            onClick={onPrevCollection}
            className="px-3 py-1 text-sm"
          >
            Prev Collection
          </DashboardButton>
          <DashboardButton
            onClick={onNextCollection}
            className="px-3 py-1 text-sm"
          >
            Next Collection
          </DashboardButton>
          <DashboardButton>Connect Wallet</DashboardButton>
        </div>
      </div>

      {/* Banner and Collection Header */}
      <div className="relative rounded-lg overflow-hidden mb-6">
        <img
          src={collection.banner}
          alt={`${collection.name} Banner`}
          className="w-full h-40 md:h-56 object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://placehold.co/1200x200/3B82F6/FFF?text=${collection.name}+Banner`;
          }}
        />
        <div className="absolute bottom-4 left-4 flex items-center bg-purple-900 bg-opacity-70 rounded-full p-2 pr-4 shadow-lg">
          <img
            src={collection.icon}
            alt={`${collection.name} icon`}
            className="h-16 w-16 rounded-full object-cover border-4 border-purple-800"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/64x64/333/FFF?text=NFT";
            }}
          />
          <h1 className="ml-3 text-3xl font-bold text-white drop-shadow-lg">
            {collection.name}
          </h1>
        </div>
      </div>

      {/* Collection Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6 bg-purple-700 p-4 rounded-lg shadow-inner">
        <div className="flex flex-col items-center p-2 rounded-md bg-purple-600">
          <span className="text-gray-300 text-xs">FLOOR PRICE</span>
          <span className="text-lg font-semibold text-white">
            {collection.floorPrice} ETH
          </span>
        </div>
        <div className="flex flex-col items-center p-2 rounded-md bg-purple-600">
          <span className="text-gray-300 text-xs">TOP OFFER</span>
          <span className="text-lg font-semibold text-white">
            {collection.topOffer ? `${collection.topOffer} WETH` : "-"}
          </span>
        </div>
        <div className="flex flex-col items-center p-2 rounded-md bg-purple-600">
          <span className="text-gray-300 text-xs">TOTAL VOLUME</span>
          <span className="text-lg font-semibold text-white">
            {collection.totalVolume}
          </span>
        </div>
        <div className="flex flex-col items-center p-2 rounded-md bg-purple-600">
          <span className="text-gray-300 text-xs">LISTED ITEMS</span>
          <span className="text-lg font-semibold text-white">
            {collection.listedItems}
          </span>
        </div>
        <div className="flex flex-col items-center p-2 rounded-md bg-purple-600">
          <span className="text-gray-300 text-xs">OWNERS (UNIQUE)</span>
          <span className="text-lg font-semibold text-white">
            {collection.owners} ({collection.uniqueOwners})
          </span>
        </div>
      </div>

      {/* Tabs for Offers, Holders, etc. */}
      <div className="flex space-x-4 border-b border-purple-600 mb-6">
        {["Offers", "Holders", "Traits", "Activity", "About"].map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 cursor-pointer text-sm font-medium transition-colors duration-200
              ${
                activeTab === tab
                  ? "text-purple-400 border-b-2 border-purple-400"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content based on active tab */}
      <div>
        {activeTab === "Offers" && (
          <div className="space-y-6">
            <p className="text-gray-300">{collection.description}</p>
            {/* Search and Sort for NFTs */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <input
                type="text"
                placeholder="Search by Item or trait"
                className="w-full sm:w-1/2 bg-purple-600 rounded-lg py-2 px-4 text-gray-200 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
              />
              <select className="w-full sm:w-auto cursor-pointer bg-purple-600 rounded-lg py-2 px-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200">
                <option>Price low to high</option>
                <option>Price high to low</option>
                <option>Recently listed</option>
              </select>
            </div>
            <p className="text-gray-300">{collection.nfts.length} ITEMS</p>

            {/* NFT Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {collection.nfts.map((nft) => (
                <div
                  key={nft.id}
                  className="bg-green-mix rounded-lg overflow-hidden shadow-lg transition-all duration-300 transform nft-card-hover cursor-pointer"
                  onClick={() => onNFTClick(nft.id)} // Handle click to show individual NFT detail
                >
                  <img
                    src={nft.image}
                    alt={nft.name}
                    className="w-full h-48 object-cover border-b border-gray-600"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://placehold.co/200x200/444/FFF?text=NFT";
                    }}
                  />
                  <div className="p-4">
                    <h3 className="text-gray-50 font-semibold text-lg mb-1">
                      {nft.name}
                    </h3>
                    <p className="text-gray-300 text-sm mb-3">
                      {nft.price} ETH
                    </p>
                    <DashboardButton className="w-full text-center">
                      Buy now
                    </DashboardButton>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === "Holders" && (
          <div className="p-4 text-gray-300">
            Holders information will be displayed here.
          </div>
        )}
        {activeTab === "Traits" && (
          <div className="p-4 text-gray-300">
            Traits details will be displayed here.
          </div>
        )}
        {activeTab === "Activity" && (
          <div className="p-4 text-gray-300">
            Recent activity logs will be shown here.
          </div>
        )}
        {activeTab === "About" && (
          <div className="p-4 text-gray-300">{collection.description}</div>
        )}
      </div>
    </div>
  );
};

CollectionDetailPage.propTypes = {
  collection: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
  onNextCollection: PropTypes.func.isRequired,
  onPrevCollection: PropTypes.func.isRequired,
  onNFTClick: PropTypes.func.isRequired,
};

const NFTShow = () => {
  const [activeSubTab, setActiveSubTab] = useState("Top");
  const [activeTimeframe, setActiveTimeframe] = useState("1d");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedChain, setSelectedChain] = useState("All");
  const [searchChain, setSearchChain] = useState("");
  const [isCategoryExpanded, setIsCategoryExpanded] = useState(true);
  const [isChainsExpanded, setIsChainsExpanded] = useState(true);
  const [nftCollections, setNftCollections] = useState(initialNftCollections);

  // Pagination states for the main dashboard
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; // Display 20 items per page
  const [triggerTableAnimation, setTriggerTableAnimation] = useState(false);

  // State for showing collection detail page
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);
  // State for showing individual NFT detail page
  const [selectedNftId, setSelectedNftId] = useState(null);

  // Categories for filtering
  const categories = [
    "All",
    "Art",
    "Gaming",
    "Memberships",
    "Music",
    "PFPs",
    "Photography",
    "Domain Names",
    "Sports",
    "Collectibles",
    "Virtual Worlds",
  ];
  const chains = [
    "All",
    "Ethereum",
    "Abstract",
    "ApeChain",
    "Arbitrum",
    "Avalanche",
    "B3",
    "Base",
    "Berachain",
    "Blast",
    "Flow",
    "Optimism",
    "Polygon",
  ];

  // Filtered collections based on category and chain (for dashboard view)
  const filteredCollections = nftCollections.filter((collection) => {
    // Simplified check for mock data, assuming categories and chains can be matched directly or if 'All' is selected
    const matchesCategory =
      selectedCategory === "All" || categories.includes(selectedCategory);
    // Note: Mock data doesn't have a 'chain' property for collections, so this filter is conceptual for now.
    const matchesChain =
      selectedChain === "All" || collection.chain === selectedChain;
    return matchesCategory && matchesChain;
  });

  // Calculate items for current page on dashboard
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDashboardItems = filteredCollections.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredCollections.length / itemsPerPage);

  // Function to toggle star status
  const toggleStar = (id) => {
    setNftCollections((prevCollections) =>
      prevCollections.map((collection) =>
        collection.id === id
          ? { ...collection, isStarred: !collection.isStarred }
          : collection
      )
    );
  };

  // Function to go to the next page on the dashboard
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
      triggerAnimationEffect();
    }
  };

  // Function to go to the previous page on the dashboard
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      triggerAnimationEffect();
    }
  };

  // Function to trigger the table animation on dashboard
  const triggerAnimationEffect = () => {
    setTriggerTableAnimation(false); // Reset animation
    setTimeout(() => setTriggerTableAnimation(true), 50); // Re-trigger after a short delay
  };

  // Trigger animation on initial load
  useEffect(() => {
    triggerAnimationEffect();
  }, []);

  // --- Logic for Collection Detail Page Navigation ---
  const handleCollectionClick = (collectionId) => {
    setSelectedCollectionId(collectionId);
    setSelectedNftId(null); // Ensure no individual NFT is selected when viewing collection
  };

  const handleBackToDashboard = () => {
    setSelectedCollectionId(null);
    setSelectedNftId(null);
  };

  const handleNextCollection = () => {
    const currentIndex = nftCollections.findIndex(
      (col) => col.id === selectedCollectionId
    );
    if (currentIndex !== -1 && currentIndex < nftCollections.length - 1) {
      setSelectedCollectionId(nftCollections[currentIndex + 1].id);
    } else if (currentIndex === nftCollections.length - 1) {
      // Loop back to the first collection
      setSelectedCollectionId(nftCollections[0].id);
    }
    setSelectedNftId(null); // Reset NFT selection
  };

  const handlePrevCollection = () => {
    const currentIndex = nftCollections.findIndex(
      (col) => col.id === selectedCollectionId
    );
    if (currentIndex !== -1 && currentIndex > 0) {
      setSelectedCollectionId(nftCollections[currentIndex - 1].id);
    } else if (currentIndex === 0) {
      // Loop back to the last collection
      setSelectedCollectionId(nftCollections[nftCollections.length - 1].id);
    }
    setSelectedNftId(null); // Reset NFT selection
  };

  const currentCollection = selectedCollectionId
    ? nftCollections.find((col) => col.id === selectedCollectionId)
    : null;

  // --- Logic for Individual NFT Detail Page Navigation ---
  const handleNFTClick = (nftId) => {
    setSelectedNftId(nftId);
  };

  const handleBackToCollection = () => {
    setSelectedNftId(null);
  };

  const handleNextNFT = () => {
    if (!currentCollection || !currentCollection.nfts) return;
    const currentIndex = currentCollection.nfts.findIndex(
      (nft) => nft.id === selectedNftId
    );
    if (
      currentIndex !== -1 &&
      currentIndex < currentCollection.nfts.length - 1
    ) {
      setSelectedNftId(currentCollection.nfts[currentIndex + 1].id);
    } else if (currentIndex === currentCollection.nfts.length - 1) {
      // Loop back to the first NFT in the current collection
      setSelectedNftId(currentCollection.nfts[0].id);
    }
  };

  const handlePrevNFT = () => {
    if (!currentCollection || !currentCollection.nfts) return;
    const currentIndex = currentCollection.nfts.findIndex(
      (nft) => nft.id === selectedNftId
    );
    if (currentIndex !== -1 && currentIndex > 0) {
      setSelectedNftId(currentCollection.nfts[currentIndex - 1].id);
    } else if (currentIndex === 0) {
      // Loop back to the last NFT in the current collection
      setSelectedNftId(
        currentCollection.nfts[currentCollection.nfts.length - 1].id
      );
    }
  };

  const currentNFT =
    currentCollection && selectedNftId
      ? currentCollection.nfts.find((nft) => nft.id === selectedNftId)
      : null;

  return (
    <>
      <div className="bg-blue-mix text-gray-100 font-inter p-4 flex flex-col items-center">
        {/* Conditional Rendering: Show Dashboard, Collection Detail, or NFT Detail Page */}
        {selectedNftId && currentCollection ? (
          <NFTDetailPage
            nft={currentNFT}
            collectionName={currentCollection} // Pass the entire collection object for description/related NFTs
            onBackToCollection={handleBackToCollection}
            onNextNFT={handleNextNFT}
            onPrevNFT={handlePrevNFT}
          />
        ) : selectedCollectionId ? (
          <CollectionDetailPage
            collection={currentCollection}
            onBack={handleBackToDashboard}
            onNextCollection={handleNextCollection}
            onPrevCollection={handlePrevCollection}
            onNFTClick={handleNFTClick} // Pass the new handler
          />
        ) : (
          /* Main Dashboard View */
          <div className="w-full rounded-xl  py-3 px-0 md:p-8 space-y-8 ">
            {/* Top Navigation */}
            <div className="flex flex-col md:flex-row justify-between items-start space-y-2 md:space-y-0 md:space-x-4">
              

              {/* Center Filters */}
              <div className="flex flex-wrap  justify-center gap-2 p-2 bg-purple-mix rounded-lg shadow-inner">
                <DashboardButton
                  isActive={activeSubTab === "Top"}
                  onClick={() => setActiveSubTab("Top")}
                >
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-8V6a1 1 0 112 0v4h2a1 1 0 110 2h-2v2a1 1 0 11-2 0v-2H7a1 1 0 110-2h2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Top
                  </div>
                </DashboardButton>
                <DashboardButton
                  isActive={activeSubTab === "Trending"}
                  onClick={() => setActiveSubTab("Trending")}
                >
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M17.586 2.586a2 2 0 00-2.828 0L7 10.343V13h2.657l8.586-8.586a2 2 0 000-2.828z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Trending
                  </div>
                </DashboardButton>
              </div>

              {/* Right Timeframe and Pagination */}
              <div className="flex flex-wrap justify-start items-start gap-2">
                <div className="flex space-x-1 p-2 bg-purple-mix rounded-lg shadow-inner">
                  {["All", "30d", "7d", "1d", "1h", "15m", "5m"].map(
                    (timeframe) => (
                      <DashboardButton
                        key={timeframe}
                        isActive={activeTimeframe === timeframe}
                        onClick={() => setActiveTimeframe(timeframe)}
                      >
                        {timeframe}
                      </DashboardButton>
                    )
                  )}
                </div>
                {/* Pagination Buttons */}
                <div className="flex space-x-1 p-2 bg-purple-mix rounded-lg  shadow-inner">
                  <DashboardButton
                    onClick={goToPrevPage}
                    disabled={currentPage === 1}
                  >
                    Prev
                  </DashboardButton>
                  <span className="text-sm text-gray-300 flex items-center px-2">
                    Page {currentPage} of {totalPages}
                  </span>
                  <DashboardButton
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </DashboardButton>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left Sidebar */}
              <div className="max-w-full lg:w-1/4 bg-green-mix rounded-xl p-4 space-y-6 shadow-md">
                {/* Category Section */}
                <div className="border-b border-purple-600 pb-4">
                  <div
                    className="flex justify-between items-center cursor-pointer text-lg font-semibold text-gray-200 hover:text-white transition-colors duration-200"
                    onClick={() => setIsCategoryExpanded(!isCategoryExpanded)}
                  >
                    Category
                    <ChevronIcon
                      direction={isCategoryExpanded ? "up" : "down"}
                    />
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isCategoryExpanded
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {categories.map((cat) => (
                        <DashboardButton
                          key={cat}
                          isActive={selectedCategory === cat}
                          onClick={() => setSelectedCategory(cat)}
                        >
                          {cat}
                        </DashboardButton>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Chains Section */}
                <div>
                  <div
                    className="flex justify-between items-center cursor-pointer text-lg font-semibold text-gray-200 hover:text-white transition-colors duration-200"
                    onClick={() => setIsChainsExpanded(!isChainsExpanded)}
                  >
                    Chains
                    <ChevronIcon direction={isChainsExpanded ? "up" : "down"} />
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isChainsExpanded
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="relative mt-4 mb-4">
                      <input
                        type="text"
                        placeholder="Search for chains"
                        className="w-full bg-purple-600 rounded-lg py-2 px-4 pr-10 text-gray-200 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                        value={searchChain}
                        onChange={(e) => setSearchChain(e.target.value)}
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {chains
                        .filter((chain) =>
                          chain
                            .toLowerCase()
                            .includes(searchChain.toLowerCase())
                        )
                        .map((chain) => (
                          <DashboardButton
                            key={chain}
                            isActive={selectedChain === chain}
                            onClick={() => setSelectedChain(chain)}
                          >
                            {chain}
                          </DashboardButton>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Main Content - NFT List */}
              <div className="w-full lg:w-3/4 bg-green-mix rounded-xl p-4 shadow-md overflow-x-auto overflow-y-auto">
                <table className="w-full divide-y divide-purple-600">
                  <thead className="bg-purple-600  rounded-lg">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider rounded-tl-lg"
                      ></th>{" "}
                      {/* Star Column */}
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                      >
                        Collection
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                      >
                        Floor Price
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                      >
                        1D Change
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                      >
                        Top Offer
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                      >
                        1D Vol
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                      >
                        1D Sales
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider rounded-tr-lg"
                      >
                        Owners
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    className={`bg-purple-700 divide-y divide-purple-600 ${
                      triggerTableAnimation ? "fade-in-table" : ""
                    }`}
                  >
                    {currentDashboardItems.map((nft) => (
                      <tr
                        key={nft.id}
                        className="table-row-hover transition-all duration-300 transform cursor-pointer"
                        onClick={() => handleCollectionClick(nft.id)}
                      >
                        <td className="px-4 py-4 whitespace-nowrap">
                          <StarIcon
                            isStarred={nft.isStarred}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleStar(nft.id);
                            }}
                          />
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              className="h-6 w-6 rounded-full mr-2 object-cover"
                              src={nft.icon}
                              alt={`${nft.name} icon`}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  "https://placehold.co/24x24/333/FFF?text=NFT";
                              }}
                            />
                            <div className="text-sm font-medium text-gray-50">
                              {nft.name}
                            </div>
                            {nft.isNew && (
                              <span className="ml-2 px-2 py-0.5 bg-green-500 text-green-900 text-xs font-semibold rounded-full animate-pulse">
                                NEW
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-50">
                          {nft.floorPrice} ETH
                        </td>
                        <td
                          className={`px-4 py-4 whitespace-nowrap text-sm ${
                            nft.change1d >= 0
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {nft.change1d >= 0 ? "+" : ""}
                          {nft.change1d}%
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-50">
                          {nft.topOffer ? `${nft.topOffer} WETH` : "-"}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-50">
                          {nft.vol1d} ETH
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-50">
                          {nft.sales1d}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-50">
                          {nft.owners}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
      <ScrollToTopButton />
    </>
  );
};

export default NFTShow;
