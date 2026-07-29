import "./index.css";
import { createContext as e, createElement as t, forwardRef as n, useContext as r, useEffect as i, useLayoutEffect as a, useMemo as o, useRef as s, useState as c } from "react";
import { jsx as l, jsxs as u } from "react/jsx-runtime";
//#region src/theme.ts
var d = [
	"primary",
	"accent",
	"info",
	"success",
	"warning",
	"error"
], f = {
	seeds: {
		primary: "#292966",
		accent: "#9ac2d9",
		info: "#4f8fbf",
		success: "#5fa868",
		warning: "#d9a441",
		error: "#c9626b"
	},
	clamps: {
		primaryLight: !0,
		primaryDark: !0,
		accentLight: !0,
		accentDark: !0
	},
	surface: {
		tint: 4,
		tintSource: "primary",
		lightBrightness: 8,
		darkLift: 12
	}
};
function p(e) {
	return {
		seeds: {
			...f.seeds,
			...e.seeds
		},
		clamps: {
			...f.clamps,
			...e.clamps
		},
		surface: {
			...f.surface,
			...e.surface
		}
	};
}
function m(e) {
	let { clamps: t, seeds: n, surface: r } = p(e);
	return {
		"--color-primary": n.primary,
		"--color-accent": n.accent,
		"--color-info": n.info,
		"--color-success": n.success,
		"--color-warning": n.warning,
		"--color-error": n.error,
		"--color-action-primary-light": h("primary", "light", t.primaryLight),
		"--color-action-primary-dark": h("primary", "dark", t.primaryDark),
		"--color-action-accent-light": h("accent", "light", t.accentLight),
		"--color-action-accent-dark": h("accent", "dark", t.accentDark),
		"--light-bg-neutral-mix": `${12 - r.lightBrightness}%`,
		"--light-surface-neutral-mix": `${Math.max(9 - r.lightBrightness, 0)}%`,
		"--light-border-neutral-mix": `${Math.min(30 - r.lightBrightness, 34)}%`,
		"--dark-bg-neutral-mix": `${r.darkLift}%`,
		"--dark-surface-neutral-mix": `${Math.min(r.darkLift + 4, 38)}%`,
		"--dark-border-neutral-mix": `${Math.min(r.darkLift + 16, 56)}%`,
		"--surface-tint-color": `var(--color-${r.tintSource})`,
		"--surface-tint": `${r.tint}%`,
		"--surface-tint-half": `${r.tint / 2}%`,
		"--surface-border-tint": `${Math.min(r.tint * 2.5, 24)}%`
	};
}
function h(e, t, n) {
	return n ? `oklch(from var(--color-${e}) ${t === "light" ? "min(l, 0.55)" : "max(l, 0.72)"} c h)` : `var(--color-${e})`;
}
//#endregion
//#region src/LastStackUI.tsx
var g = e(null);
function _() {
	return r(g);
}
var v = typeof window > "u" ? i : a;
function y({ children: e, className: t = "", style: n, theme: i, scope: a = "auto", ...c }) {
	let u = s(null), d = r(g), f = a === "root" || a === "auto" && d === null, p = o(() => i ? m(i) : null, [i ? JSON.stringify(i) : ""]);
	return v(() => {
		if (!f || !p) return;
		let e = document.documentElement, t = Object.entries(p), n = t.map(([t]) => [t, e.style.getPropertyValue(t)]);
		for (let [n, r] of t) e.style.setProperty(n, r);
		return () => {
			for (let [t, r] of n) r ? e.style.setProperty(t, r) : e.style.removeProperty(t);
		};
	}, [f, p]), /* @__PURE__ */ l(g.Provider, {
		value: u,
		children: /* @__PURE__ */ l("div", {
			ref: u,
			className: `ls-ui ${t}`.trim(),
			style: {
				...p,
				...n
			},
			...c,
			children: e
		})
	});
}
//#endregion
//#region src/components/Badge.tsx
function b({ className: e = "", size: t = "md", tone: n = "primary", ...r }) {
	return /* @__PURE__ */ l("span", {
		className: `ui-badge ui-badge--${n} ui-badge--${t} ${e}`.trim(),
		...r
	});
}
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/mergeClasses.mjs
var x = (...e) => e.filter((e, t, n) => !!e && e.trim() !== "" && n.indexOf(e) === t).join(" ").trim(), S = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), C = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, n) => n ? n.toUpperCase() : t.toLowerCase()), w = (e) => {
	let t = C(e);
	return t.charAt(0).toUpperCase() + t.slice(1);
}, T = {
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
}, E = e({}), D = () => r(E), O = n(({ color: e, size: n, strokeWidth: r, absoluteStrokeWidth: i, className: a = "", children: o, iconNode: s, ...c }, l) => {
	let { size: u = 24, strokeWidth: d = 2, absoluteStrokeWidth: f = !1, color: p = "currentColor", className: m = "" } = D() ?? {}, h = i ?? f ? Number(r ?? d) * 24 / Number(n ?? u) : r ?? d;
	return t("svg", {
		ref: l,
		...T,
		width: n ?? u ?? T.width,
		height: n ?? u ?? T.height,
		stroke: e ?? p,
		strokeWidth: h,
		className: x("lucide", m, a),
		...!o && !ee(c) && { "aria-hidden": "true" },
		...c
	}, [...s.map(([e, n]) => t(e, n)), ...Array.isArray(o) ? o : [o]]);
}), k = (e, r) => {
	let i = n(({ className: n, ...i }, a) => t(O, {
		ref: a,
		iconNode: r,
		className: x(`lucide-${S(w(e))}`, `lucide-${e}`, n),
		...i
	}));
	return i.displayName = w(e), i;
}, A = k("chevron-right", [["path", {
	d: "m9 18 6-6-6-6",
	key: "mthhwq"
}]]), te = k("circle-check", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
}]]), j = k("circle-x", [
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
]), M = {
	info: k("info", [
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
	success: te,
	warning: k("triangle-alert", [
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
	error: j
};
function N({ className: e = "", tone: t = "info", title: n, flush: r = !1, children: i, ...a }) {
	let o = M[t];
	return /* @__PURE__ */ u("div", {
		className: `ui-callout ui-callout--${t}${r ? " ui-callout--flush" : ""} ${e}`.trim(),
		...a,
		children: [/* @__PURE__ */ l(o, {
			className: "ui-callout__icon",
			"aria-hidden": !0
		}), /* @__PURE__ */ u("div", {
			className: "ui-callout__content",
			children: [n && /* @__PURE__ */ l("p", {
				className: "ui-callout__title",
				children: n
			}), i]
		})]
	});
}
//#endregion
//#region src/components/Button.tsx
function P({ className: e = "", size: t = "md", tone: n = "primary", variant: r = "solid", loading: i = !1, disabled: a, children: o, ...s }) {
	return /* @__PURE__ */ u("button", {
		"aria-busy": i || void 0,
		className: `ui-button ui-button--${r} ui-button--${n} ui-button--${t}${i ? " ui-button--loading" : ""} ${e}`.trim(),
		disabled: a || i,
		...s,
		children: [i ? /* @__PURE__ */ l("span", {
			"aria-hidden": !0,
			className: "ui-button__spinner"
		}) : null, o]
	});
}
//#endregion
//#region src/components/Card.tsx
function F({ className: e = "", variant: t = "default", ...n }) {
	return /* @__PURE__ */ l("div", {
		className: `ui-card ui-card--${t} ${e}`.trim(),
		...n
	});
}
function I({ className: e = "", ...t }) {
	return /* @__PURE__ */ l("h3", {
		className: `ui-card__title ${e}`.trim(),
		...t
	});
}
function L({ className: e = "", ...t }) {
	return /* @__PURE__ */ l("p", {
		className: `ui-card__description ${e}`.trim(),
		...t
	});
}
//#endregion
//#region src/components/Checkbox.tsx
function R({ children: e, className: t = "", tone: n = "primary", ...r }) {
	return /* @__PURE__ */ u("label", {
		className: `ui-checkbox ui-checkbox--${n} ${t}`.trim(),
		children: [/* @__PURE__ */ l("input", {
			type: "checkbox",
			...r
		}), /* @__PURE__ */ l("span", { children: e })]
	});
}
//#endregion
//#region src/components/SegmentedControl.tsx
function z({ "aria-label": e, className: t = "", onChange: n, options: r, size: i = "md", tone: a = "primary", value: o }) {
	return /* @__PURE__ */ l("div", {
		"aria-label": e,
		className: `ui-segmented ui-segmented--${a} ui-segmented--${i} ${t}`.trim(),
		role: "radiogroup",
		children: r.map((e) => /* @__PURE__ */ l("button", {
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
var B = (e, t) => {
	let n = typeof e == "number" ? e : Number(e);
	return Number.isFinite(n) ? n : t;
};
function V({ className: e = "", label: t, tone: n = "primary", valueLabel: r, style: i, ...a }) {
	let o = B(a.min, 0), s = B(a.max, 100), c = B(a.value ?? a.defaultValue, o), d = s === o ? 0 : Math.min(100, Math.max(0, (c - o) / (s - o) * 100));
	return /* @__PURE__ */ u("label", {
		className: `ui-slider ui-slider--${n} ${e}`.trim(),
		style: i,
		children: [/* @__PURE__ */ u("span", { children: [t, r ? /* @__PURE__ */ l("strong", { children: r }) : null] }), /* @__PURE__ */ l("input", {
			type: "range",
			style: { "--slider-pct": `${d}%` },
			...a
		})]
	});
}
//#endregion
//#region src/components/ComponentPreviewCards.tsx
function H({ mode: e }) {
	let [t, n] = c("left"), [r, i] = c(72);
	return /* @__PURE__ */ l("div", {
		className: e === "dark" ? "dark" : "ls-ui light",
		children: /* @__PURE__ */ u(F, {
			className: "grid gap-[22px]",
			children: [
				/* @__PURE__ */ u("div", { children: [/* @__PURE__ */ l(I, { children: "425 Industrial Way" }), /* @__PURE__ */ l(L, { children: "last comp: 03/2026 · 18,400 sqft" })] }),
				/* @__PURE__ */ u("div", {
					className: "flex flex-wrap gap-3",
					"aria-label": "Semantic badge examples",
					children: [
						/* @__PURE__ */ l(b, {
							tone: "info",
							children: "info"
						}),
						/* @__PURE__ */ l(b, {
							tone: "success",
							children: "success"
						}),
						/* @__PURE__ */ l(b, {
							tone: "warning",
							children: "warning"
						}),
						/* @__PURE__ */ l(b, {
							tone: "error",
							children: "error"
						})
					]
				}),
				/* @__PURE__ */ l(N, {
					tone: "info",
					title: "Market note",
					children: "Vacancy is trending down across comparable industrial assets."
				}),
				/* @__PURE__ */ u("div", {
					className: "grid grid-cols-[repeat(auto-fit,minmax(min(150px,100%),max-content))] items-center gap-4 max-[560px]:flex max-[560px]:flex-col max-[560px]:items-stretch",
					"aria-label": "Primary and accent button examples",
					children: [
						/* @__PURE__ */ l(P, { children: "primary filled" }),
						/* @__PURE__ */ l(P, {
							variant: "outline",
							children: "primary outline"
						}),
						/* @__PURE__ */ l(P, {
							tone: "accent",
							children: "accent filled"
						}),
						/* @__PURE__ */ l(P, {
							tone: "accent",
							variant: "outline",
							children: "accent outline"
						})
					]
				}),
				/* @__PURE__ */ u("div", {
					className: "grid w-[min(340px,100%)] gap-3.5 [&_.ui-segmented]:w-full [&_.ui-segmented_button]:flex-1 [&_.ui-slider]:w-full",
					"aria-label": "Input component examples",
					children: [
						/* @__PURE__ */ l(R, {
							defaultChecked: !0,
							children: "Include off-market comps"
						}),
						/* @__PURE__ */ l(V, {
							label: "Confidence",
							max: "100",
							min: "0",
							onChange: (e) => i(Number(e.target.value)),
							value: r,
							valueLabel: `${r}%`
						}),
						/* @__PURE__ */ l(z, {
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
var U = [
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
function W(e) {
	return e <= 500 ? "dark" : "light";
}
var G = () => ({
	...Object.fromEntries(U.map((e) => [e, ""])),
	seed: ""
}), K = () => Object.fromEntries(d.map((e) => [e, G()]));
function q(e, t) {
	let n = document.createElement("span");
	n.style.cssText = "position:absolute;width:0;height:0;visibility:hidden;pointer-events:none", e.appendChild(n);
	let r = getComputedStyle(n), i = t.map((e) => (n.style.color = "", n.style.color = `var(${e})`, r.color));
	return n.remove(), i;
}
function J(e) {
	let t = _(), [n, r] = c(K);
	return i(() => {
		let n = e?.current ?? t?.current ?? document.documentElement;
		if (!n) return;
		let i = d.flatMap((e) => [`--color-${e}`, ...U.map((t) => `--color-${e}-${t}`)]), a = () => {
			let e = q(n, i), t = 0;
			r(Object.fromEntries(d.map((n) => {
				let r = e[t++];
				return [n, {
					...Object.fromEntries(U.map((n) => [n, e[t++]])),
					seed: r
				}];
			})));
		};
		a();
		let o = new MutationObserver(a);
		return o.observe(n, {
			attributes: !0,
			attributeFilter: ["style", "class"]
		}), () => o.disconnect();
	}, [e, t]), n;
}
//#endregion
//#region src/components/RampSwatches.tsx
function Y() {
	let e = J();
	return /* @__PURE__ */ l("div", {
		className: "grid gap-4",
		children: d.map((t) => /* @__PURE__ */ u("div", {
			className: "grid gap-1.5",
			children: [/* @__PURE__ */ u("div", {
				className: "flex items-baseline gap-2",
				children: [
					/* @__PURE__ */ l("span", {
						className: "text-[0.88rem] font-semibold text-text-primary",
						children: t
					}),
					/* @__PURE__ */ l("span", {
						className: "inline-block h-3 w-3 rounded-full border border-border align-middle",
						style: { background: `var(--color-${t})` }
					}),
					/* @__PURE__ */ u("span", {
						className: "font-mono text-[0.72rem] text-text-secondary",
						children: ["seed ", e[t].seed]
					})
				]
			}), /* @__PURE__ */ l("div", {
				className: "grid gap-1",
				style: { gridTemplateColumns: `repeat(${U.length}, minmax(0, 1fr))` },
				children: U.map((e) => /* @__PURE__ */ u("div", {
					className: "grid h-14 min-w-0 content-between rounded-md p-1.5",
					style: {
						background: `var(--color-${t}-${e})`,
						color: W(e) === "dark" ? "#000" : "#fff"
					},
					title: `--color-${t}-${e}`,
					children: [/* @__PURE__ */ l("span", {
						className: "font-mono text-[0.7rem] font-medium",
						children: e
					}), /* @__PURE__ */ l("span", {
						className: "font-mono text-[0.6rem] opacity-80",
						children: W(e) === "dark" ? "black" : "white"
					})]
				}, e))
			})]
		}, t))
	});
}
//#endregion
//#region src/components/Container.tsx
function X({ className: e = "", size: t = "md", ...n }) {
	return /* @__PURE__ */ l("div", {
		className: `ui-container ui-container--${t} ${e}`.trim(),
		...n
	});
}
//#endregion
//#region src/components/Disclosure.tsx
function Z({ className: e = "", title: t, defaultOpen: n = !1, children: r, ...i }) {
	return /* @__PURE__ */ u("details", {
		className: `ui-disclosure ${e}`.trim(),
		open: n,
		...i,
		children: [/* @__PURE__ */ u("summary", {
			className: "ui-disclosure__summary",
			children: [/* @__PURE__ */ l(A, {
				className: "ui-disclosure__chevron",
				"aria-hidden": !0
			}), /* @__PURE__ */ l("span", {
				className: "ui-disclosure__title",
				children: t
			})]
		}), /* @__PURE__ */ l("div", {
			className: "ui-disclosure__content",
			children: r
		})]
	});
}
//#endregion
//#region src/components/Field.tsx
function ne({ className: e = "", children: t, label: n, hint: r, error: i, htmlFor: a, ...o }) {
	return /* @__PURE__ */ u("div", {
		className: `ui-field ${e}`.trim(),
		...o,
		children: [
			n ? /* @__PURE__ */ l("label", {
				className: "ui-field__label",
				htmlFor: a,
				children: n
			}) : null,
			t,
			i ? /* @__PURE__ */ l("p", {
				className: "ui-field__error",
				children: i
			}) : r ? /* @__PURE__ */ l("p", {
				className: "ui-field__hint",
				children: r
			}) : null
		]
	});
}
//#endregion
//#region src/components/Inline.tsx
function re({ className: e = "", gap: t = "md", align: n = "center", justify: r = "start", wrap: i = !1, ...a }) {
	return /* @__PURE__ */ l("div", {
		className: `ui-inline ui-inline--gap-${t} ui-inline--align-${n} ui-inline--justify-${r}${i ? " ui-inline--wrap" : ""} ${e}`.trim(),
		...a
	});
}
//#endregion
//#region src/components/Input.tsx
function ie({ className: e = "", inputSize: t = "md", invalid: n = !1, ...r }) {
	return /* @__PURE__ */ l("input", {
		"aria-invalid": n || void 0,
		className: `ui-input ui-input--${t}${n ? " ui-input--invalid" : ""} ${e}`.trim(),
		...r
	});
}
//#endregion
//#region src/components/Progress.tsx
function ae({ className: e = "", value: t = 0, max: n = 100, tone: r = "primary", size: i = "md", segments: a, ...o }) {
	let s = a ?? [{
		value: t,
		tone: r
	}], c = s.reduce((e, t) => e + Math.max(0, t.value), 0), u = (e) => n <= 0 ? 0 : Math.min(100, Math.max(0, e) / n * 100);
	return /* @__PURE__ */ l("div", {
		className: `ui-progress ui-progress--${i} ${e}`.trim(),
		role: "progressbar",
		"aria-valuemin": 0,
		"aria-valuemax": n,
		"aria-valuenow": c,
		...o,
		children: s.map((e, t) => /* @__PURE__ */ l("div", {
			className: `ui-progress__fill ui-progress__fill--${e.tone ?? r}`,
			style: { width: `${u(e.value)}%` }
		}, `${t}-${e.tone ?? r}`))
	});
}
//#endregion
//#region src/components/Spinner.tsx
function oe({ className: e = "", size: t = "md", tone: n = "primary", label: r = "Loading", ...i }) {
	return /* @__PURE__ */ l("span", {
		"aria-label": r,
		className: `ui-spinner ui-spinner--${t} ui-spinner--${n} ${e}`.trim(),
		role: "status",
		...i
	});
}
//#endregion
//#region src/components/Stack.tsx
function se({ className: e = "", gap: t = "md", align: n = "stretch", ...r }) {
	return /* @__PURE__ */ l("div", {
		className: `ui-stack ui-stack--gap-${t} ui-stack--align-${n} ${e}`.trim(),
		...r
	});
}
//#endregion
//#region src/components/Tabs.tsx
function ce({ className: e = "", tone: t = "primary", size: n = "md", rule: r = !1, ...i }) {
	return /* @__PURE__ */ l("nav", {
		className: `ui-tabs ui-tabs--${t} ui-tabs--${n}${r ? " ui-tabs--rule" : ""} ${e}`.trim(),
		...i
	});
}
function le({ className: e = "", active: t = !1, ...n }) {
	return /* @__PURE__ */ l("a", {
		className: `ui-tab ${e}`.trim(),
		"aria-current": t ? "page" : void 0,
		...n
	});
}
//#endregion
//#region src/components/Table.tsx
function ue({ className: e = "", size: t = "md", caption: n, children: r, ...i }) {
	return /* @__PURE__ */ l("div", {
		className: "ui-table__scroll",
		children: /* @__PURE__ */ u("table", {
			className: `ui-table ui-table--${t} ${e}`.trim(),
			...i,
			children: [n ? /* @__PURE__ */ l("caption", {
				className: "ui-table__caption",
				children: n
			}) : null, r]
		})
	});
}
function de({ className: e = "", ...t }) {
	return /* @__PURE__ */ l("thead", {
		className: `ui-table__head ${e}`.trim(),
		...t
	});
}
function fe({ className: e = "", ...t }) {
	return /* @__PURE__ */ l("tbody", {
		className: `ui-table__body ${e}`.trim(),
		...t
	});
}
function pe({ className: e = "", ...t }) {
	return /* @__PURE__ */ l("tr", {
		className: `ui-table__row ${e}`.trim(),
		...t
	});
}
function me({ className: e = "", numeric: t = !1, scope: n = "col", ...r }) {
	return /* @__PURE__ */ l("th", {
		className: `ui-table__header${t ? " ui-table__header--numeric" : ""} ${e}`.trim(),
		scope: n,
		...r
	});
}
function he({ className: e = "", numeric: t = !1, ...n }) {
	return /* @__PURE__ */ l("td", {
		className: `ui-table__cell${t ? " ui-table__cell--numeric" : ""} ${e}`.trim(),
		...n
	});
}
//#endregion
//#region src/components/Text.tsx
function ge({ className: e = "", tone: t = "default", size: n = "md", weight: r = "normal", ...i }) {
	return /* @__PURE__ */ l("span", {
		className: `ui-text ui-text--${t} ui-text--${n} ui-text--${r} ${e}`.trim(),
		...i
	});
}
//#endregion
//#region src/components/Textarea.tsx
function _e({ className: e = "", invalid: t = !1, ...n }) {
	return /* @__PURE__ */ l("textarea", {
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
}, ve = {
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
}, ye = [
	"primary",
	"accent",
	"success",
	"warning",
	"error",
	"info"
];
function $(e) {
	let t = _(), [n, r] = c(ve);
	return i(() => {
		let n = e?.current ?? t?.current ?? document.documentElement, i = getComputedStyle(n), a = (e) => i.getPropertyValue(`--color-${e}`).trim();
		r({
			...Object.fromEntries(ye.map((e) => [e, {
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
function be(e) {
	return $(e).palette;
}
//#endregion
export { b as Badge, P as Button, N as Callout, F as Card, L as CardDescription, I as CardTitle, R as Checkbox, H as ComponentPreviewCard, X as Container, Z as Disclosure, ne as Field, re as Inline, ie as Input, y as LastStackUI, ae as Progress, Y as RampSwatches, z as SegmentedControl, V as Slider, oe as Spinner, se as Stack, le as Tab, ue as Table, fe as TableBody, he as TableCell, de as TableHead, me as TableHeaderCell, pe as TableRow, ce as Tabs, ge as Text, _e as Textarea, p as createThemeConfig, m as createThemeStyle, f as defaultThemeConfig, U as rampSteps, d as seedColorNames, W as stepTextTone, be as useLastStackColorValues, _ as useLastStackScope, J as usePalette, $ as useTheme };
