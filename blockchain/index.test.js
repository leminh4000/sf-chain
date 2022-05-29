const Blockchain = require('./index');
const Block = require('./block');

describe('Blockchain', () => {
        let bc, bc2;

        beforeEach(() => {
            bc = new Blockchain();
            bc2 = new Blockchain();
        });

        it('starts with genesis block', () => {
            expect(bc.chain[0]).toEqual(Block.genesis());
        });

        it('adds a new block', () => {
            const newData = 'foo';
            bc.addBlock(newData);

            expect(bc.chain[bc.chain.length - 1].data).toEqual(newData);
        });

        it('Validates a valid chain', () => {
            bc2.addBlock('foo');
            bc2.addBlock('bar');

            expect(bc2.isValidChain(bc2.chain)).toBe(true);
        });
        it('Envalidates a chain with a corrupt genesis block', () => {
            bc2.chain[0].data = 'bad-data';

            expect(bc2.isValidChain(bc2.chain)).toBe(false);
        });
        it('Invalidates a corrupt chain', () => {
            bc2.addBlock('foo');
            bc2.addBlock('bar');
            bc2.chain[1].data = 'bad-data';

            expect(bc2.isValidChain(bc2.chain)).toBe(false);
        });

        it('Replaces the chain with a valid chain', () => {
            bc2.addBlock('foo');
            bc2.addBlock('bar');

            bc.replaceChain(bc2.chain);

            expect(bc.chain).toEqual(bc2.chain);
        });

        it('Does not replace the chain with one of less than or equal to length', () => {
            bc.addBlock('foo');
            bc.addBlock('bar');

            bc.replaceChain(bc2.chain);

            expect(bc.chain).not.toEqual(bc2.chain);
        });
    }
);

