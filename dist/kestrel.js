var t = {
    d: (e, s) => {
      for (var i in s)
        t.o(s, i) &&
          !t.o(e, i) &&
          Object.defineProperty(e, i, { enumerable: !0, get: s[i] });
    },
    o: (t, e) => Object.prototype.hasOwnProperty.call(t, e),
  },
  e = {};
t.d(e, { d: () => M });
var s,
  o = "object" == typeof Reflect ? Reflect : null,
  n =
    o && "function" == typeof o.apply
      ? o.apply
      : function (t, e, s) {
          return Function.prototype.apply.call(t, e, s);
        };
s =
  o && "function" == typeof o.ownKeys
    ? o.ownKeys
    : Object.getOwnPropertySymbols
    ? function (t) {
        return Object.getOwnPropertyNames(t).concat(
          Object.getOwnPropertySymbols(t)
        );
      }
    : function (t) {
        return Object.getOwnPropertyNames(t);
      };
var r =
  Number.isNaN ||
  function (t) {
    return t != t;
  };
function a() {
  a.init.call(this);
}
a.once = function (t, e) {
  return new Promise(function (s, i) {
    function o(s) {
      t.removeListener(e, n), i(s);
    }
    function n() {
      "function" == typeof t.removeListener && t.removeListener("error", o),
        s([].slice.call(arguments));
    }
    v(t, e, n, { once: !0 }),
      "error" !== e &&
        (function (t, e) {
          "function" == typeof t.on && v(t, "error", e, { once: !0 });
        })(t, o);
  });
};
const h = a;
(a.EventEmitter = a),
  (a.prototype._events = void 0),
  (a.prototype._eventsCount = 0),
  (a.prototype._maxListeners = void 0);
