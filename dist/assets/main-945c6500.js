var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _text, _value, _handleClick, _results, _list, _field, _form, _data, _resultList, _searchTemplate, _selectHandler, _changeHandler, _icon, _focusListener, _blurListener;
class ComboBoxListItem extends HTMLLIElement {
  constructor() {
    super();
    __privateAdd(this, _text, void 0);
    __privateAdd(this, _value, void 0);
    __privateAdd(this, _handleClick, (e) => this.handleClick(e));
    this.setAttribute("is", "combo-box-list-item");
    console.log("ITEM CREATED");
  }
  connectedCallback() {
    console.log("ITEM CONNECTED");
    this.addEventListener("click", __privateGet(this, _handleClick));
  }
  handleClick(e) {
    e.preventDefault();
    this.dispatchEvent(new CustomEvent("combo-item:select", { detail: { text: this.text, value: this.value }, bubbles: true }));
  }
  set text(text) {
    __privateSet(this, _text, text);
    this.innerText = __privateGet(this, _text);
  }
  get text() {
    return __privateGet(this, _text);
  }
  set value(value) {
    __privateSet(this, _value, value);
  }
  get value() {
    return __privateGet(this, _value);
  }
  static build(result) {
    const item = document.createElement("li", { is: "combo-box-list-item" });
    item.text = result.text;
    item.value = result.value;
    return item;
  }
}
_text = new WeakMap();
_value = new WeakMap();
_handleClick = new WeakMap();
customElements.define("combo-box-list-item", ComboBoxListItem, { extends: "li" });
class ComboBoxResultList extends HTMLElement {
  constructor() {
    super(...arguments);
    __privateAdd(this, _results, []);
    __privateAdd(this, _list, void 0);
  }
  connectedCallback() {
    this.addEventListener("combo-item:select", (e) => {
      this.hide();
    });
  }
  update(results) {
    __privateSet(this, _results, results);
    this.render(__privateGet(this, _results));
  }
  render(results) {
    this.innerHTML = "";
    __privateSet(this, _list, document.createElement("ul"));
    results.forEach((result) => {
      const item = ComboBoxListItem.build(result);
      __privateGet(this, _list).insertAdjacentElement("beforeend", item);
    });
    this.insertAdjacentElement("beforeend", __privateGet(this, _list));
    this.show();
  }
  show() {
    this.classList.remove("hidden");
  }
  hide() {
    this.classList.add("hidden");
  }
}
_results = new WeakMap();
_list = new WeakMap();
customElements.define("combo-box-result-list", ComboBoxResultList);
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var dist = {};
function peg$subclass(child, parent) {
  function C() {
    this.constructor = child;
  }
  C.prototype = parent.prototype;
  child.prototype = new C();
}
function peg$SyntaxError(message, expected, found, location) {
  var self2 = Error.call(this, message);
  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(self2, peg$SyntaxError.prototype);
  }
  self2.expected = expected;
  self2.found = found;
  self2.location = location;
  self2.name = "SyntaxError";
  return self2;
}
peg$subclass(peg$SyntaxError, Error);
function peg$padEnd(str, targetLength, padString) {
  padString = padString || " ";
  if (str.length > targetLength) {
    return str;
  }
  targetLength -= str.length;
  padString += padString.repeat(targetLength);
  return str + padString.slice(0, targetLength);
}
peg$SyntaxError.prototype.format = function(sources) {
  var str = "Error: " + this.message;
  if (this.location) {
    var src = null;
    var k;
    for (k = 0; k < sources.length; k++) {
      if (sources[k].source === this.location.source) {
        src = sources[k].text.split(/\r\n|\n|\r/g);
        break;
      }
    }
    var s = this.location.start;
    var loc = this.location.source + ":" + s.line + ":" + s.column;
    if (src) {
      var e = this.location.end;
      var filler = peg$padEnd("", s.line.toString().length);
      var line = src[s.line - 1];
      var last = s.line === e.line ? e.column : line.length + 1;
      str += "\n --> " + loc + "\n" + filler + " |\n" + s.line + " | " + line + "\n" + filler + " | " + peg$padEnd("", s.column - 1) + peg$padEnd("", last - s.column, "^");
    } else {
      str += "\n at " + loc;
    }
  }
  return str;
};
peg$SyntaxError.buildMessage = function(expected, found) {
  var DESCRIBE_EXPECTATION_FNS = {
    literal: function(expectation) {
      return '"' + literalEscape(expectation.text) + '"';
    },
    "class": function(expectation) {
      var escapedParts = expectation.parts.map(function(part) {
        return Array.isArray(part) ? classEscape(part[0]) + "-" + classEscape(part[1]) : classEscape(part);
      });
      return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
    },
    any: function() {
      return "any character";
    },
    end: function() {
      return "end of input";
    },
    other: function(expectation) {
      return expectation.description;
    }
  };
  function hex(ch) {
    return ch.charCodeAt(0).toString(16).toUpperCase();
  }
  function literalEscape(s) {
    return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(ch) {
      return "\\x0" + hex(ch);
    }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) {
      return "\\x" + hex(ch);
    });
  }
  function classEscape(s) {
    return s.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(ch) {
      return "\\x0" + hex(ch);
    }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) {
      return "\\x" + hex(ch);
    });
  }
  function describeExpectation(expectation) {
    return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
  }
  function describeExpected(expected2) {
    var descriptions = expected2.map(describeExpectation);
    var i, j;
    descriptions.sort();
    if (descriptions.length > 0) {
      for (i = 1, j = 1; i < descriptions.length; i++) {
        if (descriptions[i - 1] !== descriptions[i]) {
          descriptions[j] = descriptions[i];
          j++;
        }
      }
      descriptions.length = j;
    }
    switch (descriptions.length) {
      case 1:
        return descriptions[0];
      case 2:
        return descriptions[0] + " or " + descriptions[1];
      default:
        return descriptions.slice(0, -1).join(", ") + ", or " + descriptions[descriptions.length - 1];
    }
  }
  function describeFound(found2) {
    return found2 ? '"' + literalEscape(found2) + '"' : "end of input";
  }
  return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
};
function peg$parse(input, options) {
  options = options !== void 0 ? options : {};
  var peg$FAILED = {};
  var peg$source = options.grammarSource;
  var peg$startRuleFunctions = { template: peg$parsetemplate };
  var peg$startRuleFunction = peg$parsetemplate;
  var peg$c0 = "{";
  var peg$c1 = "}";
  var peg$c2 = ",";
  var peg$c3 = "*";
  var peg$c4 = ":";
  var peg$c5 = "(";
  var peg$c6 = ")";
  var peg$r0 = /^[\/;.?&+#]/;
  var peg$r1 = /^[a-zA-Z0-9_.%]/;
  var peg$r2 = /^[0-9]/;
  var peg$r3 = /^[^{]/;
  var peg$r4 = /^[^)]/;
  var peg$e0 = peg$literalExpectation("{", false);
  var peg$e1 = peg$literalExpectation("}", false);
  var peg$e2 = peg$classExpectation(["/", ";", ".", "?", "&", "+", "#"], false, false);
  var peg$e3 = peg$literalExpectation(",", false);
  var peg$e4 = peg$classExpectation([["a", "z"], ["A", "Z"], ["0", "9"], "_", ".", "%"], false, false);
  var peg$e5 = peg$literalExpectation("*", false);
  var peg$e6 = peg$literalExpectation(":", false);
  var peg$e7 = peg$classExpectation([["0", "9"]], false, false);
  var peg$e8 = peg$classExpectation(["{"], true, false);
  var peg$e9 = peg$literalExpectation("(", false);
  var peg$e10 = peg$classExpectation([")"], true, false);
  var peg$e11 = peg$literalExpectation(")", false);
  var peg$f0 = function(parts) {
    return { type: "template", parts };
  };
  var peg$f1 = function(operator, variables) {
    return { type: "expression", operator, variables };
  };
  var peg$f2 = function(hd, v) {
    return v;
  };
  var peg$f3 = function(hd, rst) {
    rst.unshift(hd);
    return rst;
  };
  var peg$f4 = function(name, modifier, extension) {
    return { type: "variable", name, modifier, extension };
  };
  var peg$f5 = function() {
    return { type: "explode" };
  };
  var peg$f6 = function(digits) {
    return { type: "substr", length: parseInt(digits) };
  };
  var peg$f7 = function(value) {
    return { type: "literal", value };
  };
  var peg$f8 = function(text) {
    return text;
  };
  var peg$currPos = 0;
  var peg$posDetailsCache = [{ line: 1, column: 1 }];
  var peg$maxFailPos = 0;
  var peg$maxFailExpected = [];
  var peg$result;
  if ("startRule" in options) {
    if (!(options.startRule in peg$startRuleFunctions)) {
      throw new Error(`Can't start parsing from rule "` + options.startRule + '".');
    }
    peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
  }
  function peg$literalExpectation(text, ignoreCase) {
    return { type: "literal", text, ignoreCase };
  }
  function peg$classExpectation(parts, inverted, ignoreCase) {
    return { type: "class", parts, inverted, ignoreCase };
  }
  function peg$endExpectation() {
    return { type: "end" };
  }
  function peg$computePosDetails(pos) {
    var details = peg$posDetailsCache[pos];
    var p;
    if (details) {
      return details;
    } else {
      p = pos - 1;
      while (!peg$posDetailsCache[p]) {
        p--;
      }
      details = peg$posDetailsCache[p];
      details = {
        line: details.line,
        column: details.column
      };
      while (p < pos) {
        if (input.charCodeAt(p) === 10) {
          details.line++;
          details.column = 1;
        } else {
          details.column++;
        }
        p++;
      }
      peg$posDetailsCache[pos] = details;
      return details;
    }
  }
  function peg$computeLocation(startPos, endPos) {
    var startPosDetails = peg$computePosDetails(startPos);
    var endPosDetails = peg$computePosDetails(endPos);
    return {
      source: peg$source,
      start: {
        offset: startPos,
        line: startPosDetails.line,
        column: startPosDetails.column
      },
      end: {
        offset: endPos,
        line: endPosDetails.line,
        column: endPosDetails.column
      }
    };
  }
  function peg$fail(expected) {
    if (peg$currPos < peg$maxFailPos) {
      return;
    }
    if (peg$currPos > peg$maxFailPos) {
      peg$maxFailPos = peg$currPos;
      peg$maxFailExpected = [];
    }
    peg$maxFailExpected.push(expected);
  }
  function peg$buildStructuredError(expected, found, location) {
    return new peg$SyntaxError(peg$SyntaxError.buildMessage(expected, found), expected, found, location);
  }
  function peg$parsetemplate() {
    var s0, s1, s2;
    s0 = peg$currPos;
    s1 = [];
    s2 = peg$parseliteral();
    if (s2 === peg$FAILED) {
      s2 = peg$parseexpression();
    }
    while (s2 !== peg$FAILED) {
      s1.push(s2);
      s2 = peg$parseliteral();
      if (s2 === peg$FAILED) {
        s2 = peg$parseexpression();
      }
    }
    s1 = peg$f0(s1);
    s0 = s1;
    return s0;
  }
  function peg$parseexpression() {
    var s0, s1, s2, s3, s4;
    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 123) {
      s1 = peg$c0;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      {
        peg$fail(peg$e0);
      }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parseoperator();
      if (s2 !== peg$FAILED) {
        s3 = peg$parsevariables();
        if (s3 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 125) {
            s4 = peg$c1;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            {
              peg$fail(peg$e1);
            }
          }
          if (s4 !== peg$FAILED) {
            s0 = peg$f1(s2, s3);
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    return s0;
  }
  function peg$parseoperator() {
    var s0;
    if (peg$r0.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      {
        peg$fail(peg$e2);
      }
    }
    if (s0 === peg$FAILED) {
      s0 = "";
    }
    return s0;
  }
  function peg$parsevariables() {
    var s0, s1, s2, s3, s4, s5;
    s0 = peg$currPos;
    s1 = peg$parsevariable();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 44) {
        s4 = peg$c2;
        peg$currPos++;
      } else {
        s4 = peg$FAILED;
        {
          peg$fail(peg$e3);
        }
      }
      if (s4 !== peg$FAILED) {
        s5 = peg$parsevariable();
        if (s5 !== peg$FAILED) {
          s3 = peg$f2(s1, s5);
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 44) {
          s4 = peg$c2;
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          {
            peg$fail(peg$e3);
          }
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parsevariable();
          if (s5 !== peg$FAILED) {
            s3 = peg$f2(s1, s5);
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      s0 = peg$f3(s1, s2);
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    return s0;
  }
  function peg$parsevariable() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;
    s1 = peg$currPos;
    s2 = [];
    if (peg$r1.test(input.charAt(peg$currPos))) {
      s3 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s3 = peg$FAILED;
      {
        peg$fail(peg$e4);
      }
    }
    if (s3 !== peg$FAILED) {
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        if (peg$r1.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          {
            peg$fail(peg$e4);
          }
        }
      }
    } else {
      s2 = peg$FAILED;
    }
    if (s2 !== peg$FAILED) {
      s1 = input.substring(s1, peg$currPos);
    } else {
      s1 = s2;
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parsesubstr();
      if (s2 === peg$FAILED) {
        s2 = peg$parselistMarker();
      }
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      s3 = peg$parseextension();
      if (s3 === peg$FAILED) {
        s3 = null;
      }
      s0 = peg$f4(s1, s2, s3);
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    return s0;
  }
  function peg$parselistMarker() {
    var s0, s1;
    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 42) {
      s1 = peg$c3;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      {
        peg$fail(peg$e5);
      }
    }
    if (s1 !== peg$FAILED) {
      s1 = peg$f5();
    }
    s0 = s1;
    return s0;
  }
  function peg$parsesubstr() {
    var s0, s1, s2, s3, s4;
    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 58) {
      s1 = peg$c4;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      {
        peg$fail(peg$e6);
      }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      s3 = [];
      if (peg$r2.test(input.charAt(peg$currPos))) {
        s4 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s4 = peg$FAILED;
        {
          peg$fail(peg$e7);
        }
      }
      if (s4 !== peg$FAILED) {
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          if (peg$r2.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            {
              peg$fail(peg$e7);
            }
          }
        }
      } else {
        s3 = peg$FAILED;
      }
      if (s3 !== peg$FAILED) {
        s2 = input.substring(s2, peg$currPos);
      } else {
        s2 = s3;
      }
      if (s2 !== peg$FAILED) {
        s0 = peg$f6(s2);
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    return s0;
  }
  function peg$parseliteral() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;
    s1 = peg$currPos;
    s2 = [];
    if (peg$r3.test(input.charAt(peg$currPos))) {
      s3 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s3 = peg$FAILED;
      {
        peg$fail(peg$e8);
      }
    }
    if (s3 !== peg$FAILED) {
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        if (peg$r3.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          {
            peg$fail(peg$e8);
          }
        }
      }
    } else {
      s2 = peg$FAILED;
    }
    if (s2 !== peg$FAILED) {
      s1 = input.substring(s1, peg$currPos);
    } else {
      s1 = s2;
    }
    if (s1 !== peg$FAILED) {
      s1 = peg$f7(s1);
    }
    s0 = s1;
    return s0;
  }
  function peg$parseextension() {
    var s0, s1, s2, s3, s4;
    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 40) {
      s1 = peg$c5;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      {
        peg$fail(peg$e9);
      }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      s3 = [];
      if (peg$r4.test(input.charAt(peg$currPos))) {
        s4 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s4 = peg$FAILED;
        {
          peg$fail(peg$e10);
        }
      }
      if (s4 !== peg$FAILED) {
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          if (peg$r4.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            {
              peg$fail(peg$e10);
            }
          }
        }
      } else {
        s3 = peg$FAILED;
      }
      if (s3 !== peg$FAILED) {
        s2 = input.substring(s2, peg$currPos);
      } else {
        s2 = s3;
      }
      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 41) {
          s3 = peg$c6;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          {
            peg$fail(peg$e11);
          }
        }
        if (s3 !== peg$FAILED) {
          s0 = peg$f8(s2);
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    return s0;
  }
  peg$result = peg$startRuleFunction();
  if (peg$result !== peg$FAILED && peg$currPos === input.length) {
    return peg$result;
  } else {
    if (peg$result !== peg$FAILED && peg$currPos < input.length) {
      peg$fail(peg$endExpectation());
    }
    throw peg$buildStructuredError(peg$maxFailExpected, peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null, peg$maxFailPos < input.length ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1) : peg$computeLocation(peg$maxFailPos, peg$maxFailPos));
  }
}
var grammar = {
  SyntaxError: peg$SyntaxError,
  parse: peg$parse
};
var ast = {};
ast.__esModule = true;
ast.toString = void 0;
function toString(node) {
  var _a, _b;
  switch (node.type) {
    case "template":
      return node.parts.map(toString).join("");
    case "literal":
      return node.value;
    case "expression":
      return "{" + node.operator + node.variables.map(toString).join(",") + "}";
    case "variable":
      var out = node.name;
      if (((_a = node.modifier) === null || _a === void 0 ? void 0 : _a.type) == "explode") {
        out += "*";
      } else if (((_b = node.modifier) === null || _b === void 0 ? void 0 : _b.type) == "substr") {
        out += ":" + node.modifier.length;
      }
      if (node.extension) {
        out += "(" + node.extension + ")";
      }
      return out;
  }
}
ast.toString = toString;
var expander = {};
var pctEncode = function pctEncode2(regexp) {
  regexp = regexp || /\W/g;
  return function encode(string) {
    string = String(string);
    return string.replace(regexp, function(m) {
      var c = m[0].charCodeAt(0), encoded = [];
      if (c < 128) {
        encoded.push(c);
      } else if (128 <= c && c < 2048) {
        encoded.push(c >> 6 | 192);
        encoded.push(c & 63 | 128);
      } else {
        encoded.push(c >> 12 | 224);
        encoded.push(c >> 6 & 63 | 128);
        encoded.push(c & 63 | 128);
      }
      return encoded.map(function(c2) {
        return "%" + c2.toString(16).toUpperCase();
      }).join("");
    });
  };
};
var __assign = commonjsGlobal && commonjsGlobal.__assign || function() {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __importDefault = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
  return mod && mod.__esModule ? mod : { "default": mod };
};
expander.__esModule = true;
expander.expandExpression = expander.expandTemplate = void 0;
var pct_encode_1 = __importDefault(pctEncode);
var encoders = {
  UrlSafe: (0, pct_encode_1["default"])(/[^\w~.-]/g),
  Restricted: (0, pct_encode_1["default"])(/[^\w.~:\/\?#\[\]@!\$&'()*+,;=%-]|%(?!\d\d)/g)
};
function expandTemplate(ast2, values) {
  var strings = ast2.parts.map(function(part) {
    switch (part.type) {
      case "literal":
        return part.value;
      case "expression":
        return expandExpression(part, values);
    }
  });
  return strings.join("");
}
expander.expandTemplate = expandTemplate;
var defaults = {
  first: "",
  sep: ",",
  empty: "",
  encode: encoders.UrlSafe,
  named: false
};
var OperatorConfigs = {
  "": __assign({}, defaults),
  "+": __assign(__assign({}, defaults), { encode: encoders.Restricted }),
  "#": __assign(__assign({}, defaults), { encode: encoders.Restricted, first: "#", empty: "#" }),
  "/": __assign(__assign({}, defaults), { first: "/", sep: "/" }),
  ".": __assign(__assign({}, defaults), { first: ".", sep: ".", empty: "." }),
  ";": __assign(__assign({}, defaults), { first: ";", sep: ";", named: true }),
  "?": __assign(__assign({}, defaults), { first: "?", sep: "&", empty: "=", named: true }),
  "&": __assign(__assign({}, defaults), { first: "&", sep: "&", empty: "=", named: true })
};
function expandExpression(expression, values) {
  var config = OperatorConfigs[expression.operator];
  var strings = [];
  expression.variables.forEach(function(variable) {
    var value = values[variable.name];
    if (!present(value))
      return;
    var string = expandVariable(variable, value, config);
    strings.push(string || "");
  });
  if (strings.length === 0) {
    return "";
  }
  var expanded = strings.join(config.sep);
  if (expanded.length === 0) {
    return config.empty;
  }
  return config.first + expanded;
}
expander.expandExpression = expandExpression;
function expandVariable(variable, value, config) {
  var _a;
  if (value == null) {
    throw new TypeError("tried to expand null value for variable " + variable.name + ", this is a bug in uri-template");
  }
  if (((_a = variable.modifier) === null || _a === void 0 ? void 0 : _a.type) === "explode") {
    return expandValueExplode(variable, value, config);
  } else {
    return expandValueSingle(variable, value, config);
  }
}
function expandValueSingle(variable, value, _a) {
  var _b, _c;
  var empty = _a.empty, encode = _a.encode, named = _a.named;
  if (typeof value === "object" && ((_b = variable.modifier) === null || _b === void 0 ? void 0 : _b.type) === "substr") {
    throw new Error("Prefixed variables do not support lists/maps. Check " + variable.name);
  }
  var out;
  if (Array.isArray(value)) {
    out = value.map(encode).join(",");
  } else if (typeof value === "object") {
    out = Object.entries(value).map(function(entry) {
      return entry.map(encode).join(",");
    }).join(",");
  } else {
    out = value.toString();
    if (((_c = variable.modifier) === null || _c === void 0 ? void 0 : _c.type) === "substr") {
      out = out.substring(0, variable.modifier.length);
    }
    out = encode(out);
  }
  if (named) {
    if (out) {
      out = variable.name + "=" + out;
    } else {
      out = "" + variable.name + empty;
    }
  }
  return out;
}
function expandValueExplode(variable, value, _a) {
  var encode = _a.encode, named = _a.named, sep = _a.sep;
  if (Array.isArray(value)) {
    var items = value.map(encode);
    if (named) {
      items = items.map(function(item) {
        return variable.name + "=" + item;
      });
    }
    return items.join(sep);
  } else if (typeof value === "object") {
    var pairs_1 = [];
    Object.entries(value).forEach(function(_a2) {
      var k = _a2[0], v = _a2[1];
      k = encode(k);
      if (Array.isArray(v)) {
        v.forEach(function(item) {
          pairs_1.push(k + "=" + encode(item));
        });
      } else {
        pairs_1.push(k + "=" + encode(v));
      }
    });
    return pairs_1.join(sep);
  } else {
    var s = value.toString();
    return encode(s);
  }
}
function present(v) {
  switch (typeof v) {
    case "undefined":
      return false;
    case "object":
      if (v == null) {
        return false;
      }
      if (Array.isArray(v)) {
        return v.length > 0;
      }
      for (var k in v) {
        if (v[k] != null)
          return true;
      }
      return false;
    default:
      return true;
  }
}
(function(exports) {
  var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() {
      return m[k];
    } });
  } : function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    o[k2] = m[k];
  });
  var __setModuleDefault = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
  } : function(o, v) {
    o["default"] = v;
  });
  var __importStar = commonjsGlobal && commonjsGlobal.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
  };
  var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function(m, exports2) {
    for (var p in m)
      if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
        __createBinding(exports2, m, p);
  };
  exports.__esModule = true;
  exports.parseRule = exports.parse = void 0;
  var grammar$1 = __importStar(grammar);
  var AST = __importStar(ast);
  var expander_1 = expander;
  function parse(input) {
    var ast2 = parseRule(input, "template");
    return {
      ast: ast2,
      expand: function(values) {
        return (0, expander_1.expandTemplate)(ast2, values);
      },
      toString: function() {
        return AST.toString(ast2);
      }
    };
  }
  exports.parse = parse;
  function parseRule(input, startRule) {
    if (startRule === void 0) {
      startRule = "template";
    }
    return grammar$1.parse(input, { startRule });
  }
  exports.parseRule = parseRule;
  __exportStar(expander, exports);
})(dist);
const parser = /* @__PURE__ */ getDefaultExportFromCjs(dist);
class ComboBoxSearch extends HTMLElement {
  constructor() {
    super();
    __privateAdd(this, _field, void 0);
    __privateAdd(this, _form, void 0);
    __privateAdd(this, _data, {});
    __privateAdd(this, _resultList, void 0);
    __privateAdd(this, _searchTemplate, void 0);
    __privateAdd(this, _selectHandler, (e) => this.onSelect(e));
    __privateAdd(this, _changeHandler, (e) => this.onChange(e));
    __privateSet(this, _resultList, resultList());
    this.insertAdjacentElement("beforeend", __privateGet(this, _resultList));
  }
  async connectedCallback() {
    var _a;
    __privateSet(this, _form, this.closest("form"));
    __privateSet(this, _field, this.querySelector('input[type="text"]'));
    __privateGet(this, _field).autocomplete = "off";
    this.addEventListener("combo-item:select", __privateGet(this, _selectHandler));
    if (this.src !== void 0) {
      if (!this.reactive) {
        __privateSet(this, _data, await this.fetchData(this.src));
      } else {
        __privateSet(this, _searchTemplate, parser.parse(this.src));
      }
      (_a = __privateGet(this, _field)) == null ? void 0 : _a.addEventListener("input", __privateGet(this, _changeHandler));
    }
  }
  async onChange(e) {
    const value = __privateGet(this, _field).value;
    let data;
    if (this.reactive) {
      const url = __privateGet(this, _searchTemplate).expand({ q: value });
      data = await this.fetchData(url);
    } else {
      data = __privateGet(this, _data).filter((item) => item.text.toLowerCase().startsWith(value.toLowerCase()));
    }
    __privateGet(this, _resultList).update(data);
  }
  onSelect(e) {
    var _a;
    console.log(e);
    __privateGet(this, _field).value = e.detail.value;
    (_a = __privateGet(this, _form)) == null ? void 0 : _a.dispatchEvent(new SubmitEvent("submit", { submitter: this, bubbles: true }));
  }
  updateField(value) {
    __privateGet(this, _field).value = value;
  }
  async fetchData(src) {
    const response = await fetch(src);
    if (!response.ok) {
      console.warn("Error fetching data for", src);
      return [];
    }
    const data = await response.json();
    return data;
  }
  get src() {
    return this.getAttribute("src");
  }
  get reactive() {
    return this.hasAttribute("reactive");
  }
}
_field = new WeakMap();
_form = new WeakMap();
_data = new WeakMap();
_resultList = new WeakMap();
_searchTemplate = new WeakMap();
_selectHandler = new WeakMap();
_changeHandler = new WeakMap();
customElements.define("combo-box-search", ComboBoxSearch);
function resultList() {
  const list = document.createElement("combo-box-result-list");
  list.classList.add("hidden");
  return list;
}
class TabFocusChecker extends HTMLElement {
  constructor() {
    super(...arguments);
    __privateAdd(this, _icon, void 0);
    __privateAdd(this, _focusListener, () => this.onFocus());
    __privateAdd(this, _blurListener, () => this.onBlur());
  }
  connectedCallback() {
    __privateSet(this, _icon, document.querySelector("[rel=icon]"));
    window.addEventListener("blur", __privateGet(this, _blurListener));
    window.addEventListener("focus", __privateGet(this, _focusListener));
  }
  onBlur() {
    var _a;
    (_a = __privateGet(this, _icon)) == null ? void 0 : _a.setAttribute("href", "/images/favicon-inactive.svg");
  }
  onFocus() {
    var _a;
    (_a = __privateGet(this, _icon)) == null ? void 0 : _a.setAttribute("href", "/images/favicon.svg");
  }
  disconnectedCallback() {
    if (__privateGet(this, _blurListener)) {
      window.removeEventListener("blur", __privateGet(this, _blurListener));
    }
    if (__privateGet(this, _focusListener)) {
      __privateGet(this, _focusListener).call(this);
      window.removeEventListener("focus", __privateGet(this, _focusListener));
    }
  }
}
_icon = new WeakMap();
_focusListener = new WeakMap();
_blurListener = new WeakMap();
customElements.define("tab-focus-checker", TabFocusChecker);
