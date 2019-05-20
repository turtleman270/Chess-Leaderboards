# Elo Calculator

## How to use it

In `./public/data`, update a ruleset file
An example:

<pre>
White,Black,winner    | This is the name of the columns
Alice,Bob,white       | Alice was white, Bob black, and Alice won
Bob,Alice,black       | Bob was black, Alice white, and Alice won
Alice,Bob,tie         | Alice was white, Bob black, and they tied
</pre>

## How to view elo chart

Go to https://chesselo.netlify.com/

## Developing

[Fork on CodeSandbox](https://codesandbox.io/s/github/turtleman270/Chess-Leaderboards) or run the following commands locally:

```sh
# Run dev server
npm run serve

# Run tests
npm test

# Production build
npm run build
```