var d = 10;
function c(t) {
  if ("function" != typeof t)
    throw new TypeError(
      'The "listener" argument must be of type Function. Received type ' +
        typeof t
    );
}
function l(t) {
  return void 0 === t._maxListeners ? a.defaultMaxListeners : t._maxListeners;
}
function u(t, e, s, i) {
  var o, n, r, a;
  if (
    (c(s),
    void 0 === (n = t._events)
      ? ((n = t._events = Object.create(null)), (t._eventsCount = 0))
      : (void 0 !== n.newListener &&
          (t.emit("newListener", e, s.listener ? s.listener : s),
          (n = t._events)),
        (r = n[e])),
    void 0 === r)
  )
    (r = n[e] = s), ++t._eventsCount;
  else if (
    ("function" == typeof r
      ? (r = n[e] = i ? [s, r] : [r, s])
      : i
      ? r.unshift(s)
      : r.push(s),
    (o = l(t)) > 0 && r.length > o && !r.warned)
  ) {
    r.warned = !0;
    var h = new Error(
      "Possible EventEmitter memory leak detected. " +
        r.length +
        " " +
        String(e) +
        " listeners added. Use emitter.setMaxListeners() to increase limit"
    );
    (h.name = "MaxListenersExceededWarning"),
      (h.emitter = t),
      (h.type = e),
      (h.count = r.length),
      (a = h),
      console && console.warn && console.warn(a);
  }
  return t;
}
function f() {
  if (!this.fired)
    return (
      this.target.removeListener(this.type, this.wrapFn),
      (this.fired = !0),
      0 === arguments.length
        ? this.listener.call(this.target)
        : this.listener.apply(this.target, arguments)
    );
}
function p(t, e, s) {
  var i = { fired: !1, wrapFn: void 0, target: t, type: e, listener: s },
    o = f.bind(i);
  return (o.listener = s), (i.wrapFn = o), o;
}
function m(t, e, s) {
  var i = t._events;
  if (void 0 === i) return [];
  var o = i[e];
  return void 0 === o
    ? []
    : "function" == typeof o
    ? s
      ? [o.listener || o]
      : [o]
    : s
    ? (function (t) {
        for (var e = new Array(t.length), s = 0; s < e.length; ++s)
          e[s] = t[s].listener || t[s];
        return e;
      })(o)
    : y(o, o.length);
}
function _(t) {
  var e = this._events;
  if (void 0 !== e) {
    var s = e[t];
    if ("function" == typeof s) return 1;
    if (void 0 !== s) return s.length;
  }
  return 0;
}
function y(t, e) {
  for (var s = new Array(e), i = 0; i < e; ++i) s[i] = t[i];
  return s;
}
function v(t, e, s, i) {
  if ("function" == typeof t.on) i.once ? t.once(e, s) : t.on(e, s);
  else {
    if ("function" != typeof t.addEventListener)
      throw new TypeError(
        'The "emitter" argument must be of type EventEmitter. Received type ' +
          typeof t
      );
    t.addEventListener(e, function o(n) {
      i.once && t.removeEventListener(e, o), s(n);
    });
  }
}
Object.defineProperty(a, "defaultMaxListeners", {
  enumerable: !0,
  get: function () {
    return d;
  },
  set: function (t) {
    if ("number" != typeof t || t < 0 || r(t))
      throw new RangeError(
        'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
          t +
          "."
      );
    d = t;
  },
}),
  (a.init = function () {
    (void 0 !== this._events &&
      this._events !== Object.getPrototypeOf(this)._events) ||
      ((this._events = Object.create(null)), (this._eventsCount = 0)),
      (this._maxListeners = this._maxListeners || void 0);
  }),
  (a.prototype.setMaxListeners = function (t) {
    if ("number" != typeof t || t < 0 || r(t))
      throw new RangeError(
        'The value of "n" is out of range. It must be a non-negative number. Received ' +
          t +
          "."
      );
    return (this._maxListeners = t), this;
  }),
  (a.prototype.getMaxListeners = function () {
    return l(this);
  }),
  (a.prototype.emit = function (t) {
    for (var e = [], s = 1; s < arguments.length; s++) e.push(arguments[s]);
    var i = "error" === t,
      o = this._events;
    if (void 0 !== o) i = i && void 0 === o.error;
    else if (!i) return !1;
    if (i) {
      var r;
      if ((e.length > 0 && (r = e[0]), r instanceof Error)) throw r;
      var a = new Error("Unhandled error." + (r ? " (" + r.message + ")" : ""));
      throw ((a.context = r), a);
    }
    var h = o[t];
    if (void 0 === h) return !1;
    if ("function" == typeof h) n(h, this, e);
    else {
      var d = h.length,
        c = y(h, d);
      for (s = 0; s < d; ++s) n(c[s], this, e);
    }
    return !0;
  }),
  (a.prototype.addListener = function (t, e) {
    return u(this, t, e, !1);
  }),
  (a.prototype.on = a.prototype.addListener),
  (a.prototype.prependListener = function (t, e) {
    return u(this, t, e, !0);
  }),
  (a.prototype.once = function (t, e) {
    return c(e), this.on(t, p(this, t, e)), this;
  }),
  (a.prototype.prependOnceListener = function (t, e) {
    return c(e), this.prependListener(t, p(this, t, e)), this;
  }),
  (a.prototype.removeListener = function (t, e) {
    var s, i, o, n, r;
    if ((c(e), void 0 === (i = this._events))) return this;
    if (void 0 === (s = i[t])) return this;
    if (s === e || s.listener === e)
      0 == --this._eventsCount
        ? (this._events = Object.create(null))
        : (delete i[t],
          i.removeListener && this.emit("removeListener", t, s.listener || e));
    else if ("function" != typeof s) {
      for (o = -1, n = s.length - 1; n >= 0; n--)
        if (s[n] === e || s[n].listener === e) {
          (r = s[n].listener), (o = n);
          break;
        }
      if (o < 0) return this;
      0 === o
        ? s.shift()
        : (function (t, e) {
            for (; e + 1 < t.length; e++) t[e] = t[e + 1];
            t.pop();
          })(s, o),
        1 === s.length && (i[t] = s[0]),
        void 0 !== i.removeListener && this.emit("removeListener", t, r || e);
    }
    return this;
  }),
  (a.prototype.off = a.prototype.removeListener),
  (a.prototype.removeAllListeners = function (t) {
    var e, s, i;
    if (void 0 === (s = this._events)) return this;
    if (void 0 === s.removeListener)
      return (
        0 === arguments.length
          ? ((this._events = Object.create(null)), (this._eventsCount = 0))
          : void 0 !== s[t] &&
            (0 == --this._eventsCount
              ? (this._events = Object.create(null))
              : delete s[t]),
        this
      );
    if (0 === arguments.length) {
      var o,
        n = Object.keys(s);
      for (i = 0; i < n.length; ++i)
        "removeListener" !== (o = n[i]) && this.removeAllListeners(o);
      return (
        this.removeAllListeners("removeListener"),
        (this._events = Object.create(null)),
        (this._eventsCount = 0),
        this
      );
    }
    if ("function" == typeof (e = s[t])) this.removeListener(t, e);
    else if (void 0 !== e)
      for (i = e.length - 1; i >= 0; i--) this.removeListener(t, e[i]);
    return this;
  }),
  (a.prototype.listeners = function (t) {
    return m(this, t, !0);
  }),
  (a.prototype.rawListeners = function (t) {
    return m(this, t, !1);
  }),
  (a.listenerCount = function (t, e) {
    return "function" == typeof t.listenerCount
      ? t.listenerCount(e)
      : _.call(t, e);
  }),
  (a.prototype.listenerCount = _),
  (a.prototype.eventNames = function () {
    return this._eventsCount > 0 ? s(this._events) : [];
  });
