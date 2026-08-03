//#region src/theme.ts
var e = [
	"primary",
	"accent",
	"info",
	"success",
	"warning",
	"error"
], t = {
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
function n(e) {
	return {
		seeds: {
			...t.seeds,
			...e.seeds
		},
		clamps: {
			...t.clamps,
			...e.clamps
		},
		surface: {
			...t.surface,
			...e.surface
		}
	};
}
function r(e) {
	return {
		lightBg: 12 - e.lightBrightness,
		lightSurface: Math.max(9 - e.lightBrightness, 0),
		lightBorder: Math.min(30 - e.lightBrightness, 34),
		darkBg: e.darkLift,
		darkSurface: Math.min(e.darkLift + 4, 38),
		darkBorder: Math.min(e.darkLift + 16, 56),
		tint: e.tint,
		tintHalf: e.tint / 2,
		borderTint: Math.min(e.tint * 2.5, 24)
	};
}
function i(e) {
	let { clamps: t, seeds: i, surface: o } = n(e), s = r(o);
	return {
		"--color-primary": i.primary,
		"--color-accent": i.accent,
		"--color-info": i.info,
		"--color-success": i.success,
		"--color-warning": i.warning,
		"--color-error": i.error,
		"--color-action-primary-light": a("primary", "light", t.primaryLight),
		"--color-action-primary-dark": a("primary", "dark", t.primaryDark),
		"--color-action-accent-light": a("accent", "light", t.accentLight),
		"--color-action-accent-dark": a("accent", "dark", t.accentDark),
		"--light-bg-neutral-mix": `${s.lightBg}%`,
		"--light-surface-neutral-mix": `${s.lightSurface}%`,
		"--light-border-neutral-mix": `${s.lightBorder}%`,
		"--dark-bg-neutral-mix": `${s.darkBg}%`,
		"--dark-surface-neutral-mix": `${s.darkSurface}%`,
		"--dark-border-neutral-mix": `${s.darkBorder}%`,
		"--surface-tint-color": `var(--color-${o.tintSource})`,
		"--surface-tint": `${s.tint}%`,
		"--surface-tint-half": `${s.tintHalf}%`,
		"--surface-border-tint": `${s.borderTint}%`
	};
}
function a(e, t, n) {
	return n ? `oklch(from var(--color-${e}) ${t === "light" ? "min(l, 0.55)" : "max(l, 0.72)"} c h)` : `var(--color-${e})`;
}
//#endregion
export { r as a, e as i, i as n, t as r, n as t };
