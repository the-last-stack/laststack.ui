import { useState } from "react";
import type { CSSProperties } from "react";
import {
  Badge,
  Button,
  Card,
  CardDescription,
  CardTitle,
  Checkbox,
  SegmentedControl,
  Slider,
} from "./components";
import "./components/components.css";
import "./App.css";

const seedColors = [
  ["primary", "#292966"],
  ["accent", "#9ac2d9"],
  ["info", "#4f8fbf"],
  ["success", "#5fa868"],
  ["warning", "#d9a441"],
  ["error", "#c9626b"],
] as const;

type SeedName = (typeof seedColors)[number][0];
type SeedState = Record<SeedName, string>;
type ClampKey = "primaryLight" | "primaryDark" | "accentLight" | "accentDark";
type ClampState = Record<ClampKey, boolean>;
type ThemeStyle = CSSProperties &
  Record<`--color-${SeedName}`, string> &
  Record<`--color-action-${"primary" | "accent"}-${"light" | "dark"}`, string> & {
    "--dark-bg-neutral-mix": string;
    "--dark-border-neutral-mix": string;
    "--dark-surface-neutral-mix": string;
    "--light-bg-neutral-mix": string;
    "--light-border-neutral-mix": string;
    "--light-surface-neutral-mix": string;
    "--surface-tint-color": string;
    "--surface-tint": string;
    "--surface-tint-half": string;
    "--surface-border-tint": string;
  };

const initialSeeds = Object.fromEntries(seedColors) as SeedState;
const initialClamps: ClampState = {
  primaryLight: true,
  primaryDark: true,
  accentLight: true,
  accentDark: true,
};

const clampControls = [
  ["primaryLight", "Clamp primary in light mode"],
  ["accentLight", "Clamp accent in light mode"],
  ["primaryDark", "Clamp primary in dark mode"],
  ["accentDark", "Clamp accent in dark mode"],
] as const;

const modeOptions = [
  { label: "light", value: "light" },
  { label: "dark", value: "dark" },
] as const;

const tintSourceOptions = [
  { label: "primary", value: "primary" },
  { label: "accent", value: "accent" },
] as const;

function actionColor(
  seed: "primary" | "accent",
  mode: "light" | "dark",
  isClamped: boolean,
) {
  if (!isClamped) {
    return `var(--color-${seed})`;
  }

  const lightness = mode === "light" ? "min(l, 0.55)" : "max(l, 0.72)";
  return `oklch(from var(--color-${seed}) ${lightness} c h)`;
}

type SpecimenProps = {
  segmentValue: "left" | "right";
  sliderValue: number;
  onSegmentChange: (value: "left" | "right") => void;
  onSliderChange: (value: number) => void;
}

function Specimen({ segmentValue, sliderValue, onSegmentChange, onSliderChange }: SpecimenProps) {
  return (
    <Card className="property-card">
      <div>
        <CardTitle>425 Industrial Way</CardTitle>
        <CardDescription>last comp: 03/2026 · 18,400 sqft</CardDescription>
      </div>

      <div className="badge-row" aria-label="Semantic badge examples">
        <Badge tone="info">info</Badge>
        <Badge tone="success">success</Badge>
        <Badge tone="warning">warning</Badge>
        <Badge tone="error">error</Badge>
      </div>

      <div
        className="button-row"
        aria-label="Primary and accent button examples"
      >
        <Button>primary filled</Button>
        <Button variant="outline">primary outline</Button>
        <Button tone="accent">accent filled</Button>
        <Button tone="accent" variant="outline">
          accent outline
        </Button>
      </div>

      <div className="example-controls" aria-label="Input component examples">
        <Checkbox defaultChecked>Include off-market comps</Checkbox>
        <Slider
          label="Confidence"
          max="100"
          min="0"
          onChange={(event) => onSliderChange(Number(event.target.value))}
          value={sliderValue}
          valueLabel={`${sliderValue}%`}
        />
        <SegmentedControl
          aria-label="Example view"
          options={[
            { label: "left", value: "left" },
            { label: "right", value: "right" },
          ]}
          onChange={onSegmentChange}
          value={segmentValue}
        />
      </div>
    </Card>
  );
}

