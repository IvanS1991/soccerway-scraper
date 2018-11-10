const { expect } = require('chai');
const { sinon } = require('sinon');

const { ProcessingQueue } = require('../dist/processing-queue');

describe('Processing Queue: ', () => {
  let processingCallback;
  let processingQueue;

  beforeEach(() => {
    processingCallback = (item) => {
      return Promise.resolve(item);
    };

    processingQueue = new ProcessingQueue(3, processingCallback);
  });

  it('should initialize with no items', () => {
    expect(processingQueue.isEmpty).to.equal(true);
  });

  describe('processingQueue.push: ', () => {
    it('should increase size correctly', () => {
      const initSize = processingQueue.size;

      processingQueue.push(1);

      expect(processingQueue.size).to.equal(initSize + 1);
    });

    it('should insert correct value for head and tail', () => {
      const items = Array(2).fill('').map((_, index) => index);

      items.forEach((item) => {
        processingQueue.push(item);

        expect(processingQueue.head.value).to.equal(item);

        if (processingQueue.size === 1) {
          expect(processingQueue.head).to.deep.equal(processingQueue.tail);
        } else {
          expect(processingQueue.head).to.not.deep.equal(processingQueue.tail);
        }
      });
    });
  });

  describe('processingQueue.pop: ', () => {
    it('should decrease size correctly', () => {
      const initSize = processingQueue.size;

      processingQueue.push(3);
      processingQueue.push(4);
      processingQueue.pop();

      expect(processingQueue.size).to.equal(initSize + 1);
    });

    it('should return head value', () => {
      const items = [1, 2, 3, 4];

      items.forEach((item) => processingQueue.push(item));

      items.reverse().forEach((item) => {
        const headValue = processingQueue.head.value;
        const pop = processingQueue.pop();

        expect(pop).to.equal(headValue);
        expect(pop).to.equal(item);
      });
    });
  });
});
