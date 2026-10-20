var Zo = Object.create;
var da = Object.defineProperty;
var Yo = Object.getOwnPropertyDescriptor;
var eu = Object.getOwnPropertyNames;
var tu = Object.getPrototypeOf,
  ru = Object.prototype.hasOwnProperty;
var nu = (Qr, Kr) => () => (
  Kr || Qr((Kr = { exports: {} }).exports, Kr),
  Kr.exports
);
var iu = (Qr, Kr, Wr, Jr) => {
  if ((Kr && typeof Kr == "object") || typeof Kr == "function")
    for (let Gr of eu(Kr))
      !ru.call(Qr, Gr) &&
        Gr !== Wr &&
        da(Qr, Gr, {
          get: () => Kr[Gr],
          enumerable: !(Jr = Yo(Kr, Gr)) || Jr.enumerable,
        });
  return Qr;
};
var su = (Qr, Kr, Wr) => (
  (Wr = Qr != null ? Zo(tu(Qr)) : {}),
  iu(
    Kr || !Qr || !Qr.__esModule
      ? da(Wr, "default", { value: Qr, enumerable: !0 })
      : Wr,
    Qr,
  )
);
var Xo = nu((exports, module) => {
  (function (Qr, Kr) {
    typeof define == "function" && define.amd
      ? define([], Kr)
      : typeof module == "object" && module.exports
        ? (module.exports = Kr())
        : (Qr.htmx = Qr.htmx || Kr());
  })(typeof self < "u" ? self : exports, function () {
    return (function () {
      "use strict";
      var Q = {
          onLoad: F,
          process: zt,
          on: de,
          off: ge,
          trigger: ce,
          ajax: Nr,
          find: C,
          findAll: f,
          closest: v,
          values: function (Qr, Kr) {
            var Wr = dr(Qr, Kr || "post");
            return Wr.values;
          },
          remove: _,
          addClass: z,
          removeClass: n,
          toggleClass: $,
          takeClass: W,
          defineExtension: Ur,
          removeExtension: Br,
          logAll: V,
          logNone: j,
          logger: null,
          config: {
            historyEnabled: !0,
            historyCacheSize: 10,
            refreshOnHistoryMiss: !1,
            defaultSwapStyle: "innerHTML",
            defaultSwapDelay: 0,
            defaultSettleDelay: 20,
            includeIndicatorStyles: !0,
            indicatorClass: "htmx-indicator",
            requestClass: "htmx-request",
            addedClass: "htmx-added",
            settlingClass: "htmx-settling",
            swappingClass: "htmx-swapping",
            allowEval: !0,
            allowScriptTags: !0,
            inlineScriptNonce: "",
            attributesToSettle: ["class", "style", "width", "height"],
            withCredentials: !1,
            timeout: 0,
            wsReconnectDelay: "full-jitter",
            wsBinaryType: "blob",
            disableSelector: "[hx-disable], [data-hx-disable]",
            useTemplateFragments: !1,
            scrollBehavior: "smooth",
            defaultFocusScroll: !1,
            getCacheBusterParam: !1,
            globalViewTransitions: !1,
            methodsThatUseUrlParams: ["get"],
            selfRequestsOnly: !1,
            ignoreTitle: !1,
            scrollIntoViewOnBoost: !0,
            triggerSpecsCache: null,
          },
          parseInterval: d,
          _: t,
          createEventSource: function (Qr) {
            return new EventSource(Qr, { withCredentials: !0 });
          },
          createWebSocket: function (Qr) {
            var Kr = new WebSocket(Qr, []);
            return ((Kr.binaryType = Q.config.wsBinaryType), Kr);
          },
          version: "1.9.12",
        },
        r = {
          addTriggerHandler: Lt,
          bodyContains: se,
          canAccessLocalStorage: U,
          findThisElement: xe,
          filterValues: yr,
          hasAttribute: o,
          getAttributeValue: te,
          getClosestAttributeValue: ne,
          getClosestMatch: c,
          getExpressionVars: Hr,
          getHeaders: xr,
          getInputValues: dr,
          getInternalData: ae,
          getSwapSpecification: wr,
          getTriggerSpecs: it,
          getTarget: ye,
          makeFragment: l,
          mergeObjects: le,
          makeSettleInfo: T,
          oobSwap: Ee,
          querySelectorExt: ue,
          selectAndSwap: je,
          settleImmediately: nr,
          shouldCancel: ut,
          triggerEvent: ce,
          triggerErrorEvent: fe,
          withExtensions: R,
        },
        w = ["get", "post", "put", "delete", "patch"],
        i = w
          .map(function (Qr) {
            return "[hx-" + Qr + "], [data-hx-" + Qr + "]";
          })
          .join(", "),
        S = e("head"),
        q = e("title"),
        H = e("svg", !0);
      function e(Qr, Kr) {
        return new RegExp(
          "<" + Qr + "(\\s[^>]*>|>)([\\s\\S]*?)<\\/" + Qr + ">",
          Kr ? "gim" : "im",
        );
      }
      function d(Qr) {
        if (Qr == null) return;
        let Kr = NaN;
        return (
          Qr.slice(-2) == "ms"
            ? (Kr = parseFloat(Qr.slice(0, -2)))
            : Qr.slice(-1) == "s"
              ? (Kr = parseFloat(Qr.slice(0, -1)) * 1e3)
              : Qr.slice(-1) == "m"
                ? (Kr = parseFloat(Qr.slice(0, -1)) * 1e3 * 60)
                : (Kr = parseFloat(Qr)),
          isNaN(Kr) ? void 0 : Kr
        );
      }
      function ee(Qr, Kr) {
        return Qr.getAttribute && Qr.getAttribute(Kr);
      }
      function o(Qr, Kr) {
        return (
          Qr.hasAttribute &&
          (Qr.hasAttribute(Kr) || Qr.hasAttribute("data-" + Kr))
        );
      }
      function te(Qr, Kr) {
        return ee(Qr, Kr) || ee(Qr, "data-" + Kr);
      }
      function u(Qr) {
        return Qr.parentElement;
      }
      function re() {
        return document;
      }
      function c(Qr, Kr) {
        for (; Qr && !Kr(Qr); ) Qr = u(Qr);
        return Qr || null;
      }
      function L(Qr, Kr, Wr) {
        var Jr = te(Kr, Wr),
          Gr = te(Kr, "hx-disinherit");
        return Qr !== Kr && Gr && (Gr === "*" || Gr.split(" ").indexOf(Wr) >= 0)
          ? "unset"
          : Jr;
      }
      function ne(Qr, Kr) {
        var Wr = null;
        if (
          (c(Qr, function (Jr) {
            return (Wr = L(Qr, Jr, Kr));
          }),
          Wr !== "unset")
        )
          return Wr;
      }
      function h(Qr, Kr) {
        var Wr =
          Qr.matches ||
          Qr.matchesSelector ||
          Qr.msMatchesSelector ||
          Qr.mozMatchesSelector ||
          Qr.webkitMatchesSelector ||
          Qr.oMatchesSelector;
        return Wr && Wr.call(Qr, Kr);
      }
      function A(Qr) {
        var Kr = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
          Wr = Kr.exec(Qr);
        return Wr ? Wr[1].toLowerCase() : "";
      }
      function s(Qr, Kr) {
        for (
          var Wr = new DOMParser(),
            Jr = Wr.parseFromString(Qr, "text/html"),
            Gr = Jr.body;
          Kr > 0;
        )
          (Kr--, (Gr = Gr.firstChild));
        return (Gr == null && (Gr = re().createDocumentFragment()), Gr);
      }
      function N(Qr) {
        return /<body/.test(Qr);
      }
      function l(Qr) {
        var Kr = !N(Qr),
          Wr = A(Qr),
          Jr = Qr;
        if (
          (Wr === "head" && (Jr = Jr.replace(S, "")),
          Q.config.useTemplateFragments && Kr)
        ) {
          var Gr = s("<body><template>" + Jr + "</template></body>", 0),
            Zr = Gr.querySelector("template").content;
          return (
            Q.config.allowScriptTags
              ? oe(Zr.querySelectorAll("script"), function (Yr) {
                  (Q.config.inlineScriptNonce &&
                    (Yr.nonce = Q.config.inlineScriptNonce),
                    (Yr.htmxExecuted =
                      navigator.userAgent.indexOf("Firefox") === -1));
                })
              : oe(Zr.querySelectorAll("script"), function (Yr) {
                  _(Yr);
                }),
            Zr
          );
        }
        switch (Wr) {
          case "thead":
          case "tbody":
          case "tfoot":
          case "colgroup":
          case "caption":
            return s("<table>" + Jr + "</table>", 1);
          case "col":
            return s("<table><colgroup>" + Jr + "</colgroup></table>", 2);
          case "tr":
            return s("<table><tbody>" + Jr + "</tbody></table>", 2);
          case "td":
          case "th":
            return s("<table><tbody><tr>" + Jr + "</tr></tbody></table>", 3);
          case "script":
          case "style":
            return s("<div>" + Jr + "</div>", 1);
          default:
            return s(Jr, 0);
        }
      }
      function ie(Qr) {
        Qr && Qr();
      }
      function I(Qr, Kr) {
        return Object.prototype.toString.call(Qr) === "[object " + Kr + "]";
      }
      function k(Qr) {
        return I(Qr, "Function");
      }
      function P(Qr) {
        return I(Qr, "Object");
      }
      function ae(Qr) {
        var Kr = "htmx-internal-data",
          Wr = Qr[Kr];
        return (Wr || (Wr = Qr[Kr] = {}), Wr);
      }
      function M(Qr) {
        var Kr = [];
        if (Qr) for (var Wr = 0; Wr < Qr.length; Wr++) Kr.push(Qr[Wr]);
        return Kr;
      }
      function oe(Qr, Kr) {
        if (Qr) for (var Wr = 0; Wr < Qr.length; Wr++) Kr(Qr[Wr]);
      }
      function X(Qr) {
        var Kr = Qr.getBoundingClientRect(),
          Wr = Kr.top,
          Jr = Kr.bottom;
        return Wr < window.innerHeight && Jr >= 0;
      }
      function se(Qr) {
        return Qr.getRootNode && Qr.getRootNode() instanceof window.ShadowRoot
          ? re().body.contains(Qr.getRootNode().host)
          : re().body.contains(Qr);
      }
      function D(Qr) {
        return Qr.trim().split(/\s+/);
      }
      function le(Qr, Kr) {
        for (var Wr in Kr) Kr.hasOwnProperty(Wr) && (Qr[Wr] = Kr[Wr]);
        return Qr;
      }
      function E(Qr) {
        try {
          return JSON.parse(Qr);
        } catch (Kr) {
          return (b(Kr), null);
        }
      }
      function U() {
        var Qr = "htmx:localStorageTest";
        try {
          return (
            localStorage.setItem(Qr, Qr),
            localStorage.removeItem(Qr),
            !0
          );
        } catch {
          return !1;
        }
      }
      function B(Qr) {
        try {
          var Kr = new URL(Qr);
          return (
            Kr && (Qr = Kr.pathname + Kr.search),
            /^\/$/.test(Qr) || (Qr = Qr.replace(/\/+$/, "")),
            Qr
          );
        } catch {
          return Qr;
        }
      }
      function t(e) {
        return Tr(re().body, function () {
          return eval(e);
        });
      }
      function F(Qr) {
        var Kr = Q.on("htmx:load", function (Wr) {
          Qr(Wr.detail.elt);
        });
        return Kr;
      }
      function V() {
        Q.logger = function (Qr, Kr, Wr) {
          console && console.log(Kr, Qr, Wr);
        };
      }
      function j() {
        Q.logger = null;
      }
      function C(Qr, Kr) {
        return Kr ? Qr.querySelector(Kr) : C(re(), Qr);
      }
      function f(Qr, Kr) {
        return Kr ? Qr.querySelectorAll(Kr) : f(re(), Qr);
      }
      function _(Qr, Kr) {
        ((Qr = p(Qr)),
          Kr
            ? setTimeout(function () {
                (_(Qr), (Qr = null));
              }, Kr)
            : Qr.parentElement.removeChild(Qr));
      }
      function z(Qr, Kr, Wr) {
        ((Qr = p(Qr)),
          Wr
            ? setTimeout(function () {
                (z(Qr, Kr), (Qr = null));
              }, Wr)
            : Qr.classList && Qr.classList.add(Kr));
      }
      function n(Qr, Kr, Wr) {
        ((Qr = p(Qr)),
          Wr
            ? setTimeout(function () {
                (n(Qr, Kr), (Qr = null));
              }, Wr)
            : Qr.classList &&
              (Qr.classList.remove(Kr),
              Qr.classList.length === 0 && Qr.removeAttribute("class")));
      }
      function $(Qr, Kr) {
        ((Qr = p(Qr)), Qr.classList.toggle(Kr));
      }
      function W(Qr, Kr) {
        ((Qr = p(Qr)),
          oe(Qr.parentElement.children, function (Wr) {
            n(Wr, Kr);
          }),
          z(Qr, Kr));
      }
      function v(Qr, Kr) {
        if (((Qr = p(Qr)), Qr.closest)) return Qr.closest(Kr);
        do if (Qr == null || h(Qr, Kr)) return Qr;
        while ((Qr = Qr && u(Qr)));
        return null;
      }
      function g(Qr, Kr) {
        return Qr.substring(0, Kr.length) === Kr;
      }
      function G(Qr, Kr) {
        return Qr.substring(Qr.length - Kr.length) === Kr;
      }
      function J(Qr) {
        var Kr = Qr.trim();
        return g(Kr, "<") && G(Kr, "/>") ? Kr.substring(1, Kr.length - 2) : Kr;
      }
      function Z(Qr, Kr) {
        return Kr.indexOf("closest ") === 0
          ? [v(Qr, J(Kr.substr(8)))]
          : Kr.indexOf("find ") === 0
            ? [C(Qr, J(Kr.substr(5)))]
            : Kr === "next"
              ? [Qr.nextElementSibling]
              : Kr.indexOf("next ") === 0
                ? [K(Qr, J(Kr.substr(5)))]
                : Kr === "previous"
                  ? [Qr.previousElementSibling]
                  : Kr.indexOf("previous ") === 0
                    ? [Y(Qr, J(Kr.substr(9)))]
                    : Kr === "document"
                      ? [document]
                      : Kr === "window"
                        ? [window]
                        : Kr === "body"
                          ? [document.body]
                          : re().querySelectorAll(J(Kr));
      }
      var K = function (Qr, Kr) {
          for (
            var Wr = re().querySelectorAll(Kr), Jr = 0;
            Jr < Wr.length;
            Jr++
          ) {
            var Gr = Wr[Jr];
            if (
              Gr.compareDocumentPosition(Qr) ===
              Node.DOCUMENT_POSITION_PRECEDING
            )
              return Gr;
          }
        },
        Y = function (Qr, Kr) {
          for (
            var Wr = re().querySelectorAll(Kr), Jr = Wr.length - 1;
            Jr >= 0;
            Jr--
          ) {
            var Gr = Wr[Jr];
            if (
              Gr.compareDocumentPosition(Qr) ===
              Node.DOCUMENT_POSITION_FOLLOWING
            )
              return Gr;
          }
        };
      function ue(Qr, Kr) {
        return Kr ? Z(Qr, Kr)[0] : Z(re().body, Qr)[0];
      }
      function p(Qr) {
        return I(Qr, "String") ? C(Qr) : Qr;
      }
      function ve(Qr, Kr, Wr) {
        return k(Kr)
          ? { target: re().body, event: Qr, listener: Kr }
          : { target: p(Qr), event: Kr, listener: Wr };
      }
      function de(Qr, Kr, Wr) {
        jr(function () {
          var Gr = ve(Qr, Kr, Wr);
          Gr.target.addEventListener(Gr.event, Gr.listener);
        });
        var Jr = k(Kr);
        return Jr ? Kr : Wr;
      }
      function ge(Qr, Kr, Wr) {
        return (
          jr(function () {
            var Jr = ve(Qr, Kr, Wr);
            Jr.target.removeEventListener(Jr.event, Jr.listener);
          }),
          k(Kr) ? Kr : Wr
        );
      }
      var pe = re().createElement("output");
      function me(Qr, Kr) {
        var Wr = ne(Qr, Kr);
        if (Wr) {
          if (Wr === "this") return [xe(Qr, Kr)];
          var Jr = Z(Qr, Wr);
          return Jr.length === 0
            ? (b(
                'The selector "' + Wr + '" on ' + Kr + " returned no matches!",
              ),
              [pe])
            : Jr;
        }
      }
      function xe(Qr, Kr) {
        return c(Qr, function (Wr) {
          return te(Wr, Kr) != null;
        });
      }
      function ye(Qr) {
        var Kr = ne(Qr, "hx-target");
        if (Kr) return Kr === "this" ? xe(Qr, "hx-target") : ue(Qr, Kr);
        var Wr = ae(Qr);
        return Wr.boosted ? re().body : Qr;
      }
      function be(Qr) {
        for (var Kr = Q.config.attributesToSettle, Wr = 0; Wr < Kr.length; Wr++)
          if (Qr === Kr[Wr]) return !0;
        return !1;
      }
      function we(Qr, Kr) {
        (oe(Qr.attributes, function (Wr) {
          !Kr.hasAttribute(Wr.name) &&
            be(Wr.name) &&
            Qr.removeAttribute(Wr.name);
        }),
          oe(Kr.attributes, function (Wr) {
            be(Wr.name) && Qr.setAttribute(Wr.name, Wr.value);
          }));
      }
      function Se(Qr, Kr) {
        for (var Wr = Fr(Kr), Jr = 0; Jr < Wr.length; Jr++) {
          var Gr = Wr[Jr];
          try {
            if (Gr.isInlineSwap(Qr)) return !0;
          } catch (Zr) {
            b(Zr);
          }
        }
        return Qr === "outerHTML";
      }
      function Ee(Qr, Kr, Wr) {
        var Jr = "#" + ee(Kr, "id"),
          Gr = "outerHTML";
        Qr === "true" ||
          (Qr.indexOf(":") > 0
            ? ((Gr = Qr.substr(0, Qr.indexOf(":"))),
              (Jr = Qr.substr(Qr.indexOf(":") + 1, Qr.length)))
            : (Gr = Qr));
        var Zr = re().querySelectorAll(Jr);
        return (
          Zr
            ? (oe(Zr, function (Yr) {
                var en,
                  tn = Kr.cloneNode(!0);
                ((en = re().createDocumentFragment()),
                  en.appendChild(tn),
                  Se(Gr, Yr) || (en = tn));
                var rn = { shouldSwap: !0, target: Yr, fragment: en };
                ce(Yr, "htmx:oobBeforeSwap", rn) &&
                  ((Yr = rn.target),
                  rn.shouldSwap && Fe(Gr, Yr, Yr, en, Wr),
                  oe(Wr.elts, function (nn) {
                    ce(nn, "htmx:oobAfterSwap", rn);
                  }));
              }),
              Kr.parentNode.removeChild(Kr))
            : (Kr.parentNode.removeChild(Kr),
              fe(re().body, "htmx:oobErrorNoTarget", { content: Kr })),
          Qr
        );
      }
      function Ce(Qr, Kr, Wr) {
        var Jr = ne(Qr, "hx-select-oob");
        if (Jr)
          for (var Gr = Jr.split(","), Zr = 0; Zr < Gr.length; Zr++) {
            var Yr = Gr[Zr].split(":", 2),
              en = Yr[0].trim();
            en.indexOf("#") === 0 && (en = en.substring(1));
            var tn = Yr[1] || "true",
              rn = Kr.querySelector("#" + en);
            rn && Ee(tn, rn, Wr);
          }
        oe(f(Kr, "[hx-swap-oob], [data-hx-swap-oob]"), function (nn) {
          var sn = te(nn, "hx-swap-oob");
          sn != null && Ee(sn, nn, Wr);
        });
      }
      function Re(Qr) {
        oe(f(Qr, "[hx-preserve], [data-hx-preserve]"), function (Kr) {
          var Wr = te(Kr, "id"),
            Jr = re().getElementById(Wr);
          Jr != null && Kr.parentNode.replaceChild(Jr, Kr);
        });
      }
      function Te(Qr, Kr, Wr) {
        oe(Kr.querySelectorAll("[id]"), function (Jr) {
          var Gr = ee(Jr, "id");
          if (Gr && Gr.length > 0) {
            var Zr = Gr.replace("'", "\\'"),
              Yr = Jr.tagName.replace(":", "\\:"),
              en = Qr.querySelector(Yr + "[id='" + Zr + "']");
            if (en && en !== Qr) {
              var tn = Jr.cloneNode();
              (we(Jr, en),
                Wr.tasks.push(function () {
                  we(Jr, tn);
                }));
            }
          }
        });
      }
      function Oe(Qr) {
        return function () {
          (n(Qr, Q.config.addedClass),
            zt(Qr),
            Nt(Qr),
            qe(Qr),
            ce(Qr, "htmx:load"));
        };
      }
      function qe(Qr) {
        var Kr = "[autofocus]",
          Wr = h(Qr, Kr) ? Qr : Qr.querySelector(Kr);
        Wr?.focus();
      }
      function a(Qr, Kr, Wr, Jr) {
        for (Te(Qr, Wr, Jr); Wr.childNodes.length > 0; ) {
          var Gr = Wr.firstChild;
          (z(Gr, Q.config.addedClass),
            Qr.insertBefore(Gr, Kr),
            Gr.nodeType !== Node.TEXT_NODE &&
              Gr.nodeType !== Node.COMMENT_NODE &&
              Jr.tasks.push(Oe(Gr)));
        }
      }
      function He(Qr, Kr) {
        for (var Wr = 0; Wr < Qr.length; )
          Kr = ((Kr << 5) - Kr + Qr.charCodeAt(Wr++)) | 0;
        return Kr;
      }
      function Le(Qr) {
        var Kr = 0;
        if (Qr.attributes)
          for (var Wr = 0; Wr < Qr.attributes.length; Wr++) {
            var Jr = Qr.attributes[Wr];
            Jr.value && ((Kr = He(Jr.name, Kr)), (Kr = He(Jr.value, Kr)));
          }
        return Kr;
      }
      function Ae(Qr) {
        var Kr = ae(Qr);
        if (Kr.onHandlers) {
          for (var Wr = 0; Wr < Kr.onHandlers.length; Wr++) {
            let Jr = Kr.onHandlers[Wr];
            Qr.removeEventListener(Jr.event, Jr.listener);
          }
          delete Kr.onHandlers;
        }
      }
      function Ne(Qr) {
        var Kr = ae(Qr);
        (Kr.timeout && clearTimeout(Kr.timeout),
          Kr.webSocket && Kr.webSocket.close(),
          Kr.sseEventSource && Kr.sseEventSource.close(),
          Kr.listenerInfos &&
            oe(Kr.listenerInfos, function (Wr) {
              Wr.on && Wr.on.removeEventListener(Wr.trigger, Wr.listener);
            }),
          Ae(Qr),
          oe(Object.keys(Kr), function (Wr) {
            delete Kr[Wr];
          }));
      }
      function m(Qr) {
        (ce(Qr, "htmx:beforeCleanupElement"),
          Ne(Qr),
          Qr.children &&
            oe(Qr.children, function (Kr) {
              m(Kr);
            }));
      }
      function Ie(Qr, Kr, Wr) {
        if (Qr.tagName === "BODY") return Ue(Qr, Kr, Wr);
        var Jr,
          Gr = Qr.previousSibling;
        for (
          a(u(Qr), Qr, Kr, Wr),
            Gr == null ? (Jr = u(Qr).firstChild) : (Jr = Gr.nextSibling),
            Wr.elts = Wr.elts.filter(function (Zr) {
              return Zr != Qr;
            });
          Jr && Jr !== Qr;
        )
          (Jr.nodeType === Node.ELEMENT_NODE && Wr.elts.push(Jr),
            (Jr = Jr.nextElementSibling));
        (m(Qr), u(Qr).removeChild(Qr));
      }
      function ke(Qr, Kr, Wr) {
        return a(Qr, Qr.firstChild, Kr, Wr);
      }
      function Pe(Qr, Kr, Wr) {
        return a(u(Qr), Qr, Kr, Wr);
      }
      function Me(Qr, Kr, Wr) {
        return a(Qr, null, Kr, Wr);
      }
      function Xe(Qr, Kr, Wr) {
        return a(u(Qr), Qr.nextSibling, Kr, Wr);
      }
      function De(Qr, Kr, Wr) {
        return (m(Qr), u(Qr).removeChild(Qr));
      }
      function Ue(Qr, Kr, Wr) {
        var Jr = Qr.firstChild;
        if ((a(Qr, Jr, Kr, Wr), Jr)) {
          for (; Jr.nextSibling; )
            (m(Jr.nextSibling), Qr.removeChild(Jr.nextSibling));
          (m(Jr), Qr.removeChild(Jr));
        }
      }
      function Be(Qr, Kr, Wr) {
        var Jr = Wr || ne(Qr, "hx-select");
        if (Jr) {
          var Gr = re().createDocumentFragment();
          (oe(Kr.querySelectorAll(Jr), function (Zr) {
            Gr.appendChild(Zr);
          }),
            (Kr = Gr));
        }
        return Kr;
      }
      function Fe(Qr, Kr, Wr, Jr, Gr) {
        switch (Qr) {
          case "none":
            return;
          case "outerHTML":
            Ie(Wr, Jr, Gr);
            return;
          case "afterbegin":
            ke(Wr, Jr, Gr);
            return;
          case "beforebegin":
            Pe(Wr, Jr, Gr);
            return;
          case "beforeend":
            Me(Wr, Jr, Gr);
            return;
          case "afterend":
            Xe(Wr, Jr, Gr);
            return;
          case "delete":
            De(Wr, Jr, Gr);
            return;
          default:
            for (var Zr = Fr(Kr), Yr = 0; Yr < Zr.length; Yr++) {
              var en = Zr[Yr];
              try {
                var tn = en.handleSwap(Qr, Wr, Jr, Gr);
                if (tn) {
                  if (typeof tn.length < "u")
                    for (var rn = 0; rn < tn.length; rn++) {
                      var nn = tn[rn];
                      nn.nodeType !== Node.TEXT_NODE &&
                        nn.nodeType !== Node.COMMENT_NODE &&
                        Gr.tasks.push(Oe(nn));
                    }
                  return;
                }
              } catch (sn) {
                b(sn);
              }
            }
            Qr === "innerHTML"
              ? Ue(Wr, Jr, Gr)
              : Fe(Q.config.defaultSwapStyle, Kr, Wr, Jr, Gr);
        }
      }
      function Ve(Qr) {
        if (Qr.indexOf("<title") > -1) {
          var Kr = Qr.replace(H, ""),
            Wr = Kr.match(q);
          if (Wr) return Wr[2];
        }
      }
      function je(Qr, Kr, Wr, Jr, Gr, Zr) {
        Gr.title = Ve(Jr);
        var Yr = l(Jr);
        if (Yr)
          return (
            Ce(Wr, Yr, Gr),
            (Yr = Be(Wr, Yr, Zr)),
            Re(Yr),
            Fe(Qr, Wr, Kr, Yr, Gr)
          );
      }
      function _e(Qr, Kr, Wr) {
        var Jr = Qr.getResponseHeader(Kr);
        if (Jr.indexOf("{") === 0) {
          var Gr = E(Jr);
          for (var Zr in Gr)
            if (Gr.hasOwnProperty(Zr)) {
              var Yr = Gr[Zr];
              (P(Yr) || (Yr = { value: Yr }), ce(Wr, Zr, Yr));
            }
        } else
          for (var en = Jr.split(","), tn = 0; tn < en.length; tn++)
            ce(Wr, en[tn].trim(), []);
      }
      var ze = /\s/,
        x = /[\s,]/,
        $e = /[_$a-zA-Z]/,
        We = /[_$a-zA-Z0-9]/,
        Ge = ['"', "'", "/"],
        Je = /[^\s]/,
        Ze = /[{(]/,
        Ke = /[})]/;
      function Ye(Qr) {
        for (var Kr = [], Wr = 0; Wr < Qr.length; ) {
          if ($e.exec(Qr.charAt(Wr))) {
            for (var Jr = Wr; We.exec(Qr.charAt(Wr + 1)); ) Wr++;
            Kr.push(Qr.substr(Jr, Wr - Jr + 1));
          } else if (Ge.indexOf(Qr.charAt(Wr)) !== -1) {
            var Gr = Qr.charAt(Wr),
              Jr = Wr;
            for (Wr++; Wr < Qr.length && Qr.charAt(Wr) !== Gr; )
              (Qr.charAt(Wr) === "\\" && Wr++, Wr++);
            Kr.push(Qr.substr(Jr, Wr - Jr + 1));
          } else {
            var Zr = Qr.charAt(Wr);
            Kr.push(Zr);
          }
          Wr++;
        }
        return Kr;
      }
      function Qe(Qr, Kr, Wr) {
        return (
          $e.exec(Qr.charAt(0)) &&
          Qr !== "true" &&
          Qr !== "false" &&
          Qr !== "this" &&
          Qr !== Wr &&
          Kr !== "."
        );
      }
      function et(Qr, Kr, Wr) {
        if (Kr[0] === "[") {
          Kr.shift();
          for (
            var Jr = 1,
              Gr = " return (function(" + Wr + "){ return (",
              Zr = null;
            Kr.length > 0;
          ) {
            var Yr = Kr[0];
            if (Yr === "]") {
              if ((Jr--, Jr === 0)) {
                (Zr === null && (Gr = Gr + "true"), Kr.shift(), (Gr += ")})"));
                try {
                  var en = Tr(
                    Qr,
                    function () {
                      return Function(Gr)();
                    },
                    function () {
                      return !0;
                    },
                  );
                  return ((en.source = Gr), en);
                } catch (tn) {
                  return (
                    fe(re().body, "htmx:syntax:error", {
                      error: tn,
                      source: Gr,
                    }),
                    null
                  );
                }
              }
            } else Yr === "[" && Jr++;
            (Qe(Yr, Zr, Wr)
              ? (Gr +=
                  "((" +
                  Wr +
                  "." +
                  Yr +
                  ") ? (" +
                  Wr +
                  "." +
                  Yr +
                  ") : (window." +
                  Yr +
                  "))")
              : (Gr = Gr + Yr),
              (Zr = Kr.shift()));
          }
        }
      }
      function y(Qr, Kr) {
        for (var Wr = ""; Qr.length > 0 && !Kr.test(Qr[0]); ) Wr += Qr.shift();
        return Wr;
      }
      function tt(Qr) {
        var Kr;
        return (
          Qr.length > 0 && Ze.test(Qr[0])
            ? (Qr.shift(), (Kr = y(Qr, Ke).trim()), Qr.shift())
            : (Kr = y(Qr, x)),
          Kr
        );
      }
      var rt = "input, textarea, select";
      function nt(Qr, Kr, Wr) {
        var Jr = [],
          Gr = Ye(Kr);
        do {
          y(Gr, Je);
          var Zr = Gr.length,
            Yr = y(Gr, /[,\[\s]/);
          if (Yr !== "")
            if (Yr === "every") {
              var en = { trigger: "every" };
              (y(Gr, Je), (en.pollInterval = d(y(Gr, /[,\[\s]/))), y(Gr, Je));
              var tn = et(Qr, Gr, "event");
              (tn && (en.eventFilter = tn), Jr.push(en));
            } else if (Yr.indexOf("sse:") === 0)
              Jr.push({ trigger: "sse", sseEvent: Yr.substr(4) });
            else {
              var rn = { trigger: Yr },
                tn = et(Qr, Gr, "event");
              for (
                tn && (rn.eventFilter = tn);
                Gr.length > 0 && Gr[0] !== ",";
              ) {
                y(Gr, Je);
                var nn = Gr.shift();
                if (nn === "changed") rn.changed = !0;
                else if (nn === "once") rn.once = !0;
                else if (nn === "consume") rn.consume = !0;
                else if (nn === "delay" && Gr[0] === ":")
                  (Gr.shift(), (rn.delay = d(y(Gr, x))));
                else if (nn === "from" && Gr[0] === ":") {
                  if ((Gr.shift(), Ze.test(Gr[0]))) var sn = tt(Gr);
                  else {
                    var sn = y(Gr, x);
                    if (
                      sn === "closest" ||
                      sn === "find" ||
                      sn === "next" ||
                      sn === "previous"
                    ) {
                      Gr.shift();
                      var an = tt(Gr);
                      an.length > 0 && (sn += " " + an);
                    }
                  }
                  rn.from = sn;
                } else
                  nn === "target" && Gr[0] === ":"
                    ? (Gr.shift(), (rn.target = tt(Gr)))
                    : nn === "throttle" && Gr[0] === ":"
                      ? (Gr.shift(), (rn.throttle = d(y(Gr, x))))
                      : nn === "queue" && Gr[0] === ":"
                        ? (Gr.shift(), (rn.queue = y(Gr, x)))
                        : nn === "root" && Gr[0] === ":"
                          ? (Gr.shift(), (rn[nn] = tt(Gr)))
                          : nn === "threshold" && Gr[0] === ":"
                            ? (Gr.shift(), (rn[nn] = y(Gr, x)))
                            : fe(Qr, "htmx:syntax:error", {
                                token: Gr.shift(),
                              });
              }
              Jr.push(rn);
            }
          (Gr.length === Zr &&
            fe(Qr, "htmx:syntax:error", { token: Gr.shift() }),
            y(Gr, Je));
        } while (Gr[0] === "," && Gr.shift());
        return (Wr && (Wr[Kr] = Jr), Jr);
      }
      function it(Qr) {
        var Kr = te(Qr, "hx-trigger"),
          Wr = [];
        if (Kr) {
          var Jr = Q.config.triggerSpecsCache;
          Wr = (Jr && Jr[Kr]) || nt(Qr, Kr, Jr);
        }
        return Wr.length > 0
          ? Wr
          : h(Qr, "form")
            ? [{ trigger: "submit" }]
            : h(Qr, 'input[type="button"], input[type="submit"]')
              ? [{ trigger: "click" }]
              : h(Qr, rt)
                ? [{ trigger: "change" }]
                : [{ trigger: "click" }];
      }
      function at(Qr) {
        ae(Qr).cancelled = !0;
      }
      function ot(Qr, Kr, Wr) {
        var Jr = ae(Qr);
        Jr.timeout = setTimeout(function () {
          se(Qr) &&
            Jr.cancelled !== !0 &&
            (ct(
              Wr,
              Qr,
              Wt("hx:poll:trigger", { triggerSpec: Wr, target: Qr }),
            ) || Kr(Qr),
            ot(Qr, Kr, Wr));
        }, Wr.pollInterval);
      }
      function st(Qr) {
        return (
          location.hostname === Qr.hostname &&
          ee(Qr, "href") &&
          ee(Qr, "href").indexOf("#") !== 0
        );
      }
      function lt(Qr, Kr, Wr) {
        if (
          (Qr.tagName === "A" &&
            st(Qr) &&
            (Qr.target === "" || Qr.target === "_self")) ||
          Qr.tagName === "FORM"
        ) {
          Kr.boosted = !0;
          var Jr, Gr;
          if (Qr.tagName === "A") ((Jr = "get"), (Gr = ee(Qr, "href")));
          else {
            var Zr = ee(Qr, "method");
            ((Jr = Zr ? Zr.toLowerCase() : "get"), (Gr = ee(Qr, "action")));
          }
          Wr.forEach(function (Yr) {
            ht(
              Qr,
              function (en, tn) {
                if (v(en, Q.config.disableSelector)) {
                  m(en);
                  return;
                }
                he(Jr, Gr, en, tn);
              },
              Kr,
              Yr,
              !0,
            );
          });
        }
      }
      function ut(Qr, Kr) {
        return !!(
          (Qr.type === "submit" || Qr.type === "click") &&
          (Kr.tagName === "FORM" ||
            (h(Kr, 'input[type="submit"], button') && v(Kr, "form") !== null) ||
            (Kr.tagName === "A" &&
              Kr.href &&
              (Kr.getAttribute("href") === "#" ||
                Kr.getAttribute("href").indexOf("#") !== 0)))
        );
      }
      function ft(Qr, Kr) {
        return (
          ae(Qr).boosted &&
          Qr.tagName === "A" &&
          Kr.type === "click" &&
          (Kr.ctrlKey || Kr.metaKey)
        );
      }
      function ct(Qr, Kr, Wr) {
        var Jr = Qr.eventFilter;
        if (Jr)
          try {
            return Jr.call(Kr, Wr) !== !0;
          } catch (Gr) {
            return (
              fe(re().body, "htmx:eventFilter:error", {
                error: Gr,
                source: Jr.source,
              }),
              !0
            );
          }
        return !1;
      }
      function ht(Qr, Kr, Wr, Jr, Gr) {
        var Zr = ae(Qr),
          Yr;
        (Jr.from ? (Yr = Z(Qr, Jr.from)) : (Yr = [Qr]),
          Jr.changed &&
            Yr.forEach(function (en) {
              var tn = ae(en);
              tn.lastValue = en.value;
            }),
          oe(Yr, function (en) {
            var tn = function (rn) {
              if (!se(Qr)) {
                en.removeEventListener(Jr.trigger, tn);
                return;
              }
              if (
                !ft(Qr, rn) &&
                ((Gr || ut(rn, Qr)) && rn.preventDefault(), !ct(Jr, Qr, rn))
              ) {
                var nn = ae(rn);
                if (
                  ((nn.triggerSpec = Jr),
                  nn.handledFor == null && (nn.handledFor = []),
                  nn.handledFor.indexOf(Qr) < 0)
                ) {
                  if (
                    (nn.handledFor.push(Qr),
                    Jr.consume && rn.stopPropagation(),
                    Jr.target && rn.target && !h(rn.target, Jr.target))
                  )
                    return;
                  if (Jr.once) {
                    if (Zr.triggeredOnce) return;
                    Zr.triggeredOnce = !0;
                  }
                  if (Jr.changed) {
                    var sn = ae(en);
                    if (sn.lastValue === en.value) return;
                    sn.lastValue = en.value;
                  }
                  if ((Zr.delayed && clearTimeout(Zr.delayed), Zr.throttle))
                    return;
                  Jr.throttle > 0
                    ? Zr.throttle ||
                      (Kr(Qr, rn),
                      (Zr.throttle = setTimeout(function () {
                        Zr.throttle = null;
                      }, Jr.throttle)))
                    : Jr.delay > 0
                      ? (Zr.delayed = setTimeout(function () {
                          Kr(Qr, rn);
                        }, Jr.delay))
                      : (ce(Qr, "htmx:trigger"), Kr(Qr, rn));
                }
              }
            };
            (Wr.listenerInfos == null && (Wr.listenerInfos = []),
              Wr.listenerInfos.push({
                trigger: Jr.trigger,
                listener: tn,
                on: en,
              }),
              en.addEventListener(Jr.trigger, tn));
          }));
      }
      var vt = !1,
        dt = null;
      function gt() {
        dt ||
          ((dt = function () {
            vt = !0;
          }),
          window.addEventListener("scroll", dt),
          setInterval(function () {
            vt &&
              ((vt = !1),
              oe(
                re().querySelectorAll(
                  "[hx-trigger='revealed'],[data-hx-trigger='revealed']",
                ),
                function (Qr) {
                  pt(Qr);
                },
              ));
          }, 200));
      }
      function pt(Qr) {
        if (!o(Qr, "data-hx-revealed") && X(Qr)) {
          Qr.setAttribute("data-hx-revealed", "true");
          var Kr = ae(Qr);
          Kr.initHash
            ? ce(Qr, "revealed")
            : Qr.addEventListener(
                "htmx:afterProcessNode",
                function (Wr) {
                  ce(Qr, "revealed");
                },
                { once: !0 },
              );
        }
      }
      function mt(Qr, Kr, Wr) {
        for (var Jr = D(Wr), Gr = 0; Gr < Jr.length; Gr++) {
          var Zr = Jr[Gr].split(/:(.+)/);
          (Zr[0] === "connect" && xt(Qr, Zr[1], 0), Zr[0] === "send" && bt(Qr));
        }
      }
      function xt(Qr, Kr, Wr) {
        if (se(Qr)) {
          if (Kr.indexOf("/") == 0) {
            var Jr =
              location.hostname + (location.port ? ":" + location.port : "");
            location.protocol == "https:"
              ? (Kr = "wss://" + Jr + Kr)
              : location.protocol == "http:" && (Kr = "ws://" + Jr + Kr);
          }
          var Gr = Q.createWebSocket(Kr);
          ((Gr.onerror = function (Zr) {
            (fe(Qr, "htmx:wsError", { error: Zr, socket: Gr }), yt(Qr));
          }),
            (Gr.onclose = function (Zr) {
              if ([1006, 1012, 1013].indexOf(Zr.code) >= 0) {
                var Yr = wt(Wr);
                setTimeout(function () {
                  xt(Qr, Kr, Wr + 1);
                }, Yr);
              }
            }),
            (Gr.onopen = function (Zr) {
              Wr = 0;
            }),
            (ae(Qr).webSocket = Gr),
            Gr.addEventListener("message", function (Zr) {
              if (!yt(Qr)) {
                var Yr = Zr.data;
                R(Qr, function (an) {
                  Yr = an.transformResponse(Yr, null, Qr);
                });
                for (
                  var en = T(Qr), tn = l(Yr), rn = M(tn.children), nn = 0;
                  nn < rn.length;
                  nn++
                ) {
                  var sn = rn[nn];
                  Ee(te(sn, "hx-swap-oob") || "true", sn, en);
                }
                nr(en.tasks);
              }
            }));
        }
      }
      function yt(Qr) {
        if (!se(Qr)) return (ae(Qr).webSocket.close(), !0);
      }
      function bt(Qr) {
        var Kr = c(Qr, function (Wr) {
          return ae(Wr).webSocket != null;
        });
        Kr
          ? Qr.addEventListener(it(Qr)[0].trigger, function (Wr) {
              var Jr = ae(Kr).webSocket,
                Gr = xr(Qr, Kr),
                Zr = dr(Qr, "post"),
                Yr = Zr.errors,
                en = Zr.values,
                tn = Hr(Qr),
                rn = le(en, tn),
                nn = yr(rn, Qr);
              if (((nn.HEADERS = Gr), Yr && Yr.length > 0)) {
                ce(Qr, "htmx:validation:halted", Yr);
                return;
              }
              (Jr.send(JSON.stringify(nn)), ut(Wr, Qr) && Wr.preventDefault());
            })
          : fe(Qr, "htmx:noWebSocketSourceError");
      }
      function wt(Qr) {
        var Kr = Q.config.wsReconnectDelay;
        if (typeof Kr == "function") return Kr(Qr);
        if (Kr === "full-jitter") {
          var Wr = Math.min(Qr, 6),
            Jr = 1e3 * Math.pow(2, Wr);
          return Jr * Math.random();
        }
        b(
          'htmx.config.wsReconnectDelay must either be a function or the string "full-jitter"',
        );
      }
      function St(Qr, Kr, Wr) {
        for (var Jr = D(Wr), Gr = 0; Gr < Jr.length; Gr++) {
          var Zr = Jr[Gr].split(/:(.+)/);
          (Zr[0] === "connect" && Et(Qr, Zr[1]),
            Zr[0] === "swap" && Ct(Qr, Zr[1]));
        }
      }
      function Et(Qr, Kr) {
        var Wr = Q.createEventSource(Kr);
        ((Wr.onerror = function (Jr) {
          (fe(Qr, "htmx:sseError", { error: Jr, source: Wr }), Tt(Qr));
        }),
          (ae(Qr).sseEventSource = Wr));
      }
      function Ct(Qr, Kr) {
        var Wr = c(Qr, Ot);
        if (Wr) {
          var Jr = ae(Wr).sseEventSource,
            Gr = function (Zr) {
              if (!Tt(Wr)) {
                if (!se(Qr)) {
                  Jr.removeEventListener(Kr, Gr);
                  return;
                }
                var Yr = Zr.data;
                R(Qr, function (nn) {
                  Yr = nn.transformResponse(Yr, null, Qr);
                });
                var en = wr(Qr),
                  tn = ye(Qr),
                  rn = T(Qr);
                (je(en.swapStyle, tn, Qr, Yr, rn),
                  nr(rn.tasks),
                  ce(Qr, "htmx:sseMessage", Zr));
              }
            };
          ((ae(Qr).sseListener = Gr), Jr.addEventListener(Kr, Gr));
        } else fe(Qr, "htmx:noSSESourceError");
      }
      function Rt(Qr, Kr, Wr) {
        var Jr = c(Qr, Ot);
        if (Jr) {
          var Gr = ae(Jr).sseEventSource,
            Zr = function () {
              Tt(Jr) || (se(Qr) ? Kr(Qr) : Gr.removeEventListener(Wr, Zr));
            };
          ((ae(Qr).sseListener = Zr), Gr.addEventListener(Wr, Zr));
        } else fe(Qr, "htmx:noSSESourceError");
      }
      function Tt(Qr) {
        if (!se(Qr)) return (ae(Qr).sseEventSource.close(), !0);
      }
      function Ot(Qr) {
        return ae(Qr).sseEventSource != null;
      }
      function qt(Qr, Kr, Wr, Jr) {
        var Gr = function () {
          Wr.loaded || ((Wr.loaded = !0), Kr(Qr));
        };
        Jr > 0 ? setTimeout(Gr, Jr) : Gr();
      }
      function Ht(Qr, Kr, Wr) {
        var Jr = !1;
        return (
          oe(w, function (Gr) {
            if (o(Qr, "hx-" + Gr)) {
              var Zr = te(Qr, "hx-" + Gr);
              ((Jr = !0),
                (Kr.path = Zr),
                (Kr.verb = Gr),
                Wr.forEach(function (Yr) {
                  Lt(Qr, Yr, Kr, function (en, tn) {
                    if (v(en, Q.config.disableSelector)) {
                      m(en);
                      return;
                    }
                    he(Gr, Zr, en, tn);
                  });
                }));
            }
          }),
          Jr
        );
      }
      function Lt(Qr, Kr, Wr, Jr) {
        if (Kr.sseEvent) Rt(Qr, Jr, Kr.sseEvent);
        else if (Kr.trigger === "revealed") (gt(), ht(Qr, Jr, Wr, Kr), pt(Qr));
        else if (Kr.trigger === "intersect") {
          var Gr = {};
          (Kr.root && (Gr.root = ue(Qr, Kr.root)),
            Kr.threshold && (Gr.threshold = parseFloat(Kr.threshold)));
          var Zr = new IntersectionObserver(function (Yr) {
            for (var en = 0; en < Yr.length; en++) {
              var tn = Yr[en];
              if (tn.isIntersecting) {
                ce(Qr, "intersect");
                break;
              }
            }
          }, Gr);
          (Zr.observe(Qr), ht(Qr, Jr, Wr, Kr));
        } else
          Kr.trigger === "load"
            ? ct(Kr, Qr, Wt("load", { elt: Qr })) || qt(Qr, Jr, Wr, Kr.delay)
            : Kr.pollInterval > 0
              ? ((Wr.polling = !0), ot(Qr, Jr, Kr))
              : ht(Qr, Jr, Wr, Kr);
      }
      function At(Qr) {
        if (
          !Qr.htmxExecuted &&
          Q.config.allowScriptTags &&
          (Qr.type === "text/javascript" ||
            Qr.type === "module" ||
            Qr.type === "")
        ) {
          var Kr = re().createElement("script");
          (oe(Qr.attributes, function (Jr) {
            Kr.setAttribute(Jr.name, Jr.value);
          }),
            (Kr.textContent = Qr.textContent),
            (Kr.async = !1),
            Q.config.inlineScriptNonce &&
              (Kr.nonce = Q.config.inlineScriptNonce));
          var Wr = Qr.parentElement;
          try {
            Wr.insertBefore(Kr, Qr);
          } catch (Jr) {
            b(Jr);
          } finally {
            Qr.parentElement && Qr.parentElement.removeChild(Qr);
          }
        }
      }
      function Nt(Qr) {
        (h(Qr, "script") && At(Qr),
          oe(f(Qr, "script"), function (Kr) {
            At(Kr);
          }));
      }
      function It(Qr) {
        var Kr = Qr.attributes;
        if (!Kr) return !1;
        for (var Wr = 0; Wr < Kr.length; Wr++) {
          var Jr = Kr[Wr].name;
          if (
            g(Jr, "hx-on:") ||
            g(Jr, "data-hx-on:") ||
            g(Jr, "hx-on-") ||
            g(Jr, "data-hx-on-")
          )
            return !0;
        }
        return !1;
      }
      function kt(Qr) {
        var Kr = null,
          Wr = [];
        if ((It(Qr) && Wr.push(Qr), document.evaluate))
          for (
            var Jr = document.evaluate(
              './/*[@*[ starts-with(name(), "hx-on:") or starts-with(name(), "data-hx-on:") or starts-with(name(), "hx-on-") or starts-with(name(), "data-hx-on-") ]]',
              Qr,
            );
            (Kr = Jr.iterateNext());
          )
            Wr.push(Kr);
        else if (typeof Qr.getElementsByTagName == "function")
          for (
            var Gr = Qr.getElementsByTagName("*"), Zr = 0;
            Zr < Gr.length;
            Zr++
          )
            It(Gr[Zr]) && Wr.push(Gr[Zr]);
        return Wr;
      }
      function Pt(Qr) {
        if (Qr.querySelectorAll) {
          var Kr =
              ", [hx-boost] a, [data-hx-boost] a, a[hx-boost], a[data-hx-boost]",
            Wr = Qr.querySelectorAll(
              i +
                Kr +
                ", form, [type='submit'], [hx-sse], [data-hx-sse], [hx-ws], [data-hx-ws], [hx-ext], [data-hx-ext], [hx-trigger], [data-hx-trigger], [hx-on], [data-hx-on]",
            );
          return Wr;
        } else return [];
      }
      function Mt(Qr) {
        var Kr = v(Qr.target, "button, input[type='submit']"),
          Wr = Dt(Qr);
        Wr && (Wr.lastButtonClicked = Kr);
      }
      function Xt(Qr) {
        var Kr = Dt(Qr);
        Kr && (Kr.lastButtonClicked = null);
      }
      function Dt(Qr) {
        var Kr = v(Qr.target, "button, input[type='submit']");
        if (Kr) {
          var Wr = p("#" + ee(Kr, "form")) || v(Kr, "form");
          if (Wr) return ae(Wr);
        }
      }
      function Ut(Qr) {
        (Qr.addEventListener("click", Mt),
          Qr.addEventListener("focusin", Mt),
          Qr.addEventListener("focusout", Xt));
      }
      function Bt(Qr) {
        for (var Kr = Ye(Qr), Wr = 0, Jr = 0; Jr < Kr.length; Jr++) {
          let Gr = Kr[Jr];
          Gr === "{" ? Wr++ : Gr === "}" && Wr--;
        }
        return Wr;
      }
      function Ft(Qr, Kr, Wr) {
        var Jr = ae(Qr);
        Array.isArray(Jr.onHandlers) || (Jr.onHandlers = []);
        var Gr,
          Zr = function (Yr) {
            return Tr(Qr, function () {
              (Gr || (Gr = new Function("event", Wr)), Gr.call(Qr, Yr));
            });
          };
        (Qr.addEventListener(Kr, Zr),
          Jr.onHandlers.push({ event: Kr, listener: Zr }));
      }
      function Vt(Qr) {
        var Kr = te(Qr, "hx-on");
        if (Kr) {
          for (
            var Wr = {},
              Jr = Kr.split(`
`),
              Gr = null,
              Zr = 0;
            Jr.length > 0;
          ) {
            var Yr = Jr.shift(),
              en = Yr.match(/^\s*([a-zA-Z:\-\.]+:)(.*)/);
            (Zr === 0 && en
              ? (Yr.split(":"), (Gr = en[1].slice(0, -1)), (Wr[Gr] = en[2]))
              : (Wr[Gr] += Yr),
              (Zr += Bt(Yr)));
          }
          for (var tn in Wr) Ft(Qr, tn, Wr[tn]);
        }
      }
      function jt(Qr) {
        Ae(Qr);
        for (var Kr = 0; Kr < Qr.attributes.length; Kr++) {
          var Wr = Qr.attributes[Kr].name,
            Jr = Qr.attributes[Kr].value;
          if (g(Wr, "hx-on") || g(Wr, "data-hx-on")) {
            var Gr = Wr.indexOf("-on") + 3,
              Zr = Wr.slice(Gr, Gr + 1);
            if (Zr === "-" || Zr === ":") {
              var Yr = Wr.slice(Gr + 1);
              (g(Yr, ":")
                ? (Yr = "htmx" + Yr)
                : g(Yr, "-")
                  ? (Yr = "htmx:" + Yr.slice(1))
                  : g(Yr, "htmx-") && (Yr = "htmx:" + Yr.slice(5)),
                Ft(Qr, Yr, Jr));
            }
          }
        }
      }
      function _t(Qr) {
        if (v(Qr, Q.config.disableSelector)) {
          m(Qr);
          return;
        }
        var Kr = ae(Qr);
        if (Kr.initHash !== Le(Qr)) {
          (Ne(Qr),
            (Kr.initHash = Le(Qr)),
            Vt(Qr),
            ce(Qr, "htmx:beforeProcessNode"),
            Qr.value && (Kr.lastValue = Qr.value));
          var Wr = it(Qr),
            Jr = Ht(Qr, Kr, Wr);
          (Jr ||
            (ne(Qr, "hx-boost") === "true"
              ? lt(Qr, Kr, Wr)
              : o(Qr, "hx-trigger") &&
                Wr.forEach(function (Yr) {
                  Lt(Qr, Yr, Kr, function () {});
                })),
            (Qr.tagName === "FORM" ||
              (ee(Qr, "type") === "submit" && o(Qr, "form"))) &&
              Ut(Qr));
          var Gr = te(Qr, "hx-sse");
          Gr && St(Qr, Kr, Gr);
          var Zr = te(Qr, "hx-ws");
          (Zr && mt(Qr, Kr, Zr), ce(Qr, "htmx:afterProcessNode"));
        }
      }
      function zt(Qr) {
        if (((Qr = p(Qr)), v(Qr, Q.config.disableSelector))) {
          m(Qr);
          return;
        }
        (_t(Qr),
          oe(Pt(Qr), function (Kr) {
            _t(Kr);
          }),
          oe(kt(Qr), jt));
      }
      function $t(Qr) {
        return Qr.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
      }
      function Wt(Qr, Kr) {
        var Wr;
        return (
          window.CustomEvent && typeof window.CustomEvent == "function"
            ? (Wr = new CustomEvent(Qr, {
                bubbles: !0,
                cancelable: !0,
                detail: Kr,
              }))
            : ((Wr = re().createEvent("CustomEvent")),
              Wr.initCustomEvent(Qr, !0, !0, Kr)),
          Wr
        );
      }
      function fe(Qr, Kr, Wr) {
        ce(Qr, Kr, le({ error: Kr }, Wr));
      }
      function Gt(Qr) {
        return Qr === "htmx:afterProcessNode";
      }
      function R(Qr, Kr) {
        oe(Fr(Qr), function (Wr) {
          try {
            Kr(Wr);
          } catch (Jr) {
            b(Jr);
          }
        });
      }
      function b(Qr) {
        console.error
          ? console.error(Qr)
          : console.log && console.log("ERROR: ", Qr);
      }
      function ce(Qr, Kr, Wr) {
        ((Qr = p(Qr)), Wr == null && (Wr = {}), (Wr.elt = Qr));
        var Jr = Wt(Kr, Wr);
        (Q.logger && !Gt(Kr) && Q.logger(Qr, Kr, Wr),
          Wr.error && (b(Wr.error), ce(Qr, "htmx:error", { errorInfo: Wr })));
        var Gr = Qr.dispatchEvent(Jr),
          Zr = $t(Kr);
        if (Gr && Zr !== Kr) {
          var Yr = Wt(Zr, Jr.detail);
          Gr = Gr && Qr.dispatchEvent(Yr);
        }
        return (
          R(Qr, function (en) {
            Gr = Gr && en.onEvent(Kr, Jr) !== !1 && !Jr.defaultPrevented;
          }),
          Gr
        );
      }
      var Jt = location.pathname + location.search;
      function Zt() {
        var Qr = re().querySelector("[hx-history-elt],[data-hx-history-elt]");
        return Qr || re().body;
      }
      function Kt(Qr, Kr, Wr, Jr) {
        if (U()) {
          if (Q.config.historyCacheSize <= 0) {
            localStorage.removeItem("htmx-history-cache");
            return;
          }
          Qr = B(Qr);
          for (
            var Gr = E(localStorage.getItem("htmx-history-cache")) || [],
              Zr = 0;
            Zr < Gr.length;
            Zr++
          )
            if (Gr[Zr].url === Qr) {
              Gr.splice(Zr, 1);
              break;
            }
          var Yr = { url: Qr, content: Kr, title: Wr, scroll: Jr };
          for (
            ce(re().body, "htmx:historyItemCreated", { item: Yr, cache: Gr }),
              Gr.push(Yr);
            Gr.length > Q.config.historyCacheSize;
          )
            Gr.shift();
          for (; Gr.length > 0; )
            try {
              localStorage.setItem("htmx-history-cache", JSON.stringify(Gr));
              break;
            } catch (en) {
              (fe(re().body, "htmx:historyCacheError", {
                cause: en,
                cache: Gr,
              }),
                Gr.shift());
            }
        }
      }
      function Yt(Qr) {
        if (!U()) return null;
        Qr = B(Qr);
        for (
          var Kr = E(localStorage.getItem("htmx-history-cache")) || [], Wr = 0;
          Wr < Kr.length;
          Wr++
        )
          if (Kr[Wr].url === Qr) return Kr[Wr];
        return null;
      }
      function Qt(Qr) {
        var Kr = Q.config.requestClass,
          Wr = Qr.cloneNode(!0);
        return (
          oe(f(Wr, "." + Kr), function (Jr) {
            n(Jr, Kr);
          }),
          Wr.innerHTML
        );
      }
      function er() {
        var Qr = Zt(),
          Kr = Jt || location.pathname + location.search,
          Wr;
        try {
          Wr = re().querySelector(
            '[hx-history="false" i],[data-hx-history="false" i]',
          );
        } catch {
          Wr = re().querySelector(
            '[hx-history="false"],[data-hx-history="false"]',
          );
        }
        (Wr ||
          (ce(re().body, "htmx:beforeHistorySave", {
            path: Kr,
            historyElt: Qr,
          }),
          Kt(Kr, Qt(Qr), re().title, window.scrollY)),
          Q.config.historyEnabled &&
            history.replaceState(
              { htmx: !0 },
              re().title,
              window.location.href,
            ));
      }
      function tr(Qr) {
        (Q.config.getCacheBusterParam &&
          ((Qr = Qr.replace(/org\.htmx\.cache-buster=[^&]*&?/, "")),
          (G(Qr, "&") || G(Qr, "?")) && (Qr = Qr.slice(0, -1))),
          Q.config.historyEnabled && history.pushState({ htmx: !0 }, "", Qr),
          (Jt = Qr));
      }
      function rr(Qr) {
        (Q.config.historyEnabled && history.replaceState({ htmx: !0 }, "", Qr),
          (Jt = Qr));
      }
      function nr(Qr) {
        oe(Qr, function (Kr) {
          Kr.call();
        });
      }
      function ir(Qr) {
        var Kr = new XMLHttpRequest(),
          Wr = { path: Qr, xhr: Kr };
        (ce(re().body, "htmx:historyCacheMiss", Wr),
          Kr.open("GET", Qr, !0),
          Kr.setRequestHeader("HX-Request", "true"),
          Kr.setRequestHeader("HX-History-Restore-Request", "true"),
          Kr.setRequestHeader("HX-Current-URL", re().location.href),
          (Kr.onload = function () {
            if (this.status >= 200 && this.status < 400) {
              ce(re().body, "htmx:historyCacheMissLoad", Wr);
              var Jr = l(this.response);
              Jr =
                Jr.querySelector("[hx-history-elt],[data-hx-history-elt]") ||
                Jr;
              var Gr = Zt(),
                Zr = T(Gr),
                Yr = Ve(this.response);
              if (Yr) {
                var en = C("title");
                en ? (en.innerHTML = Yr) : (window.document.title = Yr);
              }
              (Ue(Gr, Jr, Zr),
                nr(Zr.tasks),
                (Jt = Qr),
                ce(re().body, "htmx:historyRestore", {
                  path: Qr,
                  cacheMiss: !0,
                  serverResponse: this.response,
                }));
            } else fe(re().body, "htmx:historyCacheMissLoadError", Wr);
          }),
          Kr.send());
      }
      function ar(Qr) {
        (er(), (Qr = Qr || location.pathname + location.search));
        var Kr = Yt(Qr);
        if (Kr) {
          var Wr = l(Kr.content),
            Jr = Zt(),
            Gr = T(Jr);
          (Ue(Jr, Wr, Gr),
            nr(Gr.tasks),
            (document.title = Kr.title),
            setTimeout(function () {
              window.scrollTo(0, Kr.scroll);
            }, 0),
            (Jt = Qr),
            ce(re().body, "htmx:historyRestore", { path: Qr, item: Kr }));
        } else
          Q.config.refreshOnHistoryMiss ? window.location.reload(!0) : ir(Qr);
      }
      function or(Qr) {
        var Kr = me(Qr, "hx-indicator");
        return (
          Kr == null && (Kr = [Qr]),
          oe(Kr, function (Wr) {
            var Jr = ae(Wr);
            ((Jr.requestCount = (Jr.requestCount || 0) + 1),
              Wr.classList.add.call(Wr.classList, Q.config.requestClass));
          }),
          Kr
        );
      }
      function sr(Qr) {
        var Kr = me(Qr, "hx-disabled-elt");
        return (
          Kr == null && (Kr = []),
          oe(Kr, function (Wr) {
            var Jr = ae(Wr);
            ((Jr.requestCount = (Jr.requestCount || 0) + 1),
              Wr.setAttribute("disabled", ""));
          }),
          Kr
        );
      }
      function lr(Qr, Kr) {
        (oe(Qr, function (Wr) {
          var Jr = ae(Wr);
          ((Jr.requestCount = (Jr.requestCount || 0) - 1),
            Jr.requestCount === 0 &&
              Wr.classList.remove.call(Wr.classList, Q.config.requestClass));
        }),
          oe(Kr, function (Wr) {
            var Jr = ae(Wr);
            ((Jr.requestCount = (Jr.requestCount || 0) - 1),
              Jr.requestCount === 0 && Wr.removeAttribute("disabled"));
          }));
      }
      function ur(Qr, Kr) {
        for (var Wr = 0; Wr < Qr.length; Wr++) {
          var Jr = Qr[Wr];
          if (Jr.isSameNode(Kr)) return !0;
        }
        return !1;
      }
      function fr(Qr) {
        return Qr.name === "" ||
          Qr.name == null ||
          Qr.disabled ||
          v(Qr, "fieldset[disabled]") ||
          Qr.type === "button" ||
          Qr.type === "submit" ||
          Qr.tagName === "image" ||
          Qr.tagName === "reset" ||
          Qr.tagName === "file"
          ? !1
          : Qr.type === "checkbox" || Qr.type === "radio"
            ? Qr.checked
            : !0;
      }
      function cr(Qr, Kr, Wr) {
        if (Qr != null && Kr != null) {
          var Jr = Wr[Qr];
          Jr === void 0
            ? (Wr[Qr] = Kr)
            : Array.isArray(Jr)
              ? Array.isArray(Kr)
                ? (Wr[Qr] = Jr.concat(Kr))
                : Jr.push(Kr)
              : Array.isArray(Kr)
                ? (Wr[Qr] = [Jr].concat(Kr))
                : (Wr[Qr] = [Jr, Kr]);
        }
      }
      function hr(Qr, Kr, Wr, Jr, Gr) {
        if (!(Jr == null || ur(Qr, Jr))) {
          if ((Qr.push(Jr), fr(Jr))) {
            var Zr = ee(Jr, "name"),
              Yr = Jr.value;
            (Jr.multiple &&
              Jr.tagName === "SELECT" &&
              (Yr = M(Jr.querySelectorAll("option:checked")).map(function (tn) {
                return tn.value;
              })),
              Jr.files && (Yr = M(Jr.files)),
              cr(Zr, Yr, Kr),
              Gr && vr(Jr, Wr));
          }
          if (h(Jr, "form")) {
            var en = Jr.elements;
            oe(en, function (tn) {
              hr(Qr, Kr, Wr, tn, Gr);
            });
          }
        }
      }
      function vr(Qr, Kr) {
        Qr.willValidate &&
          (ce(Qr, "htmx:validation:validate"),
          Qr.checkValidity() ||
            (Kr.push({
              elt: Qr,
              message: Qr.validationMessage,
              validity: Qr.validity,
            }),
            ce(Qr, "htmx:validation:failed", {
              message: Qr.validationMessage,
              validity: Qr.validity,
            })));
      }
      function dr(Qr, Kr) {
        var Wr = [],
          Jr = {},
          Gr = {},
          Zr = [],
          Yr = ae(Qr);
        Yr.lastButtonClicked &&
          !se(Yr.lastButtonClicked) &&
          (Yr.lastButtonClicked = null);
        var en =
          (h(Qr, "form") && Qr.noValidate !== !0) ||
          te(Qr, "hx-validate") === "true";
        if (
          (Yr.lastButtonClicked &&
            (en = en && Yr.lastButtonClicked.formNoValidate !== !0),
          Kr !== "get" && hr(Wr, Gr, Zr, v(Qr, "form"), en),
          hr(Wr, Jr, Zr, Qr, en),
          Yr.lastButtonClicked ||
            Qr.tagName === "BUTTON" ||
            (Qr.tagName === "INPUT" && ee(Qr, "type") === "submit"))
        ) {
          var tn = Yr.lastButtonClicked || Qr,
            rn = ee(tn, "name");
          cr(rn, tn.value, Gr);
        }
        var nn = me(Qr, "hx-include");
        return (
          oe(nn, function (sn) {
            (hr(Wr, Jr, Zr, sn, en),
              h(sn, "form") ||
                oe(sn.querySelectorAll(rt), function (an) {
                  hr(Wr, Jr, Zr, an, en);
                }));
          }),
          (Jr = le(Jr, Gr)),
          { errors: Zr, values: Jr }
        );
      }
      function gr(Qr, Kr, Wr) {
        (Qr !== "" && (Qr += "&"),
          String(Wr) === "[object Object]" && (Wr = JSON.stringify(Wr)));
        var Jr = encodeURIComponent(Wr);
        return ((Qr += encodeURIComponent(Kr) + "=" + Jr), Qr);
      }
      function pr(Qr) {
        var Kr = "";
        for (var Wr in Qr)
          if (Qr.hasOwnProperty(Wr)) {
            var Jr = Qr[Wr];
            Array.isArray(Jr)
              ? oe(Jr, function (Gr) {
                  Kr = gr(Kr, Wr, Gr);
                })
              : (Kr = gr(Kr, Wr, Jr));
          }
        return Kr;
      }
      function mr(Qr) {
        var Kr = new FormData();
        for (var Wr in Qr)
          if (Qr.hasOwnProperty(Wr)) {
            var Jr = Qr[Wr];
            Array.isArray(Jr)
              ? oe(Jr, function (Gr) {
                  Kr.append(Wr, Gr);
                })
              : Kr.append(Wr, Jr);
          }
        return Kr;
      }
      function xr(Qr, Kr, Wr) {
        var Jr = {
          "HX-Request": "true",
          "HX-Trigger": ee(Qr, "id"),
          "HX-Trigger-Name": ee(Qr, "name"),
          "HX-Target": te(Kr, "id"),
          "HX-Current-URL": re().location.href,
        };
        return (
          Rr(Qr, "hx-headers", !1, Jr),
          Wr !== void 0 && (Jr["HX-Prompt"] = Wr),
          ae(Qr).boosted && (Jr["HX-Boosted"] = "true"),
          Jr
        );
      }
      function yr(Qr, Kr) {
        var Wr = ne(Kr, "hx-params");
        if (Wr) {
          if (Wr === "none") return {};
          if (Wr === "*") return Qr;
          if (Wr.indexOf("not ") === 0)
            return (
              oe(Wr.substr(4).split(","), function (Gr) {
                ((Gr = Gr.trim()), delete Qr[Gr]);
              }),
              Qr
            );
          var Jr = {};
          return (
            oe(Wr.split(","), function (Gr) {
              ((Gr = Gr.trim()), (Jr[Gr] = Qr[Gr]));
            }),
            Jr
          );
        } else return Qr;
      }
      function br(Qr) {
        return ee(Qr, "href") && ee(Qr, "href").indexOf("#") >= 0;
      }
      function wr(Qr, Kr) {
        var Wr = Kr || ne(Qr, "hx-swap"),
          Jr = {
            swapStyle: ae(Qr).boosted ? "innerHTML" : Q.config.defaultSwapStyle,
            swapDelay: Q.config.defaultSwapDelay,
            settleDelay: Q.config.defaultSettleDelay,
          };
        if (
          (Q.config.scrollIntoViewOnBoost &&
            ae(Qr).boosted &&
            !br(Qr) &&
            (Jr.show = "top"),
          Wr)
        ) {
          var Gr = D(Wr);
          if (Gr.length > 0)
            for (var Zr = 0; Zr < Gr.length; Zr++) {
              var Yr = Gr[Zr];
              if (Yr.indexOf("swap:") === 0) Jr.swapDelay = d(Yr.substr(5));
              else if (Yr.indexOf("settle:") === 0)
                Jr.settleDelay = d(Yr.substr(7));
              else if (Yr.indexOf("transition:") === 0)
                Jr.transition = Yr.substr(11) === "true";
              else if (Yr.indexOf("ignoreTitle:") === 0)
                Jr.ignoreTitle = Yr.substr(12) === "true";
              else if (Yr.indexOf("scroll:") === 0) {
                var en = Yr.substr(7),
                  tn = en.split(":"),
                  rn = tn.pop(),
                  nn = tn.length > 0 ? tn.join(":") : null;
                ((Jr.scroll = rn), (Jr.scrollTarget = nn));
              } else if (Yr.indexOf("show:") === 0) {
                var sn = Yr.substr(5),
                  tn = sn.split(":"),
                  an = tn.pop(),
                  nn = tn.length > 0 ? tn.join(":") : null;
                ((Jr.show = an), (Jr.showTarget = nn));
              } else if (Yr.indexOf("focus-scroll:") === 0) {
                var fn = Yr.substr(13);
                Jr.focusScroll = fn == "true";
              } else
                Zr == 0
                  ? (Jr.swapStyle = Yr)
                  : b("Unknown modifier in hx-swap: " + Yr);
            }
        }
        return Jr;
      }
      function Sr(Qr) {
        return (
          ne(Qr, "hx-encoding") === "multipart/form-data" ||
          (h(Qr, "form") && ee(Qr, "enctype") === "multipart/form-data")
        );
      }
      function Er(Qr, Kr, Wr) {
        var Jr = null;
        return (
          R(Kr, function (Gr) {
            Jr == null && (Jr = Gr.encodeParameters(Qr, Wr, Kr));
          }),
          Jr ?? (Sr(Kr) ? mr(Wr) : pr(Wr))
        );
      }
      function T(Qr) {
        return { tasks: [], elts: [Qr] };
      }
      function Cr(Qr, Kr) {
        var Wr = Qr[0],
          Jr = Qr[Qr.length - 1];
        if (Kr.scroll) {
          var Gr = null;
          (Kr.scrollTarget && (Gr = ue(Wr, Kr.scrollTarget)),
            Kr.scroll === "top" &&
              (Wr || Gr) &&
              ((Gr = Gr || Wr), (Gr.scrollTop = 0)),
            Kr.scroll === "bottom" &&
              (Jr || Gr) &&
              ((Gr = Gr || Jr), (Gr.scrollTop = Gr.scrollHeight)));
        }
        if (Kr.show) {
          var Gr = null;
          if (Kr.showTarget) {
            var Zr = Kr.showTarget;
            (Kr.showTarget === "window" && (Zr = "body"), (Gr = ue(Wr, Zr)));
          }
          (Kr.show === "top" &&
            (Wr || Gr) &&
            ((Gr = Gr || Wr),
            Gr.scrollIntoView({
              block: "start",
              behavior: Q.config.scrollBehavior,
            })),
            Kr.show === "bottom" &&
              (Jr || Gr) &&
              ((Gr = Gr || Jr),
              Gr.scrollIntoView({
                block: "end",
                behavior: Q.config.scrollBehavior,
              })));
        }
      }
      function Rr(Qr, Kr, Wr, Jr) {
        if ((Jr == null && (Jr = {}), Qr == null)) return Jr;
        var Gr = te(Qr, Kr);
        if (Gr) {
          var Zr = Gr.trim(),
            Yr = Wr;
          if (Zr === "unset") return null;
          (Zr.indexOf("javascript:") === 0
            ? ((Zr = Zr.substr(11)), (Yr = !0))
            : Zr.indexOf("js:") === 0 && ((Zr = Zr.substr(3)), (Yr = !0)),
            Zr.indexOf("{") !== 0 && (Zr = "{" + Zr + "}"));
          var en;
          Yr
            ? (en = Tr(
                Qr,
                function () {
                  return Function("return (" + Zr + ")")();
                },
                {},
              ))
            : (en = E(Zr));
          for (var tn in en)
            en.hasOwnProperty(tn) && Jr[tn] == null && (Jr[tn] = en[tn]);
        }
        return Rr(u(Qr), Kr, Wr, Jr);
      }
      function Tr(Qr, Kr, Wr) {
        return Q.config.allowEval
          ? Kr()
          : (fe(Qr, "htmx:evalDisallowedError"), Wr);
      }
      function Or(Qr, Kr) {
        return Rr(Qr, "hx-vars", !0, Kr);
      }
      function qr(Qr, Kr) {
        return Rr(Qr, "hx-vals", !1, Kr);
      }
      function Hr(Qr) {
        return le(Or(Qr), qr(Qr));
      }
      function Lr(Qr, Kr, Wr) {
        if (Wr !== null)
          try {
            Qr.setRequestHeader(Kr, Wr);
          } catch {
            (Qr.setRequestHeader(Kr, encodeURIComponent(Wr)),
              Qr.setRequestHeader(Kr + "-URI-AutoEncoded", "true"));
          }
      }
      function Ar(Qr) {
        if (Qr.responseURL && typeof URL < "u")
          try {
            var Kr = new URL(Qr.responseURL);
            return Kr.pathname + Kr.search;
          } catch {
            fe(re().body, "htmx:badResponseUrl", { url: Qr.responseURL });
          }
      }
      function O(Qr, Kr) {
        return Kr.test(Qr.getAllResponseHeaders());
      }
      function Nr(Qr, Kr, Wr) {
        return (
          (Qr = Qr.toLowerCase()),
          Wr
            ? Wr instanceof Element || I(Wr, "String")
              ? he(Qr, Kr, null, null, {
                  targetOverride: p(Wr),
                  returnPromise: !0,
                })
              : he(Qr, Kr, p(Wr.source), Wr.event, {
                  handler: Wr.handler,
                  headers: Wr.headers,
                  values: Wr.values,
                  targetOverride: p(Wr.target),
                  swapOverride: Wr.swap,
                  select: Wr.select,
                  returnPromise: !0,
                })
            : he(Qr, Kr, null, null, { returnPromise: !0 })
        );
      }
      function Ir(Qr) {
        for (var Kr = []; Qr; ) (Kr.push(Qr), (Qr = Qr.parentElement));
        return Kr;
      }
      function kr(Qr, Kr, Wr) {
        var Jr, Gr;
        if (typeof URL == "function") {
          Gr = new URL(Kr, document.location.href);
          var Zr = document.location.origin;
          Jr = Zr === Gr.origin;
        } else ((Gr = Kr), (Jr = g(Kr, document.location.origin)));
        return Q.config.selfRequestsOnly && !Jr
          ? !1
          : ce(Qr, "htmx:validateUrl", le({ url: Gr, sameHost: Jr }, Wr));
      }
      function he(Qr, Kr, Wr, Jr, Gr, Zr) {
        var Yr = null,
          en = null;
        if (((Gr = Gr ?? {}), Gr.returnPromise && typeof Promise < "u"))
          var tn = new Promise(function (Nn, jn) {
            ((Yr = Nn), (en = jn));
          });
        Wr == null && (Wr = re().body);
        var rn = Gr.handler || Mr,
          nn = Gr.select || null;
        if (!se(Wr)) return (ie(Yr), tn);
        var sn = Gr.targetOverride || ye(Wr);
        if (sn == null || sn == pe)
          return (
            fe(Wr, "htmx:targetError", { target: te(Wr, "hx-target") }),
            ie(en),
            tn
          );
        var an = ae(Wr),
          fn = an.lastButtonClicked;
        if (fn) {
          var pn = ee(fn, "formaction");
          pn != null && (Kr = pn);
          var un = ee(fn, "formmethod");
          un != null && un.toLowerCase() !== "dialog" && (Qr = un);
        }
        var on = ne(Wr, "hx-confirm");
        if (Zr === void 0) {
          var ln = function (Nn) {
              return he(Qr, Kr, Wr, Jr, Gr, !!Nn);
            },
            vn = {
              target: sn,
              elt: Wr,
              path: Kr,
              verb: Qr,
              triggeringEvent: Jr,
              etc: Gr,
              issueRequest: ln,
              question: on,
            };
          if (ce(Wr, "htmx:confirm", vn) === !1) return (ie(Yr), tn);
        }
        var Pn = Wr,
          Cn = ne(Wr, "hx-sync"),
          kn = null,
          qi = !1;
        if (Cn) {
          var ua = Cn.split(":"),
            On = ua[0].trim();
          if (
            (On === "this" ? (Pn = xe(Wr, "hx-sync")) : (Pn = ue(Wr, On)),
            (Cn = (ua[1] || "drop").trim()),
            (an = ae(Pn)),
            Cn === "drop" && an.xhr && an.abortable !== !0)
          )
            return (ie(Yr), tn);
          if (Cn === "abort") {
            if (an.xhr) return (ie(Yr), tn);
            qi = !0;
          } else if (Cn === "replace") ce(Pn, "htmx:abort");
          else if (Cn.indexOf("queue") === 0) {
            var An = Cn.split(" ");
            kn = (An[1] || "last").trim();
          }
        }
        if (an.xhr)
          if (an.abortable) ce(Pn, "htmx:abort");
          else {
            if (kn == null) {
              if (Jr) {
                var Vn = ae(Jr);
                Vn &&
                  Vn.triggerSpec &&
                  Vn.triggerSpec.queue &&
                  (kn = Vn.triggerSpec.queue);
              }
              kn == null && (kn = "last");
            }
            return (
              an.queuedRequests == null && (an.queuedRequests = []),
              kn === "first" && an.queuedRequests.length === 0
                ? an.queuedRequests.push(function () {
                    he(Qr, Kr, Wr, Jr, Gr);
                  })
                : kn === "all"
                  ? an.queuedRequests.push(function () {
                      he(Qr, Kr, Wr, Jr, Gr);
                    })
                  : kn === "last" &&
                    ((an.queuedRequests = []),
                    an.queuedRequests.push(function () {
                      he(Qr, Kr, Wr, Jr, Gr);
                    })),
              ie(Yr),
              tn
            );
          }
        var dn = new XMLHttpRequest();
        ((an.xhr = dn), (an.abortable = qi));
        var _n = function () {
            if (
              ((an.xhr = null),
              (an.abortable = !1),
              an.queuedRequests != null && an.queuedRequests.length > 0)
            ) {
              var Nn = an.queuedRequests.shift();
              Nn();
            }
          },
          Hi = ne(Wr, "hx-prompt");
        if (Hi) {
          var ci = prompt(Hi);
          if (ci === null || !ce(Wr, "htmx:prompt", { prompt: ci, target: sn }))
            return (ie(Yr), _n(), tn);
        }
        if (on && !Zr && !confirm(on)) return (ie(Yr), _n(), tn);
        var Rn = xr(Wr, sn, ci);
        (Qr !== "get" &&
          !Sr(Wr) &&
          (Rn["Content-Type"] = "application/x-www-form-urlencoded"),
          Gr.headers && (Rn = le(Rn, Gr.headers)));
        var En = dr(Wr, Qr),
          Kn = En.errors,
          hi = En.values;
        Gr.values && (hi = le(hi, Gr.values));
        var Wn = Hr(Wr),
          la = le(hi, Wn),
          di = yr(la, Wr);
        (Q.config.getCacheBusterParam &&
          Qr === "get" &&
          (di["org.htmx.cache-buster"] = ee(sn, "id") || "true"),
          (Kr == null || Kr === "") && (Kr = re().location.href));
        var fs = Rr(Wr, "hx-request"),
          fa = ae(Wr).boosted,
          ji = Q.config.methodsThatUseUrlParams.indexOf(Qr) >= 0,
          Sn = {
            boosted: fa,
            useUrlParams: ji,
            parameters: di,
            unfilteredParameters: la,
            headers: Rn,
            target: sn,
            verb: Qr,
            errors: Kn,
            withCredentials:
              Gr.credentials || fs.credentials || Q.config.withCredentials,
            timeout: Gr.timeout || fs.timeout || Q.config.timeout,
            path: Kr,
            triggeringEvent: Jr,
          };
        if (!ce(Wr, "htmx:configRequest", Sn)) return (ie(Yr), _n(), tn);
        if (
          ((Kr = Sn.path),
          (Qr = Sn.verb),
          (Rn = Sn.headers),
          (di = Sn.parameters),
          (Kn = Sn.errors),
          (ji = Sn.useUrlParams),
          Kn && Kn.length > 0)
        )
          return (ce(Wr, "htmx:validation:halted", Sn), ie(Yr), _n(), tn);
        var ca = Kr.split("#"),
          Ko = ca[0],
          cs = ca[1],
          Hn = Kr;
        if (ji) {
          Hn = Ko;
          var Wo = Object.keys(di).length !== 0;
          Wo &&
            (Hn.indexOf("?") < 0 ? (Hn += "?") : (Hn += "&"),
            (Hn += pr(di)),
            cs && (Hn += "#" + cs));
        }
        if (!kr(Wr, Hn, Sn))
          return (fe(Wr, "htmx:invalidPath", Sn), ie(en), tn);
        if (
          (dn.open(Qr.toUpperCase(), Hn, !0),
          dn.overrideMimeType("text/html"),
          (dn.withCredentials = Sn.withCredentials),
          (dn.timeout = Sn.timeout),
          !fs.noHeaders)
        ) {
          for (var hs in Rn)
            if (Rn.hasOwnProperty(hs)) {
              var Jo = Rn[hs];
              Lr(dn, hs, Jo);
            }
        }
        var xn = {
          xhr: dn,
          target: sn,
          requestConfig: Sn,
          etc: Gr,
          boosted: fa,
          select: nn,
          pathInfo: { requestPath: Kr, finalRequestPath: Hn, anchor: cs },
        };
        if (
          ((dn.onload = function () {
            try {
              var Nn = Ir(Wr);
              if (
                ((xn.pathInfo.responsePath = Ar(dn)),
                rn(Wr, xn),
                lr($i, Fi),
                ce(Wr, "htmx:afterRequest", xn),
                ce(Wr, "htmx:afterOnLoad", xn),
                !se(Wr))
              ) {
                for (var jn = null; Nn.length > 0 && jn == null; ) {
                  var pi = Nn.shift();
                  se(pi) && (jn = pi);
                }
                jn &&
                  (ce(jn, "htmx:afterRequest", xn),
                  ce(jn, "htmx:afterOnLoad", xn));
              }
              (ie(Yr), _n());
            } catch (ha) {
              throw (fe(Wr, "htmx:onLoadError", le({ error: ha }, xn)), ha);
            }
          }),
          (dn.onerror = function () {
            (lr($i, Fi),
              fe(Wr, "htmx:afterRequest", xn),
              fe(Wr, "htmx:sendError", xn),
              ie(en),
              _n());
          }),
          (dn.onabort = function () {
            (lr($i, Fi),
              fe(Wr, "htmx:afterRequest", xn),
              fe(Wr, "htmx:sendAbort", xn),
              ie(en),
              _n());
          }),
          (dn.ontimeout = function () {
            (lr($i, Fi),
              fe(Wr, "htmx:afterRequest", xn),
              fe(Wr, "htmx:timeout", xn),
              ie(en),
              _n());
          }),
          !ce(Wr, "htmx:beforeRequest", xn))
        )
          return (ie(Yr), _n(), tn);
        var $i = or(Wr),
          Fi = sr(Wr);
        (oe(["loadstart", "loadend", "progress", "abort"], function (Nn) {
          oe([dn, dn.upload], function (jn) {
            jn.addEventListener(Nn, function (pi) {
              ce(Wr, "htmx:xhr:" + Nn, {
                lengthComputable: pi.lengthComputable,
                loaded: pi.loaded,
                total: pi.total,
              });
            });
          });
        }),
          ce(Wr, "htmx:beforeSend", xn));
        var Go = ji ? null : Er(dn, Wr, di);
        return (dn.send(Go), tn);
      }
      function Pr(Qr, Kr) {
        var Wr = Kr.xhr,
          Jr = null,
          Gr = null;
        if (
          (O(Wr, /HX-Push:/i)
            ? ((Jr = Wr.getResponseHeader("HX-Push")), (Gr = "push"))
            : O(Wr, /HX-Push-Url:/i)
              ? ((Jr = Wr.getResponseHeader("HX-Push-Url")), (Gr = "push"))
              : O(Wr, /HX-Replace-Url:/i) &&
                ((Jr = Wr.getResponseHeader("HX-Replace-Url")),
                (Gr = "replace")),
          Jr)
        )
          return Jr === "false" ? {} : { type: Gr, path: Jr };
        var Zr = Kr.pathInfo.finalRequestPath,
          Yr = Kr.pathInfo.responsePath,
          en = ne(Qr, "hx-push-url"),
          tn = ne(Qr, "hx-replace-url"),
          rn = ae(Qr).boosted,
          nn = null,
          sn = null;
        return (
          en
            ? ((nn = "push"), (sn = en))
            : tn
              ? ((nn = "replace"), (sn = tn))
              : rn && ((nn = "push"), (sn = Yr || Zr)),
          sn
            ? sn === "false"
              ? {}
              : (sn === "true" && (sn = Yr || Zr),
                Kr.pathInfo.anchor &&
                  sn.indexOf("#") === -1 &&
                  (sn = sn + "#" + Kr.pathInfo.anchor),
                { type: nn, path: sn })
            : {}
        );
      }
      function Mr(Qr, Kr) {
        var Wr = Kr.xhr,
          Jr = Kr.target,
          Gr = Kr.etc,
          Zr = Kr.requestConfig,
          Yr = Kr.select;
        if (ce(Qr, "htmx:beforeOnLoad", Kr)) {
          if (
            (O(Wr, /HX-Trigger:/i) && _e(Wr, "HX-Trigger", Qr),
            O(Wr, /HX-Location:/i))
          ) {
            er();
            var en = Wr.getResponseHeader("HX-Location"),
              tn;
            (en.indexOf("{") === 0 &&
              ((tn = E(en)), (en = tn.path), delete tn.path),
              Nr("GET", en, tn).then(function () {
                tr(en);
              }));
            return;
          }
          var rn =
            O(Wr, /HX-Refresh:/i) &&
            Wr.getResponseHeader("HX-Refresh") === "true";
          if (O(Wr, /HX-Redirect:/i)) {
            ((location.href = Wr.getResponseHeader("HX-Redirect")),
              rn && location.reload());
            return;
          }
          if (rn) {
            location.reload();
            return;
          }
          O(Wr, /HX-Retarget:/i) &&
            (Wr.getResponseHeader("HX-Retarget") === "this"
              ? (Kr.target = Qr)
              : (Kr.target = ue(Qr, Wr.getResponseHeader("HX-Retarget"))));
          var nn = Pr(Qr, Kr),
            sn = Wr.status >= 200 && Wr.status < 400 && Wr.status !== 204,
            an = Wr.response,
            fn = Wr.status >= 400,
            pn = Q.config.ignoreTitle,
            un = le(
              {
                shouldSwap: sn,
                serverResponse: an,
                isError: fn,
                ignoreTitle: pn,
              },
              Kr,
            );
          if (ce(Jr, "htmx:beforeSwap", un)) {
            if (
              ((Jr = un.target),
              (an = un.serverResponse),
              (fn = un.isError),
              (pn = un.ignoreTitle),
              (Kr.target = Jr),
              (Kr.failed = fn),
              (Kr.successful = !fn),
              un.shouldSwap)
            ) {
              (Wr.status === 286 && at(Qr),
                R(Qr, function (On) {
                  an = On.transformResponse(an, Wr, Qr);
                }),
                nn.type && er());
              var on = Gr.swapOverride;
              O(Wr, /HX-Reswap:/i) && (on = Wr.getResponseHeader("HX-Reswap"));
              var tn = wr(Qr, on);
              (tn.hasOwnProperty("ignoreTitle") && (pn = tn.ignoreTitle),
                Jr.classList.add(Q.config.swappingClass));
              var ln = null,
                vn = null,
                Pn = function () {
                  try {
                    var On = document.activeElement,
                      An = {};
                    try {
                      An = {
                        elt: On,
                        start: On ? On.selectionStart : null,
                        end: On ? On.selectionEnd : null,
                      };
                    } catch {}
                    var Vn;
                    (Yr && (Vn = Yr),
                      O(Wr, /HX-Reselect:/i) &&
                        (Vn = Wr.getResponseHeader("HX-Reselect")),
                      nn.type &&
                        (ce(
                          re().body,
                          "htmx:beforeHistoryUpdate",
                          le({ history: nn }, Kr),
                        ),
                        nn.type === "push"
                          ? (tr(nn.path),
                            ce(re().body, "htmx:pushedIntoHistory", {
                              path: nn.path,
                            }))
                          : (rr(nn.path),
                            ce(re().body, "htmx:replacedInHistory", {
                              path: nn.path,
                            }))));
                    var dn = T(Jr);
                    if (
                      (je(tn.swapStyle, Jr, Qr, an, dn, Vn),
                      An.elt && !se(An.elt) && ee(An.elt, "id"))
                    ) {
                      var _n = document.getElementById(ee(An.elt, "id")),
                        Hi = {
                          preventScroll:
                            tn.focusScroll !== void 0
                              ? !tn.focusScroll
                              : !Q.config.defaultFocusScroll,
                        };
                      if (_n) {
                        if (An.start && _n.setSelectionRange)
                          try {
                            _n.setSelectionRange(An.start, An.end);
                          } catch {}
                        _n.focus(Hi);
                      }
                    }
                    if (
                      (Jr.classList.remove(Q.config.swappingClass),
                      oe(dn.elts, function (En) {
                        (En.classList &&
                          En.classList.add(Q.config.settlingClass),
                          ce(En, "htmx:afterSwap", Kr));
                      }),
                      O(Wr, /HX-Trigger-After-Swap:/i))
                    ) {
                      var ci = Qr;
                      (se(Qr) || (ci = re().body),
                        _e(Wr, "HX-Trigger-After-Swap", ci));
                    }
                    var Rn = function () {
                      if (
                        (oe(dn.tasks, function (Wn) {
                          Wn.call();
                        }),
                        oe(dn.elts, function (Wn) {
                          (Wn.classList &&
                            Wn.classList.remove(Q.config.settlingClass),
                            ce(Wn, "htmx:afterSettle", Kr));
                        }),
                        Kr.pathInfo.anchor)
                      ) {
                        var En = re().getElementById(Kr.pathInfo.anchor);
                        En &&
                          En.scrollIntoView({
                            block: "start",
                            behavior: "auto",
                          });
                      }
                      if (dn.title && !pn) {
                        var Kn = C("title");
                        Kn
                          ? (Kn.innerHTML = dn.title)
                          : (window.document.title = dn.title);
                      }
                      if (
                        (Cr(dn.elts, tn), O(Wr, /HX-Trigger-After-Settle:/i))
                      ) {
                        var hi = Qr;
                        (se(Qr) || (hi = re().body),
                          _e(Wr, "HX-Trigger-After-Settle", hi));
                      }
                      ie(ln);
                    };
                    tn.settleDelay > 0 ? setTimeout(Rn, tn.settleDelay) : Rn();
                  } catch (En) {
                    throw (fe(Qr, "htmx:swapError", Kr), ie(vn), En);
                  }
                },
                Cn = Q.config.globalViewTransitions;
              if (
                (tn.hasOwnProperty("transition") && (Cn = tn.transition),
                Cn &&
                  ce(Qr, "htmx:beforeTransition", Kr) &&
                  typeof Promise < "u" &&
                  document.startViewTransition)
              ) {
                var kn = new Promise(function (On, An) {
                    ((ln = On), (vn = An));
                  }),
                  qi = Pn;
                Pn = function () {
                  document.startViewTransition(function () {
                    return (qi(), kn);
                  });
                };
              }
              tn.swapDelay > 0 ? setTimeout(Pn, tn.swapDelay) : Pn();
            }
            fn &&
              fe(
                Qr,
                "htmx:responseError",
                le(
                  {
                    error:
                      "Response Status Error Code " +
                      Wr.status +
                      " from " +
                      Kr.pathInfo.requestPath,
                  },
                  Kr,
                ),
              );
          }
        }
      }
      var Xr = {};
      function Dr() {
        return {
          init: function (Qr) {
            return null;
          },
          onEvent: function (Qr, Kr) {
            return !0;
          },
          transformResponse: function (Qr, Kr, Wr) {
            return Qr;
          },
          isInlineSwap: function (Qr) {
            return !1;
          },
          handleSwap: function (Qr, Kr, Wr, Jr) {
            return !1;
          },
          encodeParameters: function (Qr, Kr, Wr) {
            return null;
          },
        };
      }
      function Ur(Qr, Kr) {
        (Kr.init && Kr.init(r), (Xr[Qr] = le(Dr(), Kr)));
      }
      function Br(Qr) {
        delete Xr[Qr];
      }
      function Fr(Qr, Kr, Wr) {
        if (Qr == null) return Kr;
        (Kr == null && (Kr = []), Wr == null && (Wr = []));
        var Jr = te(Qr, "hx-ext");
        return (
          Jr &&
            oe(Jr.split(","), function (Gr) {
              if (((Gr = Gr.replace(/ /g, "")), Gr.slice(0, 7) == "ignore:")) {
                Wr.push(Gr.slice(7));
                return;
              }
              if (Wr.indexOf(Gr) < 0) {
                var Zr = Xr[Gr];
                Zr && Kr.indexOf(Zr) < 0 && Kr.push(Zr);
              }
            }),
          Fr(u(Qr), Kr, Wr)
        );
      }
      var Vr = !1;
      re().addEventListener("DOMContentLoaded", function () {
        Vr = !0;
      });
      function jr(Qr) {
        Vr || re().readyState === "complete"
          ? Qr()
          : re().addEventListener("DOMContentLoaded", Qr);
      }
      function _r() {
        Q.config.includeIndicatorStyles !== !1 &&
          re().head.insertAdjacentHTML(
            "beforeend",
            "<style>                      ." +
              Q.config.indicatorClass +
              "{opacity:0}                      ." +
              Q.config.requestClass +
              " ." +
              Q.config.indicatorClass +
              "{opacity:1; transition: opacity 200ms ease-in;}                      ." +
              Q.config.requestClass +
              "." +
              Q.config.indicatorClass +
              "{opacity:1; transition: opacity 200ms ease-in;}                    </style>",
          );
      }
      function zr() {
        var Qr = re().querySelector('meta[name="htmx-config"]');
        return Qr ? E(Qr.content) : null;
      }
      function $r() {
        var Qr = zr();
        Qr && (Q.config = le(Q.config, Qr));
      }
      return (
        jr(function () {
          ($r(), _r());
          var Qr = re().body;
          zt(Qr);
          var Kr = re().querySelectorAll(
            "[hx-trigger='restored'],[data-hx-trigger='restored']",
          );
          Qr.addEventListener("htmx:abort", function (Jr) {
            var Gr = Jr.target,
              Zr = ae(Gr);
            Zr && Zr.xhr && Zr.xhr.abort();
          });
          let Wr = window.onpopstate ? window.onpopstate.bind(window) : null;
          ((window.onpopstate = function (Jr) {
            Jr.state && Jr.state.htmx
              ? (ar(),
                oe(Kr, function (Gr) {
                  ce(Gr, "htmx:restored", { document: re(), triggerEvent: ce });
                }))
              : Wr && Wr(Jr);
          }),
            setTimeout(function () {
              (ce(Qr, "htmx:load", {}), (Qr = null));
            }, 0));
        }),
        Q
      );
    })();
  });
});
var _s = !1,
  ws = !1,
  Bn = [],
  Es = -1,
  Xi = !1,
  $s = !1;
function au(Qr) {
  lu(Qr);
}
function ou() {
  $s = !0;
}
function uu() {
  (($s = !1), Ta());
}
function lu(Qr) {
  (Bn.includes(Qr) ||
    (Bn.push(Qr), Qr._x_schedulerPriority !== void 0 && (Xi = !0)),
    Ta());
}
function Fs(Qr) {
  let Kr = Bn.indexOf(Qr);
  Kr !== -1 && Kr > Es && Bn.splice(Kr, 1);
}
function Ta() {
  if (!ws && !_s) {
    if ($s) return;
    ((_s = !0), queueMicrotask(fu));
  }
}
function fu() {
  ((_s = !1), (ws = !0));
  for (let Qr = 0; Qr < Bn.length; Qr++) (Xi && cu(Qr), Bn[Qr](), (Es = Qr));
  ((Bn.length = 0), (Es = -1), (Xi = !1), (ws = !1));
}
function cu(Qr) {
  let Kr = new Map(),
    Wr = Bn.slice(Qr).sort((Jr, Gr) => hu(Jr, Gr, Kr));
  for (let Jr = 0; Jr < Wr.length; Jr++) Bn[Qr + Jr] = Wr[Jr];
  Xi = !1;
}
function hu(Qr, Kr, Wr) {
  return ds(Qr)
    ? ds(Kr)
      ? pa(Qr._x_schedulerPriority.el, Wr) -
          pa(Kr._x_schedulerPriority.el, Wr) ||
        Qr._x_schedulerPriority.order - Kr._x_schedulerPriority.order
      : -1
    : ds(Kr)
      ? 1
      : 0;
}
function ds(Qr) {
  return Qr._x_schedulerPriority !== void 0;
}
function pa(Qr, Kr) {
  if (Kr.has(Qr)) return Kr.get(Qr);
  let Wr = 0,
    Jr = Qr;
  for (; Qr; )
    (Wr++,
      Qr._x_teleportBack
        ? (Qr = Qr._x_teleportBack)
        : typeof ShadowRoot == "function" && Qr.parentNode instanceof ShadowRoot
          ? (Qr = Qr.parentNode.host)
          : (Qr = Qr.parentElement));
  return (Kr.set(Jr, Wr), Wr);
}
var yi,
  li,
  xi,
  Ca,
  du = 0,
  Ss = !0;
function pu(Qr) {
  ((Ss = !1), Qr(), (Ss = !0));
}
function vu(Qr) {
  ((yi = Qr.reactive),
    (xi = Qr.release),
    (li = (Kr) =>
      Qr.effect(Kr, {
        scheduler: (Wr) => {
          Ss ? au(Wr) : Wr();
        },
      })),
    (Ca = Qr.raw));
}
function va(Qr) {
  li = Qr;
}
function gu(Qr) {
  let Kr = () => {};
  return [
    (Jr, Gr) => {
      let Zr = Gr?.priority === "structural" ? du++ : void 0,
        Yr = li(Jr);
      return (
        Zr !== void 0 &&
          Yr !== void 0 &&
          (Yr._x_schedulerPriority = { el: Qr, order: Zr }),
        Qr._x_effects ||
          ((Qr._x_effects = new Set()),
          (Qr._x_runEffects = () => {
            Qr._x_effects.forEach((en) => en());
          })),
        Qr._x_effects.add(Yr),
        (Kr = () => {
          Yr !== void 0 && (Qr._x_effects.delete(Yr), xi(Yr));
        }),
        Yr
      );
    },
    () => {
      Kr();
    },
  ];
}
function Ra(Qr, Kr) {
  let Wr = !0,
    Jr,
    Gr,
    Zr = li(() => {
      let Yr = Qr(),
        en = JSON.stringify(Yr);
      if (!Wr && (typeof Yr == "object" || Yr !== Jr)) {
        let tn = typeof Jr == "object" ? JSON.parse(Gr) : Jr;
        queueMicrotask(() => {
          Kr(Yr, tn);
        });
      }
      ((Jr = Yr), (Gr = en), (Wr = !1));
    });
  return () => {
    (Fs(Zr), xi(Zr));
  };
}
async function mu(Qr) {
  ou();
  try {
    (await Qr(), await Promise.resolve());
  } finally {
    uu();
  }
}
var Na = [],
  Ia = [],
  Ma = [];
function yu(Qr) {
  Ma.push(Qr);
}
function Bs(Qr, Kr) {
  typeof Kr == "function"
    ? (Qr._x_cleanups || (Qr._x_cleanups = []), Qr._x_cleanups.push(Kr))
    : ((Kr = Qr), Ia.push(Kr));
}
function La(Qr) {
  Na.push(Qr);
}
function Pa(Qr, Kr, Wr) {
  (Qr._x_attributeCleanups || (Qr._x_attributeCleanups = {}),
    Qr._x_attributeCleanups[Kr] || (Qr._x_attributeCleanups[Kr] = []),
    Qr._x_attributeCleanups[Kr].push(Wr));
}
function ka(Qr, Kr) {
  Qr._x_attributeCleanups &&
    Object.entries(Qr._x_attributeCleanups).forEach(([Wr, Jr]) => {
      (Kr === void 0 || Kr.includes(Wr)) &&
        (Jr.forEach((Gr) => Gr()), delete Qr._x_attributeCleanups[Wr]);
    });
}
function xu(Qr) {
  for (Qr._x_effects?.forEach(Fs); Qr._x_cleanups?.length; )
    Qr._x_cleanups.pop()();
}
var es = new MutationObserver(ts),
  Qs = !1;
function Vs() {
  (es.observe(document, {
    subtree: !0,
    childList: !0,
    attributes: !0,
    attributeOldValue: !0,
  }),
    (Qs = !0));
}
function Da() {
  (bu(), es.disconnect(), (Qs = !1));
}
var Gn = [];
function bu() {
  let Qr = es.takeRecords();
  Gn.push(() => Qr.length > 0 && ts(Qr));
  let Kr = Gn.length;
  queueMicrotask(() => {
    if (Gn.length === Kr) for (; Gn.length > 0; ) Gn.shift()();
  });
}
function _u() {
  for (; Gn.length > 0; ) Gn.shift()();
  let Qr = es.takeRecords();
  Qr.length > 0 && ts(Qr);
}
function gn(Qr) {
  if (!Qs) return Qr();
  Da();
  try {
    return Qr();
  } finally {
    Vs();
  }
}
var zs = !1,
  Ki = [];
function wu() {
  zs = !0;
}
function Eu() {
  ((zs = !1), ts(Ki), (Ki = []));
}
function ts(Qr) {
  if (zs) {
    Ki = Ki.concat(Qr);
    return;
  }
  let Kr = [],
    Wr = new Set(),
    Jr = new Map(),
    Gr = new Map();
  for (let Zr = 0; Zr < Qr.length; Zr++)
    if (
      !Qr[Zr].target._x_ignoreMutationObserver &&
      (Qr[Zr].type === "childList" &&
        (Qr[Zr].removedNodes.forEach((Yr) => {
          Yr.nodeType === 1 && Yr._x_marker && Wr.add(Yr);
        }),
        Qr[Zr].addedNodes.forEach((Yr) => {
          if (Yr.nodeType === 1) {
            if (Wr.has(Yr)) {
              Wr.delete(Yr);
              return;
            }
            Yr._x_marker || Kr.push(Yr);
          }
        })),
      Qr[Zr].type === "attributes")
    ) {
      let Yr = Qr[Zr].target,
        en = Qr[Zr].attributeName,
        tn = Qr[Zr].oldValue,
        rn = () => {
          (Jr.has(Yr) || Jr.set(Yr, []),
            Jr.get(Yr).push({ name: en, value: Yr.getAttribute(en) }));
        },
        nn = () => {
          (Gr.has(Yr) || Gr.set(Yr, []), Gr.get(Yr).push(en));
        };
      Yr.hasAttribute(en) && tn === null
        ? rn()
        : Yr.hasAttribute(en)
          ? (nn(), rn())
          : nn();
    }
  (Gr.forEach((Zr, Yr) => {
    ka(Yr, Zr);
  }),
    Jr.forEach((Zr, Yr) => {
      Na.forEach((en) => en(Yr, Zr));
    }));
  for (let Zr of Wr)
    Kr.some((Yr) => Yr.contains(Zr)) || Ia.forEach((Yr) => Yr(Zr));
  for (let Zr of Kr) Zr.isConnected && Ma.forEach((Yr) => Yr(Zr));
  ((Kr = null), (Wr = null), (Jr = null), (Gr = null));
}
function Ua(Qr) {
  return ni(mi(Qr));
}
function ki(Qr, Kr, Wr) {
  return (
    (Qr._x_dataStack = [Kr, ...mi(Wr || Qr)]),
    () => {
      Qr._x_dataStack = Qr._x_dataStack.filter((Jr) => Jr !== Kr);
    }
  );
}
function mi(Qr) {
  return Qr._x_dataStack
    ? Qr._x_dataStack
    : typeof ShadowRoot == "function" && Qr instanceof ShadowRoot
      ? mi(Qr.host)
      : Qr.parentNode
        ? mi(Qr.parentNode)
        : [];
}
function ni(Qr) {
  return new Proxy({ objects: Qr }, Su);
}
function qa(Qr, Kr) {
  return Qr === null || Qr === Object.prototype
    ? null
    : Object.prototype.hasOwnProperty.call(Qr, Kr)
      ? Qr
      : qa(Object.getPrototypeOf(Qr), Kr);
}
var Su = {
  ownKeys({ objects: Qr }) {
    return Array.from(new Set(Qr.flatMap((Kr) => Object.keys(Kr))));
  },
  has({ objects: Qr }, Kr) {
    return Kr == Symbol.unscopables
      ? !1
      : Qr.some(
          (Wr) =>
            Object.prototype.hasOwnProperty.call(Wr, Kr) || Reflect.has(Wr, Kr),
        );
  },
  get({ objects: Qr }, Kr, Wr) {
    return Kr == "toJSON"
      ? Ou
      : Reflect.get(Qr.find((Jr) => Reflect.has(Jr, Kr)) || {}, Kr, Wr);
  },
  set({ objects: Qr }, Kr, Wr, Jr) {
    let Gr;
    for (let Yr of Qr) if (((Gr = qa(Yr, Kr)), Gr)) break;
    Gr || (Gr = Qr[Qr.length - 1]);
    let Zr = Object.getOwnPropertyDescriptor(Gr, Kr);
    return Zr?.set && Zr?.get
      ? Zr.set.call(Jr, Wr) || !0
      : Reflect.set(Gr, Kr, Wr);
  },
};
function Ou() {
  return Reflect.ownKeys(this).reduce(
    (Kr, Wr) => ((Kr[Wr] = Reflect.get(this, Wr)), Kr),
    {},
  );
}
function Xs(Qr, Kr = () => {}) {
  let Wr = (Gr) => typeof Gr == "object" && !Array.isArray(Gr) && Gr !== null,
    Jr = (Gr, Zr = "") => {
      Object.entries(Object.getOwnPropertyDescriptors(Gr)).forEach(
        ([Yr, { value: en, enumerable: tn }]) => {
          if (
            tn === !1 ||
            en === void 0 ||
            (typeof en == "object" && en !== null && en.__v_skip)
          )
            return;
          let rn = Zr === "" ? Yr : `${Zr}.${Yr}`;
          typeof en == "object" && en !== null && en._x_interceptor
            ? (Gr[Yr] = en.initialize(Qr, rn, Yr, Kr))
            : Wr(en) && en !== Gr && !(en instanceof Element) && Jr(en, rn);
        },
      );
    };
  return Jr(Qr);
}
function Ha(Qr, Kr = () => {}) {
  let Wr = {
    initialValue: void 0,
    _x_interceptor: !0,
    initialize(Jr, Gr, Zr, Yr) {
      return Qr(
        this.initialValue,
        () => Au(Jr, Gr),
        (en) => Os(Jr, Gr, en),
        Gr,
        Zr,
        Yr,
      );
    },
  };
  return (
    Kr(Wr),
    (Jr) => {
      if (typeof Jr == "object" && Jr !== null && Jr._x_interceptor) {
        let Gr = Wr.initialize.bind(Wr);
        Wr.initialize = (Zr, Yr, en, tn) => {
          let rn = Jr.initialize(Zr, Yr, en, tn);
          return ((Wr.initialValue = rn), Gr(Zr, Yr, en, tn));
        };
      } else Wr.initialValue = Jr;
      return Wr;
    }
  );
}
function Au(Qr, Kr) {
  return Kr.split(".").reduce((Wr, Jr) => Wr[Jr], Qr);
}
function Os(Qr, Kr, Wr) {
  if ((typeof Kr == "string" && (Kr = Kr.split(".")), Kr.length === 1))
    Qr[Kr[0]] = Wr;
  else {
    if (Kr.length === 0) throw error;
    return (Qr[Kr[0]] || (Qr[Kr[0]] = {}), Os(Qr[Kr[0]], Kr.slice(1), Wr));
  }
}
var ja = {};
function Mn(Qr, Kr) {
  ja[Qr] = Kr;
}
function Wi(Qr, Kr) {
  let Wr = Tu(Kr);
  return (
    Object.entries(ja).forEach(([Jr, Gr]) => {
      Object.defineProperty(Qr, `$${Jr}`, {
        get() {
          return Gr(Kr, Wr);
        },
        enumerable: !1,
      });
    }),
    Qr
  );
}
function Tu(Qr) {
  let [Kr, Wr] = Xa(Qr),
    Jr = { interceptor: Ha, ...Kr };
  return (Bs(Qr, Wr), Jr);
}
function Cu(Qr, Kr, Wr, ...Jr) {
  try {
    return Wr(...Jr);
  } catch (Gr) {
    rs(Gr, Qr, Kr);
  }
}
function rs(...Qr) {
  return $a(...Qr);
}
var $a = Nu;
function Ru(Qr) {
  $a = Qr;
}
function Nu(Qr, Kr, Wr = void 0) {
  ((Qr = Object.assign(Qr ?? { message: "No error message given." }, {
    el: Kr,
    expression: Wr,
  })),
    console.warn(
      `Alpine Expression Error: ${Qr.message}

${
  Wr
    ? 'Expression: "' +
      Wr +
      `"

`
    : ""
}`,
      Kr,
    ),
    setTimeout(() => {
      throw Qr;
    }, 0));
}
var ei = !0;
function Fa(Qr) {
  let Kr = ei;
  ei = !1;
  let Wr = Qr();
  return ((ei = Kr), Wr);
}
function ti(Qr, Kr, Wr = {}) {
  let Jr;
  return (bn(Qr, Kr)((Gr) => (Jr = Gr), Wr), Jr);
}
function bn(...Qr) {
  return Ba(...Qr);
}
var Ba = () => {};
function Iu(Qr) {
  Ba = Qr;
}
var Qa;
function Mu(Qr) {
  Qa = Qr;
}
function Lu(Qr, Kr) {
  return (
    Wr = () => {},
    { scope: Jr = {}, params: Gr = [], context: Zr } = {},
  ) => {
    if (!ei) {
      As(Wr, Kr, ni([Jr, ...Qr]), Gr);
      return;
    }
    let Yr = Kr.apply(ni([Jr, ...Qr]), Gr);
    As(Wr, Yr);
  };
}
function As(Qr, Kr, Wr, Jr, Gr) {
  if (ei && typeof Kr == "function") {
    let Zr = Kr.apply(Wr, Jr);
    Zr instanceof Promise
      ? Zr.then((Yr) => As(Qr, Yr, Wr, Jr)).catch((Yr) => rs(Yr, Gr, Kr))
      : Qr(Zr);
  } else
    typeof Kr == "object" && Kr instanceof Promise
      ? Kr.then((Zr) => Qr(Zr))
      : Qr(Kr);
}
function Pu(...Qr) {
  return Qa(...Qr);
}
var Ks = "x-";
function bi(Qr = "") {
  return Ks + Qr;
}
function ku(Qr) {
  Ks = Qr;
}
var Ji = {};
function mn(Qr, Kr) {
  return (
    (Ji[Qr] = Kr),
    {
      before(Wr) {
        if (!Ji[Wr]) {
          console.warn(
            String.raw`Cannot find directive \`${Wr}\`. \`${Qr}\` will use the default order of execution`,
          );
          return;
        }
        let Jr = Yn.indexOf(Wr);
        Yn.splice(Jr >= 0 ? Jr : Yn.indexOf("DEFAULT"), 0, Qr);
      },
    }
  );
}
function Du(Qr) {
  return Object.keys(Ji).includes(Qr);
}
function ns(Qr, Kr, Wr) {
  if (((Kr = Array.from(Kr)), Qr._x_virtualDirectives)) {
    let Zr = Object.entries(Qr._x_virtualDirectives).map(([en, tn]) => ({
        name: en,
        value: tn,
      })),
      Yr = Va(Zr);
    ((Zr = Zr.map((en) =>
      Yr.find((tn) => tn.name === en.name)
        ? { name: `x-bind:${en.name}`, value: `"${en.value}"` }
        : en,
    )),
      (Kr = Kr.concat(Zr)));
  }
  let Jr = {};
  return Kr.map(Ja((Zr, Yr) => (Jr[Zr] = Yr)))
    .filter(Za)
    .map(Hu(Jr, Wr))
    .sort(ju)
    .map((Zr) => qu(Qr, Zr));
}
function Va(Qr) {
  return Array.from(Qr)
    .map(Ja())
    .filter((Kr) => !Za(Kr));
}
var Ts = !1,
  Si = new Map(),
  za = Symbol();
function Uu(Qr) {
  Ts = !0;
  let Kr = Symbol();
  ((za = Kr), Si.set(Kr, []));
  let Wr = () => {
      for (; Si.get(Kr).length; ) Si.get(Kr).shift()();
      Si.delete(Kr);
    },
    Jr = () => {
      ((Ts = !1), Wr());
    };
  (Qr(Wr), Jr());
}
function Xa(Qr) {
  let Kr = [],
    Wr = (en) => Kr.push(en),
    [Jr, Gr] = gu(Qr);
  return (
    Kr.push(Gr),
    [
      {
        Alpine: _i,
        effect: Jr,
        cleanup: Wr,
        evaluateLater: bn.bind(bn, Qr),
        evaluate: ti.bind(ti, Qr),
      },
      () => Kr.forEach((en) => en()),
    ]
  );
}
function qu(Qr, Kr) {
  let Wr = () => {},
    Jr = Ji[Kr.type] || Wr,
    [Gr, Zr] = Xa(Qr);
  Pa(Qr, Kr.original, Zr);
  let Yr = () => {
    Qr._x_ignore ||
      Qr._x_ignoreSelf ||
      (Jr.inline && Jr.inline(Qr, Kr, Gr),
      (Jr = Jr.bind(Jr, Qr, Kr, Gr)),
      Ts ? Si.get(za).push(Jr) : Jr());
  };
  return ((Yr.runCleanups = Zr), Yr);
}
var Ka =
    (Qr, Kr) =>
    ({ name: Wr, value: Jr }) => (
      Wr.startsWith(Qr) && (Wr = Wr.replace(Qr, Kr)),
      { name: Wr, value: Jr }
    ),
  Wa = (Qr) => Qr;
function Ja(Qr = () => {}) {
  return ({ name: Kr, value: Wr }) => {
    let { name: Jr, value: Gr } = Ga.reduce((Zr, Yr) => Yr(Zr), {
      name: Kr,
      value: Wr,
    });
    return (Jr !== Kr && Qr(Jr, Kr), { name: Jr, value: Gr });
  };
}
var Ga = [];
function Ws(Qr) {
  Ga.push(Qr);
}
function Za({ name: Qr }) {
  return Ya().test(Qr);
}
var Ya = () => new RegExp(`^${Ks}([^:^.]+)\\b`);
function Hu(Qr, Kr) {
  return ({ name: Wr, value: Jr }) => {
    Wr === Jr && (Jr = "");
    let Gr = Wr.match(Ya()),
      Zr = Wr.match(/:([a-zA-Z0-9\-_:]+)/),
      Yr = Wr.match(/\.[^.\]]+(?=[^\]]*$)/g) || [],
      en = Kr || Qr[Wr] || Wr;
    return {
      type: Gr ? Gr[1] : null,
      value: Zr ? Zr[1] : null,
      modifiers: Yr.map((tn) => tn.replace(".", "")),
      expression: Jr,
      original: en,
    };
  };
}
var Cs = "DEFAULT",
  Yn = [
    "ignore",
    "ref",
    "id",
    "data",
    "anchor",
    "bind",
    "init",
    "for",
    "model",
    "modelable",
    "transition",
    "show",
    "if",
    Cs,
    "teleport",
  ];