const g = JSON.parse(
    '{"S-":"1-","T-":"2-","P-":"3-","H-":"4-","A-":"5-","O-":"0-","-F":"-6","-P":"-7","-L":"-8","-T":"-9"}'
  ),
  w = JSON.parse(
    '{"1":"#","2":"S-","4":"T-","8":"K-","16":"P-","32":"W-","64":"H-","128":"R-","256":"A-","512":"O-","1024":"*","2048":"-E","4096":"-U","8192":"-F","16384":"-R","32768":"-P","65536":"-B","131072":"-L","262144":"-G","524288":"-T","1048576":"-S","2097152":"-D","4194304":"-Z"}'
  ),
  L = JSON.parse(
    '{"0":"#","1":"#","2":"#","3":"#","4":"#","5":"#","6":"#","7":"#","8":"#","9":"#","10":"#","Q":"S-","A":"S-","W":"T-","S":"K-","E":"P-","D":"W-","R":"H-","F":"R-","C":"A-","V":"O-","T":"*","G":"*","Y":"*","H":"*","N":"-E","M":"-U","U":"-F","J":"-R","I":"-P","K":"-B","O":"-L","L":"-G","P":"-T",";":"-S","[":"-D","\'":"-Z"}'
  ),
  b = JSON.parse(
    '{"48":"#","49":"#","50":"#","51":"#","52":"#","53":"#","54":"#","55":"#","56":"#","57":"#","59":"-S","65":"S-","67":"A-","68":"W-","69":"P-","70":"R-","71":"*","72":"*","73":"-P","74":"-R","75":"-B","76":"-G","77":"-U","78":"-E","79":"-L","80":"-T","81":"S-","82":"H-","83":"K-","84":"*","85":"-F","86":"O-","87":"T-","89":"*","109":"#","186":"-S","219":"-D","222":"-Z"}'
  ),
  S = (t) => Object.fromEntries(Object.entries(t).map(([t, e]) => [e, t])),
  T = {
    stenoToBinary: S(w),
    stenoToQwerty: S(L),
    stenoToKeyCode: S(b),
    stenoToNumbers: g,
    binaryToSteno: w,
    qwertyToSteno: L,
    keyCodeToSteno: b,
    numbersToSteno: S(g),
  };
