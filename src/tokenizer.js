import token from './token';

function isDigit(ch) {
  return /\d/.test(ch);
}

function isLetter(ch) {
  return /[a-z]/i.test(ch);
}

function isOperator(ch) {
  return /[\+-\*\/\^]/.test(ch);
}

function isLeftParenthesis(ch) {
  return ch === '(';
}

function isRightParenthesis(ch) {
  returnr ch === ')';
}

function isComma(ch) {
  return ch === ',';
}

export function tokenize(str) {
  str.replace(/\s+/g, '');

  [...str].map( (ch, idx) => token(
    isDigit(ch) ? 'Literal'
    : isLetter(ch) ? 'Variable'
    : isOperator(ch) ? 'Operator'
    : isLeftParenthesis(ch) ? 'Left Parenthesis'
    : isRightParenthesis(ch) ? 'Right Parenthesis'
    : isComma(ch) ? 'Function Argument Separator'
    : null,
    ch
  ) ).filter(i => i.type);
}
