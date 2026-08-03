import "./index.css";
import { i as e, n as t, r as n, t as r } from "./theme-B5Hf-g9g.js";
import { createContext as i, createElement as a, forwardRef as o, useContext as s, useEffect as c, useLayoutEffect as l, useMemo as u, useRef as d, useState as f } from "react";
import { jsx as p, jsxs as m } from "react/jsx-runtime";
//#region src/LastStackUI.tsx
var h = i(null);
function g() {
	return s(h);
}
var _ = typeof window > "u" ? c : l;
function v({ children: e, className: n = "", style: r, theme: i, scope: a = "auto", ...o }) {
	let c = d(null), l = s(h), f = a === "root" || a === "auto" && l === null, m = u(() => i ? t(i) : null, [i ? JSON.stringify(i) : ""]);
	return _(() => {
		if (!f || !m) return;
		let e = document.documentElement, t = Object.entries(m), n = t.map(([t]) => [t, e.style.getPropertyValue(t)]);
		for (let [n, r] of t) e.style.setProperty(n, r);
		return () => {
			for (let [t, r] of n) r ? e.style.setProperty(t, r) : e.style.removeProperty(t);
		};
	}, [f, m]), /* @__PURE__ */ p(h.Provider, {
		value: c,
		children: /* @__PURE__ */ p("div", {
			ref: c,
			className: `ls-ui ${n}`.trim(),
			style: {
				...m,
				...r
			},
			...o,
			children: e
		})
	});
}
//#endregion
//#region src/components/Badge.tsx
function y({ className: e = "", size: t = "md", tone: n = "primary", ...r }) {
	return /* @__PURE__ */ p("span", {
		className: `ui-badge ui-badge--${n} ui-badge--${t} ${e}`.trim(),
		...r
	});
}
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/mergeClasses.mjs
var b = (...e) => e.filter((e, t, n) => !!e && e.trim() !== "" && n.indexOf(e) === t).join(" ").trim(), x = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), S = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, n) => n ? n.toUpperCase() : t.toLowerCase()), C = (e) => {
	let t = S(e);
	return t.charAt(0).toUpperCase() + t.slice(1);
}, w = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2,
	strokeLinecap: "round",
	strokeLinejoin: "round"
}, ee = (e) => {
	for (let t in e) if (t.startsWith("aria-") || t === "role" || t === "title") return !0;
	return !1;
}, T = i({}), E = () => s(T), D = o(({ color: e, size: t, strokeWidth: n, absoluteStrokeWidth: r, className: i = "", children: o, iconNode: s, ...c }, l) => {
	let { size: u = 24, strokeWidth: d = 2, absoluteStrokeWidth: f = !1, color: p = "currentColor", className: m = "" } = E() ?? {}, h = r ?? f ? Number(n ?? d) * 24 / Number(t ?? u) : n ?? d;
	return a("svg", {
		ref: l,
		...w,
		width: t ?? u ?? w.width,
		height: t ?? u ?? w.height,
		stroke: e ?? p,
		strokeWidth: h,
		className: b("lucide", m, i),
		...!o && !ee(c) && { "aria-hidden": "true" },
		...c
	}, [...s.map(([e, t]) => a(e, t)), ...Array.isArray(o) ? o : [o]]);
}), O = (e, t) => {
	let n = o(({ className: n, ...r }, i) => a(D, {
		ref: i,
		iconNode: t,
		className: b(`lucide-${x(C(e))}`, `lucide-${e}`, n),
		...r
	}));
	return n.displayName = C(e), n;
}, te = O("chevron-right", [["path", {
	d: "m9 18 6-6-6-6",
	key: "mthhwq"
}]]), k = O("circle-check", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
}]]), A = O("circle-x", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "m15 9-6 6",
		key: "1uzhvr"
	}],
	["path", {
		d: "m9 9 6 6",
		key: "z0biqf"
	}]
]), j = {
	info: O("info", [
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}],
		["path", {
			d: "M12 16v-4",
			key: "1dtifu"
		}],
		["path", {
			d: "M12 8h.01",
			key: "e9boi3"
		}]
	]),
	success: k,
	warning: O("triangle-alert", [
		["path", {
			d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
			key: "wmoenq"
		}],
		["path", {
			d: "M12 9v4",
			key: "juzpu7"
		}],
		["path", {
			d: "M12 17h.01",
			key: "p32p05"
		}]
	]),
	error: A
};
function M({ className: e = "", tone: t = "info", title: n, flush: r = !1, children: i, ...a }) {
	let o = j[t];
	return /* @__PURE__ */ m("div", {
		className: `ui-callout ui-callout--${t}${r ? " ui-callout--flush" : ""} ${e}`.trim(),
		...a,
		children: [/* @__PURE__ */ p(o, {
			className: "ui-callout__icon",
			"aria-hidden": !0
		}), /* @__PURE__ */ m("div", {
			className: "ui-callout__content",
			children: [n && /* @__PURE__ */ p("p", {
				className: "ui-callout__title",
				children: n
			}), i]
		})]
	});
}
//#endregion
//#region src/components/Button.tsx
function N({ className: e = "", size: t = "md", tone: n = "primary", variant: r = "solid", loading: i = !1, disabled: a, children: o, ...s }) {
	return /* @__PURE__ */ m("button", {
		"aria-busy": i || void 0,
		className: `ui-button ui-button--${r} ui-button--${n} ui-button--${t}${i ? " ui-button--loading" : ""} ${e}`.trim(),
		disabled: a || i,
		...s,
		children: [i ? /* @__PURE__ */ p("span", {
			"aria-hidden": !0,
			className: "ui-button__spinner"
		}) : null, o]
	});
}
//#endregion
//#region src/components/Card.tsx
function P({ className: e = "", variant: t = "default", ...n }) {
	return /* @__PURE__ */ p("div", {
		className: `ui-card ui-card--${t} ${e}`.trim(),
		...n
	});
}
function F({ className: e = "", ...t }) {
	return /* @__PURE__ */ p("h3", {
		className: `ui-card__title ${e}`.trim(),
		...t
	});
}
function I({ className: e = "", ...t }) {
	return /* @__PURE__ */ p("p", {
		className: `ui-card__description ${e}`.trim(),
		...t
	});
}
//#endregion
//#region src/components/Checkbox.tsx
function L({ children: e, className: t = "", tone: n = "primary", ...r }) {
	return /* @__PURE__ */ m("label", {
		className: `ui-checkbox ui-checkbox--${n} ${t}`.trim(),
		children: [/* @__PURE__ */ p("input", {
			type: "checkbox",
			...r
		}), /* @__PURE__ */ p("span", { children: e })]
	});
}
//#endregion
//#region src/components/SegmentedControl.tsx
function R({ "aria-label": e, className: t = "", onChange: n, options: r, size: i = "md", tone: a = "primary", value: o }) {
	return /* @__PURE__ */ p("div", {
		"aria-label": e,
		className: `ui-segmented ui-segmented--${a} ui-segmented--${i} ${t}`.trim(),
		role: "radiogroup",
		children: r.map((e) => /* @__PURE__ */ p("button", {
			"aria-checked": e.value === o,
			onClick: () => n(e.value),
			role: "radio",
			type: "button",
			children: e.label
		}, e.value))
	});
}
//#endregion
//#region src/components/Slider.tsx
var z = (e, t) => {
	let n = typeof e == "number" ? e : Number(e);
	return Number.isFinite(n) ? n : t;
};
function B({ className: e = "", label: t, tone: n = "primary", valueLabel: r, style: i, ...a }) {
	let o = z(a.min, 0), s = z(a.max, 100), c = z(a.value ?? a.defaultValue, o), l = s === o ? 0 : Math.min(100, Math.max(0, (c - o) / (s - o) * 100));
	return /* @__PURE__ */ m("label", {
		className: `ui-slider ui-slider--${n} ${e}`.trim(),
		style: i,
		children: [/* @__PURE__ */ m("span", { children: [t, r ? /* @__PURE__ */ p("strong", { children: r }) : null] }), /* @__PURE__ */ p("input", {
			type: "range",
			style: { "--slider-pct": `${l}%` },
			...a
		})]
	});
}
//#endregion
//#region src/components/ComponentPreviewCards.tsx
function V({ mode: e }) {
	let [t, n] = f("left"), [r, i] = f(72);
	return /* @__PURE__ */ p("div", {
		className: e === "dark" ? "dark" : "ls-ui light",
		children: /* @__PURE__ */ m(P, {
			className: "grid gap-[22px]",
			children: [
				/* @__PURE__ */ m("div", { children: [/* @__PURE__ */ p(F, { children: "425 Industrial Way" }), /* @__PURE__ */ p(I, { children: "last comp: 03/2026 · 18,400 sqft" })] }),
				/* @__PURE__ */ m("div", {
					className: "flex flex-wrap gap-3",
					"aria-label": "Semantic badge examples",
					children: [
						/* @__PURE__ */ p(y, {
							tone: "info",
							children: "info"
						}),
						/* @__PURE__ */ p(y, {
							tone: "success",
							children: "success"
						}),
						/* @__PURE__ */ p(y, {
							tone: "warning",
							children: "warning"
						}),
						/* @__PURE__ */ p(y, {
							tone: "error",
							children: "error"
						})
					]
				}),
				/* @__PURE__ */ p(M, {
					tone: "info",
					title: "Market note",
					children: "Vacancy is trending down across comparable industrial assets."
				}),
				/* @__PURE__ */ m("div", {
					className: "grid grid-cols-[repeat(auto-fit,minmax(min(150px,100%),max-content))] items-center gap-4 max-[560px]:flex max-[560px]:flex-col max-[560px]:items-stretch",
					"aria-label": "Primary and accent button examples",
					children: [
						/* @__PURE__ */ p(N, { children: "primary filled" }),
						/* @__PURE__ */ p(N, {
							variant: "outline",
							children: "primary outline"
						}),
						/* @__PURE__ */ p(N, {
							tone: "accent",
							children: "accent filled"
						}),
						/* @__PURE__ */ p(N, {
							tone: "accent",
							variant: "outline",
							children: "accent outline"
						})
					]
				}),
				/* @__PURE__ */ m("div", {
					className: "grid w-[min(340px,100%)] gap-3.5 [&_.ui-segmented]:w-full [&_.ui-segmented_button]:flex-1 [&_.ui-slider]:w-full",
					"aria-label": "Input component examples",
					children: [
						/* @__PURE__ */ p(L, {
							defaultChecked: !0,
							children: "Include off-market comps"
						}),
						/* @__PURE__ */ p(B, {
							label: "Confidence",
							max: "100",
							min: "0",
							onChange: (e) => i(Number(e.target.value)),
							value: r,
							valueLabel: `${r}%`
						}),
						/* @__PURE__ */ p(R, {
							"aria-label": "Example view",
							options: [{
								label: "left",
								value: "left"
							}, {
								label: "right",
								value: "right"
							}],
							onChange: n,
							value: t
						})
					]
				})
			]
		})
	});
}
//#endregion
//#region src/palette.ts
var H = [
	50,
	100,
	200,
	300,
	400,
	500,
	600,
	700,
	800,
	900,
	950
];
function U(e) {
	return e <= 500 ? "dark" : "light";
}
var W = () => ({
	...Object.fromEntries(H.map((e) => [e, ""])),
	seed: ""
}), G = () => Object.fromEntries(e.map((e) => [e, W()]));
function K(e, t) {
	let n = document.createElement("span");
	n.style.cssText = "position:absolute;width:0;height:0;visibility:hidden;pointer-events:none", e.appendChild(n);
	let r = getComputedStyle(n), i = t.map((e) => (n.style.color = "", n.style.color = `var(${e})`, r.color));
	return n.remove(), i;
}
function q(t) {
	let n = g(), [r, i] = f(G);
	return c(() => {
		let r = t?.current ?? n?.current ?? document.documentElement;
		if (!r) return;
		let a = e.flatMap((e) => [`--color-${e}`, ...H.map((t) => `--color-${e}-${t}`)]), o = () => {
			let t = K(r, a), n = 0;
			i(Object.fromEntries(e.map((e) => {
				let r = t[n++];
				return [e, {
					...Object.fromEntries(H.map((e) => [e, t[n++]])),
					seed: r
				}];
			})));
		};
		o();
		let s = new MutationObserver(o);
		return s.observe(r, {
			attributes: !0,
			attributeFilter: ["style", "class"]
		}), () => s.disconnect();
	}, [t, n]), r;
}
//#endregion
//#region src/components/RampSwatches.tsx
function J() {
	let t = q();
	return /* @__PURE__ */ p("div", {
		className: "grid gap-4",
		children: e.map((e) => /* @__PURE__ */ m("div", {
			className: "grid gap-1.5",
			children: [/* @__PURE__ */ m("div", {
				className: "flex items-baseline gap-2",
				children: [
					/* @__PURE__ */ p("span", {
						className: "text-[0.88rem] font-semibold text-text-primary",
						children: e
					}),
					/* @__PURE__ */ p("span", {
						className: "inline-block h-3 w-3 rounded-full border border-border align-middle",
						style: { background: `var(--color-${e})` }
					}),
					/* @__PURE__ */ m("span", {
						className: "font-mono text-[0.72rem] text-text-secondary",
						children: ["seed ", t[e].seed]
					})
				]
			}), /* @__PURE__ */ p("div", {
				className: "grid gap-1",
				style: { gridTemplateColumns: `repeat(${H.length}, minmax(0, 1fr))` },
				children: H.map((t) => /* @__PURE__ */ m("div", {
					className: "grid h-14 min-w-0 content-between rounded-md p-1.5",
					style: {
						background: `var(--color-${e}-${t})`,
						color: U(t) === "dark" ? "#000" : "#fff"
					},
					title: `--color-${e}-${t}`,
					children: [/* @__PURE__ */ p("span", {
						className: "font-mono text-[0.7rem] font-medium",
						children: t
					}), /* @__PURE__ */ p("span", {
						className: "font-mono text-[0.6rem] opacity-80",
						children: U(t) === "dark" ? "black" : "white"
					})]
				}, t))
			})]
		}, e))
	});
}
//#endregion
//#region src/components/Container.tsx
function Y({ className: e = "", size: t = "md", ...n }) {
	return /* @__PURE__ */ p("div", {
		className: `ui-container ui-container--${t} ${e}`.trim(),
		...n
	});
}
//#endregion
//#region src/components/Disclosure.tsx
function X({ className: e = "", title: t, defaultOpen: n = !1, children: r, ...i }) {
	return /* @__PURE__ */ m("details", {
		className: `ui-disclosure ${e}`.trim(),
		open: n,
		...i,
		children: [/* @__PURE__ */ m("summary", {
			className: "ui-disclosure__summary",
			children: [/* @__PURE__ */ p(te, {
				className: "ui-disclosure__chevron",
				"aria-hidden": !0
			}), /* @__PURE__ */ p("span", {
				className: "ui-disclosure__title",
				children: t
			})]
		}), /* @__PURE__ */ p("div", {
			className: "ui-disclosure__content",
			children: r
		})]
	});
}
//#endregion
//#region src/components/Field.tsx
function ne({ className: e = "", children: t, label: n, hint: r, error: i, htmlFor: a, ...o }) {
	return /* @__PURE__ */ m("div", {
		className: `ui-field ${e}`.trim(),
		...o,
		children: [
			n ? /* @__PURE__ */ p("label", {
				className: "ui-field__label",
				htmlFor: a,
				children: n
			}) : null,
			t,
			i ? /* @__PURE__ */ p("p", {
				className: "ui-field__error",
				children: i
			}) : r ? /* @__PURE__ */ p("p", {
				className: "ui-field__hint",
				children: r
			}) : null
		]
	});
}
//#endregion
//#region src/components/Inline.tsx
function Z({ className: e = "", gap: t = "md", align: n = "center", justify: r = "start", wrap: i = !1, ...a }) {
	return /* @__PURE__ */ p("div", {
		className: `ui-inline ui-inline--gap-${t} ui-inline--align-${n} ui-inline--justify-${r}${i ? " ui-inline--wrap" : ""} ${e}`.trim(),
		...a
	});
}
//#endregion
//#region src/components/Input.tsx
function re({ className: e = "", inputSize: t = "md", invalid: n = !1, ...r }) {
	return /* @__PURE__ */ p("input", {
		"aria-invalid": n || void 0,
		className: `ui-input ui-input--${t}${n ? " ui-input--invalid" : ""} ${e}`.trim(),
		...r
	});
}
//#endregion
//#region src/components/Progress.tsx
function ie({ className: e = "", value: t = 0, max: n = 100, tone: r = "primary", size: i = "md", segments: a, ...o }) {
	let s = a ?? [{
		value: t,
		tone: r
	}], c = s.reduce((e, t) => e + Math.max(0, t.value), 0), l = (e) => n <= 0 ? 0 : Math.min(100, Math.max(0, e) / n * 100);
	return /* @__PURE__ */ p("div", {
		className: `ui-progress ui-progress--${i} ${e}`.trim(),
		role: "progressbar",
		"aria-valuemin": 0,
		"aria-valuemax": n,
		"aria-valuenow": c,
		...o,
		children: s.map((e, t) => /* @__PURE__ */ p("div", {
			className: `ui-progress__fill ui-progress__fill--${e.tone ?? r}`,
			style: { width: `${l(e.value)}%` }
		}, `${t}-${e.tone ?? r}`))
	});
}
//#endregion
//#region src/components/Spinner.tsx
function ae({ className: e = "", size: t = "md", tone: n = "primary", label: r = "Loading", ...i }) {
	return /* @__PURE__ */ p("span", {
		"aria-label": r,
		className: `ui-spinner ui-spinner--${t} ui-spinner--${n} ${e}`.trim(),
		role: "status",
		...i
	});
}
//#endregion
//#region src/components/Stack.tsx
function oe({ className: e = "", gap: t = "md", align: n = "stretch", ...r }) {
	return /* @__PURE__ */ p("div", {
		className: `ui-stack ui-stack--gap-${t} ui-stack--align-${n} ${e}`.trim(),
		...r
	});
}
//#endregion
//#region src/components/Tabs.tsx
function se({ className: e = "", tone: t = "primary", size: n = "md", rule: r = !1, ...i }) {
	return /* @__PURE__ */ p("nav", {
		className: `ui-tabs ui-tabs--${t} ui-tabs--${n}${r ? " ui-tabs--rule" : ""} ${e}`.trim(),
		...i
	});
}
function ce({ className: e = "", active: t = !1, ...n }) {
	return /* @__PURE__ */ p("a", {
		className: `ui-tab ${e}`.trim(),
		"aria-current": t ? "page" : void 0,
		...n
	});
}
//#endregion
//#region src/components/Table.tsx
function le({ className: e = "", size: t = "md", caption: n, children: r, ...i }) {
	return /* @__PURE__ */ p("div", {
		className: "ui-table__scroll",
		children: /* @__PURE__ */ m("table", {
			className: `ui-table ui-table--${t} ${e}`.trim(),
			...i,
			children: [n ? /* @__PURE__ */ p("caption", {
				className: "ui-table__caption",
				children: n
			}) : null, r]
		})
	});
}
function ue({ className: e = "", ...t }) {
	return /* @__PURE__ */ p("thead", {
		className: `ui-table__head ${e}`.trim(),
		...t
	});
}
function de({ className: e = "", ...t }) {
	return /* @__PURE__ */ p("tbody", {
		className: `ui-table__body ${e}`.trim(),
		...t
	});
}
function fe({ className: e = "", ...t }) {
	return /* @__PURE__ */ p("tr", {
		className: `ui-table__row ${e}`.trim(),
		...t
	});
}
function pe({ className: e = "", numeric: t = !1, scope: n = "col", ...r }) {
	return /* @__PURE__ */ p("th", {
		className: `ui-table__header${t ? " ui-table__header--numeric" : ""} ${e}`.trim(),
		scope: n,
		...r
	});
}
function me({ className: e = "", numeric: t = !1, ...n }) {
	return /* @__PURE__ */ p("td", {
		className: `ui-table__cell${t ? " ui-table__cell--numeric" : ""} ${e}`.trim(),
		...n
	});
}
//#endregion
//#region src/components/Text.tsx
function he({ className: e = "", tone: t = "default", size: n = "md", weight: r = "normal", ...i }) {
	return /* @__PURE__ */ p("span", {
		className: `ui-text ui-text--${t} ui-text--${n} ui-text--${r} ${e}`.trim(),
		...i
	});
}
//#endregion
//#region src/components/Textarea.tsx
function ge({ className: e = "", invalid: t = !1, ...n }) {
	return /* @__PURE__ */ p("textarea", {
		"aria-invalid": t || void 0,
		className: `ui-textarea${t ? " ui-textarea--invalid" : ""} ${e}`.trim(),
		...n
	});
}
//#endregion
//#region src/useLastStackColorValues.ts
var Q = {
	default: "",
	muted: "",
	foreground: "",
	hover: ""
}, _e = {
	primary: Q,
	accent: Q,
	success: Q,
	warning: Q,
	error: Q,
	info: Q,
	background: {
		default: "",
		muted: "",
		raised: ""
	},
	foreground: {
		default: "",
		muted: "",
		subtle: ""
	},
	border: {
		default: "",
		muted: "",
		focus: ""
	}
}, ve = [
	"primary",
	"accent",
	"success",
	"warning",
	"error",
	"info"
];
function $(e) {
	let t = g(), [n, r] = f(_e);
	return c(() => {
		let n = e?.current ?? t?.current ?? document.documentElement, i = getComputedStyle(n), a = (e) => i.getPropertyValue(`--color-${e}`).trim();
		r({
			...Object.fromEntries(ve.map((e) => [e, {
				default: a(e),
				muted: a(`${e}-tint`),
				foreground: a(`${e}-on-tint`),
				hover: a(`${e}-hover`)
			}])),
			background: {
				default: a("bg"),
				muted: a("bg-neutral"),
				raised: a("surface")
			},
			foreground: {
				default: a("text-primary"),
				muted: a("text-secondary"),
				subtle: a("text-subtle")
			},
			border: {
				default: a("border"),
				muted: a("border-neutral"),
				focus: a("border-focus")
			}
		});
	}, [e, t]), { palette: n };
}
function ye(e) {
	return $(e).palette;
}
//#endregion
export { y as Badge, N as Button, M as Callout, P as Card, I as CardDescription, F as CardTitle, L as Checkbox, V as ComponentPreviewCard, Y as Container, X as Disclosure, ne as Field, Z as Inline, re as Input, v as LastStackUI, ie as Progress, J as RampSwatches, R as SegmentedControl, B as Slider, ae as Spinner, oe as Stack, ce as Tab, le as Table, de as TableBody, me as TableCell, ue as TableHead, pe as TableHeaderCell, fe as TableRow, se as Tabs, he as Text, ge as Textarea, r as createThemeConfig, t as createThemeStyle, n as defaultThemeConfig, H as rampSteps, e as seedColorNames, U as stepTextTone, ye as useLastStackColorValues, g as useLastStackScope, q as usePalette, $ as useTheme };
