import "./index.css";
import { jsx as e, jsxs as t } from "react/jsx-runtime";
import { createContext as n, createElement as r, forwardRef as i, useContext as a } from "react";
//#region src/theme.ts
var o = [
	"primary",
	"accent",
	"info",
	"success",
	"warning",
	"error"
], s = {
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
function c(e) {
	return {
		seeds: {
			...s.seeds,
			...e.seeds
		},
		clamps: {
			...s.clamps,
			...e.clamps
		},
		surface: {
			...s.surface,
			...e.surface
		}
	};
}
function l(e) {
	let { clamps: t, seeds: n, surface: r } = c(e);
	return {
		"--color-primary": n.primary,
		"--color-accent": n.accent,
		"--color-info": n.info,
		"--color-success": n.success,
		"--color-warning": n.warning,
		"--color-error": n.error,
		"--color-action-primary-light": u("primary", "light", t.primaryLight),
		"--color-action-primary-dark": u("primary", "dark", t.primaryDark),
		"--color-action-accent-light": u("accent", "light", t.accentLight),
		"--color-action-accent-dark": u("accent", "dark", t.accentDark),
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
function u(e, t, n) {
	return n ? `oklch(from var(--color-${e}) ${t === "light" ? "min(l, 0.55)" : "max(l, 0.72)"} c h)` : `var(--color-${e})`;
}
//#endregion
//#region src/LastStackUI.tsx
function d({ children: t, className: n = "", style: r, theme: i, ...a }) {
	return /* @__PURE__ */ e("div", {
		className: `ls-ui ${n}`.trim(),
		style: {
			...i ? l(i) : null,
			...r
		},
		...a,
		children: t
	});
}
//#endregion
//#region src/components/Badge.tsx
function f({ className: t = "", size: n = "md", tone: r = "primary", ...i }) {
	return /* @__PURE__ */ e("span", {
		className: `ui-badge ui-badge--${r} ui-badge--${n} ${t}`.trim(),
		...i
	});
}
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/mergeClasses.mjs
var p = (...e) => e.filter((e, t, n) => !!e && e.trim() !== "" && n.indexOf(e) === t).join(" ").trim(), m = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), h = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, n) => n ? n.toUpperCase() : t.toLowerCase()), g = (e) => {
	let t = h(e);
	return t.charAt(0).toUpperCase() + t.slice(1);
}, _ = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2,
	strokeLinecap: "round",
	strokeLinejoin: "round"
}, v = (e) => {
	for (let t in e) if (t.startsWith("aria-") || t === "role" || t === "title") return !0;
	return !1;
}, y = n({}), b = () => a(y), x = i(({ color: e, size: t, strokeWidth: n, absoluteStrokeWidth: i, className: a = "", children: o, iconNode: s, ...c }, l) => {
	let { size: u = 24, strokeWidth: d = 2, absoluteStrokeWidth: f = !1, color: m = "currentColor", className: h = "" } = b() ?? {}, g = i ?? f ? Number(n ?? d) * 24 / Number(t ?? u) : n ?? d;
	return r("svg", {
		ref: l,
		..._,
		width: t ?? u ?? _.width,
		height: t ?? u ?? _.height,
		stroke: e ?? m,
		strokeWidth: g,
		className: p("lucide", h, a),
		...!o && !v(c) && { "aria-hidden": "true" },
		...c
	}, [...s.map(([e, t]) => r(e, t)), ...Array.isArray(o) ? o : [o]]);
}), S = (e, t) => {
	let n = i(({ className: n, ...i }, a) => r(x, {
		ref: a,
		iconNode: t,
		className: p(`lucide-${m(g(e))}`, `lucide-${e}`, n),
		...i
	}));
	return n.displayName = g(e), n;
}, C = S("circle-check", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
}]]), w = S("circle-x", [
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
]), T = {
	info: S("info", [
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
	success: C,
	warning: S("triangle-alert", [
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
	error: w
};
function E({ className: n = "", tone: r = "info", title: i, flush: a = !1, children: o, ...s }) {
	let c = T[r];
	return /* @__PURE__ */ t("div", {
		className: `ui-callout ui-callout--${r}${a ? " ui-callout--flush" : ""} ${n}`.trim(),
		...s,
		children: [/* @__PURE__ */ e(c, {
			size: 16,
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
function D({ className: t = "", size: n = "md", tone: r = "primary", variant: i = "solid", ...a }) {
	return /* @__PURE__ */ e("button", {
		className: `ui-button ui-button--${i} ui-button--${r} ui-button--${n} ${t}`.trim(),
		...a
	});
}
//#endregion
//#region src/components/Card.tsx
function O({ className: t = "", variant: n = "default", ...r }) {
	return /* @__PURE__ */ e("div", {
		className: `ui-card ui-card--${n} ${t}`.trim(),
		...r
	});
}
function k({ className: t = "", ...n }) {
	return /* @__PURE__ */ e("h3", {
		className: `ui-card__title ${t}`.trim(),
		...n
	});
}
function A({ className: t = "", ...n }) {
	return /* @__PURE__ */ e("p", {
		className: `ui-card__description ${t}`.trim(),
		...n
	});
}
//#endregion
//#region src/components/Checkbox.tsx
function j({ children: n, className: r = "", tone: i = "primary", ...a }) {
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
function M({ "aria-label": t, className: n = "", onChange: r, options: i, size: a = "md", tone: o = "primary", value: s }) {
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
function N({ className: n = "", label: r, tone: i = "primary", valueLabel: a, ...o }) {
	return /* @__PURE__ */ t("label", {
		className: `ui-slider ui-slider--${i} ${n}`.trim(),
		children: [/* @__PURE__ */ t("span", { children: [r, a ? /* @__PURE__ */ e("strong", { children: a }) : null] }), /* @__PURE__ */ e("input", {
			type: "range",
			...o
		})]
	});
}
//#endregion
export { f as Badge, D as Button, E as Callout, O as Card, A as CardDescription, k as CardTitle, j as Checkbox, d as LastStackUI, M as SegmentedControl, N as Slider, c as createThemeConfig, l as createThemeStyle, s as defaultThemeConfig, o as seedColorNames };
