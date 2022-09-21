# Buebio - smart-contracts

## Contracts

### BuebioImpact
Its a ERC1155 that represents the added value of a product.

## Deploy
Deploy in local network
```
npx hardhat run scripts/deploy-buebio-impact.js --network localhost
```

Deploy in remote network
```
npx hardhat run scripts/deploy-buebio-impact.js --network remote
```

### BuebioFuture
Its a ERC1155 that represents a future production offer and all its products.

## Deploy
Deploy in local network
```
npx hardhat run scripts/deploy-buebio-future.js --network localhost
```

Deploy in remote network
```
npx hardhat run scripts/deploy-buebio-future.js --network remote
```

### BuebioMarketplace
Its a custom smart-contract that store all the BuebioImpact or BuebioFuture tokens published in Buebio marketplace.

## Deploy
Deploy in local network
```
npx hardhat run scripts/deploy-buebio-marketplace.js --network localhost
```

Deploy in remote network
```
npx hardhat run scripts/deploy-buebio-marketplace.js --network remote
```

## Testing scripts

*ToDo*