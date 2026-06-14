import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Badge } from "./components/Badge";
import { Button } from "./components/Button";
import { Callout } from "./components/Callout";
import { Card, CardDescription, CardTitle } from "./components/Card";
import { Checkbox } from "./components/Checkbox";
import { SegmentedControl } from "./components/SegmentedControl";
import { Slider } from "./components/Slider";
import {
  createThemeConfig,
  createThemeStyle,
  defaultThemeConfig,
  seedColorNames,
} from "./theme";
import type { LastStackThemeConfig, ThemeClampConfig, ThemeSeeds } from "./theme";

const seedColors = seedColorNames.map((name) => [name, defaultThemeConfig.seeds[name]] as const);
const initialSeeds = defaultThemeConfig.seeds;
const initialClamps = defaultThemeConfig.clamps;

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

const hexColorPattern = /#[0-9a-fA-F]{3,8}\b/g;
const keyedSeedPattern = /(primary|accent|info|success|warning|error)\s*[\s:=,-]+["']?(#[0-9a-fA-F]{3,8})\b/gi;

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const shellText = "[&_h1]:m-0 [&_h2]:m-0 [&_h3]:m-0 [&_p]:m-0";
const sectionHeading = "mb-5 [&_h2]:mb-[18px] [&_h2]:text-text-secondary [&_h2]:text-[clamp(1.2rem,2vw,1.6rem)] [&_h2]:font-[520] [&_h2]:tracking-[-0.03em] [&_p]:mt-2.5 [&_p]:text-text-secondary [&_p]:leading-[1.55]";
const catalogSection = "mx-auto mb-6 max-w-[1280px] rounded-lg border border-border bg-surface p-[clamp(20px,3vw,40px)]";
const settingsSection = "grid gap-3 border-t border-border pt-[18px] first:border-t-0 first:pt-0";
const inlineSettingsSection = `${settingsSection} grid-cols-[minmax(0,1fr)_auto] items-start max-[860px]:grid-cols-1`;
const settingsText = "[&_h3]:m-0 [&_h3]:text-text-primary [&_h3]:text-[0.86rem] [&_h3]:font-bold [&_h3]:uppercase [&_h3]:tracking-[0.08em] [&_p]:mt-1.5 [&_p]:text-text-secondary [&_p]:text-[0.9rem] [&_p]:leading-[1.45]";
const textareaClass = "w-full resize-y rounded-md border border-border bg-[color-mix(in_srgb,var(--color-bg)_76%,var(--color-surface))] p-3 font-mono text-[0.82rem] leading-normal text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_srgb,var(--color-action-primary)_45%,transparent)]";
const configActions = "flex flex-wrap items-center justify-between gap-2.5 text-[0.88rem] [&_span]:font-semibold [&_span]:text-text-secondary [&_strong]:text-text-primary";
const showcaseGrid = "grid grid-cols-2 gap-4 max-[860px]:grid-cols-1";
const controlRow = "flex flex-wrap items-center gap-3 max-[560px]:flex-col max-[560px]:items-stretch";
const stackedControls = "grid justify-items-start gap-3";

type CatalogGroupProps = { title: string; description: string; children: ReactNode }

function CatalogGroup({ title, description, children }: CatalogGroupProps) {
  return (
    <>
      <div className="mx-auto mb-3.5 mt-10 max-w-[1280px] border-t border-border pt-6 [&_h2]:text-text-primary [&_h2]:text-[clamp(1.35rem,2.4vw,2rem)] [&_h2]:font-[680] [&_h2]:tracking-[-0.045em] [&_p]:mt-2 [&_p]:max-w-[680px] [&_p]:text-text-secondary [&_p]:leading-[1.55]">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {children}
    </>
  );
}

type CatalogSectionProps = { title: string; description: string; children: ReactNode; className?: string }

function CatalogSection({ title, description, children, className = "" }: CatalogSectionProps) {
  return (
    <section className={cn(catalogSection, className)}>
      <div className={sectionHeading}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {children}
    </section>
  );
}

type ShowcaseCardProps = { title: string; description: string; children: ReactNode }

function ShowcaseCard({ title, description, children }: ShowcaseCardProps) {
  return (
    <Card className="grid content-start justify-items-start gap-4 p-6 [&_.ui-card__title]:text-[1.35rem] [&_h3]:m-0 [&_h3]:text-text-secondary [&_h3]:text-[0.88rem] [&_h3]:font-semibold [&_h3]:uppercase [&_h3]:tracking-[0.08em]">
      <h3>{title}</h3>
      <CardDescription className="max-w-[44rem] text-base leading-normal">{description}</CardDescription>
      {children}
    </Card>
  );
}

type SpecimenProps = {
  segmentValue: "left" | "right";
  sliderValue: number;
  onSegmentChange: (value: "left" | "right") => void;
  onSliderChange: (value: number) => void;
}

function Specimen({ segmentValue, sliderValue, onSegmentChange, onSliderChange }: SpecimenProps) {
  return (
    <Card className="grid gap-[22px]">
      <div>
        <CardTitle>425 Industrial Way</CardTitle>
        <CardDescription>last comp: 03/2026 · 18,400 sqft</CardDescription>
      </div>

      <div className="flex flex-wrap gap-3" aria-label="Semantic badge examples">
        <Badge tone="info">info</Badge>
        <Badge tone="success">success</Badge>
        <Badge tone="warning">warning</Badge>
        <Badge tone="error">error</Badge>
      </div>

      <Callout tone="info" title="Market note">
        Vacancy is trending down across comparable industrial assets.
      </Callout>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(150px,100%),max-content))] items-center gap-4 max-[560px]:flex max-[560px]:flex-col max-[560px]:items-stretch" aria-label="Primary and accent button examples">
        <Button>primary filled</Button>
        <Button variant="outline">primary outline</Button>
        <Button tone="accent">accent filled</Button>
        <Button tone="accent" variant="outline">accent outline</Button>
      </div>

      <div className="grid w-[min(340px,100%)] gap-3.5 [&_.ui-segmented]:w-full [&_.ui-segmented_button]:flex-1 [&_.ui-slider]:w-full" aria-label="Input component examples">
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

