class BitBuffer {
  constructor(arr) {
    this._arr = arr;
  }

  getBit(bit) {
    var block = Math.floor(bit / 8);

    return Boolean(this._arr[block] & (1 << (bit % 8)));
  }

  setBit(bit, value) {
    var block = Math.floor(bit / 8);

    if (value) {
      this._arr[block] = this._arr[block] | (1 << (bit % 8));
    } else {
      this._arr[block] = this._arr[block] & ~(1 << (bit % 8));
    }
  }

  setBits(bits, values) {
    bits.forEach(function(bit, index) {
      this.setBit(bit, values[index]);
    });
  }

  getBlocks(startBlock, endBlock) {
    return this._arr.slice(startBlock, endBlock + 1);
  }

  setBlocks(startBlock, endBlock, blockContents) {
    if (blockContents.length !== endBlock - startBlock + 1) {
      throw new Error('Size of contents (' + blockContents.length +
                      ') does not match block range ([' + startBlock + ', ' + endBlock + '])');
    }

    blockContents.forEach(function(block, index) {
      this._arr[startBlock + index] = block;
    });
  }

  getBlock(blockNumber) {
    return this.getBlocks(blockNumber, blockNumber)[0];
  }

  setBlock(blockNumber, value) {
    this.setBlocks(blockNumber, blockNumber, [value]);
  }
}

export default BitBuffer;