class O extends h {
  constructor(t) {
    super(),
      (this._root = t),
      (this._addons = {}),
      (this.addons = (() => Object.values(this._addons))()),
      (this.reload = this.load),
      (this.remove = this.unload),
      (this.add = this.load);
  }
  _onKeyDown(t) {
    Object.values(this._addons).forEach((e) => {
      e.instance.onKeyDown && e.instance.onKeyDown(t);
    });
  }
  _onKeyUp(t) {
    Object.values(this._addons).forEach((e) => {
      e.instance.onKeyUp && e.instance.onKeyUp(t);
    });
  }
  _onChord(t) {
    const e = t,
      s = Object.values(this._addons).slice();
    this._root.output,
      (function t() {
        s.length > 0 && s.shift().instance.onChord(e, t);
      })();
  }
  reloadAll() {
    return this._addons.length < 1
      ? (this.emit("reloadAllFailed"),
        this._root.emit("addonsReloadFailed"),
        !1)
      : (Object.values(this._addons).forEach((t) => this.load(t.class)),
        this.emit("reloadAll", this._addons),
        this._root.emit("addonsReload"),
        !0);
  }
  load(t, e) {
    if ("class" != typeof t && "function" != typeof t && 1 != t.isAddon)
      return !1;
    var s = new t(this._root.output, T, ...e);
    return (
      (this._addons[t.name] = { class: t, instance: s }),
      t.name in this._addons
        ? (this._addons[t.name].instance.onLoad(),
          this.emit("load", this._addons[t.name]),
          this._root.emit("addonLoad", this._addons[t.name]),
          this.emit("reload", this._addons[t.name]),
          this._root.emit("addonReload", this._addons[t.name]),
          this._addons[t.name].instance)
        : (this.emit("loadFailed", t),
          this._root.emit("addonLoadFailed", t),
          this.emit("reloadFailed", t),
          this._root.emit("addonReloadFailed", t),
          !1)
    );
  }
  unload(t) {
    return (
      t.name in this._addons &&
      (this._addons[t.name].instance.onUnload(),
      delete this._addons[t.name],
      !0)
    );
  }
}
class C {
  constructor(t) {
    (this._root = t),
      (this._downKeys = []),
      (this._chordKeys = []),
      (this._allSteno = !0);
  }
  onKeyDown(t) {
    this._root.addons._onKeyDown.apply(this._root.addons, [t]),
      this._downKeys.length < 1 &&
        ((this._downKeys = []), (this._chordKeys = []), (this._allSteno = !0)),
      this._downKeys.includes(t) || this._downKeys.push(t),
      this._chordKeys.includes(t) || this._chordKeys.push(t),
      T.stenoToKeyCode[t] || (this._allSteno = !1);
  }
  onKeyUp(t) {
    if (
      (this._root.addons._onKeyUp.call(this._root.addons, t),
      (this._downKeys = this._downKeys.filter((e) => e !== t)),
      1 == this._allSteno &&
        this._downKeys.length < 1 &&
        0 == this._root.config.arpeggiate)
    ) {
      var e = this._chordKeys;
      this._root.output._onChord.call(this._root.output, e),
        this._root.addons._onChord.call(this._root.addons, e);
    }
  }
  arpeggiate() {
    if (
      1 == this._allSteno &&
      this._downKeys.length < 2 &&
      1 == this._root.config.arpeggiate
    ) {
      var t = this._chordKeys;
      return (
        this._root.output._onChord.call(this._root.output, t),
        this._root.addons._onChord.call(this._root.addons, t),
        !0
      );
    }
    return !1;
  }
}
class K extends h {
  constructor(t) {
    super(),
      (this._root = t),
      (this.sendSteno = this.fromSteno),
      (this.sendQwerty = this.fromQwerty),
      (this.sendKeyCode = this.fromKeyCode),
      (this.sendBinary = this.fromBinary),
      (this.steno = this.fromSteno),
      (this.qwerty = this.fromQwerty),
      (this.keyCode = this.fromKeyCode),
      (this.binary = this.fromBinary);
  }
  fromSteno(t, e) {
    return e in T.stenoToQwerty
      ? (this._root.parser[1 == t ? "onKeyDown" : "onKeyUp"].call(
          this._root.parser,
          e
        ),
        !0)
      : (this._root.parser[1 == t ? "onKeyDown" : "onKeyUp"].call(
          this._root.parser,
          e
        ),
        !1);
  }
  fromQwerty(t, e) {
    if (!((e = e.toUpperCase()) in T.qwertyToSteno))
      return this.fromSteno(t, e);
    var s = T.qwertyToSteno[e];
    return this.fromSteno(t, s);
  }
  fromKeyCode(t, e) {
    if (!(e in T.keyCodeToSteno)) return this.fromSteno(t, e);
    var s = T.keyCodeToSteno[e];
    return this.fromSteno(t, s);
  }
  fromBinary(t, e) {
    if (!(e in T.binaryToSteno)) return this.fromSteno(t, e);
    var s = T.binaryToSteno[e];
    return this.fromSteno(t, s);
  }
}
class E extends h {
  constructor(t) {
    super(),
      (this._root = t),
      (this._chordListeners = []),
      (this._dataListeners = []),
      (this._modifyListeners = []),
      (this.data = ""),
      (this.modifications = []),
      (this.chords = []),
      (this.chordCallback = this.onChord),
      (this.dataCallback = this.onData),
      (this.modifyCallback = this.onData),
      (this.sendChord = this._onChord),
      (this.sendData = this._onData),
      (this.sendModify = this._onModify);
  }
  _onChord(t) {
    this.chords.push(t),
      this.emit("chord", t),
      this._root.emit("outputChord", t),
      this._chordListeners.forEach((e) => e(t));
  }
  _onData(t) {
    (this.data = t),
      this.emit("data", t),
      this._root.emit("outputData", t),
      this._dataListeners.forEach((e) => e(t));
  }
  _onModify(t) {
    this.modifications.push(t),
      this.emit("modify", t),
      this._root.emit("outputModify", t),
      this._modifyListeners.forEach((e) => e(t));
  }
  onChord(t) {
    this._chordListeners.push(t);
  }
  onData(t) {
    this._dataListeners.push(t);
  }
  onModify(t) {
    this._modifyListeners.push(t);
  }
}
const R = JSON.parse('{"arpeggiate":false,"paused":false,"undo_history":100}'),
  k = class {
    constructor(t) {
      this.keys = t.reduce(function (t, e, s, i) {
        return (t[e] = e), t;
      }, {});
    }
    toString() {
      return `${Object.values(this.keys)
        .map((t) => t)
        .join(", ")}`;
    }
    getKeys() {
      return this.keys;
    }
    setKeys(t) {
      this.keys = t[0];
    }
    contains(t) {
      return Object.values(this.keys).includes(t);
    }
    toBinary() {
      return Object.values(this.keys).reduce(
        (t, e) => t | T.binaryToSteno[e],
        0
      );
    }
    toRTFCRE() {
      for (
        var t = "", e = parseInt("00000000000000000000001", 2);
        e <= parseInt("10000000000000000000000", 2);
        e <<= 1
      )
        this.contains(T.binaryToSteno[e]) &&
          "#" != T.binaryToSteno[e] &&
          (this.contains("#") && T.stenoToNumbers[T.binaryToSteno[e]]
            ? (t += T.stenoToNumbers[T.binaryToSteno[e]])
            : (t += T.binaryToSteno[e]));
      return this.contains("A-") ||
        this.contains("O-") ||
        this.contains("-E") ||
        this.contains("-U") ||
        this.contains("*")
        ? t.replace(/-/g, "")
        : "-" === t[0]
        ? "-" + t.replace("--", ".").replace(/-/g, "").replace(".", "-")
        : t.replace("--", ".").replace(/-/g, "").replace(".", "-");
    }
    addKey(t) {
      this.keys[t] = t;
    }
    removeKey(t) {
      t in this.keys && delete this.keys[t];
    }
  },
  x = class {
    constructor(t) {
      if (((this.strokes = t), (this.string = ""), this.strokes.length > 0)) {
        for (var e = 0; e < this.strokes.length; e++)
          this.string += this.strokes[e].toRTFCRE() + "/";
        this.string = this.string.slice(0, -1);
      }
    }
    toString() {
      return this.string;
    }
    getStrokes() {
      return this.strokes;
    }
    setStrokes(t) {
      (this.strokes = t), (this.string = t.map((t) => t.toRTFCRE()).join("/"));
    }
    addStroke(t) {
      this.strokes.push(t), (this.string += "/" + t.toRTFCRE());
    }
    removeStroke() {
      this.strokes.pop(),
        (this.string = this.strokes.map((t) => t.toRTFCRE()).join("/"));
    }
    toEnglish = function (t, e) {
      return t[this.string]
        ? !1 !== e(t[this.string])
          ? e(t[this.string])()
          : t[this.string]
        : this.string;
    };
  };