function readSeedsFromJson(value: unknown) {
  if (!value || typeof value !== "object") {
    return null;
  }

  const source = "seeds" in value && value.seeds && typeof value.seeds === "object"
    ? value.seeds
    : value;
  const nextSeeds: Partial<ThemeSeeds> = {};

  for (const name of seedColorNames) {
    const seedValue = (source as Partial<Record<typeof name, unknown>>)[name];

    if (typeof seedValue === "string" && /^#[0-9a-fA-F]{3,8}$/.test(seedValue)) {
      nextSeeds[name] = seedValue;
    }
  }

  return Object.keys(nextSeeds).length > 0 ? nextSeeds : null;
}

function parseSeedImport(rawValue: string) {
  const value = rawValue.trim();

  if (!value) {
    return null;
  }

  try {
    const jsonSeeds = readSeedsFromJson(JSON.parse(value));

    if (jsonSeeds) {
      return jsonSeeds;
    }
  } catch {
    // Fall back to loose text parsing below.
  }

  const keyedSeeds: Partial<ThemeSeeds> = {};
  const keyedMatches = value.matchAll(keyedSeedPattern);

  for (const match of keyedMatches) {
    keyedSeeds[match[1].toLowerCase() as keyof ThemeSeeds] = match[2];
  }

  if (Object.keys(keyedSeeds).length > 0) {
    return keyedSeeds;
  }

  const colors = [...value.matchAll(hexColorPattern)].map((match) => match[0]);

  if (colors.length === 0) {
    return null;
  }

  return Object.fromEntries(
    seedColorNames.map((name, index) => [name, colors[index]]).filter(([, color]) => color),
  ) as Partial<ThemeSeeds>;
}