function ju(Qr, Kr) {
  let Wr = Yn.indexOf(Qr.type) === -1 ? Cs : Qr.type,
    Jr = Yn.indexOf(Kr.type) === -1 ? Cs : Kr.type;
  return Yn.indexOf(Wr) - Yn.indexOf(Jr);
}
function ii(Qr, Kr) {
  if (typeof ShadowRoot == "function" && Qr instanceof ShadowRoot) {
    Array.from(Qr.children).forEach((Gr) => ii(Gr, Kr));
    return;
  }
  let Wr = !1;
  if ((Kr(Qr, () => (Wr = !0)), Wr)) return;
  let Jr = Qr.firstElementChild;
  for (; Jr; ) (ii(Jr, Kr, !1), (Jr = Jr.nextElementSibling));
}
var Xn = !1;
function Qn(Qr, Kr = () => {}) {
  return (...Wr) => (Xn ? Kr(...Wr) : Qr(...Wr));
}
function $u(Qr) {
  return (...Kr) => Xn && Qr(...Kr);
}
var eo = [];
function Di(Qr) {
  eo.push(Qr);
}
function Fu(Qr, Kr) {
  (eo.forEach((Wr) => Wr(Qr, Kr)),
    (Xn = !0),
    to(() => {
      qn(Kr, (Wr, Jr) => {
        Jr(Wr, () => {});
      });
    }),
    (Xn = !1));
}
var Rs = !1;
function Bu(Qr, Kr) {
  (Kr._x_dataStack || (Kr._x_dataStack = Qr._x_dataStack),
    (Xn = !0),
    (Rs = !0),
    to(() => {
      Qu(Kr);
    }),
    (Xn = !1),
    (Rs = !1));
}
function Qu(Qr) {
  let Kr = !1;
  qn(Qr, (Jr, Gr) => {
    ii(Jr, (Zr, Yr) => {
      if (Kr && Ju(Zr)) return Yr();
      ((Kr = !0), Gr(Zr, Yr));
    });
  });
}
function to(Qr) {
  let Kr = li;
  (va((Wr, Jr) => {
    let Gr = Kr(Wr);
    return (xi(Gr), () => {});
  }),
    Qr(),
    va(Kr));
}
var is = 0;
function Vu(Qr, Kr) {
  let Wr = Qr._x_deferInit;
  (Wr ||
    ((Wr = Qr._x_deferInit =
      { pending: 0, ownsIgnore: !Qr._x_ignore, queuedAttributes: new Map() }),
    Wr.ownsIgnore && (Qr._x_ignore = !0),
    is++),
    Wr.pending++,
    Promise.resolve(Kr)
      .catch((Jr) => {
        try {
          rs(Jr, Qr);
        } catch (Gr) {
          setTimeout(() => {
            throw Gr;
          }, 0);
        }
      })
      .then(() => zu(Qr, Wr)));
}
function zu(Qr, Kr) {
  (Kr.pending--,
    !(Kr.pending > 0) &&
      (_u(),
      !(Kr.pending > 0) &&
        Qr._x_deferInit === Kr &&
        (delete Qr._x_deferInit,
        Kr.ownsIgnore && delete Qr._x_ignore,
        is--,
        Qr.isConnected && (Ku(Kr), qn(Qr)))));
}
function Xu(Qr, Kr) {
  if (is === 0) return !1;
  let Wr = Tn(Qr, (Jr) => Jr._x_deferInit);
  return Wr
    ? (ro(
        Wr._x_deferInit,
        Qr,
        Kr.map(({ name: Jr }) => Jr),
      ),
      !0)
    : !1;
}
function ro(Qr, Kr, Wr) {
  let Jr = Qr.queuedAttributes.get(Kr);
  ((!Jr || Jr.marker !== Kr._x_marker) &&
    ((Jr = { marker: Kr._x_marker, names: new Set() }),
    Qr.queuedAttributes.set(Kr, Jr)),
    Wr.forEach((Gr) => Jr.names.add(Gr)));
}
function Ku(Qr) {
  Qr.queuedAttributes.forEach((Kr, Wr) => {
    if (!Wr.isConnected || !Wr._x_marker || Wr._x_marker !== Kr.marker) return;
    let Jr = Tn(Wr, (Zr) => Zr._x_deferInit);
    if (Jr) {
      ro(Jr._x_deferInit, Wr, Array.from(Kr.names));
      return;
    }
    let Gr = Array.from(Kr.names)
      .filter((Zr) => Wr.hasAttribute(Zr))
      .map((Zr) => ({ name: Zr, value: Wr.getAttribute(Zr) }));
    Gr.length !== 0 && ns(Wr, Gr).forEach((Zr) => Zr());
  });
}
Di((Qr, Kr) => {
  is !== 0 &&
    (!Qr ||
      Qr.nodeType !== 1 ||
      !Kr ||
      Kr.nodeType !== 1 ||
      (Tn(Qr, (Wr) => Wr._x_deferInit) && (Kr._x_ignore = !0)));
});
function Oi(Qr, Kr, Wr = {}, Jr = {}) {
  return Qr.dispatchEvent(
    new CustomEvent(Kr, {
      detail: Wr,
      bubbles: !0,
      composed: !0,
      cancelable: !0,
      ...Jr,
    }),
  );
}
function Un(Qr, ...Kr) {
  console.warn(`Alpine Warning: ${Qr}`, ...Kr);
}
var ga = !1;
function Wu() {
  (ga &&
    Un(
      "Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems.",
    ),
    (ga = !0),
    document.body ||
      Un(
        "Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?",
      ),
    Oi(document, "alpine:init"),
    Oi(document, "alpine:initializing"),
    Vs(),
    yu((Kr) => qn(Kr, ii)),
    Bs((Kr) => fi(Kr)),
    La((Kr, Wr) => {
      Xu(Kr, Wr) || ns(Kr, Wr).forEach((Jr) => Jr());
    }));
  let Qr = (Kr) => !ss(Kr.parentElement, !0);
  (Array.from(document.querySelectorAll(so().join(",")))
    .filter(Qr)
    .forEach((Kr) => {
      qn(Kr);
    }),
    Oi(document, "alpine:initialized"),
    setTimeout(() => {
      Yu();
    }));
}
var Js = [],
  no = [];
