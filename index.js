'use strict';

/**
 * Standard deck of 52 cards in Unicode
 * @type {array}
 */
const standard_deck =  Object.freeze([
  '🂡', '🂢', '🂣', '🂤', '🂥', '🂦', '🂧', '🂨', '🂩', '🂪', '🂫', '🂭', '🂮', // spades
  '🂱', '🂲', '🂳', '🂴', '🂵', '🂶', '🂷', '🂸', '🂹', '🂺', '🂻', '🂽', '🂾', // hearts
  '🃑', '🃒', '🃓', '🃔', '🃕', '🃖', '🃗', '🃘', '🃙', '🃚', '🃛', '🃝', '🃞', // clubs
  '🃁', '🃂', '🃃', '🃄', '🃅', '🃆', '🃇', '🃈', '🃉', '🃊', '🃋', '🃍', '🃎' // diamonds
]);

/**
 * Standard deck plus 2 jokers (total 54 cards) in Unicode
 * @type {array}
 */
const full_deck =  Object.freeze(standard_deck.concat('🃏', '🃟'));

/**
 * Deal deck of cards
 *
 * @param  {array} [deck = unicode_deck] Deck containing cards to be dealt, should not contain duplicates
 * @param  {int}   hands   Number of hands to deal
 * @param  {int}   [per_hand = deck.length / hands] Number of cards per hand, will try to deal all cards if omitted
 * @return {object}           Array-like objects with [0:hands-1) representing each hand
 *                            Remaining cards (if any) will be in `stock`
 */
function deal(options) {
  if (options === undefined ||
    // also catches zero, null, etc
    (options.hands === undefined && options.per_hand === undefined)) {
    throw new TypeError('should specify distribution method');
  }

  if (options.hands !== undefined && options.hands <= 0) {
    throw new RangeError('hands should be > 0');
  }
  if (options.per_hand !== undefined && options.per_hand <= 0) {
    throw new RangeError('per_hand should be > 0');
  }
  if (options.deck !== undefined &&
     (!options.deck instanceof Array || options.deck.length === 0)) {
    throw new TypeError('deck should be an non-empty array');
  }

  const deck = this.shuffle(options.deck || standard_deck);
  const hands = options.hands || Math.floor(deck.length / options.per_hand);
  const per_hand = options.per_hand || Math.floor(deck.length / options.hands);

  if (deck.length < hands * per_hand) {
    throw new RangeError(
      `deck length (${deck.length}) not enough to deal ${hands * per_hand} cards`
    );
  }

  // console.log(deck);
  const result = {};
  let begin = 0;
  for (let hand = 0; hand < hands; hand++) {
    // console.log("[%d] (%d, %d)", hand, begin, per_hand);
    result[hand] = deck.slice(begin, begin + per_hand);
    begin += per_hand;
  }
  // console.log("[%d] (%d, %d)", hand, begin, per_hand);
  if (begin !== deck.length) {
    result.stock = deck.slice(begin);
  }
  return result;
}

module.exports = {
  standard_deck,
  full_deck,
  deal
};
