import React from 'react'
import {Card, Stack, Text, Inline, Badge} from '@sanity/ui'

type Accord = {
  _key?: string
  name?: string
  percentage?: number
  color?: {hex?: string}
}

type Props = {
  value?: Accord[]
  onChange: (evt: any) => void
  renderDefault: (props: any) => React.ReactNode
}

export default function AccordsChartInput(props: Props) {
  const {value = [], renderDefault} = props
  const total = value.reduce((sum, a) => sum + (a?.percentage || 0), 0)

  return (
    <Stack space={4}>
      <Card padding={3} tone="transparent">
        <Text size={1} weight="semibold">Accords Chart</Text>
        <Stack space={2} marginTop={3}>
          {value.length === 0 && (
            <Text size={1} muted>No accords yet. Add some below.</Text>
          )}
          {value.map((a) => {
            const pct = a?.percentage || 0
            const hex = a?.color?.hex || '#999999'
            const width = Math.max(2, Math.min(100, pct))
            return (
              <Stack key={a._key} space={2}>
                <Inline space={3}>
                  <Badge style={{backgroundColor: hex}} />
                  <Text size={1}>{a?.name || 'Unnamed'}</Text>
                  <Text size={1} muted>— {pct}%</Text>
                </Inline>
                <div style={{background: '#eee', height: 8, borderRadius: 4}}>
                  <div
                    style={{
                      width: `${width}%`,
                      background: hex,
                      height: 8,
                      borderRadius: 4,
                    }}
                  />
                </div>
              </Stack>
            )
          })}
          {total > 100 && (
            <Text size={1} tone="critical">Total exceeds 100% ({total}%)</Text>
          )}
        </Stack>
      </Card>
      {renderDefault(props as any)}
    </Stack>
  )
}