function io() {
  return Js.map((Qr) => Qr());
}
function so() {
  return Js.concat(no).map((Qr) => Qr());
}
function ao(Qr) {
  Js.push(Qr);
}
function oo(Qr) {
  no.push(Qr);
}
function ss(Qr, Kr = !1) {
  return Tn(Qr, (Wr) => {
    if ((Kr ? so() : io()).some((Gr) => Wr.matches(Gr))) return !0;
  });
}
function Tn(Qr, Kr) {
  if (Qr) {
    if (Kr(Qr)) return Qr;
    if (Qr._x_teleportBack) return Tn(Qr._x_teleportBack, Kr);
    if (Qr.parentNode instanceof ShadowRoot) return Tn(Qr.parentNode.host, Kr);
    if (Qr.parentElement) return Tn(Qr.parentElement, Kr);
  }
}
function Ju(Qr) {
  return io().some((Kr) => Qr.matches(Kr));
}
var uo = [];
function Gu(Qr) {
  uo.push(Qr);
}
var Zu = 1;
function qn(Qr, Kr = ii, Wr = () => {}) {
  Tn(Qr, (Jr) => Jr._x_ignore) ||
    Uu(() => {
      Kr(Qr, (Jr, Gr) => {
        Jr._x_marker ||
          (Wr(Jr, Gr),
          uo.forEach((Zr) => Zr(Jr, Gr)),
          ns(Jr, Jr.attributes).forEach((Zr) => Zr()),
          Jr._x_ignore || (Jr._x_marker = Zu++),
          Jr._x_ignore && Gr());
      });
    });
}
function fi(Qr, Kr = ii) {
  Kr(Qr, (Wr) => {
    (xu(Wr), ka(Wr), delete Wr._x_marker);
  });
}
function Yu() {
  [
    ["ui", "dialog", ["[x-dialog], [x-popover]"]],
    ["anchor", "anchor", ["[x-anchor]"]],
    ["sort", "sort", ["[x-sort]"]],
  ].forEach(([Kr, Wr, Jr]) => {
    Du(Wr) ||
      Jr.some((Gr) => {
        if (document.querySelector(Gr))
          return (Un(`found "${Gr}", but missing ${Kr} plugin`), !0);
      });
  });
}
var Ns = [],
  Gs = !1;
