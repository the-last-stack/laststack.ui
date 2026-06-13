import "./index.css";
import { jsx as e, jsxs as t } from "react/jsx-runtime";
//#region src/theme.ts
var n = [
	"primary",
	"accent",
	"info",
	"success",
	"warning",
	"error"
], r = {
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
function i(e) {
	return {
		seeds: {
			...r.seeds,
			...e.seeds
		},
		clamps: {
			...r.clamps,
			...e.clamps
		},
		surface: {
			...r.surface,
			...e.surface
		}
	};
}
function a(e) {
	let { clamps: t, seeds: n, surface: r } = i(e);
	return {
		"--color-primary": n.primary,
		"--color-accent": n.accent,
		"--color-info": n.info,
		"--color-success": n.success,
		"--color-warning": n.warning,
		"--color-error": n.error,
		"--color-action-primary-light": o("primary", "light", t.primaryLight),
		"--color-action-primary-dark": o("primary", "dark", t.primaryDark),
		"--color-action-accent-light": o("accent", "light", t.accentLight),
		"--color-action-accent-dark": o("accent", "dark", t.accentDark),
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
function o(e, t, n) {
	return n ? `oklch(from var(--color-${e}) ${t === "light" ? "min(l, 0.55)" : "max(l, 0.72)"} c h)` : `var(--color-${e})`;
}
//#endregion
//#region src/LastStackUI.tsx
function s({ children: t, className: n = "", style: r, theme: i, ...o }) {
	return /* @__PURE__ */ e("div", {
		className: `ls-ui ${n}`.trim(),
		style: {
			...i ? a(i) : null,
			...r
		},
		...o,
		children: t
	});
}
//#endregion
//#region src/components/Badge.tsx
function c({ className: t = "", size: n = "md", tone: r = "primary", ...i }) {
	return /* @__PURE__ */ e("span", {
		className: `ui-badge ui-badge--${r} ui-badge--${n} ${t}`.trim(),
		...i
	});
}
//#endregion
//#region src/components/Button.tsx
function l({ className: t = "", size: n = "md", tone: r = "primary", variant: i = "solid", ...a }) {
	return /* @__PURE__ */ e("button", {
		className: `ui-button ui-button--${i} ui-button--${r} ui-button--${n} ${t}`.trim(),
		...a
	});
}
//#endregion
//#region src/components/Card.tsx
function u({ className: t = "", variant: n = "default", ...r }) {
	return /* @__PURE__ */ e("div", {
		className: `ui-card ui-card--${n} ${t}`.trim(),
		...r
	});
}
function d({ className: t = "", ...n }) {
	return /* @__PURE__ */ e("h3", {
		className: `ui-card__title ${t}`.trim(),
		...n
	});
}
function f({ className: t = "", ...n }) {
	return /* @__PURE__ */ e("p", {
		className: `ui-card__description ${t}`.trim(),
		...n
	});
}
//#endregion
//#region src/components/Checkbox.tsx
function p({ children: n, className: r = "", tone: i = "primary", ...a }) {
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
function m({ "aria-label": t, className: n = "", onChange: r, options: i, size: a = "md", tone: o = "primary", value: s }) {
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
function h({ className: n = "", label: r, tone: i = "primary", valueLabel: a, ...o }) {
	return /* @__PURE__ */ t("label", {
		className: `ui-slider ui-slider--${i} ${n}`.trim(),
		children: [/* @__PURE__ */ t("span", { children: [r, a ? /* @__PURE__ */ e("strong", { children: a }) : null] }), /* @__PURE__ */ e("input", {
			type: "range",
			...o
		})]
	});
}
//#endregion
export { c as Badge, l as Button, u as Card, f as CardDescription, d as CardTitle, p as Checkbox, s as LastStackUI, m as SegmentedControl, h as Slider, i as createThemeConfig, a as createThemeStyle, r as defaultThemeConfig, n as seedColorNames };
