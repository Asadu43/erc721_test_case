const { expect } = require('chai')
const { ethers } = require('hardhat')
const {parseEther} = ethers.utils

describe('AsadToken', function () {
  let AsadToken, asadContract, owner, addr1, addr2, addr3, addrs
  beforeEach(async function () {
    AsadToken = await ethers.getContractFactory('AsadToken')
    ;[owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners()
    asadContract = await AsadToken.deploy("AsadToken","ASD")
  })

  describe('Deployment', function () {
    it('Should set the right owner', async function () {
      expect(await asadContract.owner()).to.equal(owner.address)
    })
  })

  describe('Name sybmol balanceOf', function () {
    it('Should set the right Name', async function () {
      expect(await asadContract.name()).to.equal("AsadToken")
    })

    it('Should set the right sybmol', async function () {
      expect(await asadContract.symbol()).to.equal("ASD")
    })

    it('Should set the right balanceOf', async function () {
      expect(await asadContract.balanceOf(owner.address)).to.equal("0")
    })

  })

  describe.only('Mint TransferOwnerShip OwnerOf', function () {

    it('Should not the be minted because caller is not the owner', async function () {
      await expect( asadContract.connect(addr2).safeMint(addr1.address)).to.be.revertedWith('caller is not the owner')
    })
    it('Should be minted because caller is owner', async function () {
      await asadContract.connect(owner).safeMint(owner.address)
      expect(await asadContract.balanceOf(owner.address)).to.equal("1")
      expect(await asadContract.ownerOf(0)).to.equal(owner.address)
    })

    it('Should set the right OwnerShip', async function () {
      await asadContract.connect(owner).transferOwnership(addr1.address)
    })

  })


})