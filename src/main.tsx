import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Amplify, type ResourcesConfig } from 'aws-amplify'
import '@aws-amplify/ui-react/styles.css'
import './index.css'
import App from './App.tsx'
import amplifyconfig from '../amplify_outputs.json'

// Gen2 migration emits REST endpoints under `custom.API`, which the
// standard `aws-amplify/api` client does not auto-register. We re-wire it
// into the standard `API.REST` slot so `get({apiName})` can find it.
// Reported as feedback on Amplify Gen2 migration tool.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const customApi = ((amplifyconfig as any).custom?.API ?? {}) as Record<
  string,
  { endpoint: string; region: string; apiName: string }
>
const restEntries = Object.entries(customApi).reduce<
  Record<string, { endpoint: string; region: string }>
>((acc, [name, v]) => {
  acc[name] = { endpoint: v.endpoint, region: v.region }
  return acc
}, {})

// First: let Amplify ingest the generated outputs (Auth, Storage, Data).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
Amplify.configure(amplifyconfig as any)

// Then: extend the runtime config with REST endpoints so get({apiName}) works.
const current = Amplify.getConfig() as ResourcesConfig
Amplify.configure({
  ...current,
  API: {
    ...(current.API ?? {}),
    REST: restEntries,
  },
} as ResourcesConfig)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
