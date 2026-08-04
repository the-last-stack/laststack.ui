import { a as e, i as t, r as n, t as r } from "./theme-B5Hf-g9g.js";
//#region src/color/srgb.ts
var i = (e, t, n) => Math.min(Math.max(e, t), n), a = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i, o = /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/i;
function s(e) {
	let t = e.trim();
	if (t === "white") return {
		r: 255,
		g: 255,
		b: 255
	};
	if (t === "black") return {
		r: 0,
		g: 0,
		b: 0
	};
	let n = a.exec(t);
	if (n) {
		let e = n[1], t = e.length === 3 ? [...e].map((e) => e + e).join("") : e;
		return {
			r: Number.parseInt(t.slice(0, 2), 16),
			g: Number.parseInt(t.slice(2, 4), 16),
			b: Number.parseInt(t.slice(4, 6), 16)
		};
	}
	let r = o.exec(t);
	if (r) return {
		r: Number(r[1]),
		g: Number(r[2]),
		b: Number(r[3])
	};
	throw Error(`unsupported colour: ${e}`);
}
function c({ r: e, g: t, b: n }) {
	let r = (e) => i(Math.round(e), 0, 255).toString(16).padStart(2, "0");
	return `#${r(e)}${r(t)}${r(n)}`;
}
function l(e, t, n) {
	let r = s(e), i = s(t), a = n / 100;
	return c({
		r: r.r * a + i.r * (1 - a),
		g: r.g * a + i.g * (1 - a),
		b: r.b * a + i.b * (1 - a)
	});
}
var u = (e) => {
	let t = e / 255;
	return t <= .04045 ? t / 12.92 : ((t + .055) / 1.055) ** 2.4;
}, d = (e) => 255 * (e <= .0031308 ? e * 12.92 : 1.055 * e ** (1 / 2.4) - .055);
function f(e) {
	let { r: t, g: n, b: r } = s(e), i = u(t), a = u(n), o = u(r), c = Math.cbrt(.4122214708 * i + .5363325363 * a + .0514459929 * o), l = Math.cbrt(.2119034982 * i + .6806995451 * a + .1073969566 * o), d = Math.cbrt(.0883024619 * i + .2817188376 * a + .6299787005 * o), f = .2104542553 * c + .793617785 * l - .0040720468 * d, p = 1.9779984951 * c - 2.428592205 * l + .4505937099 * d, m = .0259040371 * c + .7827717662 * l - .808675766 * d, h = Math.atan2(m, p) * 180 / Math.PI;
	return {
		l: f,
		c: Math.hypot(p, m),
		h: h < 0 ? h + 360 : h
	};
}
function p({ l: e, c: t, h: n }) {
	let r = n * Math.PI / 180, i = t * Math.cos(r), a = t * Math.sin(r), o = (e + .3963377774 * i + .2158037573 * a) ** 3, s = (e - .1055613458 * i - .0638541728 * a) ** 3, c = (e - .0894841775 * i - 1.291485548 * a) ** 3;
	return {
		r: d(4.0767416621 * o - 3.3077115913 * s + .2309699292 * c),
		g: d(-1.2684380046 * o + 2.6097574011 * s - .3413193965 * c),
		b: d(-.0041960863 * o - .7034186147 * s + 1.707614701 * c)
	};
}
var m = ({ r: e, g: t, b: n }) => Math.min(e, t, n) >= -.02 && Math.max(e, t, n) <= 255.02;
function h(e) {
	let t = p(e);
	if (m(t)) return c(t);
	let n = 0, r = e.c;
	for (let t = 0; t < 24; t++) {
		let t = (n + r) / 2;
		m(p({
			...e,
			c: t
		})) ? n = t : r = t;
	}
	return c(p({
		...e,
		c: n
	}));
}
function g(e, t) {
	return h({
		...f(e),
		l: t
	});
}
function _(e, t) {
	let n = f(e);
	return n.l <= t ? c(s(e)) : h({
		...n,
		l: t
	});
}
function v(e, t) {
	let n = f(e);
	return n.l >= t ? c(s(e)) : h({
		...n,
		l: t
	});
}
//#endregion
//#region src/color/palette.ts
var y = "#88888c", b = {
	light: .55,
	dark: .72
}, x = .78, S = {
	primary: 12,
	accent: 22,
	info: 14,
	success: 14,
	warning: 14,
	error: 14
}, C = {
	primary: 76,
	accent: 64,
	info: 70,
	success: 70,
	warning: 70,
	error: 70
}, w = 18;
function T(t, n) {
	let { seeds: i, clamps: a, surface: o } = r(t), s = e(o), c = n === "dark", u = c ? "black" : "white", d = i[o.tintSource], f = l(y, u, c ? s.darkBg : s.lightBg), p = l(y, u, c ? s.darkSurface : s.lightSurface), m = l(y, u, c ? s.darkBorder : s.lightBorder), h = l(d, f, s.tint), T = (e, t) => l(y, c ? "white" : "black", c ? t : e), E = (e, t) => t ? c ? v(i[e], b.dark) : _(i[e], b.light) : i[e], D = (e) => c ? l(i[e], h, w) : l(i[e], "white", S[e]), O = (e) => c ? g(i[e], x) : l(i[e], "black", C[e]);
	return {
		...i,
		bgNeutral: f,
		surfaceNeutral: p,
		borderNeutral: m,
		bg: h,
		surface: l(d, p, c ? s.tint : s.tintHalf),
		border: l(d, m, s.borderTint),
		textPrimary: T(55, 12),
		textSecondary: T(68, 45),
		textSubtle: T(78, 60),
		actionPrimary: E("primary", c ? a.primaryDark : a.primaryLight),
		actionAccent: E("accent", c ? a.accentDark : a.accentLight),
		primaryTint: D("primary"),
		accentTint: D("accent"),
		infoTint: D("info"),
		successTint: D("success"),
		warningTint: D("warning"),
		errorTint: D("error"),
		primaryOnTint: O("primary"),
		accentOnTint: O("accent"),
		infoOnTint: O("info"),
		successOnTint: O("success"),
		warningOnTint: O("warning"),
		errorOnTint: O("error")
	};
}
//#endregion
export { y as NEUTRAL, _ as capL, n as defaultThemeConfig, T as derivePalette, v as floorL, c as format, l as mix, s as parse, t as seedColorNames, g as setL, f as toOklch, h as toRgb };