function Zs(Qr = () => {}) {
  return (
    queueMicrotask(() => {
      Gs ||
        setTimeout(() => {
          Is();
        });
    }),
    new Promise((Kr) => {
      Ns.push(() => {
        (Qr(), Kr());
      });
    })
  );
}
function Is() {
  for (Gs = !1; Ns.length; ) Ns.shift()();
}
function el() {
  Gs = !0;
}
function Ys(Qr, Kr) {
  return Array.isArray(Kr)
    ? ma(Qr, Kr.join(" "))
    : typeof Kr == "object" && Kr !== null
      ? tl(Qr, Kr)
      : typeof Kr == "function"
        ? Ys(Qr, Kr())
        : ma(Qr, Kr);
}
function Ms(Qr) {
  return Qr.split(/\s/).filter(Boolean);
}
function ma(Qr, Kr) {
  let Wr = (Gr) =>
      Ms(Gr)
        .filter((Zr) => !Qr.classList.contains(Zr))
        .filter(Boolean),
    Jr = (Gr) => (
      Qr.classList.add(...Gr),
      () => {
        Qr.classList.remove(...Gr);
      }
    );
  return ((Kr = Kr === !0 ? (Kr = "") : Kr || ""), Jr(Wr(Kr)));
}
function tl(Qr, Kr) {
  let Wr = Object.entries(Kr)
      .flatMap(([Yr, en]) => (en ? Ms(Yr) : !1))
      .filter(Boolean),
    Jr = Object.entries(Kr)
      .flatMap(([Yr, en]) => (en ? !1 : Ms(Yr)))
      .filter(Boolean),
    Gr = [],
    Zr = [];
  return (
    Jr.forEach((Yr) => {
      Qr.classList.contains(Yr) && (Qr.classList.remove(Yr), Zr.push(Yr));
    }),
    Wr.forEach((Yr) => {
      Qr.classList.contains(Yr) || (Qr.classList.add(Yr), Gr.push(Yr));
    }),
    () => {
      (Zr.forEach((Yr) => Qr.classList.add(Yr)),
        Gr.forEach((Yr) => Qr.classList.remove(Yr)));
    }
  );
}
function as(Qr, Kr) {
  return typeof Kr == "object" && Kr !== null ? rl(Qr, Kr) : nl(Qr, Kr);
}
function rl(Qr, Kr) {
  let Wr = {};
  return (
    Object.entries(Kr).forEach(([Jr, Gr]) => {
      ((Wr[Jr] = Qr.style[Jr]),
        Jr.startsWith("--") || (Jr = il(Jr)),
        Qr.style.setProperty(Jr, Gr));
    }),
    setTimeout(() => {
      Qr.style.length === 0 && Qr.removeAttribute("style");
    }),
    () => {
      as(Qr, Wr);
    }
  );
}
function nl(Qr, Kr) {
  let Wr = Qr.getAttribute("style", Kr);
  return (
    Qr.setAttribute("style", Kr),
    () => {
      Qr.setAttribute("style", Wr || "");
    }
  );
}
function il(Qr) {
  return Qr.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function Ls(Qr, Kr = () => {}) {
  let Wr = !1;
  return function () {
    Wr ? Kr.apply(this, arguments) : ((Wr = !0), Qr.apply(this, arguments));
  };
}
mn(
  "transition",
  (Qr, { value: Kr, modifiers: Wr, expression: Jr }, { evaluate: Gr }) => {
    (typeof Jr == "function" && (Jr = Gr(Jr)),
      Jr !== !1 &&
        (!Jr || typeof Jr == "boolean" ? al(Qr, Wr, Kr) : sl(Qr, Jr, Kr)));
  },
);
function sl(Qr, Kr, Wr) {
  (lo(Qr, Ys, ""),
    {
      enter: (Gr) => {
        Qr._x_transition.enter.during = Gr;
      },
      "enter-start": (Gr) => {
        Qr._x_transition.enter.start = Gr;
      },
      "enter-end": (Gr) => {
        Qr._x_transition.enter.end = Gr;
      },
      leave: (Gr) => {
        Qr._x_transition.leave.during = Gr;
      },
      "leave-start": (Gr) => {
        Qr._x_transition.leave.start = Gr;
      },
      "leave-end": (Gr) => {
        Qr._x_transition.leave.end = Gr;
      },
    }[Wr](Kr));
}
function al(Qr, Kr, Wr) {
  lo(Qr, as);
  let Jr = !Kr.includes("in") && !Kr.includes("out") && !Wr,
    Gr = Jr || Kr.includes("in") || ["enter"].includes(Wr),
    Zr = Jr || Kr.includes("out") || ["leave"].includes(Wr);
  (Kr.includes("in") &&
    !Jr &&
    (Kr = Kr.filter((ln, vn) => vn < Kr.indexOf("out"))),
    Kr.includes("out") &&
      !Jr &&
      (Kr = Kr.filter((ln, vn) => vn > Kr.indexOf("out"))));
  let Yr = !Kr.includes("opacity") && !Kr.includes("scale"),
    en = Yr || Kr.includes("opacity"),
    tn = Yr || Kr.includes("scale"),
    rn = en ? 0 : 1,
    nn = tn ? wi(Kr, "scale", 95) / 100 : 1,
    sn = wi(Kr, "delay", 0) / 1e3,
    an = wi(Kr, "origin", "center"),
    fn = "opacity, transform",
    pn = wi(Kr, "duration", 150) / 1e3,
    un = wi(Kr, "duration", 75) / 1e3,
    on = "cubic-bezier(0.4, 0.0, 0.2, 1)";
  (Gr &&
    ((Qr._x_transition.enter.during = {
      transformOrigin: an,
      transitionDelay: `${sn}s`,
      transitionProperty: fn,
      transitionDuration: `${pn}s`,
      transitionTimingFunction: on,
    }),
    (Qr._x_transition.enter.start = { opacity: rn, transform: `scale(${nn})` }),
    (Qr._x_transition.enter.end = { opacity: 1, transform: "scale(1)" })),
    Zr &&
      ((Qr._x_transition.leave.during = {
        transformOrigin: an,
        transitionDelay: `${sn}s`,
        transitionProperty: fn,
        transitionDuration: `${un}s`,
        transitionTimingFunction: on,
      }),
      (Qr._x_transition.leave.start = { opacity: 1, transform: "scale(1)" }),
      (Qr._x_transition.leave.end = {
        opacity: rn,
        transform: `scale(${nn})`,
      })));
}
function lo(Qr, Kr, Wr = {}) {
  Qr._x_transition ||
    (Qr._x_transition = {
      enter: { during: Wr, start: Wr, end: Wr },
      leave: { during: Wr, start: Wr, end: Wr },
      in(Jr = () => {}, Gr = () => {}) {
        Ps(
          Qr,
          Kr,
          {
            during: this.enter.during,
            start: this.enter.start,
            end: this.enter.end,
          },
          Jr,
          Gr,
        );
      },
      out(Jr = () => {}, Gr = () => {}) {
        Ps(
          Qr,
          Kr,
          {
            during: this.leave.during,
            start: this.leave.start,
            end: this.leave.end,
          },
          Jr,
          Gr,
        );
      },
    });
}
window.Element.prototype._x_toggleAndCascadeWithTransitions = function (
  Qr,
  Kr,
  Wr,
  Jr,
) {
  let Gr =
      document.visibilityState === "visible"
        ? requestAnimationFrame
        : setTimeout,
    Zr = () => Gr(Wr);
  if (Kr) {
    Qr._x_transition && (Qr._x_transition.enter || Qr._x_transition.leave)
      ? Qr._x_transition.enter &&
        (Object.entries(Qr._x_transition.enter.during).length ||
          Object.entries(Qr._x_transition.enter.start).length ||
          Object.entries(Qr._x_transition.enter.end).length)
        ? Qr._x_transition.in(Wr)
        : Zr()
      : Qr._x_transition
        ? Qr._x_transition.in(Wr)
        : Zr();
    return;
  }
  ((Qr._x_hidePromise = Qr._x_transition
    ? new Promise((Yr, en) => {
        (Qr._x_transition.out(
          () => {},
          () => Yr(Jr),
        ),
          Qr._x_transitioning &&
            Qr._x_transitioning.beforeCancel(() =>
              en({ isFromCancelledTransition: !0 }),
            ));
      })
    : Promise.resolve(Jr)),
    queueMicrotask(() => {
      let Yr = fo(Qr);
      Yr
        ? (Yr._x_hideChildren || (Yr._x_hideChildren = []),
          Yr._x_hideChildren.push(Qr))
        : Gr(() => {
            let en = (tn) => {
              let rn = Promise.all([
                tn._x_hidePromise,
                ...(tn._x_hideChildren || []).map(en),
              ]).then(([nn]) => nn?.());
              return (delete tn._x_hidePromise, delete tn._x_hideChildren, rn);
            };
            en(Qr).catch((tn) => {
              if (!tn.isFromCancelledTransition) throw tn;
            });
          });
    }));
};
function fo(Qr) {
  let Kr = Qr.parentNode;
  if (Kr) return Kr._x_hidePromise ? Kr : fo(Kr);
}
function Ps(
  Qr,
  Kr,
  { during: Wr, start: Jr, end: Gr } = {},
  Zr = () => {},
  Yr = () => {},
) {
  if (
    (Qr._x_transitioning && Qr._x_transitioning.cancel(),
    Object.keys(Wr).length === 0 &&
      Object.keys(Jr).length === 0 &&
      Object.keys(Gr).length === 0)
  ) {
    (Zr(), Yr());
    return;
  }
  let en, tn, rn;
  ol(Qr, {
    start() {
      en = Kr(Qr, Jr);
    },
    during() {
      tn = Kr(Qr, Wr);
    },
    before: Zr,
    end() {
      (en(), (rn = Kr(Qr, Gr)));
    },
    after: Yr,
    cleanup() {
      (tn(), rn());
    },
  });
}
function ol(Qr, Kr) {
  let Wr,
    Jr,
    Gr,
    Zr = Ls(() => {
      gn(() => {
        ((Wr = !0),
          Jr || Kr.before(),
          Gr || (Kr.end(), Is()),
          Kr.after(),
          Qr.isConnected && Kr.cleanup(),
          delete Qr._x_transitioning);
      });
    });
  ((Qr._x_transitioning = {
    beforeCancels: [],
    beforeCancel(Yr) {
      this.beforeCancels.push(Yr);
    },
    cancel: Ls(function () {
      for (; this.beforeCancels.length; ) this.beforeCancels.shift()();
      Zr();
    }),
    finish: Zr,
  }),
    gn(() => {
      (Kr.start(), Kr.during());
    }),
    el(),
    requestAnimationFrame(() => {
      if (Wr) return;
      let Yr =
          Number(
            getComputedStyle(Qr)
              .transitionDuration.replace(/,.*/, "")
              .replace("s", ""),
          ) * 1e3,
        en =
          Number(
            getComputedStyle(Qr)
              .transitionDelay.replace(/,.*/, "")
              .replace("s", ""),
          ) * 1e3;
      (Yr === 0 &&
        (Yr =
          Number(getComputedStyle(Qr).animationDuration.replace("s", "")) *
          1e3),
        gn(() => {
          Kr.before();
        }),
        (Jr = !0),
        requestAnimationFrame(() => {
          Wr ||
            (gn(() => {
              Kr.end();
            }),
            Is(),
            setTimeout(Qr._x_transitioning.finish, Yr + en),
            (Gr = !0));
        }));
    }));
}
function wi(Qr, Kr, Wr) {
  if (Qr.indexOf(Kr) === -1) return Wr;
  let Jr = Qr[Qr.indexOf(Kr) + 1];
  if (!Jr || (Kr === "scale" && isNaN(Jr))) return Wr;
  if (Kr === "duration" || Kr === "delay") {
    let Gr = Jr.match(/([0-9]+)ms/);
    if (Gr) return Gr[1];
  }
  return Kr === "origin" &&
    ["top", "right", "left", "center", "bottom"].includes(
      Qr[Qr.indexOf(Kr) + 2],
    )
    ? [Jr, Qr[Qr.indexOf(Kr) + 2]].join(" ")
    : Jr;
}
function co(Qr, Kr, Wr, Jr = []) {
  switch (
    (Qr._x_bindings || (Qr._x_bindings = yi({})),
    (Qr._x_bindings[Kr] = Wr),
    (Kr = Jr.includes("camel") ? vl(Kr) : Kr),
    Kr)
  ) {
    case "value":
      ul(Qr, Wr);
      break;
    case "style":
      fl(Qr, Wr);
      break;
    case "class":
      ll(Qr, Wr);
      break;
    case "selected":
    case "checked":
      cl(Qr, Kr, Wr);
      break;
    default:
      ea(Qr, Kr, Wr);
      break;
  }
}
function ul(Qr, Kr) {
  if (ta(Qr)) Qr.attributes.value === void 0 && (Qr.value = Kr);
  else if (Gi(Qr))
    Number.isInteger(Kr)
      ? (Qr.value = Kr)
      : !Array.isArray(Kr) &&
          typeof Kr != "boolean" &&
          ![null, void 0].includes(Kr)
        ? (Qr.value = String(Kr))
        : Array.isArray(Kr)
          ? (Qr.checked = Kr.some((Wr) => gl(Wr, Qr.value)))
          : (Qr.checked = !!Kr);
  else if (Qr.tagName === "SELECT") pl(Qr, Kr);
  else if (Qr.tagName === "OPTION") ea(Qr, "value", Kr);
  else {
    if (Qr.value === Kr && (typeof Kr != "object" || Kr === null)) return;
    Qr.value = Kr === void 0 ? "" : Kr;
  }
}
function ll(Qr, Kr) {
  (Qr._x_undoAddedClasses && Qr._x_undoAddedClasses(),
    (Qr._x_undoAddedClasses = Ys(Qr, Kr)));
}
function fl(Qr, Kr) {
  (Qr._x_undoAddedStyles && Qr._x_undoAddedStyles(),
    (Qr._x_undoAddedStyles = as(Qr, Kr)));
}
function cl(Qr, Kr, Wr) {
  (ea(Qr, Kr, Wr), dl(Qr, Kr, Wr));
}
function ea(Qr, Kr, Wr) {
  [null, void 0, !1].includes(Wr) && yl(Kr)
    ? Qr.removeAttribute(Kr)
    : (ho(Kr) && (Wr = Kr),
      xl(Wr) && (Wr = JSON.stringify(Wr)),
      hl(Qr, Kr, Wr));
}
function hl(Qr, Kr, Wr) {
  Qr.getAttribute(Kr) != Wr && Qr.setAttribute(Kr, Wr);
}
function dl(Qr, Kr, Wr) {
  Qr[Kr] !== Wr && (Qr[Kr] = Wr);
}
function pl(Qr, Kr) {
  let Wr = [].concat(Kr).map((Jr) => Jr + "");
  Array.from(Qr.options).forEach((Jr) => {
    Jr.selected = Wr.includes(Jr.value);
  });
}
function vl(Qr) {
  return Qr.toLowerCase().replace(/-(\w)/g, (Kr, Wr) => Wr.toUpperCase());
}
function gl(Qr, Kr) {
  return Qr == Kr;
}
function zi(Qr) {
  return [1, "1", "true", "on", "yes", !0].includes(Qr)
    ? !0
    : [0, "0", "false", "off", "no", !1].includes(Qr)
      ? !1
      : Qr
        ? !!Qr
        : null;
}
var ml = new Set([
  "allowfullscreen",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "formnovalidate",
  "inert",
  "ismap",
  "itemscope",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "selected",
  "shadowrootclonable",
  "shadowrootdelegatesfocus",
  "shadowrootserializable",
]);
function ho(Qr) {
  return ml.has(Qr);
}
function yl(Qr) {
  return ![
    "aria-pressed",
    "aria-checked",
    "aria-expanded",
    "aria-selected",
  ].includes(Qr);
}
function xl(Qr) {
  return typeof Qr == "object" && Qr !== null;
}
function bl(Qr, Kr, Wr) {
  return Qr._x_bindings && Qr._x_bindings[Kr] !== void 0
    ? Qr._x_bindings[Kr]
    : po(Qr, Kr, Wr);
}
function _l(Qr, Kr, Wr, Jr = !0) {
  if (Qr._x_bindings && Qr._x_bindings[Kr] !== void 0)
    return Qr._x_bindings[Kr];
  if (Qr._x_inlineBindings && Qr._x_inlineBindings[Kr] !== void 0) {
    let Gr = Qr._x_inlineBindings[Kr];
    return ((Gr.extract = Jr), Fa(() => ti(Qr, Gr.expression)));
  }
  return po(Qr, Kr, Wr);
}
function po(Qr, Kr, Wr) {
  let Jr = Qr.getAttribute(Kr);
  return Jr === null
    ? typeof Wr == "function"
      ? Wr()
      : Wr
    : Jr === ""
      ? !0
      : ho(Kr)
        ? !![Kr, "true"].includes(Jr)
        : Jr;
}
function Gi(Qr) {
  return (
    Qr.type === "checkbox" ||
    Qr.localName === "ui-checkbox" ||
    Qr.localName === "ui-switch"
  );
}
function ta(Qr) {
  return Qr.type === "radio" || Qr.localName === "ui-radio";
}
function vo(Qr, Kr) {
  let Wr;
  return function () {
    let Jr = this,
      Gr = arguments,
      Zr = function () {
        ((Wr = null), Qr.apply(Jr, Gr));
      };
    (clearTimeout(Wr), (Wr = setTimeout(Zr, Kr)));
  };
}
function go(Qr, Kr) {
  let Wr;
  return function () {
    let Jr = this,
      Gr = arguments;
    Wr || (Qr.apply(Jr, Gr), (Wr = !0), setTimeout(() => (Wr = !1), Kr));
  };
}
function mo({ get: Qr, set: Kr }, { get: Wr, set: Jr }) {
  let Gr = !0,
    Zr,
    Yr,
    en = li(() => {
      let tn = Qr(),
        rn = Wr();
      if (Gr) (Jr(ps(tn)), (Gr = !1));
      else {
        let nn = JSON.stringify(tn),
          sn = JSON.stringify(rn);
        nn !== Zr ? Jr(ps(tn)) : nn !== sn && Kr(ps(rn));
      }
      ((Zr = JSON.stringify(Qr())), (Yr = JSON.stringify(Wr())));
    });
  return () => {
    (Fs(en), xi(en));
  };
}
function ps(Qr) {
  return typeof Qr == "object" ? JSON.parse(JSON.stringify(Qr)) : Qr;
}
function wl(Qr) {
  (Array.isArray(Qr) ? Qr : [Qr]).forEach((Wr) => Wr(_i));
}
var Fn = {},
  ya = !1;
function El(Qr, Kr) {
  if ((ya || ((Fn = yi(Fn)), (ya = !0)), Kr === void 0)) return Fn[Qr];
  ((Fn[Qr] = Kr),
    typeof Kr == "object" && Kr !== null && Kr._x_interceptor
      ? (Fn[Qr] = Kr.initialize(Fn, Qr, Qr, () => {}))
      : Xs(Fn[Qr]),
    typeof Kr == "object" &&
      Kr !== null &&
      Kr.hasOwnProperty("init") &&
      typeof Kr.init == "function" &&
      Fn[Qr].init());
}
function Sl() {
  return Fn;
}
var yo = {};
function Ol(Qr, Kr) {
  let Wr = typeof Kr != "function" ? () => Kr : Kr;
  return Qr instanceof Element ? xo(Qr, Wr()) : ((yo[Qr] = Wr), () => {});
}
function Al(Qr) {
  return (
    Object.entries(yo).forEach(([Kr, Wr]) => {
      Object.defineProperty(Qr, Kr, {
        get() {
          return (...Jr) => Wr(...Jr);
        },
      });
    }),
    Qr
  );
}
function xo(Qr, Kr, Wr) {
  let Jr = [];
  for (; Jr.length; ) Jr.pop()();
  let Gr = Object.entries(Kr).map(([Yr, en]) => ({ name: Yr, value: en })),
    Zr = Va(Gr);
  return (
    (Gr = Gr.map((Yr) =>
      Zr.find((en) => en.name === Yr.name)
        ? { name: `x-bind:${Yr.name}`, value: `"${Yr.value}"` }
        : Yr,
    )),
    ns(Qr, Gr, Wr).map((Yr) => {
      (Jr.push(Yr.runCleanups), Yr());
    }),
    () => {
      for (; Jr.length; ) Jr.pop()();
    }
  );
}
var bo = {};
function Tl(Qr, Kr) {
  bo[Qr] = Kr;
}
function Cl(Qr, Kr) {
  return (
    Object.entries(bo).forEach(([Wr, Jr]) => {
      Object.defineProperty(Qr, Wr, {
        get() {
          return (...Gr) => Jr.bind(Kr)(...Gr);
        },
        enumerable: !1,
      });
    }),
    Qr
  );
}
var Rl = {
    get reactive() {
      return yi;
    },
    get release() {
      return xi;
    },
    get effect() {
      return li;
    },
    get raw() {
      return Ca;
    },
    get transaction() {
      return mu;
    },
    version: "3.17.4",
    flushAndStopDeferringMutations: Eu,
    dontAutoEvaluateFunctions: Fa,
    disableEffectScheduling: pu,
    startObservingMutations: Vs,
    stopObservingMutations: Da,
    setReactivityEngine: vu,
    onAttributeRemoved: Pa,
    onAttributesAdded: La,
    closestDataStack: mi,
    skipDuringClone: Qn,
    onlyDuringClone: $u,
    addRootSelector: ao,
    addInitSelector: oo,
    setErrorHandler: Ru,
    interceptClone: Di,
    addScopeToNode: ki,
    deferMutations: wu,
    mapAttributes: Ws,
    evaluateLater: bn,
    interceptInit: Gu,
    initInterceptors: Xs,
    injectMagics: Wi,
    setEvaluator: Iu,
    setRawEvaluator: Mu,
    mergeProxies: ni,
    extractProp: _l,
    findClosest: Tn,
    onElRemoved: Bs,
    closestRoot: ss,
    destroyTree: fi,
    interceptor: Ha,
    transition: Ps,
    setStyles: as,
    mutateDom: gn,
    deferInit: Vu,
    directive: mn,
    entangle: mo,
    throttle: go,
    debounce: vo,
    evaluate: ti,
    evaluateRaw: Pu,
    initTree: qn,
    nextTick: Zs,
    prefixed: bi,
    prefix: ku,
    plugin: wl,
    magic: Mn,
    store: El,
    start: Wu,
    clone: Bu,
    cloneNode: Fu,
    bound: bl,
    $data: Ua,
    watch: Ra,
    walk: ii,
    data: Tl,
    bind: Ol,
  },
  _i = Rl,
  xa = new WeakMap(),
  _o = new Set();
Object.getOwnPropertyNames(globalThis).forEach((Qr) => {
  if (Qr === "styleMedia" || Qr === "sharedStorage") return;
  let Kr;
  try {
    Kr = globalThis[Qr];
  } catch {
    return;
  }
  _o.add(Kr);
});
var yn = class {
    constructor(Qr, Kr, Wr, Jr) {
      ((this.type = Qr), (this.value = Kr), (this.start = Wr), (this.end = Jr));
    }
  },
  Nl = ["IDENTIFIER", "KEYWORD", "BOOLEAN", "NULL", "UNDEFINED"],
  Il = class {
    constructor(Qr) {
      ((this.input = Qr), (this.position = 0), (this.tokens = []));
    }
    tokenize() {
      for (
        ;
        this.position < this.input.length &&
        (this.skipWhitespace(), !(this.position >= this.input.length));
      ) {
        let Qr = this.input[this.position];
        this.isDigit(Qr)
          ? this.readNumber()
          : this.isAlpha(Qr) || Qr === "_" || Qr === "$"
            ? this.readIdentifierOrKeyword()
            : Qr === '"' || Qr === "'"
              ? this.readString()
              : Qr === "/" && this.peek() === "/"
                ? this.skipLineComment()
                : this.readOperatorOrPunctuation();
      }
      return (
        this.tokens.push(new yn("EOF", null, this.position, this.position)),
        this.tokens
      );
    }
    skipWhitespace() {
      for (
        ;
        this.position < this.input.length &&
        /\s/.test(this.input[this.position]);
      )
        this.position++;
    }
    skipLineComment() {
      for (
        ;
        this.position < this.input.length &&
        this.input[this.position] !==
          `
`;
      )
        this.position++;
    }
    isDigit(Qr) {
      return /[0-9]/.test(Qr);
    }
    isAlpha(Qr) {
      return /[a-zA-Z]/.test(Qr);
    }
    isAlphaNumeric(Qr) {
      return /[a-zA-Z0-9_$]/.test(Qr);
    }
    peek(Qr = 1) {
      return this.input[this.position + Qr] || "";
    }
    readNumber() {
      let Qr = this.position,
        Kr = !1;
      for (; this.position < this.input.length; ) {
        let Jr = this.input[this.position];
        if (this.isDigit(Jr)) this.position++;
        else if (Jr === "." && !Kr) ((Kr = !0), this.position++);
        else break;
      }
      let Wr = this.input.slice(Qr, this.position);
      this.tokens.push(new yn("NUMBER", parseFloat(Wr), Qr, this.position));
    }
    readIdentifierOrKeyword() {
      let Qr = this.position;
      for (
        ;
        this.position < this.input.length &&
        this.isAlphaNumeric(this.input[this.position]);
      )
        this.position++;
      let Kr = this.input.slice(Qr, this.position);
      [
        "true",
        "false",
        "null",
        "undefined",
        "new",
        "typeof",
        "void",
        "delete",
        "in",
        "instanceof",
      ].includes(Kr)
        ? Kr === "true" || Kr === "false"
          ? this.tokens.push(
              new yn("BOOLEAN", Kr === "true", Qr, this.position),
            )
          : Kr === "null"
            ? this.tokens.push(new yn("NULL", null, Qr, this.position))
            : Kr === "undefined"
              ? this.tokens.push(new yn("UNDEFINED", void 0, Qr, this.position))
              : this.tokens.push(new yn("KEYWORD", Kr, Qr, this.position))
        : this.tokens.push(new yn("IDENTIFIER", Kr, Qr, this.position));
    }
    readString() {
      let Qr = this.position,
        Kr = this.input[this.position];
      this.position++;
      let Wr = "",
        Jr = !1;
      for (; this.position < this.input.length; ) {
        let Gr = this.input[this.position];
        if (Jr) {
          switch (Gr) {
            case "n":
              Wr += `
`;
              break;
            case "t":
              Wr += "	";
              break;
            case "r":
              Wr += "\r";
              break;
            case "\\":
              Wr += "\\";
              break;
            case Kr:
              Wr += Kr;
              break;
            case "u": {
              let Zr = this.input.slice(this.position + 1, this.position + 5);
              /^[0-9a-fA-F]{4}$/.test(Zr)
                ? ((Wr += String.fromCharCode(parseInt(Zr, 16))),
                  (this.position += 4))
                : (Wr += Gr);
              break;
            }
            default:
              Wr += Gr;
          }
          Jr = !1;
        } else if (Gr === "\\") Jr = !0;
        else if (Gr === Kr) {
          (this.position++,
            this.tokens.push(new yn("STRING", Wr, Qr, this.position)));
          return;
        } else Wr += Gr;
        this.position++;
      }
      throw new Error(`Unterminated string starting at position ${Qr}`);
    }
    readOperatorOrPunctuation() {
      let Qr = this.position,
        Kr = this.input[this.position],
        Wr = this.peek(),
        Jr = this.peek(2);
      if (Kr === "=" && Wr === "=" && Jr === "=")
        ((this.position += 3),
          this.tokens.push(new yn("OPERATOR", "===", Qr, this.position)));
      else if (Kr === "!" && Wr === "=" && Jr === "=")
        ((this.position += 3),
          this.tokens.push(new yn("OPERATOR", "!==", Qr, this.position)));
      else if (Kr === "=" && Wr === "=")
        ((this.position += 2),
          this.tokens.push(new yn("OPERATOR", "==", Qr, this.position)));
      else if (Kr === "!" && Wr === "=")
        ((this.position += 2),
          this.tokens.push(new yn("OPERATOR", "!=", Qr, this.position)));
      else if (Kr === "<" && Wr === "=")
        ((this.position += 2),
          this.tokens.push(new yn("OPERATOR", "<=", Qr, this.position)));
      else if (Kr === ">" && Wr === "=")
        ((this.position += 2),
          this.tokens.push(new yn("OPERATOR", ">=", Qr, this.position)));
      else if (Kr === "&" && Wr === "&")
        ((this.position += 2),
          this.tokens.push(new yn("OPERATOR", "&&", Qr, this.position)));
      else if (Kr === "|" && Wr === "|")
        ((this.position += 2),
          this.tokens.push(new yn("OPERATOR", "||", Qr, this.position)));
      else if (Kr === "+" && Wr === "+")
        ((this.position += 2),
          this.tokens.push(new yn("OPERATOR", "++", Qr, this.position)));
      else if (Kr === "-" && Wr === "-")
        ((this.position += 2),
          this.tokens.push(new yn("OPERATOR", "--", Qr, this.position)));
      else {
        this.position++;
        let Gr = "()[]{},.;:?".includes(Kr) ? "PUNCTUATION" : "OPERATOR";
        this.tokens.push(new yn(Gr, Kr, Qr, this.position));
      }
    }
  },
  Ml = class {
    constructor(Qr) {
      ((this.tokens = Qr), (this.position = 0));
    }
    parse() {
      if (this.isAtEnd()) throw new Error("Empty expression");
      let Qr = this.parseExpression();
      if ((this.match("PUNCTUATION", ";"), !this.isAtEnd()))
        throw new Error(`Unexpected token: ${this.current().value}`);
      return Qr;
    }
    parseExpression() {
      return this.parseAssignment();
    }
    parseAssignment() {
      let Qr = this.parseTernary();
      if (this.match("OPERATOR", "=")) {
        let Kr = this.parseAssignment();
        if (Qr.type === "Identifier" || Qr.type === "MemberExpression")
          return {
            type: "AssignmentExpression",
            left: Qr,
            operator: "=",
            right: Kr,
          };
        throw new Error("Invalid assignment target");
      }
      return Qr;
    }
    parseTernary() {
      let Qr = this.parseLogicalOr();
      if (this.match("PUNCTUATION", "?")) {
        let Kr = this.parseExpression();
        this.consume("PUNCTUATION", ":");
        let Wr = this.parseExpression();
        return {
          type: "ConditionalExpression",
          test: Qr,
          consequent: Kr,
          alternate: Wr,
        };
      }
      return Qr;
    }
    parseLogicalOr() {
      let Qr = this.parseLogicalAnd();
      for (; this.match("OPERATOR", "||"); ) {
        let Kr = this.previous().value,
          Wr = this.parseLogicalAnd();
        Qr = { type: "BinaryExpression", operator: Kr, left: Qr, right: Wr };
      }
      return Qr;
    }
    parseLogicalAnd() {
      let Qr = this.parseEquality();
      for (; this.match("OPERATOR", "&&"); ) {
        let Kr = this.previous().value,
          Wr = this.parseEquality();
        Qr = { type: "BinaryExpression", operator: Kr, left: Qr, right: Wr };
      }
      return Qr;
    }
    parseEquality() {
      let Qr = this.parseRelational();
      for (; this.match("OPERATOR", "==", "!=", "===", "!=="); ) {
        let Kr = this.previous().value,
          Wr = this.parseRelational();
        Qr = { type: "BinaryExpression", operator: Kr, left: Qr, right: Wr };
      }
      return Qr;
    }
    parseRelational() {
      let Qr = this.parseAdditive();
      for (; this.match("OPERATOR", "<", ">", "<=", ">="); ) {
        let Kr = this.previous().value,
          Wr = this.parseAdditive();
        Qr = { type: "BinaryExpression", operator: Kr, left: Qr, right: Wr };
      }
      return Qr;
    }
    parseAdditive() {
      let Qr = this.parseMultiplicative();
      for (; this.match("OPERATOR", "+", "-"); ) {
        let Kr = this.previous().value,
          Wr = this.parseMultiplicative();
        Qr = { type: "BinaryExpression", operator: Kr, left: Qr, right: Wr };
      }
      return Qr;
    }
    parseMultiplicative() {
      let Qr = this.parseUnary();
      for (; this.match("OPERATOR", "*", "/", "%"); ) {
        let Kr = this.previous().value,
          Wr = this.parseUnary();
        Qr = { type: "BinaryExpression", operator: Kr, left: Qr, right: Wr };
      }
      return Qr;
    }
    parseUnary() {
      if (this.match("OPERATOR", "++", "--")) {
        let Qr = this.previous().value,
          Kr = this.parseUnary();
        return {
          type: "UpdateExpression",
          operator: Qr,
          argument: Kr,
          prefix: !0,
        };
      }
      if (this.match("OPERATOR", "!", "-", "+")) {
        let Qr = this.previous().value,
          Kr = this.parseUnary();
        return {
          type: "UnaryExpression",
          operator: Qr,
          argument: Kr,
          prefix: !0,
        };
      }
      return this.parsePostfix();
    }
    parsePostfix() {
      let Qr = this.parseMember();
      return this.match("OPERATOR", "++", "--")
        ? {
            type: "UpdateExpression",
            operator: this.previous().value,
            argument: Qr,
            prefix: !1,
          }
        : Qr;
    }
    parseMember() {
      let Qr = this.parsePrimary();
      for (;;)
        if (this.match("PUNCTUATION", ".")) {
          let Kr = this.consumeIdentifierName();
          Qr = {
            type: "MemberExpression",
            object: Qr,
            property: { type: "Identifier", name: Kr },
            computed: !1,
          };
        } else if (this.match("PUNCTUATION", "[")) {
          let Kr = this.parseExpression();
          (this.consume("PUNCTUATION", "]"),
            (Qr = {
              type: "MemberExpression",
              object: Qr,
              property: Kr,
              computed: !0,
            }));
        } else if (this.match("PUNCTUATION", "(")) {
          let Kr = this.parseArguments();
          Qr = { type: "CallExpression", callee: Qr, arguments: Kr };
        } else break;
      return Qr;
    }
    parseArguments() {
      let Qr = [];
      if (!this.check("PUNCTUATION", ")"))
        do Qr.push(this.parseExpression());
        while (this.match("PUNCTUATION", ","));
      return (this.consume("PUNCTUATION", ")"), Qr);
    }
    parsePrimary() {
      if (this.match("NUMBER"))
        return { type: "Literal", value: this.previous().value };
      if (this.match("STRING"))
        return { type: "Literal", value: this.previous().value };
      if (this.match("BOOLEAN"))
        return { type: "Literal", value: this.previous().value };
      if (this.match("NULL")) return { type: "Literal", value: null };
      if (this.match("UNDEFINED")) return { type: "Literal", value: void 0 };
      if (this.match("IDENTIFIER"))
        return { type: "Identifier", name: this.previous().value };
      if (this.match("PUNCTUATION", "(")) {
        let Qr = this.parseExpression();
        return (this.consume("PUNCTUATION", ")"), Qr);
      }
      if (this.match("PUNCTUATION", "[")) return this.parseArrayLiteral();
      if (this.match("PUNCTUATION", "{")) return this.parseObjectLiteral();
      throw new Error(
        `Unexpected token: ${this.current().type} "${this.current().value}"`,
      );
    }
    parseArrayLiteral() {
      let Qr = [];
      for (
        ;
        !this.check("PUNCTUATION", "]") &&
        !this.isAtEnd() &&
        (Qr.push(this.parseExpression()), this.match("PUNCTUATION", ","));
      )
        if (this.check("PUNCTUATION", "]")) break;
      return (
        this.consume("PUNCTUATION", "]"),
        { type: "ArrayExpression", elements: Qr }
      );
    }
    parseObjectLiteral() {
      let Qr = [];
      for (; !this.check("PUNCTUATION", "}") && !this.isAtEnd(); ) {
        let Kr,
          Wr = !1;
        if (this.match("STRING"))
          Kr = { type: "Literal", value: this.previous().value };
        else if (this.checkIdentifierName())
          Kr = { type: "Identifier", name: this.consumeIdentifierName() };
        else if (this.match("PUNCTUATION", "["))
          ((Kr = this.parseExpression()),
            (Wr = !0),
            this.consume("PUNCTUATION", "]"));
        else throw new Error("Expected property key");
        this.consume("PUNCTUATION", ":");
        let Jr = this.parseExpression();
        if (
          (Qr.push({
            type: "Property",
            key: Kr,
            value: Jr,
            computed: Wr,
            shorthand: !1,
          }),
          this.match("PUNCTUATION", ","))
        ) {
          if (this.check("PUNCTUATION", "}")) break;
        } else break;
      }
      return (
        this.consume("PUNCTUATION", "}"),
        { type: "ObjectExpression", properties: Qr }
      );
    }
    match(...Qr) {
      for (let Kr = 0; Kr < Qr.length; Kr++) {
        let Wr = Qr[Kr];
        if (Kr === 0 && Qr.length > 1) {
          let Jr = Wr;
          for (let Gr = 1; Gr < Qr.length; Gr++)
            if (this.check(Jr, Qr[Gr])) return (this.advance(), !0);
          return !1;
        } else if (Qr.length === 1)
          return this.checkType(Wr) ? (this.advance(), !0) : !1;
      }
      return !1;
    }
    check(Qr, Kr) {
      return this.isAtEnd()
        ? !1
        : Kr !== void 0
          ? this.current().type === Qr && this.current().value === Kr
          : this.current().type === Qr;
    }
    checkType(Qr) {
      return this.isAtEnd() ? !1 : this.current().type === Qr;
    }
    advance() {
      return (this.isAtEnd() || this.position++, this.previous());
    }
    isAtEnd() {
      return this.current().type === "EOF";
    }
    current() {
      return this.tokens[this.position];
    }
    previous() {
      return this.tokens[this.position - 1];
    }
    consume(Qr, Kr) {
      if (Kr !== void 0) {
        if (this.check(Qr, Kr)) return this.advance();
        throw new Error(
          `Expected ${Qr} "${Kr}" but got ${this.current().type} "${this.current().value}"`,
        );
      }
      if (this.check(Qr)) return this.advance();
      throw new Error(
        `Expected ${Qr} but got ${this.current().type} "${this.current().value}"`,
      );
    }
    checkIdentifierName() {
      return this.isAtEnd() ? !1 : Nl.includes(this.current().type);
    }
    consumeIdentifierName() {
      if (!this.checkIdentifierName())
        throw new Error(
          `Expected an identifier name but got ${this.current().type} "${this.current().value}"`,
        );
      let Qr = this.advance();
      switch (Qr.type) {
        case "BOOLEAN":
          return Qr.value ? "true" : "false";
        case "NULL":
          return "null";
        case "UNDEFINED":
          return "undefined";
        default:
          return Qr.value;
      }
    }
  },
  Ll = class {
    evaluate({
      node: Qr,
      scope: Kr = {},
      context: Wr = null,
      forceBindingRootScopeToFunctions: Jr = !0,
    }) {
      switch (Qr.type) {
        case "Literal":
          return Qr.value;
        case "Identifier":
          if (Qr.name in Kr) {
            let on = Kr[Qr.name];
            return (
              this.checkForDangerousValues(on),
              typeof on == "function" ? on.bind(Kr) : on
            );
          }
          throw new Error(`Undefined variable: ${Qr.name}`);
        case "MemberExpression":
          let Gr = this.evaluate({
            node: Qr.object,
            scope: Kr,
            context: Wr,
            forceBindingRootScopeToFunctions: Jr,
          });
          if (Gr == null)
            throw new Error("Cannot read property of null or undefined");
          let Zr;
          (Qr.computed
            ? (Zr = this.evaluate({
                node: Qr.property,
                scope: Kr,
                context: Wr,
                forceBindingRootScopeToFunctions: Jr,
              }))
            : (Zr = Qr.property.name),
            this.checkForDangerousKeywords(Zr));
          let Yr = Gr[Zr];
          return (
            this.checkForDangerousValues(Yr),
            typeof Yr == "function" ? (Jr ? Yr.bind(Kr) : Yr.bind(Gr)) : Yr
          );
        case "CallExpression":
          let en = Qr.arguments.map((on) =>
              this.evaluate({
                node: on,
                scope: Kr,
                context: Wr,
                forceBindingRootScopeToFunctions: Jr,
              }),
            ),
            tn;
          if (Qr.callee.type === "MemberExpression") {
            let on = this.evaluate({
                node: Qr.callee.object,
                scope: Kr,
                context: Wr,
                forceBindingRootScopeToFunctions: Jr,
              }),
              ln;
            (Qr.callee.computed
              ? (ln = this.evaluate({
                  node: Qr.callee.property,
                  scope: Kr,
                  context: Wr,
                  forceBindingRootScopeToFunctions: Jr,
                }))
              : (ln = Qr.callee.property.name),
              this.checkForDangerousKeywords(ln));
            let vn = on[ln];
            if (typeof vn != "function")
              throw new Error("Value is not a function");
            tn = vn.apply(on, en);
          } else if (Qr.callee.type === "Identifier") {
            let on = Qr.callee.name,
              ln;
            if (on in Kr) ln = Kr[on];
            else throw new Error(`Undefined variable: ${on}`);
            if (typeof ln != "function")
              throw new Error("Value is not a function");
            let vn = Wr !== null ? Wr : Kr;
            tn = ln.apply(vn, en);
          } else {
            let on = this.evaluate({
              node: Qr.callee,
              scope: Kr,
              context: Wr,
              forceBindingRootScopeToFunctions: Jr,
            });
            if (typeof on != "function")
              throw new Error("Value is not a function");
            tn = on.apply(Wr, en);
          }
          return (this.checkForDangerousValues(tn), tn);
        case "UnaryExpression":
          let rn = this.evaluate({
            node: Qr.argument,
            scope: Kr,
            context: Wr,
            forceBindingRootScopeToFunctions: Jr,
          });
          switch (Qr.operator) {
            case "!":
              return !rn;
            case "-":
              return -rn;
            case "+":
              return +rn;
            default:
              throw new Error(`Unknown unary operator: ${Qr.operator}`);
          }
        case "UpdateExpression":
          if (Qr.argument.type === "Identifier") {
            let on = Qr.argument.name;
            if (!(on in Kr)) throw new Error(`Undefined variable: ${on}`);
            let ln = Kr[on];
            return (
              Qr.operator === "++"
                ? (Kr[on] = ln + 1)
                : Qr.operator === "--" && (Kr[on] = ln - 1),
              Qr.prefix ? Kr[on] : ln
            );
          } else if (Qr.argument.type === "MemberExpression") {
            let on = this.evaluate({
                node: Qr.argument.object,
                scope: Kr,
                context: Wr,
                forceBindingRootScopeToFunctions: Jr,
              }),
              ln = Qr.argument.computed
                ? this.evaluate({
                    node: Qr.argument.property,
                    scope: Kr,
                    context: Wr,
                    forceBindingRootScopeToFunctions: Jr,
                  })
                : Qr.argument.property.name;
            if (this.isDOMObject(on))
              throw new Error(
                "Property assignments on DOM objects are prohibited in the CSP build",
              );
            this.checkForDangerousKeywords(ln);
            let vn = on[ln];
            return (
              Qr.operator === "++"
                ? (on[ln] = vn + 1)
                : Qr.operator === "--" && (on[ln] = vn - 1),
              Qr.prefix ? on[ln] : vn
            );
          }
          throw new Error("Invalid update expression target");
        case "BinaryExpression":
          let nn = this.evaluate({
              node: Qr.left,
              scope: Kr,
              context: Wr,
              forceBindingRootScopeToFunctions: Jr,
            }),
            sn = () =>
              this.evaluate({
                node: Qr.right,
                scope: Kr,
                context: Wr,
                forceBindingRootScopeToFunctions: Jr,
              });
          if (Qr.operator === "&&") return nn && sn();
          if (Qr.operator === "||") return nn || sn();
          let an = sn();
          switch (Qr.operator) {
            case "+":
              return nn + an;
            case "-":
              return nn - an;
            case "*":
              return nn * an;
            case "/":
              return nn / an;
            case "%":
              return nn % an;
            case "==":
              return nn == an;
            case "!=":
              return nn != an;
            case "===":
              return nn === an;
            case "!==":
              return nn !== an;
            case "<":
              return nn < an;
            case ">":
              return nn > an;
            case "<=":
              return nn <= an;
            case ">=":
              return nn >= an;
            default:
              throw new Error(`Unknown binary operator: ${Qr.operator}`);
          }
        case "ConditionalExpression":
          return this.evaluate({
            node: Qr.test,
            scope: Kr,
            context: Wr,
            forceBindingRootScopeToFunctions: Jr,
          })
            ? this.evaluate({
                node: Qr.consequent,
                scope: Kr,
                context: Wr,
                forceBindingRootScopeToFunctions: Jr,
              })
            : this.evaluate({
                node: Qr.alternate,
                scope: Kr,
                context: Wr,
                forceBindingRootScopeToFunctions: Jr,
              });
        case "AssignmentExpression":
          let pn = this.evaluate({
            node: Qr.right,
            scope: Kr,
            context: Wr,
            forceBindingRootScopeToFunctions: Jr,
          });
          if (Qr.left.type === "Identifier")
            return ((Kr[Qr.left.name] = pn), pn);
          if (Qr.left.type === "MemberExpression") {
            let on = this.evaluate({
                node: Qr.left.object,
                scope: Kr,
                context: Wr,
                forceBindingRootScopeToFunctions: Jr,
              }),
              ln = Qr.left.computed
                ? this.evaluate({
                    node: Qr.left.property,
                    scope: Kr,
                    context: Wr,
                    forceBindingRootScopeToFunctions: Jr,
                  })
                : Qr.left.property.name;
            if (this.isDOMObject(on))
              throw new Error(
                "Property assignments on DOM objects are prohibited in the CSP build",
              );
            return (this.checkForDangerousKeywords(ln), (on[ln] = pn), pn);
          }
          throw new Error("Invalid assignment target");
        case "ArrayExpression":
          return Qr.elements.map((on) =>
            this.evaluate({
              node: on,
              scope: Kr,
              context: Wr,
              forceBindingRootScopeToFunctions: Jr,
            }),
          );
        case "ObjectExpression":
          let un = {};
          for (let on of Qr.properties) {
            let ln = on.computed
                ? this.evaluate({
                    node: on.key,
                    scope: Kr,
                    context: Wr,
                    forceBindingRootScopeToFunctions: Jr,
                  })
                : on.key.type === "Identifier"
                  ? on.key.name
                  : this.evaluate({
                      node: on.key,
                      scope: Kr,
                      context: Wr,
                      forceBindingRootScopeToFunctions: Jr,
                    }),
              vn = this.evaluate({
                node: on.value,
                scope: Kr,
                context: Wr,
                forceBindingRootScopeToFunctions: Jr,
              });
            un[ln] = vn;
          }
          return un;
        default:
          throw new Error(`Unknown node type: ${Qr.type}`);
      }
    }
    isDOMObject(Qr) {
      if (
        Qr instanceof Node ||
        (typeof CSSStyleDeclaration < "u" &&
          Qr instanceof CSSStyleDeclaration) ||
        (typeof DOMStringMap < "u" && Qr instanceof DOMStringMap) ||
        (typeof DOMTokenList < "u" && Qr instanceof DOMTokenList) ||
        (typeof NamedNodeMap < "u" && Qr instanceof NamedNodeMap)
      )
        return !0;
      let Kr = Qr != null && Qr.constructor;
      return !!(
        Kr &&
        typeof Kr.name == "string" &&
        /^(SVG|CSS|DOM)[A-Z]/.test(Kr.name)
      );
    }
    checkForDangerousKeywords(Qr) {
      if (
        [
          "constructor",
          "prototype",
          "__proto__",
          "__defineGetter__",
          "__defineSetter__",
          "insertAdjacentHTML",
          "insertAdjacentElement",
          "insertAdjacentText",
          "setAttribute",
          "setAttributeNS",
          "setAttributeNode",
          "setAttributeNodeNS",
          "createElement",
          "createElementNS",
          "createDocumentFragment",
          "createContextualFragment",
          "appendChild",
          "insertBefore",
          "replaceChild",
        ].includes(Qr)
      )
        throw new Error(`Accessing "${Qr}" is prohibited in the CSP build`);
    }
    checkForDangerousValues(Qr) {
      if (
        Qr !== null &&
        !(typeof Qr != "object" && typeof Qr != "function") &&
        !xa.has(Qr)
      ) {
        if (
          Qr instanceof HTMLIFrameElement ||
          Qr instanceof HTMLScriptElement ||
          (typeof SVGScriptElement < "u" && Qr instanceof SVGScriptElement)
        )
          throw new Error(
            "Accessing iframes and scripts is prohibited in the CSP build",
          );
        if (typeof Document < "u" && Qr instanceof Document)
          throw new Error(
            "Accessing document objects is prohibited in the CSP build",
          );
        if (_o.has(Qr))
          throw new Error(
            "Accessing global variables is prohibited in the CSP build",
          );
        return (xa.set(Qr, !0), !0);
      }
    }
  };
function wo(Qr) {
  try {
    let Wr = new Il(Qr).tokenize(),
      Gr = new Ml(Wr).parse(),
      Zr = new Ll();
    return function (Yr = {}) {
      let {
        scope: en = {},
        context: tn = null,
        forceBindingRootScopeToFunctions: rn = !1,
      } = Yr;
      return Zr.evaluate({
        node: Gr,
        scope: en,
        context: tn,
        forceBindingRootScopeToFunctions: rn,
      });
    };
  } catch (Kr) {
    throw new Error(`CSP Parser Error: ${Kr.message}`);
  }
}
function Pl(Qr, Kr, Wr = {}) {
  let Jr = Eo(Qr),
    Gr = ni([Wr.scope ?? {}, ...Jr]),
    Zr = Wr.params ?? [],
    en = wo(Kr)({ scope: Gr, forceBindingRootScopeToFunctions: !0 });
  return typeof en == "function" && ei ? en.apply(Gr, Zr) : en;
}
function kl(Qr, Kr) {
  let Wr = Eo(Qr);
  if (typeof Kr == "function") return Lu(Wr, Kr);
  let Jr = Dl(Qr, Kr, Wr);
  return Cu.bind(null, Qr, Kr, Jr);
}
function Eo(Qr) {
  let Kr = {};
  return (Wi(Kr, Qr), [Kr, ...mi(Qr)]);
}
function Dl(Qr, Kr, Wr) {
  if (Qr instanceof HTMLIFrameElement)
    throw new Error(
      "Evaluating expressions on an iframe is prohibited in the CSP build",
    );
  if (Qr instanceof HTMLScriptElement)
    throw new Error(
      "Evaluating expressions on a script is prohibited in the CSP build",
    );
  return (Jr = () => {}, { scope: Gr = {}, params: Zr = [] } = {}) => {
    let Yr = ni([Gr, ...Wr]),
      tn = wo(Kr)({ scope: Yr, forceBindingRootScopeToFunctions: !0 });
    if (ei && typeof tn == "function") {
      let rn = tn.apply(tn, Zr);
      rn instanceof Promise ? rn.then((nn) => Jr(nn)) : Jr(rn);
    } else
      typeof tn == "object" && tn instanceof Promise
        ? tn.then((rn) => Jr(rn))
        : Jr(tn);
  };
}
function So(Qr) {
  let Kr = Object.create(null);
  for (let Wr of Qr.split(",")) Kr[Wr] = 1;
  return (Wr) => Wr in Kr;
}
var Hf = Object.freeze({}),
  jf = Object.freeze([]),
  Ni = Object.assign,
  Ul = Object.prototype.hasOwnProperty,
  ks = (Qr, Kr) => Ul.call(Qr, Kr),
  Ii = Array.isArray,
  Ai = (Qr) => Oo(Qr) === "[object Map]",
  ql = (Qr) => typeof Qr == "string",
  Ui = (Qr) => typeof Qr == "symbol",
  Mi = (Qr) => Qr !== null && typeof Qr == "object",
  Hl = Object.prototype.toString,
  Oo = (Qr) => Hl.call(Qr),
  Ao = (Qr) => Oo(Qr).slice(8, -1),
  ra = (Qr) =>
    ql(Qr) && Qr !== "NaN" && Qr[0] !== "-" && "" + parseInt(Qr, 10) === Qr,
  os = (Qr) => {
    let Kr = Object.create(null);
    return (Wr) => Kr[Wr] || (Kr[Wr] = Qr(Wr));
  },
  jl = /-\w/g,
  $f = os((Qr) => Qr.replace(jl, (Kr) => Kr.slice(1).toUpperCase())),
  $l = /\B([A-Z])/g,
  Ff = os((Qr) => Qr.replace($l, "-$1").toLowerCase()),
  To = os((Qr) => Qr.charAt(0).toUpperCase() + Qr.slice(1)),
  Bf = os((Qr) => (Qr ? `on${To(Qr)}` : "")),
  Zn = (Qr, Kr) => !Object.is(Qr, Kr),
  Fl =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  Qf = So(
    Fl +
      ",async,autofocus,autoplay,controls,default,defer,disabled,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected",
  );
function si(Qr, ...Kr) {
  console.warn(`[Vue warn] ${Qr}`, ...Kr);
}
var vs,
  cn,
  gs = new WeakSet(),
  ba = class {
    constructor(Qr) {
      ((this.fn = Qr),
        (this.deps = void 0),
        (this.depsTail = void 0),
        (this.flags = 5),
        (this.next = void 0),
        (this.cleanup = void 0),
        (this.scheduler = void 0),
        vs && (vs.active ? vs.effects.push(this) : (this.flags &= -2)));
    }
    pause() {
      this.flags |= 64;
    }
    resume() {
      this.flags & 64 &&
        ((this.flags &= -65),
        gs.has(this) && (gs.delete(this), this.trigger()));
    }
    notify() {
      (this.flags & 2 && !(this.flags & 32)) || this.flags & 8 || Bl(this);
    }
    run() {
      if (!(this.flags & 1)) return this.fn();
      ((this.flags |= 2), _a(this), Ro(this));
      let Qr = cn,
        Kr = In;
      ((cn = this), (In = !0));
      try {
        return this.fn();
      } finally {
        (cn !== this &&
          si(
            "Active effect was not restored correctly - this is likely a Vue internal bug.",
          ),
          No(this),
          (cn = Qr),
          (In = Kr),
          (this.flags &= -3));
      }
    }
    stop() {
      if (this.flags & 1) {
        for (let Qr = this.deps; Qr; Qr = Qr.nextDep) sa(Qr);
        ((this.deps = this.depsTail = void 0),
          _a(this),
          this.onStop && this.onStop(),
          (this.flags &= -2));
      }
    }
    trigger() {
      this.flags & 64
        ? gs.add(this)
        : this.scheduler
          ? this.scheduler()
          : this.runIfDirty();
    }
    runIfDirty() {
      Ds(this) && this.run();
    }
    get dirty() {
      return Ds(this);
    }
  },
  Co = 0,
  Ti,
  Ci;
function Bl(Qr, Kr = !1) {
  if (((Qr.flags |= 8), Kr)) {
    ((Qr.next = Ci), (Ci = Qr));
    return;
  }
  ((Qr.next = Ti), (Ti = Qr));
}
function na() {
  Co++;
}
function ia() {
  if (--Co > 0) return;
  if (Ci) {
    let Kr = Ci;
    for (Ci = void 0; Kr; ) {
      let Wr = Kr.next;
      ((Kr.next = void 0), (Kr.flags &= -9), (Kr = Wr));
    }
  }
  let Qr;
  for (; Ti; ) {
    let Kr = Ti;
    for (Ti = void 0; Kr; ) {
      let Wr = Kr.next;
      if (((Kr.next = void 0), (Kr.flags &= -9), Kr.flags & 1))
        try {
          Kr.trigger();
        } catch (Jr) {
          Qr || (Qr = Jr);
        }
      Kr = Wr;
    }
  }
  if (Qr) throw Qr;
}
function Ro(Qr) {
  for (let Kr = Qr.deps; Kr; Kr = Kr.nextDep)
    ((Kr.version = -1),
      (Kr.prevActiveLink = Kr.dep.activeLink),
      (Kr.dep.activeLink = Kr));
}
function No(Qr) {
  let Kr,
    Wr = Qr.depsTail,
    Jr = Wr;
  for (; Jr; ) {
    let Gr = Jr.prevDep;
    (Jr.version === -1 ? (Jr === Wr && (Wr = Gr), sa(Jr), Vl(Jr)) : (Kr = Jr),
      (Jr.dep.activeLink = Jr.prevActiveLink),
      (Jr.prevActiveLink = void 0),
      (Jr = Gr));
  }
  ((Qr.deps = Kr), (Qr.depsTail = Wr));
}
function Ds(Qr) {
  for (let Kr = Qr.deps; Kr; Kr = Kr.nextDep)
    if (
      Kr.dep.version !== Kr.version ||
      (Kr.dep.computed &&
        (Ql(Kr.dep.computed) || Kr.dep.version !== Kr.version))
    )
      return !0;
  return !!Qr._dirty;
}
function Ql(Qr) {
  if (
    (Qr.flags & 4 && !(Qr.flags & 16)) ||
    ((Qr.flags &= -17), Qr.globalVersion === Zi) ||
    ((Qr.globalVersion = Zi),
    !Qr.isSSR && Qr.flags & 128 && ((!Qr.deps && !Qr._dirty) || !Ds(Qr)))
  )
    return;
  Qr.flags |= 2;
  let Kr = Qr.dep,
    Wr = cn,
    Jr = In;
  ((cn = Qr), (In = !0));
  try {
    Ro(Qr);
    let Gr = Qr.fn(Qr._value);
    (Kr.version === 0 || Zn(Gr, Qr._value)) &&
      ((Qr.flags |= 128), (Qr._value = Gr), Kr.version++);
  } catch (Gr) {
    throw (Kr.version++, Gr);
  } finally {
    ((cn = Wr), (In = Jr), No(Qr), (Qr.flags &= -3));
  }
}
function sa(Qr, Kr = !1) {
  let { dep: Wr, prevSub: Jr, nextSub: Gr } = Qr;
  if (
    (Jr && ((Jr.nextSub = Gr), (Qr.prevSub = void 0)),
    Gr && ((Gr.prevSub = Jr), (Qr.nextSub = void 0)),
    Wr.subsHead === Qr && (Wr.subsHead = Gr),
    Wr.subs === Qr && ((Wr.subs = Jr), !Jr && Wr.computed))
  ) {
    Wr.computed.flags &= -5;
    for (let Zr = Wr.computed.deps; Zr; Zr = Zr.nextDep) sa(Zr, !0);
  }
  !Kr && !--Wr.sc && Wr.map && Wr.map.delete(Wr.key);
}
function Vl(Qr) {
  let { prevDep: Kr, nextDep: Wr } = Qr;
  (Kr && ((Kr.nextDep = Wr), (Qr.prevDep = void 0)),
    Wr && ((Wr.prevDep = Kr), (Qr.nextDep = void 0)));
}
function zl(Qr, Kr) {
  Qr.effect instanceof ba && (Qr = Qr.effect.fn);
  let Wr = new ba(Qr);
  Kr && Ni(Wr, Kr);
  try {
    Wr.run();
  } catch (Gr) {
    throw (Wr.stop(), Gr);
  }
  let Jr = Wr.run.bind(Wr);
  return ((Jr.effect = Wr), Jr);
}
function Xl(Qr) {
  Qr.effect.stop();
}
var In = !0,
  Io = [];
function Kl() {
  (Io.push(In), (In = !1));
}
function Wl() {
  let Qr = Io.pop();
  In = Qr === void 0 ? !0 : Qr;
}
function _a(Qr) {
  let { cleanup: Kr } = Qr;
  if (((Qr.cleanup = void 0), Kr)) {
    let Wr = cn;
    cn = void 0;
    try {
      Kr();
    } finally {
      cn = Wr;
    }
  }
}
var Zi = 0,
  Jl = class {
    constructor(Qr, Kr) {
      ((this.sub = Qr),
        (this.dep = Kr),
        (this.version = Kr.version),
        (this.nextDep =
          this.prevDep =
          this.nextSub =
          this.prevSub =
          this.prevActiveLink =
            void 0));
    }
  },
  Gl = class {
    constructor(Qr) {
      ((this.computed = Qr),
        (this.version = 0),
        (this.activeLink = void 0),
        (this.subs = void 0),
        (this.map = void 0),
        (this.key = void 0),
        (this.sc = 0),
        (this.__v_skip = !0),
        (this.subsHead = void 0));
    }
    track(Qr) {
      if (!cn || !In || cn === this.computed) return;
      let Kr = this.activeLink;
      if (Kr === void 0 || Kr.sub !== cn)
        ((Kr = this.activeLink = new Jl(cn, this)),
          cn.deps
            ? ((Kr.prevDep = cn.depsTail),
              (cn.depsTail.nextDep = Kr),
              (cn.depsTail = Kr))
            : (cn.deps = cn.depsTail = Kr),
          Mo(Kr));
      else if (Kr.version === -1 && ((Kr.version = this.version), Kr.nextDep)) {
        let Wr = Kr.nextDep;
        ((Wr.prevDep = Kr.prevDep),
          Kr.prevDep && (Kr.prevDep.nextDep = Wr),
          (Kr.prevDep = cn.depsTail),
          (Kr.nextDep = void 0),
          (cn.depsTail.nextDep = Kr),
          (cn.depsTail = Kr),
          cn.deps === Kr && (cn.deps = Wr));
      }
      return (cn.onTrack && cn.onTrack(Ni({ effect: cn }, Qr)), Kr);
    }
    trigger(Qr) {
      (this.version++, Zi++, this.notify(Qr));
    }
    notify(Qr) {
      na();
      try {
        for (let Kr = this.subsHead; Kr; Kr = Kr.nextSub)
          Kr.sub.onTrigger &&
            !(Kr.sub.flags & 8) &&
            Kr.sub.onTrigger(Ni({ effect: Kr.sub }, Qr));
        for (let Kr = this.subs; Kr; Kr = Kr.prevSub)
          Kr.sub.notify() && Kr.sub.dep.notify();
      } finally {
        ia();
      }
    }
  };
function Mo(Qr) {
  if ((Qr.dep.sc++, Qr.sub.flags & 4)) {
    let Kr = Qr.dep.computed;
    if (Kr && !Qr.dep.subs) {
      Kr.flags |= 20;
      for (let Jr = Kr.deps; Jr; Jr = Jr.nextDep) Mo(Jr);
    }
    let Wr = Qr.dep.subs;
    (Wr !== Qr && ((Qr.prevSub = Wr), Wr && (Wr.nextSub = Qr)),
      Qr.dep.subsHead === void 0 && (Qr.dep.subsHead = Qr),
      (Qr.dep.subs = Qr));
  }
}
var Us = new WeakMap(),
  ri = Symbol("Object iterate"),
  qs = Symbol("Map keys iterate"),
  Li = Symbol("Array iterate");
function wn(Qr, Kr, Wr) {
  if (In && cn) {
    let Jr = Us.get(Qr);
    Jr || Us.set(Qr, (Jr = new Map()));
    let Gr = Jr.get(Wr);
    (Gr || (Jr.set(Wr, (Gr = new Gl())), (Gr.map = Jr), (Gr.key = Wr)),
      Gr.track({ target: Qr, type: Kr, key: Wr }));
  }
}
function zn(Qr, Kr, Wr, Jr, Gr, Zr) {
  let Yr = Us.get(Qr);
  if (!Yr) {
    Zi++;
    return;
  }
  let en = (tn) => {
    tn &&
      tn.trigger({
        target: Qr,
        type: Kr,
        key: Wr,
        newValue: Jr,
        oldValue: Gr,
        oldTarget: Zr,
      });
  };
  if ((na(), Kr === "clear")) Yr.forEach(en);
  else {
    let tn = Ii(Qr),
      rn = tn && ra(Wr);
    if (tn && Wr === "length") {
      let nn = Number(Jr);
      Yr.forEach((sn, an) => {
        (an === "length" || an === Li || (!Ui(an) && an >= nn)) && en(sn);
      });
    } else
      switch (
        ((Wr !== void 0 || Yr.has(void 0)) && en(Yr.get(Wr)),
        rn && en(Yr.get(Li)),
        Kr)
      ) {
        case "add":
          tn
            ? rn && en(Yr.get("length"))
            : (en(Yr.get(ri)), Ai(Qr) && en(Yr.get(qs)));
          break;
        case "delete":
          tn || (en(Yr.get(ri)), Ai(Qr) && en(Yr.get(qs)));
          break;
        case "set":
          Ai(Qr) && en(Yr.get(ri));
          break;
      }
  }
  ia();
}
function vi(Qr) {
  let Kr = hn(Qr);
  return Kr === Qr ? Kr : (wn(Kr, "iterate", Li), oi(Qr) ? Kr : Kr.map(ui));
}
function aa(Qr) {
  return (wn((Qr = hn(Qr)), "iterate", Li), Qr);
}
function Dn(Qr, Kr) {
  return ai(Qr) ? (Ho(Qr) ? Pi(ui(Kr)) : Pi(Kr)) : ui(Kr);
}
var Zl = {
  __proto__: null,
  [Symbol.iterator]() {
    return ms(this, Symbol.iterator, (Qr) => Dn(this, Qr));
  },
  concat(...Qr) {
    return vi(this).concat(...Qr.map((Kr) => (Ii(Kr) ? vi(Kr) : Kr)));
  },
  entries() {
    return ms(this, "entries", (Qr) => ((Qr[1] = Dn(this, Qr[1])), Qr));
  },
  every(Qr, Kr) {
    return $n(this, "every", Qr, Kr, void 0, arguments);
  },
  filter(Qr, Kr) {
    return $n(
      this,
      "filter",
      Qr,
      Kr,
      (Wr) => Wr.map((Jr) => Dn(this, Jr)),
      arguments,
    );
  },
  find(Qr, Kr) {
    return $n(this, "find", Qr, Kr, (Wr) => Dn(this, Wr), arguments);
  },
  findIndex(Qr, Kr) {
    return $n(this, "findIndex", Qr, Kr, void 0, arguments);
  },
  findLast(Qr, Kr) {
    return $n(this, "findLast", Qr, Kr, (Wr) => Dn(this, Wr), arguments);
  },
  findLastIndex(Qr, Kr) {
    return $n(this, "findLastIndex", Qr, Kr, void 0, arguments);
  },
  forEach(Qr, Kr) {
    return $n(this, "forEach", Qr, Kr, void 0, arguments);
  },
  includes(...Qr) {
    return ys(this, "includes", Qr);
  },
  indexOf(...Qr) {
    return ys(this, "indexOf", Qr);
  },
  join(Qr) {
    return vi(this).join(Qr);
  },
  lastIndexOf(...Qr) {
    return ys(this, "lastIndexOf", Qr);
  },
  map(Qr, Kr) {
    return $n(this, "map", Qr, Kr, void 0, arguments);
  },
  pop() {
    return Ei(this, "pop");
  },
  push(...Qr) {
    return Ei(this, "push", Qr);
  },
  reduce(Qr, ...Kr) {
    return wa(this, "reduce", Qr, Kr);
  },
  reduceRight(Qr, ...Kr) {
    return wa(this, "reduceRight", Qr, Kr);
  },
  shift() {
    return Ei(this, "shift");
  },
  some(Qr, Kr) {
    return $n(this, "some", Qr, Kr, void 0, arguments);
  },
  splice(...Qr) {
    return Ei(this, "splice", Qr);
  },
  toReversed() {
    return vi(this).toReversed();
  },
  toSorted(Qr) {
    return vi(this).toSorted(Qr);
  },
  toSpliced(...Qr) {
    return vi(this).toSpliced(...Qr);
  },
  unshift(...Qr) {
    return Ei(this, "unshift", Qr);
  },
  values() {
    return ms(this, "values", (Qr) => Dn(this, Qr));
  },
};
function ms(Qr, Kr, Wr) {
  let Jr = aa(Qr),
    Gr = Jr[Kr]();
  return (
    Jr !== Qr &&
      !oi(Qr) &&
      ((Gr._next = Gr.next),
      (Gr.next = () => {
        let Zr = Gr._next();
        return (Zr.done || (Zr.value = Wr(Zr.value)), Zr);
      })),
    Gr
  );
}
var Yl = Array.prototype;
function $n(Qr, Kr, Wr, Jr, Gr, Zr) {
  let Yr = aa(Qr),
    en = Yr !== Qr && !oi(Qr),
    tn = Yr[Kr];
  if (tn !== Yl[Kr]) {
    let sn = tn.apply(Qr, Zr);
    return en ? ui(sn) : sn;
  }
  let rn = Wr;
  Yr !== Qr &&
    (en
      ? (rn = function (sn, an) {
          return Wr.call(this, Dn(Qr, sn), an, Qr);
        })
      : Wr.length > 2 &&
        (rn = function (sn, an) {
          return Wr.call(this, sn, an, Qr);
        }));
  let nn = tn.call(Yr, rn, Jr);
  return en && Gr ? Gr(nn) : nn;
}
function wa(Qr, Kr, Wr, Jr) {
  let Gr = aa(Qr),
    Zr = Gr !== Qr && !oi(Qr),
    Yr = Wr,
    en = !1;
  Gr !== Qr &&
    (Zr
      ? ((en = Jr.length === 0),
        (Yr = function (rn, nn, sn) {
          return (
            en && ((en = !1), (rn = Dn(Qr, rn))),
            Wr.call(this, rn, Dn(Qr, nn), sn, Qr)
          );
        }))
      : Wr.length > 3 &&
        (Yr = function (rn, nn, sn) {
          return Wr.call(this, rn, nn, sn, Qr);
        }));
  let tn = Gr[Kr](Yr, ...Jr);
  return en ? Dn(Qr, tn) : tn;
}
function ys(Qr, Kr, Wr) {
  let Jr = hn(Qr);
  wn(Jr, "iterate", Li);
  let Gr = Jr[Kr](...Wr);
  return (Gr === -1 || Gr === !1) && pf(Wr[0])
    ? ((Wr[0] = hn(Wr[0])), Jr[Kr](...Wr))
    : Gr;
}
function Ei(Qr, Kr, Wr = []) {
  (Kl(), na());
  let Jr = hn(Qr)[Kr].apply(Qr, Wr);
  return (ia(), Wl(), Jr);
}
var ef = So("__proto__,__v_isRef,__isVue"),
  Lo = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((Qr) => Qr !== "arguments" && Qr !== "caller")
      .map((Qr) => Symbol[Qr])
      .filter(Ui),
  );
