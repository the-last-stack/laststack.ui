import "./index.css";
import { jsx as e, jsxs as t } from "react/jsx-runtime";
import { createContext as n, createElement as r, forwardRef as i, useContext as a, useEffect as o, useState as s } from "react";
//#region src/theme.ts
var c = [
	"primary",
	"accent",
	"info",
	"success",
	"warning",
	"error"
], l = {
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
function u(e) {
	return {
		seeds: {
			...l.seeds,
			...e.seeds
		},
		clamps: {
			...l.clamps,
			...e.clamps
		},
		surface: {
			...l.surface,
			...e.surface
		}
	};
}
function d(e) {
	let { clamps: t, seeds: n, surface: r } = u(e);
	return {
		"--color-primary": n.primary,
		"--color-accent": n.accent,
		"--color-info": n.info,
		"--color-success": n.success,
		"--color-warning": n.warning,
		"--color-error": n.error,
		"--color-action-primary-light": f("primary", "light", t.primaryLight),
		"--color-action-primary-dark": f("primary", "dark", t.primaryDark),
		"--color-action-accent-light": f("accent", "light", t.accentLight),
		"--color-action-accent-dark": f("accent", "dark", t.accentDark),
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
function f(e, t, n) {
	return n ? `oklch(from var(--color-${e}) ${t === "light" ? "min(l, 0.55)" : "max(l, 0.72)"} c h)` : `var(--color-${e})`;
}
//#endregion
//#region src/LastStackUI.tsx
function p({ children: t, className: n = "", style: r, theme: i, ...a }) {
	return /* @__PURE__ */ e("div", {
		className: `ls-ui ${n}`.trim(),
		style: {
			...i ? d(i) : null,
			...r
		},
		...a,
		children: t
	});
}
//#endregion
//#region src/components/Badge.tsx
function m({ className: t = "", size: n = "md", tone: r = "primary", ...i }) {
	return /* @__PURE__ */ e("span", {
		className: `ui-badge ui-badge--${r} ui-badge--${n} ${t}`.trim(),
		...i
	});
}
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/mergeClasses.mjs
var h = (...e) => e.filter((e, t, n) => !!e && e.trim() !== "" && n.indexOf(e) === t).join(" ").trim(), g = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), _ = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, n) => n ? n.toUpperCase() : t.toLowerCase()), v = (e) => {
	let t = _(e);
	return t.charAt(0).toUpperCase() + t.slice(1);
}, y = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2,
	strokeLinecap: "round",
	strokeLinejoin: "round"
}, b = (e) => {
	for (let t in e) if (t.startsWith("aria-") || t === "role" || t === "title") return !0;
	return !1;
}, x = n({}), S = () => a(x), C = i(({ color: e, size: t, strokeWidth: n, absoluteStrokeWidth: i, className: a = "", children: o, iconNode: s, ...c }, l) => {
	let { size: u = 24, strokeWidth: d = 2, absoluteStrokeWidth: f = !1, color: p = "currentColor", className: m = "" } = S() ?? {}, g = i ?? f ? Number(n ?? d) * 24 / Number(t ?? u) : n ?? d;
	return r("svg", {
		ref: l,
		...y,
		width: t ?? u ?? y.width,
		height: t ?? u ?? y.height,
		stroke: e ?? p,
		strokeWidth: g,
		className: h("lucide", m, a),
		...!o && !b(c) && { "aria-hidden": "true" },
		...c
	}, [...s.map(([e, t]) => r(e, t)), ...Array.isArray(o) ? o : [o]]);
}), w = (e, t) => {
	let n = i(({ className: n, ...i }, a) => r(C, {
		ref: a,
		iconNode: t,
		className: h(`lucide-${g(v(e))}`, `lucide-${e}`, n),
		...i
	}));
	return n.displayName = v(e), n;
}, T = w("chevron-right", [["path", {
	d: "m9 18 6-6-6-6",
	key: "mthhwq"
}]]), E = w("circle-check", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
}]]), D = w("circle-x", [
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
]), O = {
	info: w("info", [
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
	success: E,
	warning: w("triangle-alert", [
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
	error: D
};
function k({ className: n = "", tone: r = "info", title: i, flush: a = !1, children: o, ...s }) {
	let c = O[r];
	return /* @__PURE__ */ t("div", {
		className: `ui-callout ui-callout--${r}${a ? " ui-callout--flush" : ""} ${n}`.trim(),
		...s,
		children: [/* @__PURE__ */ e(c, {
			className: "ui-callout__icon",
			"aria-hidden": !0
		}), /* @__PURE__ */ t("div", {
			className: "ui-callout__content",
			children: [i && /* @__PURE__ */ e("p", {
				className: "ui-callout__title",
				children: i
			}), o]
		})]
	});
}
//#endregion
//#region src/components/Button.tsx
function A({ className: n = "", size: r = "md", tone: i = "primary", variant: a = "solid", loading: o = !1, disabled: s, children: c, ...l }) {
	return /* @__PURE__ */ t("button", {
		"aria-busy": o || void 0,
		className: `ui-button ui-button--${a} ui-button--${i} ui-button--${r}${o ? " ui-button--loading" : ""} ${n}`.trim(),
		disabled: s || o,
		...l,
		children: [o ? /* @__PURE__ */ e("span", {
			"aria-hidden": !0,
			className: "ui-button__spinner"
		}) : null, c]
	});
}
//#endregion
//#region src/components/Card.tsx
function j({ className: t = "", variant: n = "default", ...r }) {
	return /* @__PURE__ */ e("div", {
		className: `ui-card ui-card--${n} ${t}`.trim(),
		...r
	});
}
function M({ className: t = "", ...n }) {
	return /* @__PURE__ */ e("h3", {
		className: `ui-card__title ${t}`.trim(),
		...n
	});
}
function N({ className: t = "", ...n }) {
	return /* @__PURE__ */ e("p", {
		className: `ui-card__description ${t}`.trim(),
		...n
	});
}
//#endregion
//#region src/components/Checkbox.tsx
function P({ children: n, className: r = "", tone: i = "primary", ...a }) {
	return /* @__PURE__ */ t("label", {
		className: `ui-checkbox ui-checkbox--${i} ${r}`.trim(),
		children: [/* @__PURE__ */ e("input", {
			type: "checkbox",
			...a
		}), /* @__PURE__ */ e("span", { children: n })]
	});
}
//#endregion
//#region src/components/SegmentedControl.tsx
function F({ "aria-label": t, className: n = "", onChange: r, options: i, size: a = "md", tone: o = "primary", value: s }) {
	return /* @__PURE__ */ e("div", {
		"aria-label": t,
		className: `ui-segmented ui-segmented--${o} ui-segmented--${a} ${n}`.trim(),
		role: "radiogroup",
		children: i.map((t) => /* @__PURE__ */ e("button", {
			"aria-checked": t.value === s,
			onClick: () => r(t.value),
			role: "radio",
			type: "button",
			children: t.label
		}, t.value))
	});
}
//#endregion
//#region src/components/Slider.tsx
function I({ className: n = "", label: r, tone: i = "primary", valueLabel: a, ...o }) {
	return /* @__PURE__ */ t("label", {
		className: `ui-slider ui-slider--${i} ${n}`.trim(),
		children: [/* @__PURE__ */ t("span", { children: [r, a ? /* @__PURE__ */ e("strong", { children: a }) : null] }), /* @__PURE__ */ e("input", {
			type: "range",
			...o
		})]
	});
}
//#endregion
//#region src/components/ComponentPreviewCards.tsx
function L({ mode: n }) {
	let [r, i] = s("left"), [a, o] = s(72);
	return /* @__PURE__ */ e("div", {
		className: n === "dark" ? "dark" : "ls-ui",
		children: /* @__PURE__ */ t(j, {
			className: "grid gap-[22px]",
			children: [
				/* @__PURE__ */ t("div", { children: [/* @__PURE__ */ e(M, { children: "425 Industrial Way" }), /* @__PURE__ */ e(N, { children: "last comp: 03/2026 · 18,400 sqft" })] }),
				/* @__PURE__ */ t("div", {
					className: "flex flex-wrap gap-3",
					"aria-label": "Semantic badge examples",
					children: [
						/* @__PURE__ */ e(m, {
							tone: "info",
							children: "info"
						}),
						/* @__PURE__ */ e(m, {
							tone: "success",
							children: "success"
						}),
						/* @__PURE__ */ e(m, {
							tone: "warning",
							children: "warning"
						}),
						/* @__PURE__ */ e(m, {
							tone: "error",
							children: "error"
						})
					]
				}),
				/* @__PURE__ */ e(k, {
					tone: "info",
					title: "Market note",
					children: "Vacancy is trending down across comparable industrial assets."
				}),
				/* @__PURE__ */ t("div", {
					className: "grid grid-cols-[repeat(auto-fit,minmax(min(150px,100%),max-content))] items-center gap-4 max-[560px]:flex max-[560px]:flex-col max-[560px]:items-stretch",
					"aria-label": "Primary and accent button examples",
					children: [
						/* @__PURE__ */ e(A, { children: "primary filled" }),
						/* @__PURE__ */ e(A, {
							variant: "outline",
							children: "primary outline"
						}),
						/* @__PURE__ */ e(A, {
							tone: "accent",
							children: "accent filled"
						}),
						/* @__PURE__ */ e(A, {
							tone: "accent",
							variant: "outline",
							children: "accent outline"
						})
					]
				}),
				/* @__PURE__ */ t("div", {
					className: "grid w-[min(340px,100%)] gap-3.5 [&_.ui-segmented]:w-full [&_.ui-segmented_button]:flex-1 [&_.ui-slider]:w-full",
					"aria-label": "Input component examples",
					children: [
						/* @__PURE__ */ e(P, {
							defaultChecked: !0,
							children: "Include off-market comps"
						}),
						/* @__PURE__ */ e(I, {
							label: "Confidence",
							max: "100",
							min: "0",
							onChange: (e) => o(Number(e.target.value)),
							value: a,
							valueLabel: `${a}%`
						}),
						/* @__PURE__ */ e(F, {
							"aria-label": "Example view",
							options: [{
								label: "left",
								value: "left"
							}, {
								label: "right",
								value: "right"
							}],
							onChange: i,
							value: r
						})
					]
				})
			]
		})
	});
}
//#endregion
//#region src/components/Container.tsx
function R({ className: t = "", size: n = "md", ...r }) {
	return /* @__PURE__ */ e("div", {
		className: `ui-container ui-container--${n} ${t}`.trim(),
		...r
	});
}
//#endregion
//#region src/components/Disclosure.tsx
function z({ className: n = "", title: r, defaultOpen: i = !1, children: a, ...o }) {
	return /* @__PURE__ */ t("details", {
		className: `ui-disclosure ${n}`.trim(),
		open: i,
		...o,
		children: [/* @__PURE__ */ t("summary", {
			className: "ui-disclosure__summary",
			children: [/* @__PURE__ */ e(T, {
				className: "ui-disclosure__chevron",
				"aria-hidden": !0
			}), /* @__PURE__ */ e("span", {
				className: "ui-disclosure__title",
				children: r
			})]
		}), /* @__PURE__ */ e("div", {
			className: "ui-disclosure__content",
			children: a
		})]
	});
}
//#endregion
//#region src/components/Field.tsx
function B({ className: n = "", children: r, label: i, hint: a, error: o, htmlFor: s, ...c }) {
	return /* @__PURE__ */ t("div", {
		className: `ui-field ${n}`.trim(),
		...c,
		children: [
			i ? /* @__PURE__ */ e("label", {
				className: "ui-field__label",
				htmlFor: s,
				children: i
			}) : null,
			r,
			o ? /* @__PURE__ */ e("p", {
				className: "ui-field__error",
				children: o
			}) : a ? /* @__PURE__ */ e("p", {
				className: "ui-field__hint",
				children: a
			}) : null
		]
	});
}
//#endregion
//#region src/components/Inline.tsx
function V({ className: t = "", gap: n = "md", align: r = "center", justify: i = "start", wrap: a = !1, ...o }) {
	return /* @__PURE__ */ e("div", {
		className: `ui-inline ui-inline--gap-${n} ui-inline--align-${r} ui-inline--justify-${i}${a ? " ui-inline--wrap" : ""} ${t}`.trim(),
		...o
	});
}
//#endregion
//#region src/components/Input.tsx
function H({ className: t = "", inputSize: n = "md", invalid: r = !1, ...i }) {
	return /* @__PURE__ */ e("input", {
		"aria-invalid": r || void 0,
		className: `ui-input ui-input--${n}${r ? " ui-input--invalid" : ""} ${t}`.trim(),
		...i
	});
}
//#endregion
//#region src/components/Progress.tsx
function U({ className: t = "", value: n = 0, max: r = 100, tone: i = "primary", size: a = "md", segments: o, ...s }) {
	let c = o ?? [{
		value: n,
		tone: i
	}], l = c.reduce((e, t) => e + Math.max(0, t.value), 0), u = (e) => r <= 0 ? 0 : Math.min(100, Math.max(0, e) / r * 100);
	return /* @__PURE__ */ e("div", {
		className: `ui-progress ui-progress--${a} ${t}`.trim(),
		role: "progressbar",
		"aria-valuemin": 0,
		"aria-valuemax": r,
		"aria-valuenow": l,
		...s,
		children: c.map((t, n) => /* @__PURE__ */ e("div", {
			className: `ui-progress__fill ui-progress__fill--${t.tone ?? i}`,
			style: { width: `${u(t.value)}%` }
		}, `${n}-${t.tone ?? i}`))
	});
}
//#endregion
//#region src/components/Spinner.tsx
function W({ className: t = "", size: n = "md", tone: r = "primary", label: i = "Loading", ...a }) {
	return /* @__PURE__ */ e("span", {
		"aria-label": i,
		className: `ui-spinner ui-spinner--${n} ui-spinner--${r} ${t}`.trim(),
		role: "status",
		...a
	});
}
//#endregion
//#region src/components/Stack.tsx
function G({ className: t = "", gap: n = "md", align: r = "stretch", ...i }) {
	return /* @__PURE__ */ e("div", {
		className: `ui-stack ui-stack--gap-${n} ui-stack--align-${r} ${t}`.trim(),
		...i
	});
}
//#endregion
//#region src/components/Tabs.tsx
function K({ className: t = "", tone: n = "primary", size: r = "md", rule: i = !1, ...a }) {
	return /* @__PURE__ */ e("nav", {
		className: `ui-tabs ui-tabs--${n} ui-tabs--${r}${i ? " ui-tabs--rule" : ""} ${t}`.trim(),
		...a
	});
}
function q({ className: t = "", active: n = !1, ...r }) {
	return /* @__PURE__ */ e("a", {
		className: `ui-tab ${t}`.trim(),
		"aria-current": n ? "page" : void 0,
		...r
	});
}
//#endregion
//#region src/components/Text.tsx
function J({ className: t = "", tone: n = "default", size: r = "md", weight: i = "normal", ...a }) {
	return /* @__PURE__ */ e("span", {
		className: `ui-text ui-text--${n} ui-text--${r} ui-text--${i} ${t}`.trim(),
		...a
	});
}
//#endregion
//#region src/components/Textarea.tsx
function Y({ className: t = "", invalid: n = !1, ...r }) {
	return /* @__PURE__ */ e("textarea", {
		"aria-invalid": n || void 0,
		className: `ui-textarea${n ? " ui-textarea--invalid" : ""} ${t}`.trim(),
		...r
	});
}
//#endregion
//#region src/useLastStackColorValues.ts
var X = {
	default: "",
	muted: "",
	foreground: "",
	hover: ""
}, Z = {
	primary: X,
	accent: X,
	success: X,
	warning: X,
	error: X,
	info: X,
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
}, Q = [
	"primary",
	"accent",
	"success",
	"warning",
	"error",
	"info"
];
function $(e) {
	let [t, n] = s(Z);
	return o(() => {
		let t = e?.current ?? document.documentElement, r = getComputedStyle(t), i = (e) => r.getPropertyValue(`--color-${e}`).trim();
		n({
			...Object.fromEntries(Q.map((e) => [e, {
				default: i(e),
				muted: i(`${e}-tint`),
				foreground: i(`${e}-on-tint`),
				hover: i(`${e}-hover`)
			}])),
			background: {
				default: i("bg"),
				muted: i("bg-neutral"),
				raised: i("surface")
			},
			foreground: {
				default: i("text-primary"),
				muted: i("text-secondary"),
				subtle: i("text-subtle")
			},
			border: {
				default: i("border"),
				muted: i("border-neutral"),
				focus: i("border-focus")
			}
		});
	}, [e]), { palette: t };
}
function ee(e) {
	return $(e).palette;
}
//#endregion
export { m as Badge, A as Button, k as Callout, j as Card, N as CardDescription, M as CardTitle, P as Checkbox, L as ComponentPreviewCard, R as Container, z as Disclosure, B as Field, V as Inline, H as Input, p as LastStackUI, U as Progress, F as SegmentedControl, I as Slider, W as Spinner, G as Stack, q as Tab, K as Tabs, J as Text, Y as Textarea, u as createThemeConfig, d as createThemeStyle, l as defaultThemeConfig, c as seedColorNames, ee as useLastStackColorValues, $ as useTheme };
