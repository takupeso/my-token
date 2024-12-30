async function main() {
  const MyToken = await ethers.getContractFactory("MyToken");
  console.log("Deploying MyToken...");
  
  const myToken = await MyToken.deploy();
  await myToken.deployed();

  console.log("MyToken deployed to:", myToken.address);
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