function tf(Qr) {
  Ui(Qr) || (Qr = String(Qr));
  let Kr = hn(this);
  return (wn(Kr, "has", Qr), Kr.hasOwnProperty(Qr));
}
var Po = class {
    constructor(Qr = !1, Kr = !1) {
      ((this._isReadonly = Qr), (this._isShallow = Kr));
    }
    get(Qr, Kr, Wr) {
      if (Kr === "__v_skip") return Qr.__v_skip;
      let Jr = this._isReadonly,
        Gr = this._isShallow;
      if (Kr === "__v_isReactive") return !Jr;
      if (Kr === "__v_isReadonly") return Jr;
      if (Kr === "__v_isShallow") return Gr;
      if (Kr === "__v_raw")
        return Wr === (Jr ? (Gr ? hf : Uo) : Gr ? cf : Do).get(Qr) ||
          Object.getPrototypeOf(Qr) === Object.getPrototypeOf(Wr)
          ? Qr
          : void 0;
      let Zr = Ii(Qr);
      if (!Jr) {
        let en;
        if (Zr && (en = Zl[Kr])) return en;
        if (Kr === "hasOwnProperty") return tf;
      }
      let Yr = Reflect.get(Qr, Kr, Ri(Qr) ? Qr : Wr);
      if ((Ui(Kr) ? Lo.has(Kr) : ef(Kr)) || (Jr || wn(Qr, "get", Kr), Gr))
        return Yr;
      if (Ri(Yr)) {
        let en = Zr && ra(Kr) ? Yr : Yr.value;
        return Jr && Mi(en) ? js(en) : en;
      }
      return Mi(Yr) ? (Jr ? js(Yr) : oa(Yr)) : Yr;
    }
  },
  rf = class extends Po {
    constructor(Qr = !1) {
      super(!1, Qr);
    }
    set(Qr, Kr, Wr, Jr) {
      let Gr = Qr[Kr],
        Zr = Ii(Qr) && ra(Kr);
      if (!this._isShallow) {
        let tn = ai(Gr);
        if (
          (!oi(Wr) && !ai(Wr) && ((Gr = hn(Gr)), (Wr = hn(Wr))),
          !Zr && Ri(Gr) && !Ri(Wr))
        )
          return tn
            ? (si(
                `Set operation on key "${String(Kr)}" failed: target is readonly.`,
                Qr[Kr],
              ),
              !0)
            : ((Gr.value = Wr), !0);
      }
      let Yr = Zr ? Number(Kr) < Qr.length : ks(Qr, Kr),
        en = Reflect.set(Qr, Kr, Wr, Ri(Qr) ? Qr : Jr);
      return (
        Qr === hn(Jr) &&
          en &&
          (Yr
            ? Zn(Wr, Gr) && zn(Qr, "set", Kr, Wr, Gr)
            : zn(Qr, "add", Kr, Wr)),
        en
      );
    }
    deleteProperty(Qr, Kr) {
      let Wr = ks(Qr, Kr),
        Jr = Qr[Kr],
        Gr = Reflect.deleteProperty(Qr, Kr);
      return (Gr && Wr && zn(Qr, "delete", Kr, void 0, Jr), Gr);
    }
    has(Qr, Kr) {
      let Wr = Reflect.has(Qr, Kr);
      return ((!Ui(Kr) || !Lo.has(Kr)) && wn(Qr, "has", Kr), Wr);
    }
    ownKeys(Qr) {
      return (wn(Qr, "iterate", Ii(Qr) ? "length" : ri), Reflect.ownKeys(Qr));
    }
  },
  nf = class extends Po {
    constructor(Qr = !1) {
      super(!0, Qr);
    }
    set(Qr, Kr) {
      return (
        si(
          `Set operation on key "${String(Kr)}" failed: target is readonly.`,
          Qr,
        ),
        !0
      );
    }
    deleteProperty(Qr, Kr) {
      return (
        si(
          `Delete operation on key "${String(Kr)}" failed: target is readonly.`,
          Qr,
        ),
        !0
      );
    }
  },
  sf = new rf(),
  af = new nf(),
  Hs = (Qr) => Qr,
  Bi = (Qr) => Reflect.getPrototypeOf(Qr);