function App() {
  const [isPageDark, setIsPageDark] = useState(false);
  const [seeds, setSeeds] = useState<SeedState>(initialSeeds);
  const [clamps, setClamps] = useState<ClampState>(initialClamps);
  const [surfaceTint, setSurfaceTint] = useState(4);
  const [lightSurfaceBrightness, setLightSurfaceBrightness] = useState(8);
  const [darkSurfaceLift, setDarkSurfaceLift] = useState(12);
  const [surfaceTintSource, setSurfaceTintSource] = useState<"primary" | "accent">(
    "primary",
  );
  const [demoChecks, setDemoChecks] = useState({
    primary: true,
    primaryAlt: false,
    accent: true,
    accentAlt: false,
  });
  const [demoSegments, setDemoSegments] = useState({
    primary: "left",
    accent: "right",
    sm: "left",
    md: "right",
    lg: "left",
  });
  const [demoSliders, setDemoSliders] = useState({
    primary: 40,
    accent: 64,
  });
  const [exampleControls, setExampleControls] = useState({
    lightSegment: "left" as "left" | "right",
    darkSegment: "left" as "left" | "right",
    lightSlider: 72,
    darkSlider: 72,
  });

  const themeStyle: ThemeStyle = {
    "--color-primary": seeds.primary,
    "--color-accent": seeds.accent,
    "--color-info": seeds.info,
    "--color-success": seeds.success,
    "--color-warning": seeds.warning,
    "--color-error": seeds.error,
    "--color-action-primary-light": actionColor(
      "primary",
      "light",
      clamps.primaryLight,
    ),
    "--color-action-primary-dark": actionColor(
      "primary",
      "dark",
      clamps.primaryDark,
    ),
    "--color-action-accent-light": actionColor(
      "accent",
      "light",
      clamps.accentLight,
    ),
    "--color-action-accent-dark": actionColor(
      "accent",
      "dark",
      clamps.accentDark,
    ),
    "--light-bg-neutral-mix": `${12 - lightSurfaceBrightness}%`,
    "--light-surface-neutral-mix": `${Math.max(9 - lightSurfaceBrightness, 0)}%`,
    "--light-border-neutral-mix": `${Math.min(30 - lightSurfaceBrightness, 34)}%`,
    "--dark-bg-neutral-mix": `${darkSurfaceLift}%`,
    "--dark-surface-neutral-mix": `${Math.min(darkSurfaceLift + 4, 38)}%`,
    "--dark-border-neutral-mix": `${Math.min(darkSurfaceLift + 16, 56)}%`,
    "--surface-tint-color": `var(--color-${surfaceTintSource})`,
    "--surface-tint": `${surfaceTint}%`,
    "--surface-tint-half": `${surfaceTint / 2}%`,
    "--surface-border-tint": `${Math.min(surfaceTint * 2.5, 24)}%`,
  };

  return (
    <main className={`catalog ${isPageDark ? "dark" : ""}`} style={themeStyle}>
      <header className="catalog-header">
        <div>
          <p className="kicker">LastStack UI</p>
          <h1>let's roll our own ui library</h1>
          <p className="catalog-description">
            Button, badge, and card primitives derived from six editable seed
            colors.
          </p>
        </div>

        <section className="settings-card" aria-label="Theme configuration">
          <div className="section-heading">
            <h2>configuration</h2>
          </div>

          <div className="settings-section settings-section--inline">
            <div>
              <h3>light or dark mode</h3>
              <p>
                Change the catalog shell without hiding the fixed light/dark
                specimens.
              </p>
            </div>
            <SegmentedControl
              aria-label="Page color mode"
              onChange={(value) => setIsPageDark(value === "dark")}
              options={modeOptions}
              value={isPageDark ? "dark" : "light"}
            />
          </div>

          <div className="settings-section">
            <div>
              <h3>editable seed colors</h3>
              <p>
                These six inputs are the hand-picked colors. Component
                backgrounds, borders, text, badges, and actions are derived from
                them.
              </p>
            </div>
            <div className="token-panel" aria-label="Theme seed colors">
              {seedColors.map(([name]) => (
                <label className="token-control" key={name}>
                  <span>{name}</span>
                  <input
                    type="color"
                    value={seeds[name]}
                    onChange={(event) =>
                      setSeeds((current) => ({
                        ...current,
                        [name]: event.target.value,
                      }))
                    }
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="settings-section settings-section--inline">
            <div>
              <h3>surface tint</h3>
              <p>
                Mix a little brand color into backgrounds and borders. Text stays
                neutral so contrast remains predictable.
              </p>
            </div>
            <div className="surface-controls">
              <SegmentedControl
                aria-label="Surface tint source"
                onChange={setSurfaceTintSource}
                options={tintSourceOptions}
                tone={surfaceTintSource}
                value={surfaceTintSource}
              />
              <Slider
                label="amount"
                max="12"
                min="0"
                onChange={(event) => setSurfaceTint(Number(event.target.value))}
                value={surfaceTint}
                valueLabel={`${surfaceTint}%`}
              />
            </div>
          </div>

          <div className="settings-section settings-section--inline">
            <div>
              <h3>surface depth</h3>
              <p>
                Tune light mode from neutral to bright and dark mode from deep to
                lifted, independently from the brand tint.
              </p>
            </div>
            <div className="surface-controls">
              <Slider
                disabled={isPageDark}
                label="light mode"
                max="12"
                min="0"
                onChange={(event) => setLightSurfaceBrightness(Number(event.target.value))}
                value={lightSurfaceBrightness}
                valueLabel={`bright ${lightSurfaceBrightness}`}
              />
              <Slider
                disabled={!isPageDark}
                label="dark mode"
                max="32"
                min="4"
                onChange={(event) => setDarkSurfaceLift(Number(event.target.value))}
                value={darkSurfaceLift}
                valueLabel={`lifted ${darkSurfaceLift}`}
              />
            </div>
          </div>

          <div className="settings-section">
            <div>
              <h3>action contrast clamps</h3>
              <p>
                Filled buttons can adjust primary and accent lightness per mode
                so light brand colors still work on light surfaces, and dark
                brand colors still work on dark surfaces.
              </p>
            </div>
            <div
              className="clamp-panel"
              aria-label="Action color clamp settings"
            >
              {clampControls.map(([key, label]) => (
                <Checkbox
                  checked={clamps[key]}
                  key={key}
                  onChange={(event) =>
                    setClamps((current) => ({
                      ...current,
                      [key]: event.target.checked,
                    }))
                  }
                >
                  {label}
                </Checkbox>
              ))}
            </div>
          </div>
        </section>
      </header>

      <div className="catalog-group-heading">
        <h2>specimens</h2>
        <p>Composed component examples for checking light and dark mode side by side.</p>
      </div>

      <section className="catalog-section specimens-section">
        <div className="section-heading">
          <h2>component examples</h2>
          <p>Matched examples rendered in light and dark mode.</p>
        </div>
        <div className="specimen-grid">
          <div className="specimen-group">
            <h3>light mode</h3>
            <div className="light-sample">
              <Specimen
                onSegmentChange={(value) =>
                  setExampleControls((current) => ({ ...current, lightSegment: value }))
                }
                onSliderChange={(value) =>
                  setExampleControls((current) => ({ ...current, lightSlider: value }))
                }
                segmentValue={exampleControls.lightSegment}
                sliderValue={exampleControls.lightSlider}
              />
            </div>
          </div>
          <div className="specimen-group">
            <h3>dark mode</h3>
            <div className="dark">
              <Specimen
                onSegmentChange={(value) =>
                  setExampleControls((current) => ({ ...current, darkSegment: value }))
                }
                onSliderChange={(value) =>
                  setExampleControls((current) => ({ ...current, darkSlider: value }))
                }
                segmentValue={exampleControls.darkSegment}
                sliderValue={exampleControls.darkSlider}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="catalog-group-heading">
        <h2>actions</h2>
        <p>Components that trigger or represent user actions.</p>
      </div>

      <section className="catalog-section">
        <div className="section-heading">
          <h2>button variants</h2>
          <p>
            Tones, variants, and sizes shown as separate axes so the catalog stays readable.
          </p>
        </div>
        <div className="showcase-grid button-axis-grid">
          <Card className="showcase-card">
            <h3>tones</h3>
            <CardDescription>Showing solid and outline variants across primary, accent, and destructive tones.</CardDescription>
            <div className="button-variant-list">
              <div>
                <Button>primary</Button>
                <Button tone="accent">accent</Button>
                <Button tone="destructive">destructive</Button>
              </div>
              <div>
                <Button variant="outline">primary</Button>
                <Button tone="accent" variant="outline">
                  accent
                </Button>
                <Button tone="destructive" variant="outline">
                  destructive
                </Button>
              </div>
            </div>
          </Card>
          <Card className="showcase-card">
            <h3>variants</h3>
            <CardDescription>Solid, outline, subtle, and ghost using the default primary tone.</CardDescription>
            <div className="control-row">
              <Button>solid</Button>
              <Button variant="outline">outline</Button>
              <Button variant="subtle">subtle</Button>
              <Button variant="ghost">ghost</Button>
            </div>
          </Card>
          <Card className="showcase-card">
            <h3>sizes</h3>
            <CardDescription>Small, medium, and large using the default primary solid button.</CardDescription>
            <div className="control-row">
              <Button size="sm">sm</Button>
              <Button>md</Button>
              <Button size="lg">lg</Button>
            </div>
          </Card>
        </div>
      </section>

      <div className="catalog-group-heading">
        <h2>status</h2>
        <p>Compact labels for state, metadata, and semantic context.</p>
      </div>

      <section className="catalog-section">
        <div className="section-heading">
          <h2>badge variants</h2>
          <p>
            Intent colors and sizes for compact status, metadata, and labels.
          </p>
        </div>
        <div className="showcase-grid">
          <Card className="showcase-card">
            <h3>intents</h3>
            <CardDescription>
              Brand and semantic badge tones derived from tint tokens.
            </CardDescription>
            <div className="badge-matrix">
              <Badge tone="primary">primary</Badge>
              <Badge tone="accent">accent</Badge>
              <Badge tone="info">info</Badge>
              <Badge tone="success">success</Badge>
              <Badge tone="warning">warning</Badge>
              <Badge tone="error">error</Badge>
            </div>
          </Card>
          <Card className="showcase-card">
            <h3>sizes</h3>
            <CardDescription>
              Small, medium, and large using the default primary tone.
            </CardDescription>
            <div className="badge-size-list">
              <div>
                <Badge size="sm">sm</Badge>
                <Badge>md</Badge>
                <Badge size="lg">lg</Badge>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <div className="catalog-group-heading">
        <h2>inputs</h2>
        <p>Controls for selection, ranges, and mutually exclusive choices.</p>
      </div>

      <section className="catalog-section">
        <div className="section-heading">
          <h2>checkboxes</h2>
          <p>Boolean selection across checked, unchecked, disabled, primary, and accent states.</p>
        </div>
        <div className="showcase-grid">
          <Card className="showcase-card">
            <h3>states</h3>
            <CardDescription>Labels update from the actual checkbox state.</CardDescription>
            <div className="stacked-controls">
              <Checkbox
                checked={demoChecks.primary}
                onChange={(event) =>
                  setDemoChecks((current) => ({ ...current, primary: event.target.checked }))
                }
              >
                Primary {demoChecks.primary ? "checked" : "unchecked"}
              </Checkbox>
              <Checkbox
                checked={demoChecks.primaryAlt}
                onChange={(event) =>
                  setDemoChecks((current) => ({ ...current, primaryAlt: event.target.checked }))
                }
              >
                Primary {demoChecks.primaryAlt ? "checked" : "unchecked"}
              </Checkbox>
              <Checkbox
                checked={demoChecks.accent}
                onChange={(event) =>
                  setDemoChecks((current) => ({ ...current, accent: event.target.checked }))
                }
                tone="accent"
              >
                Accent {demoChecks.accent ? "checked" : "unchecked"}
              </Checkbox>
              <Checkbox
                checked={demoChecks.accentAlt}
                onChange={(event) =>
                  setDemoChecks((current) => ({ ...current, accentAlt: event.target.checked }))
                }
                tone="accent"
              >
                Accent {demoChecks.accentAlt ? "checked" : "unchecked"}
              </Checkbox>
              <Checkbox disabled>Disabled</Checkbox>
              <Checkbox defaultChecked disabled tone="accent">
                Disabled checked
              </Checkbox>
            </div>
          </Card>
        </div>
      </section>

      <section className="catalog-section">
        <div className="section-heading">
          <h2>sliders</h2>
          <p>Range controls for numeric values with primary, accent, and disabled states.</p>
        </div>
        <div className="showcase-grid">
          <Card className="showcase-card">
            <h3>tones and states</h3>
            <CardDescription>Primary and accent range controls with value labels.</CardDescription>
            <div className="stacked-controls wide-controls">
              <Slider
                label="Primary"
                max="100"
                min="0"
                onChange={(event) =>
                  setDemoSliders((current) => ({ ...current, primary: Number(event.target.value) }))
                }
                value={demoSliders.primary}
                valueLabel={`${demoSliders.primary}%`}
              />
              <Slider
                label="Accent"
                max="100"
                min="0"
                onChange={(event) =>
                  setDemoSliders((current) => ({ ...current, accent: Number(event.target.value) }))
                }
                tone="accent"
                value={demoSliders.accent}
                valueLabel={`${demoSliders.accent}%`}
              />
              <Slider disabled label="Disabled" max="100" min="0" value="64" valueLabel="64%" />
            </div>
          </Card>
        </div>
      </section>

      <section className="catalog-section">
        <div className="section-heading">
          <h2>segmented controls</h2>
          <p>Mutually exclusive choices across tones and sizes.</p>
        </div>
        <div className="showcase-grid">
          <Card className="showcase-card">
            <h3>tones</h3>
            <CardDescription>Primary and accent segmented controls using the default medium size.</CardDescription>
            <div className="stacked-controls">
              <div className="control-example-row">
                <span>primary</span>
                <SegmentedControl
                  aria-label="Primary segmented choice"
                  onChange={(value) =>
                    setDemoSegments((current) => ({ ...current, primary: value }))
                  }
                  options={[
                    { label: "left", value: "left" },
                    { label: "right", value: "right" },
                  ]}
                  value={demoSegments.primary}
                />
              </div>
              <div className="control-example-row">
                <span>accent</span>
                <SegmentedControl
                  aria-label="Accent segmented choice"
                  onChange={(value) =>
                    setDemoSegments((current) => ({ ...current, accent: value }))
                  }
                  options={[
                    { label: "left", value: "left" },
                    { label: "right", value: "right" },
                  ]}
                  tone="accent"
                  value={demoSegments.accent}
                />
              </div>
            </div>
          </Card>
          <Card className="showcase-card">
            <h3>sizes</h3>
            <CardDescription>Small, medium, and large using the default primary tone.</CardDescription>
            <div className="stacked-controls">
              <div className="control-example-row">
                <span>sm</span>
                <SegmentedControl
                  aria-label="Small segmented choice"
                  onChange={(value) =>
                    setDemoSegments((current) => ({ ...current, sm: value }))
                  }
                  options={[
                    { label: "left", value: "left" },
                    { label: "right", value: "right" },
                  ]}
                  size="sm"
                  value={demoSegments.sm}
                />
              </div>
              <div className="control-example-row">
                <span>md</span>
                <SegmentedControl
                  aria-label="Medium segmented choice"
                  onChange={(value) =>
                    setDemoSegments((current) => ({ ...current, md: value }))
                  }
                  options={[
                    { label: "left", value: "left" },
                    { label: "right", value: "right" },
                  ]}
                  value={demoSegments.md}
                />
              </div>
              <div className="control-example-row">
                <span>lg</span>
                <SegmentedControl
                  aria-label="Large segmented choice"
                  onChange={(value) =>
                    setDemoSegments((current) => ({ ...current, lg: value }))
                  }
                  options={[
                    { label: "left", value: "left" },
                    { label: "right", value: "right" },
                  ]}
                  size="lg"
                  value={demoSegments.lg}
                />
              </div>
            </div>
          </Card>
        </div>
      </section>

      <div className="catalog-group-heading">
        <h2>presentation</h2>
        <p>Components for grouping and presenting content.</p>
      </div>

      <section className="catalog-section">
        <div className="section-heading">
          <h2>card variants</h2>
          <p>
            Flat content surfaces with optional elevation and interactive
            affordance.
          </p>
        </div>
        <div className="card-grid">
          <Card className="showcase-card">
            <Badge tone="info">default</Badge>
            <CardTitle>Default card</CardTitle>
            <CardDescription>
              Plain surface, one border, derived text colors.
            </CardDescription>
          </Card>
          <Card className="showcase-card" variant="elevated">
            <Badge tone="success">elevated</Badge>
            <CardTitle>Elevated card</CardTitle>
            <CardDescription>
              Reserved for layered content and dialogs.
            </CardDescription>
          </Card>
          <Card className="showcase-card" variant="interactive">
            <Badge tone="warning">interactive</Badge>
            <CardTitle>Interactive card</CardTitle>
            <CardDescription>
              Subtle hover treatment for selectable regions.
            </CardDescription>
          </Card>
        </div>
      </section>
    </main>
  );
}

export default App;
