# chance-deck

Chance.js mixin for deck (playing cards) related functions

## Install

```sh
npm install -S chance chance-deck
```

## Usage

```js
// initialize chance instance
const chance = require('chance').Chance();

// add this module as mixin
const chance_deck = require('chance-deck');
chance.mixin({
  deal: chance_deck.deal
});

// profit
chance.deal({ hands: 4 })
/*
{ 
  '0': [ '🂺', '🃈', '🃉', '🂭', '🃍', '🂫', '🃑', '🃇', '🂥', '🂸', '🃕', '🂷', '🃁' ],
  '1': [ '🃔', '🃖', '🃅', '🃎', '🂨', '🂡', '🃗', '🃊', '🂲', '🂤', '🂦', '🃄', '🂩' ],
  '2': [ '🃛', '🃋', '🃒', '🂾', '🃆', '🂵', '🃞', '🃃', '🂶', '🃘', '🂱', '🂣', '🂴' ],
  '3': [ '🃝', '🃙', '🂹', '🂳', '🃚', '🂪', '🃂', '🂮', '🂧', '🂽', '🂻', '🂢', '🃓' ]
}
*/

chance.deal({ hands: 3, per_hand: 5 });
/*
{
  '0': [ '🃖', '🂽', '🃈', '🂢', '🂡' ],
  '1': [ '🃘', '🂷', '🂶', '🃃', '🃝' ],
  '2': [ '🃍', '🃆', '🂨', '🂣', '🃑' ],
  stock: [ '🃕', '🂪', '🂱', '🃁', ... ] // remaining cards
}
*/

// you can distribute anything with `deal()`
chance.deal({ deck: 'abcdefghijklmnopqrstuvwxyz'.split(''), hands: 2 });
/*
{
  '0': [ 'n', 'g', 'o', 'm', 'e', 'd', 'p', 'k' ],
  '1': [ 'v', 't', 'j', 'c', 'f', 'w', 'u', 'i' ],
  '2': [ 'a', 'y', 'l', 'q', 'z', 'b', 'x', 'h' ],
  stock: [ 's', 'r' ]
}
*/

// you can also use the built-in unicode decks as you wish
// we have the standard 52-card deck and a full deck with 2 jokers (at index 52 and 53)
chance.pickone(chance_deck.standard_deck); // '🃙'
chance.pickset(chance_deck.full_deck, 5);  // [ '🃘', '🂦', '🃕', '🃓', '🂷' ]
chance_deck.full_deck[52] === '🃏';
chance_deck.full_deck[53] === '🃟';
```

## Reference

[Playing cards in Unicode - Wikiwand](https://www.wikiwand.com/en/Playing_cards_in_Unicode)
[Standard 52-card deck - Wikiwand](https://www.wikiwand.com/en/Standard_52-card_deck)