function of(Qr, Kr, Wr) {
  return function (...Jr) {
    let Gr = this.__v_raw,
      Zr = hn(Gr),
      Yr = Ai(Zr),
      en = Qr === "entries" || (Qr === Symbol.iterator && Yr),
      tn = Qr === "keys" && Yr,
      rn = Gr[Qr](...Jr),
      nn = Wr ? Hs : Kr ? Pi : ui;
    return (
      !Kr && wn(Zr, "iterate", tn ? qs : ri),
      Ni(Object.create(rn), {
        next() {
          let { value: sn, done: an } = rn.next();
          return an
            ? { value: sn, done: an }
            : { value: en ? [nn(sn[0]), nn(sn[1])] : nn(sn), done: an };
        },
      })
    );
  };
}
function Qi(Qr) {
  return function (...Kr) {
    {
      let Wr = Kr[0] ? `on key "${Kr[0]}" ` : "";
      si(`${To(Qr)} operation ${Wr}failed: target is readonly.`, hn(this));
    }
    return Qr === "delete" ? !1 : Qr === "clear" ? void 0 : this;
  };
}
function uf(Qr, Kr) {
  let Wr = {
    get(Gr) {
      let Zr = this.__v_raw,
        Yr = hn(Zr),
        en = hn(Gr);
      Qr || (Zn(Gr, en) && wn(Yr, "get", Gr), wn(Yr, "get", en));
      let { has: tn } = Bi(Yr),
        rn = Kr ? Hs : Qr ? Pi : ui;
      if (tn.call(Yr, Gr)) return rn(Zr.get(Gr));
      if (tn.call(Yr, en)) return rn(Zr.get(en));
      Zr !== Yr && Zr.get(Gr);
    },
    get size() {
      let Gr = this.__v_raw;
      return (!Qr && wn(hn(Gr), "iterate", ri), Gr.size);
    },
    has(Gr) {
      let Zr = this.__v_raw,
        Yr = hn(Zr),
        en = hn(Gr);
      return (
        Qr || (Zn(Gr, en) && wn(Yr, "has", Gr), wn(Yr, "has", en)),
        Gr === en ? Zr.has(Gr) : Zr.has(Gr) || Zr.has(en)
      );
    },
    forEach(Gr, Zr) {
      let Yr = this,
        en = Yr.__v_raw,
        tn = hn(en),
        rn = Kr ? Hs : Qr ? Pi : ui;
      return (
        !Qr && wn(tn, "iterate", ri),
        en.forEach((nn, sn) => Gr.call(Zr, rn(nn), rn(sn), Yr))
      );
    },
  };
  return (
    Ni(
      Wr,
      Qr
        ? {
            add: Qi("add"),
            set: Qi("set"),
            delete: Qi("delete"),
            clear: Qi("clear"),
          }
        : {
            add(Gr) {
              let Zr = hn(this),
                Yr = Bi(Zr),
                en = hn(Gr),
                tn = !Kr && !oi(Gr) && !ai(Gr) ? en : Gr;
              return (
                Yr.has.call(Zr, tn) ||
                  (Zn(Gr, tn) && Yr.has.call(Zr, Gr)) ||
                  (Zn(en, tn) && Yr.has.call(Zr, en)) ||
                  (Zr.add(tn), zn(Zr, "add", tn, tn)),
                this
              );
            },
            set(Gr, Zr) {
              !Kr && !oi(Zr) && !ai(Zr) && (Zr = hn(Zr));
              let Yr = hn(this),
                { has: en, get: tn } = Bi(Yr),
                rn = en.call(Yr, Gr);
              rn ? Ea(Yr, en, Gr) : ((Gr = hn(Gr)), (rn = en.call(Yr, Gr)));
              let nn = tn.call(Yr, Gr);
              return (
                Yr.set(Gr, Zr),
                rn
                  ? Zn(Zr, nn) && zn(Yr, "set", Gr, Zr, nn)
                  : zn(Yr, "add", Gr, Zr),
                this
              );
            },
            delete(Gr) {
              let Zr = hn(this),
                { has: Yr, get: en } = Bi(Zr),
                tn = Yr.call(Zr, Gr);
              tn ? Ea(Zr, Yr, Gr) : ((Gr = hn(Gr)), (tn = Yr.call(Zr, Gr)));
              let rn = en ? en.call(Zr, Gr) : void 0,
                nn = Zr.delete(Gr);
              return (tn && zn(Zr, "delete", Gr, void 0, rn), nn);
            },
            clear() {
              let Gr = hn(this),
                Zr = Gr.size !== 0,
                Yr = Ai(Gr) ? new Map(Gr) : new Set(Gr),
                en = Gr.clear();
              return (Zr && zn(Gr, "clear", void 0, void 0, Yr), en);
            },
          },
    ),
    ["keys", "values", "entries", Symbol.iterator].forEach((Gr) => {
      Wr[Gr] = of(Gr, Qr, Kr);
    }),
    Wr
  );
}
function ko(Qr, Kr) {
  let Wr = uf(Qr, Kr);
  return (Jr, Gr, Zr) =>
    Gr === "__v_isReactive"
      ? !Qr
      : Gr === "__v_isReadonly"
        ? Qr
        : Gr === "__v_raw"
          ? Jr
          : Reflect.get(ks(Wr, Gr) && Gr in Jr ? Wr : Jr, Gr, Zr);
}
var lf = { get: ko(!1, !1) },
  ff = { get: ko(!0, !1) };