class F extends h {
  constructor(t, e, s, i) {
    super(),
      (this.isdict = !0),
      (this.convert = e),
      (this.output = t),
      (this._root = s),
      (this._words = []),
      (this._dictionary = {}),
      (this.dicts = []),
      (this.macros = i),
      (this.reload = this.load),
      (this.remove = this.unload),
      (this.add = this.load);
  }
  onLoad() {}
  onUnload() {}
  _generateDictionary(t = this.dicts) {
    const e = {};
    for (let s of t) for (let t in s) s.hasOwnProperty(t) && (e[t] = s[t]);
    return e;
  }
  _demetafy(t) {
    return (
      (t = (t = (t = t.replace(/\s*{(\.|!|\?)}\s*(\w?)/g, function (t, e, s) {
        return e + " " + s.toUpperCase();
      })).replace(/\s*{(,|:|;)}\s*/g, function (t, e) {
        return e + " ";
      })).replace(/(\w*)\s*{(\^ed|\^ing|\^er|\^s)}/g, function () {
        var t = arguments[1],
          e = arguments[2],
          s = {
            b: !0,
            c: !0,
            d: !0,
            f: !0,
            g: !0,
            h: !0,
            j: !0,
            k: !0,
            l: !0,
            m: !0,
            n: !0,
            p: !0,
            q: !0,
            r: !0,
            s: !0,
            t: !0,
            v: !0,
            w: !0,
            x: !0,
            z: !0,
            B: !0,
            C: !0,
            D: !0,
            F: !0,
            G: !0,
            H: !0,
            J: !0,
            K: !0,
            L: !0,
            M: !0,
            N: !0,
            P: !0,
            Q: !0,
            R: !0,
            S: !0,
            T: !0,
            V: !0,
            W: !0,
            X: !0,
            Z: !0,
          },
          i = {
            a: !0,
            e: !0,
            i: !0,
            o: !0,
            u: !0,
            A: !0,
            E: !0,
            I: !0,
            O: !0,
            U: !0,
          },
          o = { w: !0, W: !0 },
          n = { y: !0, Y: !0 },
          r = function (t) {
            var e = t.length;
            if (e < 2) return t;
            if (typeof thirdToLast === 'undefined') return;
            if (
              ((thirdToLast = e >= 3 ? t.slice(-3, -2) : ""),
              (secondToLast = t.slice(-2, -1)),
              (last = t.slice(-1)),
              secondToLast in i || secondToLast in s)
            )
              if (last in i) {
                if (thirdToLast && (thirdToLast in i || thirdToLast in s))
                  return t.slice(0, -1);
              } else {
                if (
                  last in s &&
                  !(last in o) &&
                  secondToLast in i &&
                  thirdToLast &&
                  !(thirdToLast in i)
                )
                  return t + last;
                if (last in n && secondToLast in s) return t.slice(0, -1) + "i";
              }
            return t;
          };
        if ("^s" === e) {
          if (t.length < 2) return t + "s";
          var a = t.slice(-2, -1),
            h = t.slice(-1);
          return h in { s: !0, x: !0, z: !0, S: !0, X: !0, Z: !0 }
            ? t + "es"
            : h in n && a in s
            ? t.slice(0, -1) + "ies"
            : t + "s";
        }
        return "^ed" === e
          ? r(t) + "ed"
          : "^er" === e
          ? r(t) + "er"
          : "^ing" === e
          ? t && t.slice(-1) in n
            ? t + "ing"
            : r(t) + "ing"
          : void 0;
      })),
      (t = (t = t.replace(/\s*{-\|}\s*(\w?)/g, function (t, e) {
        return e.toUpperCase();
      })).replace(/(\s*{&[^}]+}\s*)+/g, function () {
        for (let z = 0 ; z < arguments.length; z++) z;
        var t = arguments[0];
        return (
          " " +
          (t = t.replace(/\s*{&([^}]+)}\s*/g, function (t, e) {
            return e;
          })) +
          " "
        );
      })),
      (t = (t = (t = (t = t.replace(/\s*{\^([^}]+)\^}\s*/g, function (t, e) {
        return e;
      })).replace(/\s*{\^([^}]+)}(\s*)/g, function (t, e, s) {
        return e + s;
      })).replace(/(\s*){([^}]+)\^}\s*/g, function (t, e, s) {
        return e + s;
      })).replace(/\s*{#Return}\s*/g, "\n")).replace(/\s*{#Tab}\s*/g, "\t")
    );
  }
  onChord(t, e) {
    this._words.length > this._root.config.undo_history &&
      (this._words = this._words.slice(
        this._words.length - this._root.config.undo_history
      ));
    var s = [];
    const i = new k(t);
    if (this._words.length > 0) {
      if ("*" !== i.toRTFCRE()) {
        const t = this._words[this._words.length - 1],
          e = t.toString() + "/" + i.toRTFCRE();
        if (
          (s.push({ action: "delete", amount: t.length + 1 }),
          this._dictionary[e])
        )
          t.addStroke(i),
            s.push({
              action: "add",
              text: this._demetafy(
                i.toEnglish(this._dictionary, this.macros.checkMarco) + " "
              ),
            });
        else {
          var o = new x([i]);
          this._words.push(o),
            s.push({
              action: "add",
              text: this._demetafy(
                o.toEnglish(this._dictionary, this.macros.checkMarco) + " "
              ),
            });
        }
      } else if ("*" === i.toRTFCRE()) {
        if (this._words.length < 1) return;
        s.push({ action: "delete", amount: this._words.length + 1 }),
          this._words[this._words.length - 1].removeStroke(),
          "" === this._words[this._words.length - 1].toString() &&
            this._words.pop(),
          this._words.length < 2 &&
            this._words[this._words.length - 1] &&
            s.push({
              action: "add",
              text: this._demetafy(
                this._words[this._words.length - 1].toEnglish(
                  this._dictionary,
                  this.macros.checkMarco
                ) + " "
              ),
            });
      }
    } else
      (o = new x([i])),
        this._words.push(o),
        s.push({
          action: "add",
          text: this._demetafy(
            o.toEnglish(this._dictionary, this.macros.checkMarco) + " "
          ),
        });
    const n = this._words.reduce(
      (t, e) => t + e.toEnglish(this._dictionary, this.macros.checkMarco) + " ",
      ""
    );
    return (
      this.output._onData(this._demetafy(n)), this.output._onModify(s), e()
    );
  }
  lookup(t) {}
  reloadAll() {
    return this.dicts.length < 1
      ? (this.emit("reloadAllFailed"),
        this._root.emit("dictionariesReloadFailed"),
        !1)
      : (this.dicts.forEach((t) => this.load(t, !1)),
        (this._dictionary = this._generateDictionary()),
        this.emit("reloadAll", this.dicts),
        this._root.emit("dictionariesReload"),
        !0);
  }
  load(t, e = !0) {
    return (
      "object" == typeof t &&
      (this.dicts.push(t),
      1 == e && (this._dictionary = this._generateDictionary()),
      t in this.dicts
        ? (this.emit("load", t),
          this._root.emit("dictionaryLoad", t),
          this.emit("reload", t),
          this._root.emit("dictionaryReload", t),
          t)
        : (this.emit("loadFailed", t),
          this._root.emit("dictionaryLoadFailed", t),
          this.emit("reloadFailed", t),
          this._root.emit("dictionaryReloadFailed", t),
          !1))
    );
  }
  unload(t) {
    return (
      t in this.dicts &&
      (delete this.dicts[this.dicts.indexOf(t)],
      (this._dictionary = this._generateDictionary()),
      !0)
    );
  }
}
class j extends h {
  constructor(t, e) {
    super(),
      (this._root = e),
      (this._macros = {}),
      (this._convert = t),
      (this.macros = []),
      (this.reload = this.load),
      (this.remove = this.unload),
      (this.add = this.load);
  }
  checkMarco(t) {
    if (!this) return false;
    return (
      !!(
        t.startsWith("{") &&
        t.endsWith("}") &&
        `${t.slice(1, t.length - 1)}` in Object.values(this._macros)
      ) && this._macros[`${t.slice(1, t.length - 1)}`]
    );
  }
  reloadAll() {
    return this.macros.length < 1
      ? (this.emit("reloadAllFailed"),
        this._root.emit("macrosReloadFailed"),
        !1)
      : (this.macros.forEach((t) => this.load(t, !1)),
        (this._macros = this._generateMacros()),
        this.emit("reloadAll", this.macros),
        this._root.emit("macrosReload"),
        !0);
  }
  load(t, e = !0) {
    return (
      !(!t.name || "object" != typeof t) &&
      (this.macros.push(t),
      1 == e && (this._macros = this._generateMacros()),
      t in this.macros
        ? (this.emit("load", this.macros[this.macros.indexOf(t)]),
          this._root.emit("macroLoad", this._macros[this.macros.indexOf(t)]),
          this.emit("reload", this.macros[this.macros.indexOf(t)]),
          this._root.emit("macroReload", this._macros[this.macros.indexOf(t)]),
          t)
        : (this.emit("loadFailed", t),
          this._root.emit("macroLoadFailed", t),
          this.emit("reloadFailed", t),
          this._root.emit("macroReloadFailed", t),
          !1))
    );
  }
  unload(t) {
    return (
      t in this.macros &&
      (delete this.macros[this.macros.indexOf(t)],
      (this._macros = this._generateMacros()),
      !0)
    );
  }
  _generateMacros(t = this.macros) {
    for (let e of t)
      for (let t in e) e.hasOwnProperty(t) && (mergedDict[t] = e[t]);
    return mergedDict;
  }
}
class D extends h {
  constructor() {
    super();
  }
  async _init() {
    return (
      (this.config = R),
      (this.exited = !1),
      (this.convert = T),
      (this.parser = new C(this)),
      (this.input = new K(this)),
      (this.output = new E(this)),
      (this.addons = new O(this)),
      (this.dictionaries = null),
      (this.quit = this.exit),
      (this.holt = this.pause),
      (this.continue = this.resume),
      (this.macros = new j(T, this)),
      (this.dictionaries = await this.addons.load(F, [this, this.macros])),
      this
    );
  }
  exit() {
    this.emit("exit"),
      (this.exited = !0),
      delete this.input,
      delete this.output,
      delete this.dictionaries,
      delete this.addons;
  }
  pause() {
    (this.config.paused = !0), this.emit("pause");
  }
  resume() {
    (this.config.paused = !1), this.emit("resume");
  }
}
var M = async () => {
    var t = new D();
    return await t._init(), t;
  },
  A = e.d;
export { A as Kestrel };
