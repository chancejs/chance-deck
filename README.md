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
  '0': [ '🂺', '🃈', '🃉', '🂭', '🃍', '🂫', '🃑', '🃇', '🂥', '🂸', '🃕', '🂷', '🃁'],
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

// standard 52-card deck
chance.pickone(chance_deck.standard_deck);
// '🃙'

// full deck has 2 jokers
chance.pickset(chance_deck.full_deck, 5);
// [ '🃘', '🂦', '🃕', '🃓', '🂷' ]
```

## Reference

[Playing card - Wikiwand](https://www.wikiwand.com/en/Playing_card)
[Standard 52-card deck - Wikiwand](https://www.wikiwand.com/en/Standard_52-card_deck)