function Ea(Qr, Kr, Wr) {
  let Jr = hn(Wr);
  if (Jr !== Wr && Kr.call(Qr, Jr)) {
    let Gr = Ao(Qr);
    si(
      `Reactive ${Gr} contains both the raw and reactive versions of the same object${Gr === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`,
    );
  }
}
var Do = new WeakMap(),
  cf = new WeakMap(),
  Uo = new WeakMap(),
  hf = new WeakMap();
function df(Qr) {
  switch (Qr) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function oa(Qr) {
  return ai(Qr) ? Qr : qo(Qr, !1, sf, lf, Do);
}
function js(Qr) {
  return qo(Qr, !0, af, ff, Uo);
}
function qo(Qr, Kr, Wr, Jr, Gr) {
  if (!Mi(Qr))
    return (
      si(`value cannot be made ${Kr ? "readonly" : "reactive"}: ${String(Qr)}`),
      Qr
    );
  if (
    (Qr.__v_raw && !(Kr && Qr.__v_isReactive)) ||
    Qr.__v_skip ||
    !Object.isExtensible(Qr)
  )
    return Qr;
  let Zr = Gr.get(Qr);
  if (Zr) return Zr;
  let Yr = df(Ao(Qr));
  if (Yr === 0) return Qr;
  let en = new Proxy(Qr, Yr === 2 ? Jr : Wr);
  return (Gr.set(Qr, en), en);
}
function Ho(Qr) {
  return ai(Qr) ? Ho(Qr.__v_raw) : !!(Qr && Qr.__v_isReactive);
}
function ai(Qr) {
  return !!(Qr && Qr.__v_isReadonly);
}
function oi(Qr) {
  return !!(Qr && Qr.__v_isShallow);
}
function pf(Qr) {
  return Qr ? !!Qr.__v_raw : !1;
}
function hn(Qr) {
  let Kr = Qr && Qr.__v_raw;
  return Kr ? hn(Kr) : Qr;
}
var ui = (Qr) => (Mi(Qr) ? oa(Qr) : Qr),
  Pi = (Qr) => (Mi(Qr) ? js(Qr) : Qr);
function Ri(Qr) {
  return Qr ? Qr.__v_isRef === !0 : !1;
}
Mn("nextTick", () => Zs);
Mn("dispatch", (Qr) => Oi.bind(Oi, Qr));
Mn("watch", (Qr, { evaluateLater: Kr, cleanup: Wr }) => (Jr, Gr) => {
  let Zr = Kr(Jr),
    en = Ra(() => {
      let tn;
      return (Zr((rn) => (tn = rn)), tn);
    }, Gr);
  Wr(en);
});
Mn("store", Sl);
Mn("data", (Qr) => Ua(Qr));
Mn("root", (Qr) => ss(Qr));
Mn(
  "refs",
  (Qr) => (
    Qr._x_refs_proxy || (Qr._x_refs_proxy = ni(vf(Qr))),
    Qr._x_refs_proxy
  ),
);
function vf(Qr) {
  let Kr = [];
  return (
    Tn(Qr, (Wr) => {
      Wr._x_refs && Kr.push(Wr._x_refs);
    }),
    Kr
  );
}
var xs = {};
function jo(Qr) {
  return (xs[Qr] || (xs[Qr] = 0), ++xs[Qr]);
}
function gf(Qr, Kr) {
  return Tn(Qr, (Wr) => {
    if (Wr._x_ids && Wr._x_ids[Kr]) return !0;
  });
}
function mf(Qr, Kr) {
  (Qr._x_ids || (Qr._x_ids = {}), Qr._x_ids[Kr] || (Qr._x_ids[Kr] = jo(Kr)));
}
Mn("id", (Qr, { cleanup: Kr }) => (Wr, Jr = null) => {
  let Gr = `${Wr}${Jr ? `-${Jr}` : ""}`;
  return yf(Qr, Gr, Kr, () => {
    let Zr = gf(Qr, Wr),
      Yr = Zr ? Zr._x_ids[Wr] : jo(Wr);
    return Jr ? `${Wr}-${Yr}-${Jr}` : `${Wr}-${Yr}`;
  });
});
Di((Qr, Kr) => {
  Qr._x_id && (Kr._x_id = Qr._x_id);
});
function yf(Qr, Kr, Wr, Jr) {
  if ((Qr._x_id || (Qr._x_id = {}), Qr._x_id[Kr])) return Qr._x_id[Kr];
  let Gr = Jr();
  return (
    (Qr._x_id[Kr] = Gr),
    Wr(() => {
      delete Qr._x_id[Kr];
    }),
    Gr
  );
}
Mn("el", (Qr) => Qr);
$o("Focus", "focus", "focus");
$o("Persist", "persist", "persist");
function $o(Qr, Kr, Wr) {
  Mn(Kr, (Jr) =>
    Un(
      `You can't use [$${Kr}] without first installing the "${Qr}" plugin here: https://alpinejs.dev/plugins/${Wr}`,
      Jr,
    ),
  );
}
mn(
  "modelable",
  (Qr, { expression: Kr }, { effect: Wr, evaluateLater: Jr, cleanup: Gr }) => {
    let Zr = Jr(Kr),
      Yr = () => {
        let nn;
        return (Zr((sn) => (nn = sn)), nn);
      },
      en = Jr(`${Kr} = __placeholder`),
      tn = (nn) => en(() => {}, { scope: { __placeholder: nn } }),
      rn = Yr();
    (tn(rn),
      queueMicrotask(() => {
        if (!Qr._x_model) return;
        Qr._x_removeModelListeners.default();
        let nn = Qr._x_model.get,
          sn = Qr._x_model.setWithModifiers,
          an = mo(
            {
              get() {
                return nn();
              },
              set(fn) {
                sn(fn);
              },
            },
            {
              get() {
                return Yr();
              },
              set(fn) {
                tn(fn);
              },
            },
          );
        Gr(an);
      }));
  },
);
mn("teleport", (Qr, { modifiers: Kr, expression: Wr }, { cleanup: Jr }) => {
  Qr.tagName.toLowerCase() !== "template" &&
    Un("x-teleport can only be used on a <template> tag", Qr);
  let Gr = Sa(Wr),
    Zr = Qr.content.cloneNode(!0).firstElementChild;
  ((Qr._x_teleport = Zr),
    (Zr._x_teleportBack = Qr),
    Qr.setAttribute("data-teleport-template", !0),
    Zr.setAttribute("data-teleport-target", !0),
    Qr._x_forwardEvents &&
      Qr._x_forwardEvents.forEach((en) => {
        Zr.addEventListener(en, (tn) => {
          (tn.stopPropagation(),
            Qr.dispatchEvent(new tn.constructor(tn.type, tn)));
        });
      }),
    ki(Zr, {}, Qr));
  let Yr = (en, tn, rn) => {
    rn.includes("prepend")
      ? tn.parentNode.insertBefore(en, tn)
      : rn.includes("append")
        ? tn.parentNode.insertBefore(en, tn.nextSibling)
        : tn.appendChild(en);
  };
  (gn(() => {
    Qn(() => {
      (Yr(Zr, Gr, Kr), qn(Zr));
    })();
  }),
    (Qr._x_teleportPutBack = () => {
      let en = Sa(Wr);
      gn(() => {
        Yr(Qr._x_teleport, en, Kr);
      });
    }),
    Jr(() =>
      gn(() => {
        (Zr.remove(), fi(Zr));
      }),
    ));
});
var xf = document.createElement("div");
function Sa(Qr) {
  let Kr = Qn(
    () => document.querySelector(Qr),
    () => xf,
  )();
  return (Kr || Un(`Cannot find x-teleport element for selector: "${Qr}"`), Kr);
}
var Fo = () => {};
Fo.inline = (Qr, { modifiers: Kr }, { cleanup: Wr }) => {
  (Kr.includes("self") ? (Qr._x_ignoreSelf = !0) : (Qr._x_ignore = !0),
    Wr(() => {
      Kr.includes("self") ? delete Qr._x_ignoreSelf : delete Qr._x_ignore;
    }));
};
mn("ignore", Fo);
mn(
  "effect",
  Qn((Qr, { expression: Kr }, { effect: Wr }) => {
    Wr(bn(Qr, Kr));
  }),
);
function gi(Qr, Kr, Wr, Jr) {
  let Gr = Qr,
    Zr = (tn) => Jr(tn),
    Yr = {},
    en = (tn, rn) => (nn) => rn(tn, nn);
  return (
    Wr.includes("dot") && (Kr = bf(Kr)),
    Wr.includes("camel") && (Kr = _f(Kr)),
    Wr.includes("capture") && (Yr.capture = !0),
    Wr.includes("window") && (Gr = window),
    Wr.includes("document") && (Gr = document),
    Wr.includes("passive") &&
      (Yr.passive = Wr[Wr.indexOf("passive") + 1] !== "false"),
    (Zr = Bo(Wr, Zr)),
    Wr.includes("prevent") &&
      (Zr = en(Zr, (tn, rn) => {
        (rn.preventDefault(), tn(rn));
      })),
    Wr.includes("stop") &&
      (Zr = en(Zr, (tn, rn) => {
        (rn.stopPropagation(), tn(rn));
      })),
    Wr.includes("once") &&
      (Zr = en(Zr, (tn, rn) => {
        (tn(rn), Gr.removeEventListener(Kr, Zr, Yr));
      })),
    (Wr.includes("away") || Wr.includes("outside")) &&
      ((Gr = document),
      (Zr = en(Zr, (tn, rn) => {
        Qr.contains(rn.target) ||
          (rn.target.isConnected !== !1 &&
            ((Qr.offsetWidth < 1 && Qr.offsetHeight < 1) ||
              (Qr._x_isShown !== !1 && tn(rn))));
      }))),
    Wr.includes("self") &&
      (Zr = en(Zr, (tn, rn) => {
        rn.target === Qr && tn(rn);
      })),
    Kr === "submit" &&
      (Zr = en(Zr, (tn, rn) => {
        (rn.target._x_pendingModelUpdates &&
          rn.target._x_pendingModelUpdates.forEach((nn) => nn()),
          tn(rn));
      })),
    (Ef(Kr) || Qo(Kr)) &&
      (Zr = en(Zr, (tn, rn) => {
        Of(rn, Wr) || tn(rn);
      })),
    Gr.addEventListener(Kr, Zr, Yr),
    () => {
      Gr.removeEventListener(Kr, Zr, Yr);
    }
  );
}
function Bo(Qr, Kr) {
  if (Qr.includes("debounce")) {
    let Wr = Qr[Qr.indexOf("debounce") + 1] || "invalid-wait",
      Jr = Yi(Wr.split("ms")[0]) ? Number(Wr.split("ms")[0]) : 250;
    Kr = vo(Kr, Jr);
  }
  if (Qr.includes("throttle")) {
    let Wr = Qr[Qr.indexOf("throttle") + 1] || "invalid-wait",
      Jr = Yi(Wr.split("ms")[0]) ? Number(Wr.split("ms")[0]) : 250;
    Kr = go(Kr, Jr);
  }
  return Kr;
}
function bf(Qr) {
  return Qr.replace(/-/g, ".");
}
function _f(Qr) {
  return Qr.toLowerCase().replace(/-(\w)/g, (Kr, Wr) => Wr.toUpperCase());
}
function Yi(Qr) {
  return !Array.isArray(Qr) && !isNaN(Qr);
}
function wf(Qr) {
  return [" ", "_"].includes(Qr)
    ? Qr
    : Qr.replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/[_\s]/, "-")
        .toLowerCase();
}
function Ef(Qr) {
  return ["keydown", "keyup"].includes(Qr);
}
function Qo(Qr) {
  return ["contextmenu", "click", "mouse"].some((Kr) => Qr.includes(Kr));
}
var Sf = [
  "window",
  "document",
  "prevent",
  "stop",
  "once",
  "capture",
  "self",
  "away",
  "outside",
  "passive",
  "dot",
  "camel",
  "preserve-scroll",
  "blur",
  "change",
  "lazy",
  "number",
  "boolean",
  "trim",
  "fill",
  "unintrusive",
  "parent",
];
function Of(Qr, Kr) {
  let Wr = Kr.filter((Zr, Yr) =>
    Zr === "false" && Kr[Yr - 1] === "passive" ? !1 : !Sf.includes(Zr),
  );
  if (Wr.includes("debounce")) {
    let Zr = Wr.indexOf("debounce");
    Wr.splice(Zr, Yi((Wr[Zr + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
  }
  if (Wr.includes("throttle")) {
    let Zr = Wr.indexOf("throttle");
    Wr.splice(Zr, Yi((Wr[Zr + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
  }
  if (Wr.length === 0 || (Wr.length === 1 && Oa(Qr.key).includes(Wr[0])))
    return !1;
  let Gr = ["ctrl", "shift", "alt", "meta", "cmd", "super"].filter((Zr) =>
    Wr.includes(Zr),
  );
  return (
    (Wr = Wr.filter((Zr) => !Gr.includes(Zr))),
    !(
      Gr.length > 0 &&
      Gr.filter(
        (Yr) => (
          (Yr === "cmd" || Yr === "super") && (Yr = "meta"),
          Qr[`${Yr}Key`]
        ),
      ).length === Gr.length &&
      (Qo(Qr.type) || Oa(Qr.key).includes(Wr[0]))
    )
  );
}
function Oa(Qr) {
  if (!Qr) return [];
  Qr = wf(Qr);
  let Kr = {
    ctrl: "control",
    slash: "/",
    space: " ",
    spacebar: " ",
    cmd: "meta",
    esc: "escape",
    up: "arrow-up",
    down: "arrow-down",
    left: "arrow-left",
    right: "arrow-right",
    period: ".",
    comma: ",",
    equal: "=",
    minus: "-",
    underscore: "_",
  };
  return (
    (Kr[Qr] = Qr),
    Object.keys(Kr)
      .map((Wr) => {
        if (Kr[Wr] === Qr) return Wr;
      })
      .filter((Wr) => Wr)
  );
}
mn(
  "model",
  (Qr, { modifiers: Kr, expression: Wr }, { effect: Jr, cleanup: Gr }) => {
    let Zr = Qr;
    Kr.includes("parent") && (Zr = Tn(Qr, (un) => un !== Qr));
    let Yr = bn(Zr, Wr),
      en;
    typeof Wr == "string"
      ? (en = bn(Zr, `${Wr} = __placeholder`))
      : typeof Wr == "function" && typeof Wr() == "string"
        ? (en = bn(Zr, `${Wr()} = __placeholder`))
        : (en = () => {});
    let tn = () => {
        let un;
        return (Yr((on) => (un = on)), Aa(un) ? un.get() : un);
      },
      rn = (un) => {
        let on;
        (Yr((ln) => (on = ln)),
          Aa(on) ? on.set(un) : en(() => {}, { scope: { __placeholder: un } }));
      };
    typeof Wr == "string" &&
      Qr.type === "radio" &&
      gn(() => {
        Qr.hasAttribute("name") || Qr.setAttribute("name", Wr);
      });
    let nn = Kr.includes("change") || Kr.includes("lazy"),
      sn = Kr.includes("blur"),
      an = Kr.includes("enter"),
      fn = nn || sn || an,
      pn;
    if (Xn) pn = () => {};
    else if (fn) {
      let un = [],
        on = (ln) => rn(Vi(Qr, Kr, ln, tn()));
      if (
        (nn && un.push(gi(Qr, "change", Kr, on)),
        sn && (un.push(gi(Qr, "blur", Kr, on)), Qr.form))
      ) {
        let ln = Qr.form,
          vn = () => on({ target: Qr });
        (ln._x_pendingModelUpdates || (ln._x_pendingModelUpdates = []),
          ln._x_pendingModelUpdates.push(vn),
          Gr(() => {
            ln._x_pendingModelUpdates &&
              ln._x_pendingModelUpdates.splice(
                ln._x_pendingModelUpdates.indexOf(vn),
                1,
              );
          }));
      }
      (an &&
        un.push(
          gi(Qr, "keydown", Kr, (ln) => {
            ln.key === "Enter" && on(ln);
          }),
        ),
        (pn = () => un.forEach((ln) => ln())));
    } else {
      let un =
        Qr.tagName.toLowerCase() === "select" ||
        ["checkbox", "radio"].includes(Qr.type)
          ? "change"
          : "input";
      pn = gi(Qr, un, Kr, (on) => {
        rn(Vi(Qr, Kr, on, tn()));
      });
    }
    if (
      (Kr.includes("fill") &&
        ([void 0, null, ""].includes(tn()) ||
          (Gi(Qr) && Array.isArray(tn())) ||
          (Qr.tagName.toLowerCase() === "select" && Qr.multiple)) &&
        rn(Vi(Qr, Kr, { target: Qr }, tn())),
      Qr._x_removeModelListeners || (Qr._x_removeModelListeners = {}),
      (Qr._x_removeModelListeners.default = pn),
      Gr(() => Qr._x_removeModelListeners.default()),
      Qr.form)
    ) {
      let un = gi(Qr.form, "reset", [], (on) => {
        Zs(
          () =>
            Qr._x_model && Qr._x_model.set(Vi(Qr, Kr, { target: Qr }, tn())),
        );
      });
      Gr(() => un());
    }
    if (
      ((Qr._x_model = {
        get() {
          return tn();
        },
        set(un) {
          rn(un);
        },
        setWithModifiers: Bo(Kr, rn),
      }),
      (Qr._x_forceModelUpdate = (un) => {
        (un === void 0 && typeof Wr == "string" && Wr.match(/\./) && (un = ""),
          gn(() => {
            Gi(Qr)
              ? Array.isArray(un)
                ? (Qr.checked = un.some((on) => on == Qr.value))
                : (Qr.checked = !!un)
              : ta(Qr)
                ? typeof un == "boolean"
                  ? (Qr.checked = zi(Qr.value) === un)
                  : (Qr.checked = Qr.value == un)
                : co(Qr, "value", un);
          }));
      }),
      Qr.tagName === "SELECT")
    ) {
      let un = new MutationObserver(() => {
        Qr._x_forceModelUpdate(tn());
      });
      (un.observe(Qr, { childList: !0 }), Gr(() => un.disconnect()));
    }
    Jr(() => {
      let un = tn();
      (Kr.includes("unintrusive") && document.activeElement.isSameNode(Qr)) ||
        Qr._x_forceModelUpdate(un);
    });
  },
);
function Vi(Qr, Kr, Wr, Jr) {
  return gn(() => {
    if (Wr instanceof CustomEvent && Wr.detail !== void 0)
      return Wr.detail !== null && Wr.detail !== void 0
        ? Wr.detail
        : Wr.target.value;
    if (Gi(Qr))
      if (Array.isArray(Jr)) {
        let Gr = null;
        return (
          Kr.includes("number")
            ? (Gr = bs(Wr.target.value))
            : Kr.includes("boolean")
              ? (Gr = zi(Wr.target.value))
              : (Gr = Wr.target.value),
          Wr.target.checked
            ? Jr.includes(Gr)
              ? Jr
              : Jr.concat([Gr])
            : Jr.filter((Zr) => !Af(Zr, Gr))
        );
      } else return Wr.target.checked;
    else {
      if (Qr.tagName.toLowerCase() === "select" && Qr.multiple)
        return Kr.includes("number")
          ? Array.from(Wr.target.selectedOptions).map((Gr) => {
              let Zr = Gr.value || Gr.text;
              return bs(Zr);
            })
          : Kr.includes("boolean")
            ? Array.from(Wr.target.selectedOptions).map((Gr) => {
                let Zr = Gr.value || Gr.text;
                return zi(Zr);
              })
            : Array.from(Wr.target.selectedOptions).map(
                (Gr) => Gr.value || Gr.text,
              );
      {
        let Gr;
        return (
          ta(Qr)
            ? Wr.target.checked
              ? (Gr = Wr.target.value)
              : (Gr = Jr)
            : (Gr = Wr.target.value),
          Kr.includes("number")
            ? bs(Gr)
            : Kr.includes("boolean")
              ? zi(Gr)
              : Kr.includes("trim")
                ? Gr.trim()
                : Gr
        );
      }
    }
  });
}
function bs(Qr) {
  let Kr = Qr ? parseFloat(Qr) : null;
  return Tf(Kr) ? Kr : Qr;
}
function Af(Qr, Kr) {
  return Qr == Kr;
}
function Tf(Qr) {
  return !Array.isArray(Qr) && !isNaN(Qr);
}
function Aa(Qr) {
  return (
    Qr !== null &&
    typeof Qr == "object" &&
    typeof Qr.get == "function" &&
    typeof Qr.set == "function"
  );
}
mn("cloak", (Qr) =>
  queueMicrotask(() => gn(() => Qr.removeAttribute(bi("cloak")))),
);
oo(() => `[${bi("init")}]`);
mn(
  "init",
  Qn((Qr, { expression: Kr }, { evaluate: Wr }) =>
    typeof Kr == "string" ? !!Kr.trim() && Wr(Kr, {}, !1) : Wr(Kr, {}, !1),
  ),
);
mn("text", (Qr, { expression: Kr }, { effect: Wr, evaluateLater: Jr }) => {
  let Gr = Jr(Kr);
  Wr(() => {
    Gr((Zr) => {
      gn(() => {
        Qr.textContent = Zr;
      });
    });
  });
});
mn("html", (Qr, { expression: Kr }, { effect: Wr, evaluateLater: Jr }) => {
  let Gr = Jr(Kr);
  Wr(
    () => {
      Gr((Zr) => {
        gn(() => {
          (Array.from(Qr.children).forEach((Yr) => fi(Yr)),
            (Qr.innerHTML = Zr ?? ""),
            (Qr._x_ignoreSelf = !0),
            qn(Qr),
            delete Qr._x_ignoreSelf);
        });
      });
    },
    { priority: "structural" },
  );
});
Ws(Ka(":", Wa(bi("bind:"))));
var Vo = (
  Qr,
  { value: Kr, modifiers: Wr, expression: Jr, original: Gr },
  { effect: Zr, cleanup: Yr },
) => {
  if (!Kr) {
    let tn = {};
    (Al(tn),
      bn(Qr, Jr)(
        (nn) => {
          xo(Qr, nn, Gr);
        },
        { scope: tn },
      ));
    return;
  }
  if (Kr === "key") return Cf(Qr, Jr);
  if (
    Qr._x_inlineBindings &&
    Qr._x_inlineBindings[Kr] &&
    Qr._x_inlineBindings[Kr].extract
  )
    return;
  let en = bn(Qr, Jr);
  (Zr(() =>
    en((tn) => {
      (tn === void 0 && typeof Jr == "string" && Jr.match(/\./) && (tn = ""),
        gn(() => co(Qr, Kr, tn, Wr)));
    }),
  ),
    Yr(() => {
      (Qr._x_undoAddedClasses && Qr._x_undoAddedClasses(),
        Qr._x_undoAddedStyles && Qr._x_undoAddedStyles());
    }));
};
Vo.inline = (Qr, { value: Kr, modifiers: Wr, expression: Jr }) => {
  Kr &&
    (Qr._x_inlineBindings || (Qr._x_inlineBindings = {}),
    (Qr._x_inlineBindings[Kr] = { expression: Jr, extract: !1 }));
};
mn("bind", Vo);
function Cf(Qr, Kr) {
  Qr._x_keyExpression = Kr;
}
ao(() => `[${bi("data")}]`);
var Jn = Symbol();
mn("data", (Qr, { expression: Kr }, { cleanup: Wr }) => {
  if (Nf(Qr)) return;
  let Jr = Qr[Jn];
  if (Jr?.expression === Kr) return;
  Kr = Kr === "" ? "{}" : Kr;
  let Gr = {};
  Wi(Gr, Qr);
  let Zr = {};
  Cl(Zr, Gr);
  let Yr = ti(Qr, Kr, { scope: Zr });
  ((Yr === void 0 || Yr === !0) && (Yr = {}), Wi(Yr, Qr));
  let en;
  if (Jr?.reactiveData) {
    ((en = Jr.reactiveData), Rf(en, Yr));
    let rn = { expression: Kr };
    ((Qr[Jn] = rn),
      queueMicrotask(() => {
        Qr[Jn] === rn && delete Qr[Jn];
      }));
  } else en = yi(Yr);
  Xs(en, Wr);
  let tn = ki(Qr, en);
  (Qn(() => {
    en.init && ti(Qr, en.init);
  })(),
    Wr(() => {
      (en.destroy && ti(Qr, en.destroy), tn());
      let rn = { reactiveData: en };
      ((Qr[Jn] = rn),
        queueMicrotask(() => {
          Qr[Jn] === rn && delete Qr[Jn];
        }));
    }));
});
function Rf(Qr, Kr) {
  (Object.keys(Kr).forEach((Wr) => {
    let Jr = Object.getOwnPropertyDescriptor(Kr, Wr),
      Gr = Object.getOwnPropertyDescriptor(Qr, Wr);
    Jr.get || Jr.set || Gr?.get || Gr?.set
      ? (Gr && delete Qr[Wr],
        Gr || (Qr[Wr] = void 0),
        Jr.get || Jr.set
          ? Object.defineProperty(Qr, Wr, Jr)
          : (Qr[Wr] = Kr[Wr]))
      : (Qr[Wr] = Kr[Wr]);
  }),
    Object.keys(Qr)
      .filter((Wr) => !Object.prototype.hasOwnProperty.call(Kr, Wr))
      .forEach((Wr) => delete Qr[Wr]));
}
Di((Qr, Kr) => {
  Qr._x_dataStack &&
    ((Kr._x_dataStack = Qr._x_dataStack),
    Kr.setAttribute("data-has-alpine-state", !0));
});
function Nf(Qr) {
  return Xn ? (Rs ? !0 : Qr.hasAttribute("data-has-alpine-state")) : !1;
}
mn("show", (Qr, { modifiers: Kr, expression: Wr }, { effect: Jr }) => {
  let Gr = bn(Qr, Wr);
  (Qr._x_doHide ||
    (Qr._x_doHide = () => {
      gn(() => {
        Qr.style.setProperty(
          "display",
          "none",
          Kr.includes("important") ? "important" : void 0,
        );
      });
    }),
    Qr._x_doShow ||
      (Qr._x_doShow = () => {
        gn(() => {
          Qr.style.length === 1 && Qr.style.display === "none"
            ? Qr.removeAttribute("style")
            : Qr.style.removeProperty("display");
        });
      }));
  let Zr = () => {
      (Qr._x_doHide(), (Qr._x_isShown = !1));
    },
    Yr = () => {
      (Qr._x_doShow(), (Qr._x_isShown = !0));
    },
    en = () => setTimeout(Yr),
    tn = Ls(
      (sn) => (sn ? Yr() : Zr()),
      (sn) => {
        typeof Qr._x_toggleAndCascadeWithTransitions == "function"
          ? Qr._x_toggleAndCascadeWithTransitions(Qr, sn, Yr, Zr)
          : sn
            ? en()
            : Zr();
      },
    ),
    rn,
    nn = !0;
  Jr(() =>
    Gr((sn) => {
      (!nn && sn === rn) ||
        (Kr.includes("immediate") && (sn ? en() : Zr()),
        tn(sn),
        (rn = sn),
        (nn = !1));
    }),
  );
});
mn(
  "for",
  Qn((Qr, { expression: Kr }, { effect: Wr, cleanup: Jr }) => {
    let Gr = Lf(Kr),
      Zr = bn(Qr, Gr.items),
      Yr = bn(Qr, Qr._x_keyExpression || "index");
    ((Qr._x_lookup = new Map()),
      Wr(() => Mf(Qr, Gr, Zr, Yr), { priority: "structural" }),
      Jr(() => {
        (Qr._x_lookup.forEach((en) =>
          gn(() => {
            (fi(en), en.remove());
          }),
        ),
          delete Qr._x_lookup,
          delete Qr._x_lastRenderedEl);
      }));
  }),
);
function If(Qr) {
  return (Kr) => {
    Object.entries(Kr).forEach(([Wr, Jr]) => {
      Qr[Wr] = Jr;
    });
  };
}
function Mf(Qr, Kr, Wr, Jr) {
  Wr((Gr) => {
    (kf(Gr) && (Gr = Array.from({ length: Gr }, (rn, nn) => nn + 1)),
      Gr == null && (Gr = []),
      Gr instanceof Set && (Gr = Array.from(Gr)),
      Gr instanceof Map && (Gr = Array.from(Gr)));
    let Zr = Qr._x_lookup,
      Yr = new Map();
    Qr._x_lookup = Yr;
    let en = Df(Gr),
      tn = Object.entries(Gr).map(([rn, nn]) => {
        en || (rn = parseInt(rn));
        let sn = Pf(Kr, nn, rn, Gr),
          an;
        return (
          Jr(
            (fn) => {
              (typeof fn == "object" &&
                Un(
                  "x-for key cannot be an object, it must be a string or an integer",
                  Qr,
                ),
                Zr.has(fn) && (Yr.set(fn, Zr.get(fn)), Zr.delete(fn)),
                (an = fn));
            },
            { scope: { index: rn, ...sn } },
          ),
          [an, sn]
        );
      });
    gn(() => {
      Zr.forEach((sn) => {
        (fi(sn), sn.remove());
      });
      let rn = new Set(),
        nn = Qr;
      (tn.forEach(([sn, an]) => {
        if (Yr.has(sn)) {
          let un = Yr.get(sn);
          (un._x_refreshXForScope(an),
            nn.nextElementSibling !== un &&
              (nn.nextElementSibling && un.replaceWith(nn.nextElementSibling),
              nn.after(un)),
            (nn = un),
            un._x_currentIfEl &&
              (un.nextElementSibling !== un._x_currentIfEl &&
                nn.after(un._x_currentIfEl),
              (nn = un._x_currentIfEl)));
          return;
        }
        Qr.content.children.length > 1 &&
          Un(
            "x-for templates require a single root element, additional elements will be ignored.",
            Qr,
          );
        let fn = document.importNode(Qr.content, !0).firstElementChild,
          pn = yi(an);
        (ki(fn, pn, Qr),
          (fn._x_refreshXForScope = If(pn)),
          Yr.set(sn, fn),
          rn.add(fn),
          nn.after(fn),
          (nn = fn));
      }),
        rn.forEach((sn) => qn(sn)),
        nn !== Qr ? (Qr._x_lastRenderedEl = nn) : delete Qr._x_lastRenderedEl);
    });
  });
}
function Lf(Qr) {
  let Kr = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/,
    Wr = /^\s*\(|\)\s*$/g,
    Jr = /([\s\S]*?)\b(?:in|of)\b([\s\S]*)/,
    Gr = Qr.match(Jr);
  if (!Gr) return;
  let Zr = {};
  Zr.items = Gr[2].trim();
  let Yr = Gr[1].replace(Wr, "").trim(),
    en = Yr.match(Kr);
  return (
    en
      ? ((Zr.item = Yr.replace(Kr, "").trim()),
        (Zr.index = en[1].trim()),
        en[2] && (Zr.collection = en[2].trim()))
      : (Zr.item = Yr),
    Zr
  );
}
function Pf(Qr, Kr, Wr, Jr) {
  let Gr = {};
  return (
    /^\[.*\]$/.test(Qr.item) && Array.isArray(Kr)
      ? Qr.item
          .replace("[", "")
          .replace("]", "")
          .split(",")
          .map((Yr) => Yr.trim())
          .forEach((Yr, en) => {
            Gr[Yr] = Kr[en];
          })
      : /^\{.*\}$/.test(Qr.item) && !Array.isArray(Kr) && typeof Kr == "object"
        ? Qr.item
            .replace("{", "")
            .replace("}", "")
            .split(",")
            .map((Yr) => Yr.trim())
            .forEach((Yr) => {
              Gr[Yr] = Kr[Yr];
            })
        : (Gr[Qr.item] = Kr),
    Qr.index && (Gr[Qr.index] = Wr),
    Qr.collection && (Gr[Qr.collection] = Jr),
    Gr
  );
}
function kf(Qr) {
  return typeof Qr != "object" && !isNaN(Qr);
}
function Df(Qr) {
  return typeof Qr == "object" && !Array.isArray(Qr);
}
function zo() {}
zo.inline = (Qr, { expression: Kr }, { cleanup: Wr }) => {
  let Jr = ss(Qr);
  Jr &&
    (Jr._x_refs || (Jr._x_refs = {}),
    (Jr._x_refs[Kr] = Qr),
    Wr(() => delete Jr._x_refs[Kr]));
};
mn("ref", zo);
mn(
  "if",
  Qn((Qr, { expression: Kr }, { effect: Wr, cleanup: Jr }) => {
    Qr.tagName.toLowerCase() !== "template" &&
      Un("x-if can only be used on a <template> tag", Qr);
    let Gr = bn(Qr, Kr),
      Zr = () => {
        if (Qr._x_currentIfEl) return Qr._x_currentIfEl;
        let en = Qr.content.cloneNode(!0).firstElementChild;
        return (
          ki(en, {}, Qr),
          gn(() => {
            (Qr.after(en), qn(en));
          }),
          (Qr._x_currentIfEl = en),
          (Qr._x_lastRenderedEl = en),
          (Qr._x_undoIf = () => {
            (gn(() => {
              (fi(en), en.remove());
            }),
              delete Qr._x_currentIfEl,
              delete Qr._x_lastRenderedEl);
          }),
          en
        );
      },
      Yr = () => {
        Qr._x_undoIf && (Qr._x_undoIf(), delete Qr._x_undoIf);
      };
    (Wr(
      () =>
        Gr((en) => {
          en ? Zr() : Yr();
        }),
      { priority: "structural" },
    ),
      Jr(() => Qr._x_undoIf && Qr._x_undoIf()));
  }),
);
mn("id", (Qr, { expression: Kr }, { evaluate: Wr }) => {
  Wr(Kr).forEach((Gr) => mf(Qr, Gr));
});
Di((Qr, Kr) => {
  Qr._x_ids && (Kr._x_ids = Qr._x_ids);
});
Ws(Ka("@", Wa(bi("on:"))));
mn(
  "on",
  Qn((Qr, { value: Kr, modifiers: Wr, expression: Jr }, { cleanup: Gr }) => {
    let Zr = Jr ? bn(Qr, Jr) : () => {};
    Qr.tagName.toLowerCase() === "template" &&
      (Qr._x_forwardEvents || (Qr._x_forwardEvents = []),
      Qr._x_forwardEvents.includes(Kr) || Qr._x_forwardEvents.push(Kr));
    let Yr = gi(Qr, Kr, Wr, (en) => {
      Zr(() => {}, { scope: { $event: en }, params: [en] });
    });
    Gr(() => Yr());
  }),
);
us("Collapse", "collapse", "collapse");
us("Intersect", "intersect", "intersect");
us("Focus", "trap", "focus");
us("Mask", "mask", "mask");
function us(Qr, Kr, Wr) {
  mn(Kr, (Jr) =>
    Un(
      `You can't use [x-${Kr}] without first installing the "${Qr}" plugin here: https://alpinejs.dev/plugins/${Wr}`,
      Jr,
    ),
  );
}
mn("html", (Qr, { expression: Kr }) => {
  rs(
    new Error("Using the x-html directive is prohibited in the CSP build"),
    Qr,
  );
});
_i.setEvaluator(kl);
_i.setRawEvaluator(Pl);
_i.setReactivityEngine({
  reactive: oa,
  effect: (Qr, Kr = {}) => {
    let Wr;
    return (
      (Wr = zl(Qr, {
        scheduler: () => {
          Wr && (Kr.scheduler ? Kr.scheduler(Wr) : Wr());
        },
      })),
      Wr
    );
  },
  release: Xl,
  raw: hn,
});
var Uf = _i,
  Ln = Uf;
var ls = su(Xo());

window.Alpine = Ln;
window.htmx = ls.default;
ls.default.config.allowEval = !1;
ls.default.config.allowScriptTags = !1;
Ln.data("theme", () => ({
  theme: localStorage.getItem("focusflow_theme") || "light",
  accent: localStorage.getItem("focusflow_accent") || "forest",
  init() {
    this.applyTheme();
    this.applyAccent();
  },
  applyTheme() {
    let Qr =
      this.theme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : this.theme;
    (document.documentElement.setAttribute("data-theme", Qr),
      document.documentElement.classList.toggle("dark", Qr === "dark"));
  },
  toggleTheme() {
    ((this.theme = this.theme === "dark" ? "light" : "dark"),
      localStorage.setItem("focusflow_theme", this.theme),
      this.applyTheme());
  },
  setAccent(newAccent) {
    ((this.accent = newAccent),
      localStorage.setItem("focusflow_accent", newAccent),
      this.applyAccent());
  },
  applyAccent() {
    document.documentElement.setAttribute("data-accent", this.accent);
  },
}));
Ln.data("routineModal", () => ({
  isOpen: !1,
  openModal() {
    this.isOpen = !0;
  },
  closeModal() {
    this.isOpen = !1;
  },
}));
Ln.data("habitModal", () => ({
  isOpen: !1,
  openModal() {
    this.isOpen = !0;
  },
  closeModal() {
    this.isOpen = !1;
  },
}));
Ln.data("notificationTray", () => ({
  openTray: !1,
  toggleTray() {
    this.openTray = !this.openTray;
  },
  closeTray() {
    this.openTray = !1;
  },
}));
Ln.data("settingsTabs", () => ({
  tab: "profile",
  setTab(Qr) {
    this.tab = Qr;
  },
}));
Ln.data("pomodoro", () => ({
  modes: { focus: 1500, short: 300, long: 900 },
  currentMode: "focus",
  timeLeft: 1500,
  isRunning: !1,
  timer: null,
  lastUpdatedAt: null,
  storageKey: "focusflow_pomodoro",
  init() {
    let Qr = JSON.parse(localStorage.getItem(this.storageKey) || "{}"),
      Kr =
        Qr.currentMode && this.modes[Qr.currentMode]
          ? Qr.currentMode
          : this.currentMode;
    if (
      ((this.currentMode = Kr),
      (this.timeLeft =
        typeof Qr.timeLeft == "number"
          ? Math.min(this.modes[Kr], Math.max(0, Qr.timeLeft))
          : this.modes[Kr]),
      (this.isRunning = !!Qr.isRunning),
      (this.lastUpdatedAt =
        typeof Qr.lastUpdatedAt == "number" ? Qr.lastUpdatedAt : Date.now()),
      this.isRunning && this.lastUpdatedAt)
    ) {
      let Wr = Math.max(0, Math.floor((Date.now() - this.lastUpdatedAt) / 1e3));
      ((this.timeLeft = Math.max(0, this.timeLeft - Wr)),
        this.timeLeft === 0 &&
          ((this.isRunning = !1),
          this.$dispatch("show-toast", {
            message: "Focus block finished! Take a break.",
            type: "info",
          })));
    }
    (this.persist(), this.isRunning && this.start());
  },
  persist() {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify({
        currentMode: this.currentMode,
        timeLeft: this.timeLeft,
        isRunning: this.isRunning,
        lastUpdatedAt: Date.now(),
      }),
    );
  },
  setMode(Qr) {
    (this.pause(),
      (this.currentMode = Qr),
      (this.timeLeft = this.modes[Qr]),
      this.persist());
  },
  toggle() {
    this.isRunning ? this.pause() : this.start();
  },
  start() {
    (this.timeLeft <= 0 && (this.timeLeft = this.modes[this.currentMode]),
      (this.isRunning = !0),
      (this.lastUpdatedAt = Date.now()),
      this.persist(),
      this.timer && window.clearInterval(this.timer),
      (this.timer = window.setInterval(() => {
        this.timeLeft > 0
          ? ((this.timeLeft -= 1), this.persist())
          : (this.pause(),
            this.$dispatch("show-toast", {
              message: "Focus block finished! Take a break.",
              type: "info",
            }));
      }, 1e3)));
  },
  pause() {
    ((this.isRunning = !1),
      this.timer && (window.clearInterval(this.timer), (this.timer = null)),
      (this.lastUpdatedAt = Date.now()),
      this.persist());
  },
  reset() {
    (this.pause(),
      (this.timeLeft = this.modes[this.currentMode]),
      this.persist());
  },
  formatTime() {
    let Qr = Math.floor(this.timeLeft / 60)
        .toString()
        .padStart(2, "0"),
      Kr = (this.timeLeft % 60).toString().padStart(2, "0");
    return `${Qr}:${Kr}`;
  },
}));
Ln.data("toastNotifications", () => ({
  toasts: [],
  addToast(Qr, Kr = "info") {
    let Wr = Date.now();
    (this.toasts.push({ id: Wr, message: Qr, type: Kr }),
      window.setTimeout(() => {
        this.toasts = this.toasts.filter((Jr) => Jr.id !== Wr);
      }, 4e3));
  },
}));
document.addEventListener("htmx:beforeSwap", (Qr) => {
  Qr.detail.xhr.status === 422 && (Qr.detail.shouldSwap = !0);
});
document.addEventListener("htmx:afterRequest", (Qr) => {
  if (!Qr.detail.successful || !(Qr.target instanceof HTMLFormElement)) return;
  let Kr = Qr.target.closest('[x-data="habitModal"], [x-data="routineModal"]');
  (Kr && Ln.$data(Kr).closeModal(),
    Kr?.matches('[x-data="routineModal"]') &&
      document.querySelector("#empty-blocks")?.remove());
});
Ln.start();
/*! Bundled license information:

@alpinejs/csp/dist/module.esm.js:
  (*! Bundled license information:
  
  @vue/shared/dist/shared.esm-bundler.js:
    (**
    * @vue/shared v3.5.41
    * (c) 2018-present Yuxi (Evan) You and Vue contributors
    * @license MIT
    **)
  
  @vue/reactivity/dist/reactivity.esm-bundler.js:
    (**
    * @vue/reactivity v3.5.41
    * (c) 2018-present Yuxi (Evan) You and Vue contributors
    * @license MIT
    **)
  *)
*/
