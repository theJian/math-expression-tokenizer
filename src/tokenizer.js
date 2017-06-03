const Token = require('./token.js');

function isDigit(ch) {
  return /\d/.test(ch);
}

function isDot(ch) {
  return ch === '.';
}

function isLetter(ch) {
  return /[a-z]/i.test(ch);
}

function isOperator(ch) {
  return /[\+\-\*\/\^]/.test(ch);
}

function isLeftParenthesis(ch) {
  return ch === '(';
}

function isRightParenthesis(ch) {
  return ch === ')';
}

function isComma(ch) {
  return ch === ',';
}

function dumpNumberBuffer(buf) {
  if (buf.nb.length) {
    buf.cur.push(Token('Literal', buf.nb.join('')));
    buf.nb.length = 0;
  }
  return buf;
}

function dumpLetterBuffer(buf) {
  const len = buf.lb.length;
  let i = 0;
  while (i < len) {
    if (i) buf.cur.push(Token('Operator', '*'));
    buf.cur.push(Token('Variable', buf.lb[i]));
    i++;
  }
  buf.lb.length = 0;
}

function tokenize(str) {
  str.replace(/\s+/g, '');

  const result = [...str].reduce((buf, ch, idx) => {
    if (isDigit(ch)) {
      buf.nb.push(ch);
    } else if (isDot(ch)) {
      buf.nb.push(ch);
    } else if (isLetter(ch)) {
      if (buf.nb.length) {
        dumpNumberBuffer(buf);
        buf.cur.push(Token('Operator', '*'));
      }
      buf.lb.push(ch);
    } else if (isOperator(ch)) {
      dumpNumberBuffer(buf);
      dumpLetterBuffer(buf);
      buf.cur.push(Token('Operator', ch));
    } else if (isLeftParenthesis(ch)) {
      if (buf.lb.length) {
        buf.cur.push(Token('Function', buf.lb.join('')));
        buf.lb.length = 0;
      } else if (buf.nb.length) {
        dumpNumberBuffer(buf);
        buf.cur.push(Token('Operator', '*'));
      }
      buf.cur.push(Token('Left Parenthesis', ch));
    } else if (isRightParenthesis(ch)) {
      dumpNumberBuffer(buf);
      dumpLetterBuffer(buf);
      buf.cur.push(Token('Right Parenthesis', ch));
    } else if (isComma(ch)) {
      dumpNumberBuffer(buf);
      dumpLetterBuffer(buf);
      buf.cur.push(Token('Function Argument Separator', ch));
    }

    return buf;
  }, { cur: [], lb: [], nb: [] });

  dumpNumberBuffer(result);
  dumpLetterBuffer(result);

  return result.cur;
}

module.exports = {
  tokenize,
};
