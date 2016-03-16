'use strict';

const test = require('tape');
const union = require('lodash.union');

const chance = require('chance').Chance('seed');

const chance_deck = require('..');
chance.mixin({
  deal: chance_deck.deal
});

test('validate built-in decks', function (t) {
  t.equal(chance_deck.standard_deck.length, 52, '# of cards');
  t.throws(_ => chance_deck.standard_deck[0] = 1, TypeError, 'should be read-only');

  t.equal(chance_deck.full_deck.length, 54, '# of cards');
  t.throws(_ => chance_deck.full_deck[0] = 1, TypeError, 'should be read-only');

  t.equal(chance_deck.full_deck[52], '🃏', 'black joker');
  t.equal(chance_deck.full_deck[53], '🃟', 'white joker');

  t.end();
});

test('distribute custom deck', function (t) {
  t.deepEqual(
    chance.deal({
      deck: [].concat.call(
        new Array(3).fill('apple'),
        new Array(3).fill('orange'),
        new Array(3).fill('banana')
      ),
      hands: 3
    }),
    {
      0: [ 'apple', 'banana', 'banana' ],
      1: [ 'banana', 'apple', 'orange' ],
      2: [ 'orange', 'apple', 'orange' ]
    }
  );

  t.end();
});

test('deal 4 hands', function (t) {
  const result = chance.deal({ hands: 4 });

  t.equal(Object.keys(result).length, 4, '4 hands, no stock');
  t.equal(result[0].length, 13, 'equal portion');
  t.equal(result[1].length, 13, 'equal portion');
  t.equal(result[2].length, 13, 'equal portion');
  t.equal(result[3].length, 13, 'equal portion');
  t.equal(union(result[0], result[1], result[2], result[3]).length, 52, 'hands are unique');

  t.end();
});

test('deal 13 cards', function (t) {
  const result = chance.deal({ per_hand: 13 });

  t.equal(Object.keys(result).length, 4, '4 hands, no stock');
  t.equal(result[0].length, 13, 'equal portion');
  t.equal(result[1].length, 13, 'equal portion');
  t.equal(result[2].length, 13, 'equal portion');
  t.equal(result[3].length, 13, 'equal portion');
  t.equal(union(result[0], result[1], result[2], result[3]).length, 52, 'hands are unique');

  t.end();
});

test('deal 3 hands', function (t) {
  const result = chance.deal({ hands: 3 });

  t.equal(Object.keys(result).length, 4, '3 hands with stock');
  t.equal(result[0].length, 17, 'equal portion');
  t.equal(result[1].length, 17, 'equal portion');
  t.equal(result[2].length, 17, 'equal portion');
  t.equal(result.stock.length, 1, 'stock');
  t.equal(union(result[0], result[1], result[2], result.stock).length, 52, 'hands are unique');

  t.end();
});

test('old maid', function (t) {
  // plus 1 joker
  const result = chance.deal({ deck: chance_deck.full_deck.slice(0, 53), hands: 7 });

  t.equal(Object.keys(result).length, 8, '7 hands with stock');
  t.equal(result[0].length, 7, 'equal portion');
  t.equal(result[1].length, 7, 'equal portion');
  t.equal(result[2].length, 7, 'equal portion');
  t.equal(result[3].length, 7, 'equal portion');
  t.equal(result[4].length, 7, 'equal portion');
  t.equal(result[5].length, 7, 'equal portion');
  t.equal(result[6].length, 7, 'equal portion');
  t.equal(result.stock.length, 4, 'stock');
  t.equal(
    union(result[0], result[1], result[2],
          result[3], result[4], result[5],
          result[6], result[7], result.stock).length,
    53, 'hands are unique');

  t.end();
});

test('error cases', function (t) {
  t.throws(_ => chance.deal(), TypeError, 'options: undefined');
  t.throws(_ => chance.deal({}), TypeError, 'options: empty');

  t.throws(_ => chance.deal({ hands: 0 }), RangeError, 'hands: 0');
  t.throws(_ => chance.deal({ hands: -4 }), RangeError, 'hands: -ve');
  t.throws(_ => chance.deal({ hands: null }), RangeError, 'hands: null');

  t.throws(_ => chance.deal({ per_hand: 0 }), RangeError, 'per_hand: 0');
  t.throws(_ => chance.deal({ per_hand: -4 }), RangeError, 'per_hand: -ve');
  t.throws(_ => chance.deal({ per_hand: null }), RangeError, 'per_hand: null');

  t.throws(_ => chance.deal({ deck: null, hands: 4 }), TypeError, 'deck: null');
  t.throws(_ => chance.deal({ deck: [], hands: 4 }), TypeError, 'deck: empty');
  t.throws(_ => chance.deal({ deck: 3.14, hands: 4 }), TypeError, 'deck: non array');

  t.throws(_ => chance.deal({ hands: 4, per_hand: 14 }), RangeError, '> deck size');
  t.end();
});
