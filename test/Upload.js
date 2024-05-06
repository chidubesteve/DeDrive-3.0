const { expect } = require("chai");
const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const hre = require("hardhat");

describe("Upload", () => {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployUploadContract() {
    const Upload = await hre.ethers.deployContract("Upload", [], {});
    await Upload.waitForDeployment();

    const [owner, user1] = await hre.ethers.getSigners();

    console.log("Library deployed to:", Upload.target);
    return { Upload, owner, user1 };
  }

  it("should deploy correctly", async () => {
    const { Upload } = await loadFixture(deployUploadContract);

    expect(await Upload.target).to.not.be.undefined; // check if the contract has been deployed - it returns a promise and need to be resolved
  });

  // functionality tests
  it("should add URLs correctly", async () => {
    const url = "http://example.com";
    const { Upload, owner } = await loadFixture(deployUploadContract);

    await Upload.add(owner.address, url);
    const index = 0;
    const user1Urls = await Upload.value(owner.address, index);

    expect(await user1Urls).to.have.lengthOf(18);
    expect(await user1Urls).to.equal(url);
  });
  it("should allow access correctly", async () => {
    const { Upload, owner, user1 } = await loadFixture(deployUploadContract);

    // Ensure proper ownership and access set up
    expect(await Upload.allow(user1.address)).to.not.be.reverted;

    // Check if the access has been correctly allowed,
    // the generated getter function requires two arguments
    expect(await Upload.ownership(owner.address, user1.address)).to.equal(true);

    // check if the `accessed` mapping has been properly updated
    expect(await Upload.accessed(user1.address)).to.equal(true);

    // check if `previousData` mapping is updated correctly
    expect(await Upload.previousData(owner.address, user1.address)).to.equal(
      true
    );
    // check of `accessList` mapping is updated correctly
    const index = 0;
    const access = await Upload.accessList(owner.address, index);
    expect(await access.user).to.equal(user1.address);

    expect(await access.access).to.equal(true);
  });
  it("should disallow access correctly", async () => {
    const { Upload, owner, user1 } = await loadFixture(deployUploadContract);
    await Upload.allow(user1.address);
    await expect(Upload.disallow(user1.address)).to.not.be.reverted;
    expect(await Upload.ownership(owner.address, user1.address)).to.be.false;

    const access = await Upload.accessList(owner.address, 0);
    expect(access.access).to.be.false;
    // check if the `accessed` mapping has been properly updated
    expect(await Upload.accessed(user1.address)).to.be.false;

    // verify the keys array is properly updated
    const keysLength = Upload.keys.length;
    let actualKeys = [];
    for (i = 0; i < Number(keysLength); i++) {
      actualKeys.push(await Upload.keys(i));
    }
    expect(actualKeys).to.not.include(user1.address);
  });
  it("should display URLs correctly for users with access", async () => {
    const { Upload, owner, user1 } = await loadFixture(deployUploadContract);
    // add urls for a user - call add()
    await Upload.add(owner.address, "http://example.com");

    // allow user1 to access owner's url - by connecting. doing this because it is an external function
    await Upload.connect(owner).allow(user1.address);

    //display urls for user1
    expect(await Upload.connect(user1).display(owner.address)).to.deep.equal([
      "http://example.com"
    ]);

    // should fail if user1 tries to access another address w/out permission
    expect(
      await Upload.connect(user1).display(user1.address)
    ).to.be.revertedWith("You don't have access");
  });
  it("should return correct access status with shareAccess", async () => {
    const { Upload, owner } = await loadFixture(deployUploadContract);

    await Upload.allow(owner.address);
    const accessDetails = await Upload.shareAccess();

    expect(await accessDetails[0].user).to.equal(owner.address);
    expect(await accessDetails[0].access).to.equal(true)
  });
  
});

// Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
// Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
//Library deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
// you can change the visibility of the state variable(mappings) in order to access the automatic getter function created by the compiler