function App() {
  const [isPageDark, setIsPageDark] = useState(false);
  const [seeds, setSeeds] = useState<ThemeSeeds>(initialSeeds);
  const [clamps, setClamps] = useState<ThemeClampConfig>(initialClamps);
  const [surfaceTint, setSurfaceTint] = useState(defaultThemeConfig.surface.tint);
  const [lightSurfaceBrightness, setLightSurfaceBrightness] = useState(defaultThemeConfig.surface.lightBrightness);
  const [darkSurfaceLift, setDarkSurfaceLift] = useState(defaultThemeConfig.surface.darkLift);
  const [surfaceTintSource, setSurfaceTintSource] = useState<"primary" | "accent">(
    defaultThemeConfig.surface.tintSource,
  );
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [seedImportText, setSeedImportText] = useState("");
  const [seedImportMessage, setSeedImportMessage] = useState("");
  const [copyMessage, setCopyMessage] = useState("");
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

  const themeConfig: LastStackThemeConfig = {
    seeds,
    clamps,
    surface: {
      tint: surfaceTint,
      tintSource: surfaceTintSource,
      lightBrightness: lightSurfaceBrightness,
      darkLift: darkSurfaceLift,
    },
  };
  const themeStyle = createThemeStyle(themeConfig);
  const exportedConfig = JSON.stringify(createThemeConfig(themeConfig), null, 2);

  useEffect(() => {
    if (!copyMessage) {
      return;
    }

    const timeoutId = window.setTimeout(() => setCopyMessage(""), 7000);

    return () => window.clearTimeout(timeoutId);
  }, [copyMessage]);

  useEffect(() => {
    if (!seedImportMessage) {
      return;
    }

    const timeoutId = window.setTimeout(() => setSeedImportMessage(""), 7000);

    return () => window.clearTimeout(timeoutId);
  }, [seedImportMessage]);

  function applySeedImport() {
    const importedSeeds = parseSeedImport(seedImportText);

    if (!importedSeeds) {
      setSeedImportMessage("Could not find any hex colors to import.");
      return;
    }

    setSeeds((current) => ({ ...current, ...importedSeeds }));
    setSeedImportMessage(`Imported ${Object.keys(importedSeeds).length} seed color${Object.keys(importedSeeds).length === 1 ? "" : "s"}.`);
  }

  async function copyExportedConfig() {
    try {
      await navigator.clipboard.writeText(exportedConfig);
      setCopyMessage("Copied config.");
    } catch {
      setCopyMessage("Copy failed. Expand and select the JSON manually.");
    }
  }

  return (
    <main
      className={cn(
        "ls-ui min-h-screen bg-[color-mix(in_srgb,var(--color-bg)_88%,var(--color-border))] p-8 text-text-primary max-[860px]:p-4",
        shellText,
        isPageDark && "dark",
      )}
      style={themeStyle}
    >
      <header className="mx-auto mb-6 grid max-w-[1280px] gap-5">
        <div className="max-w-[760px]">
          <p className="text-[0.9rem] font-semibold uppercase tracking-[0.08em] text-text-secondary">LastStack UI</p>
          <h1 className="mt-2 text-[clamp(2rem,4vw,3.25rem)] font-[680] leading-none tracking-[-0.055em] text-text-primary">let's roll our own ui library</h1>
          <p className="mt-2.5 leading-[1.55] text-text-secondary">
            Unreasonably simple brand-driven white label UI kit.
          </p>
        </div>

        <section className={cn("grid gap-[18px] rounded-lg border border-border bg-surface p-[18px]", settingsText)} aria-label="Theme configuration">
          <div className={sectionHeading}>
            <h2>configuration</h2>
          </div>

          <div className={inlineSettingsSection}>
            <div>
              <h3>light or dark mode</h3>
              <p>
                Change the catalog shell without hiding the fixed light/dark specimens.
              </p>
            </div>
            <SegmentedControl
              aria-label="Page color mode"
              onChange={(value) => setIsPageDark(value === "dark")}
              options={modeOptions}
              value={isPageDark ? "dark" : "light"}
            />
          </div>

          <div className={settingsSection}>
            <div>
              <h3>editable seed colors</h3>
              <p>
                These six inputs are the hand-picked colors. Component backgrounds,
                borders, text, badges, and actions are derived from them.
              </p>
            </div>
            <div className="grid grid-cols-6 gap-3 max-[560px]:grid-cols-3 max-[520px]:grid-cols-2" aria-label="Theme seed colors">
              {seedColors.map(([name]) => (
                <label className="relative grid gap-2 text-[0.82rem] font-semibold capitalize text-text-secondary" key={name}>
                  <span>{name}</span>
                  <input
                    className="h-[42px] w-full cursor-pointer rounded-md border border-[color-mix(in_srgb,currentColor_34%,var(--color-border))] bg-surface p-1 transition-colors hover:bg-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_srgb,var(--color-action-primary)_45%,transparent)] [&::-moz-color-swatch]:rounded-[3px] [&::-moz-color-swatch]:border-0 [&::-webkit-color-swatch]:rounded-[3px] [&::-webkit-color-swatch]:border-0 [&::-webkit-color-swatch-wrapper]:p-0"
                    type="color"
                    value={seeds[name]}
                    onChange={(event) =>
                      setSeeds((current) => ({ ...current, [name]: event.target.value }))
                    }
                  />
                </label>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <Button
                onClick={() => setIsImportOpen((current) => !current)}
                size="sm"
                type="button"
                variant="outline"
              >
                {isImportOpen ? "hide import" : "import seeds"}
              </Button>
              {seedImportMessage ? <strong>{seedImportMessage}</strong> : null}
            </div>
            {isImportOpen ? (
              <div className="grid gap-2.5">
                <textarea
                  aria-label="Seed color import"
                  className={cn(textareaClass, "min-h-40")}
                  onChange={(event) => {
                    setSeedImportText(event.target.value);
                    setSeedImportMessage("");
                  }}
                  placeholder={`Paste JSON, keyed values, or six hex colors:\n#292966\n#9ac2d9\n#4f8fbf\n#5fa868\n#d9a441\n#c9626b`}
                  spellCheck={false}
                  value={seedImportText}
                />
                <div className={configActions}>
                  <Button onClick={applySeedImport} size="sm" type="button">
                    apply seeds
                  </Button>
                  <span>
                    Keyless colors map to primary, accent, info, success, warning, error.
                  </span>
                </div>
              </div>
            ) : null}
          </div>

          <div className={inlineSettingsSection}>
            <div>
              <h3>surface tint</h3>
              <p>
                Mix a little brand color into backgrounds and borders. Text stays
                neutral so contrast remains predictable.
              </p>
            </div>
            <div className="grid justify-items-end gap-3 max-[860px]:justify-items-stretch [&_.ui-slider]:min-w-[min(260px,100%)]">
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

          <div className={inlineSettingsSection}>
            <div>
              <h3>surface depth</h3>
              <p>
                Tune light mode from neutral to bright and dark mode from deep to
                lifted, independently from the brand tint.
              </p>
            </div>
            <div className="grid justify-items-end gap-3 max-[860px]:justify-items-stretch [&_.ui-slider]:min-w-[min(260px,100%)]">
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

          <div className={settingsSection}>
            <div>
              <h3>action contrast clamps</h3>
              <p>
                Filled buttons can adjust primary and accent lightness per mode so
                light brand colors still work on light surfaces, and dark brand
                colors still work on dark surfaces.
              </p>
            </div>
            <div className="grid grid-cols-2 items-center gap-x-4 gap-y-3 max-[520px]:grid-cols-1" aria-label="Action color clamp settings">
              {clampControls.map(([key, label]) => (
                <Checkbox
                  checked={clamps[key]}
                  key={key}
                  onChange={(event) =>
                    setClamps((current) => ({ ...current, [key]: event.target.checked }))
                  }
                >
                  {label}
                </Checkbox>
              ))}
            </div>
          </div>

          <div className={settingsSection}>
            <div>
              <h3>export config</h3>
              <p>
                This read-only config updates as you tune the workbench. Copy it
                when you are ready to use the theme in an app.
              </p>
            </div>
            <div className="grid gap-2.5">
              <div className={configActions}>
                <Button onClick={copyExportedConfig} size="sm" type="button">
                  copy config
                </Button>
                {copyMessage ? <span>{copyMessage}</span> : null}
              </div>
              <details className="text-text-secondary">
                <summary className="w-fit cursor-pointer text-[0.88rem] font-bold">show JSON</summary>
                <textarea
                  aria-label="Exported theme config JSON"
                  className={cn(textareaClass, "mt-2.5 min-h-[280px]")}
                  readOnly
                  spellCheck={false}
                  value={exportedConfig}
                />
              </details>
            </div>
          </div>
        </section>
      </header>

      <CatalogGroup title="specimens" description="Composed component examples for checking light and dark mode side by side.">
        <CatalogSection title="component examples" description="Matched examples rendered in light and dark mode.">
          <div className="grid gap-[18px]">
            <div className="grid gap-3.5">
              <h3 className="m-0 text-base font-semibold tracking-[-0.02em] text-text-primary">light mode</h3>
              <div className="ls-ui">
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
            <div className="grid gap-3.5">
              <h3 className="m-0 text-base font-semibold tracking-[-0.02em] text-text-primary">dark mode</h3>
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
        </CatalogSection>
      </CatalogGroup>

      <CatalogGroup title="actions" description="Components that trigger or represent user actions.">
        <CatalogSection title="button variants" description="Tones, variants, and sizes shown as separate axes so the catalog stays readable.">
          <div className="grid grid-cols-3 gap-4 max-[1120px]:grid-cols-1 max-[860px]:grid-cols-1">
            <ShowcaseCard title="tones" description="Showing solid and outline variants across primary, accent, and destructive tones.">
              <div className="grid gap-3.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <Button>primary</Button>
                  <Button tone="accent">accent</Button>
                  <Button tone="destructive">destructive</Button>
                </div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <Button variant="outline">primary</Button>
                  <Button tone="accent" variant="outline">accent</Button>
                  <Button tone="destructive" variant="outline">destructive</Button>
                </div>
              </div>
            </ShowcaseCard>
            <ShowcaseCard title="variants" description="Solid, outline, subtle, and ghost using the default primary tone.">
              <div className={controlRow}>
                <Button>solid</Button>
                <Button variant="outline">outline</Button>
                <Button variant="subtle">subtle</Button>
                <Button variant="ghost">ghost</Button>
              </div>
            </ShowcaseCard>
            <ShowcaseCard title="sizes" description="Small, medium, and large using the default primary solid button.">
              <div className={controlRow}>
                <Button size="sm">sm</Button>
                <Button>md</Button>
                <Button size="lg">lg</Button>
              </div>
            </ShowcaseCard>
          </div>
        </CatalogSection>
      </CatalogGroup>

      <CatalogGroup title="status" description="Compact labels for state, metadata, and semantic context.">
        <CatalogSection title="badge variants" description="Intent colors and sizes for compact status, metadata, and labels.">
          <div className={showcaseGrid}>
            <ShowcaseCard title="intents" description="Brand and semantic badge tones derived from tint tokens.">
              <div className="flex flex-wrap items-center gap-3 pt-1.5">
                <Badge tone="primary">primary</Badge>
                <Badge tone="accent">accent</Badge>
                <Badge tone="info">info</Badge>
                <Badge tone="success">success</Badge>
                <Badge tone="warning">warning</Badge>
                <Badge tone="error">error</Badge>
              </div>
            </ShowcaseCard>
            <ShowcaseCard title="sizes" description="Small, medium, and large using the default primary tone.">
              <div className="grid gap-3.5 pt-0.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <Badge size="sm">sm</Badge>
                  <Badge>md</Badge>
                  <Badge size="lg">lg</Badge>
                </div>
              </div>
            </ShowcaseCard>
          </div>
        </CatalogSection>
      </CatalogGroup>

      <CatalogGroup title="inputs" description="Controls for selection, ranges, and mutually exclusive choices.">
        <CatalogSection title="checkboxes" description="Boolean selection across checked, unchecked, disabled, primary, and accent states.">
          <div className={showcaseGrid}>
            <ShowcaseCard title="states" description="Labels update from the actual checkbox state.">
              <div className={stackedControls}>
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
                <Checkbox defaultChecked disabled tone="accent">Disabled checked</Checkbox>
              </div>
            </ShowcaseCard>
          </div>
        </CatalogSection>

        <CatalogSection title="sliders" description="Range controls for numeric values with primary, accent, and disabled states.">
          <div className={showcaseGrid}>
            <ShowcaseCard title="tones and states" description="Primary and accent range controls with value labels.">
              <div className={cn(stackedControls, "w-[min(320px,100%)]")}>
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
            </ShowcaseCard>
          </div>
        </CatalogSection>

        <CatalogSection title="segmented controls" description="Mutually exclusive choices across tones and sizes.">
          <div className={showcaseGrid}>
            <ShowcaseCard title="tones" description="Primary and accent segmented controls using the default medium size.">
              <div className={stackedControls}>
                <div className="grid gap-1.5">
                  <span className="text-[0.82rem] font-semibold uppercase tracking-[0.04em] text-text-secondary">primary</span>
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
                <div className="grid gap-1.5">
                  <span className="text-[0.82rem] font-semibold uppercase tracking-[0.04em] text-text-secondary">accent</span>
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
            </ShowcaseCard>
            <ShowcaseCard title="sizes" description="Small, medium, and large using the default primary tone.">
              <div className={stackedControls}>
                <div className="grid gap-1.5">
                  <span className="text-[0.82rem] font-semibold uppercase tracking-[0.04em] text-text-secondary">sm</span>
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
                <div className="grid gap-1.5">
                  <span className="text-[0.82rem] font-semibold uppercase tracking-[0.04em] text-text-secondary">md</span>
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
                <div className="grid gap-1.5">
                  <span className="text-[0.82rem] font-semibold uppercase tracking-[0.04em] text-text-secondary">lg</span>
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
            </ShowcaseCard>
          </div>
        </CatalogSection>
      </CatalogGroup>

      <CatalogGroup title="presentation" description="Components for grouping and presenting content.">
        <CatalogSection title="callout" description="Full-width contextual messages with semantic tone and an optional flush mode for embedding inside containers.">
          <div className={showcaseGrid}>
            <ShowcaseCard title="tones" description="Info, success, warning, and error using tint tokens.">
              <div className={cn(stackedControls, "w-full")}>
                <Callout tone="info" title="Heads up">Vacancy rate in this submarket has dropped 3.2% over the last quarter.</Callout>
                <Callout tone="success" title="Analysis complete">Comparable set generated from 14 verified transactions.</Callout>
                <Callout tone="warning" title="Data gap">Two comps are missing rent escalation terms. Review before exporting.</Callout>
                <Callout tone="error" title="Export failed">Unable to connect to the report server. Try again or contact support.</Callout>
              </div>
            </ShowcaseCard>
            <ShowcaseCard title="flush" description="No border or radius — snaps to the edges of its container.">
              <div className="grid w-full gap-3">
                <Card className="overflow-hidden p-0">
                  <Callout tone="error" title="Save failed" flush>Unable to save your changes. Check your connection and try again.</Callout>
                  <div className="px-4 py-3.5">
                    <CardTitle className="text-base">Deal memo</CardTitle>
                    <CardDescription className="text-base leading-normal">450 Commerce Dr · Q2 2026</CardDescription>
                  </div>
                </Card>
                <Card className="overflow-hidden p-0">
                  <Callout tone="warning" title="Incomplete data" flush>Some fields are missing. The report may be incomplete.</Callout>
                  <div className="px-4 py-3.5">
                    <CardTitle className="text-base">Rent roll</CardTitle>
                    <CardDescription className="text-base leading-normal">3 of 12 units missing lease expiry</CardDescription>
                  </div>
                </Card>
              </div>
            </ShowcaseCard>
          </div>
        </CatalogSection>

        <CatalogSection title="card variants" description="Flat content surfaces with optional elevation and interactive affordance.">
          <div className="grid grid-cols-3 gap-4 max-[860px]:grid-cols-1">
            <Card className="grid content-start justify-items-start gap-4 p-6">
              <Badge tone="info">default</Badge>
              <CardTitle className="text-[1.35rem]">Default card</CardTitle>
              <CardDescription className="max-w-[44rem] text-base leading-normal">Plain surface, one border, derived text colors.</CardDescription>
            </Card>
            <Card className="grid content-start justify-items-start gap-4 p-6" variant="elevated">
              <Badge tone="success">elevated</Badge>
              <CardTitle className="text-[1.35rem]">Elevated card</CardTitle>
              <CardDescription className="max-w-[44rem] text-base leading-normal">Reserved for layered content and dialogs.</CardDescription>
            </Card>
            <Card className="grid content-start justify-items-start gap-4 p-6" variant="interactive">
              <Badge tone="warning">interactive</Badge>
              <CardTitle className="text-[1.35rem]">Interactive card</CardTitle>
              <CardDescription className="max-w-[44rem] text-base leading-normal">Subtle hover treatment for selectable regions.</CardDescription>
            </Card>
          </div>
        </CatalogSection>
      </CatalogGroup>
    </main>
  );
}

export default App;
