import { useState } from 'react'
import { Badge } from './Badge'
import { Button } from './Button'
import { Callout } from './Callout'
import { Card, CardDescription, CardTitle } from './Card'
import { Checkbox } from './Checkbox'
import { SegmentedControl } from './SegmentedControl'
import { Slider } from './Slider'

type ComponentPreviewCardProps = {
  mode: 'light' | 'dark'
}

export function ComponentPreviewCard({ mode }: ComponentPreviewCardProps) {
  const [segmentValue, setSegmentValue] = useState<'left' | 'right'>('left')
  const [sliderValue, setSliderValue] = useState(72)

  return (
    <div className={mode === 'dark' ? 'dark' : 'ls-ui'}>
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

        <div
          className="grid grid-cols-[repeat(auto-fit,minmax(min(150px,100%),max-content))] items-center gap-4 max-[560px]:flex max-[560px]:flex-col max-[560px]:items-stretch"
          aria-label="Primary and accent button examples"
        >
          <Button>primary filled</Button>
          <Button variant="outline">primary outline</Button>
          <Button tone="accent">accent filled</Button>
          <Button tone="accent" variant="outline">
            accent outline
          </Button>
        </div>

        <div
          className="grid w-[min(340px,100%)] gap-3.5 [&_.ui-segmented]:w-full [&_.ui-segmented_button]:flex-1 [&_.ui-slider]:w-full"
          aria-label="Input component examples"
        >
          <Checkbox defaultChecked>Include off-market comps</Checkbox>
          <Slider
            label="Confidence"
            max="100"
            min="0"
            onChange={(event) => setSliderValue(Number(event.target.value))}
            value={sliderValue}
            valueLabel={`${sliderValue}%`}
          />
          <SegmentedControl
            aria-label="Example view"
            options={[
              { label: 'left', value: 'left' },
              { label: 'right', value: 'right' },
            ]}
            onChange={setSegmentValue}
            value={segmentValue}
          />
        </div>
      </Card>
    </div>
  )
}
