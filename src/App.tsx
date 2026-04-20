import { useEffect, useState } from 'react'
import {
  Authenticator,
  Button,
  Flex,
  Heading,
  TextField,
  View,
  Text,
  Divider,
  Card,
  useTheme,
} from '@aws-amplify/ui-react'
import { generateClient } from 'aws-amplify/api'
import { uploadData } from 'aws-amplify/storage'
import { get } from 'aws-amplify/api'
import { listTrips } from './graphql/queries'
import { createTrip } from './graphql/mutations'

const client = generateClient()

type Trip = {
  id: string
  title: string
  destination: string
  startDate?: string | null
  endDate?: string | null
  owner?: string | null
}

function TripNotesApp({
  user,
  signOut,
}: {
  user: { username?: string } | undefined
  signOut: (() => void) | undefined
}) {
  const { tokens } = useTheme()
  const [trips, setTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [destination, setDestination] = useState('')
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [uploadStatus, setUploadStatus] = useState<string>('')
  const [restResponse, setRestResponse] = useState<string>('')

  async function fetchTrips() {
    setLoading(true)
    try {
      const res: any = await client.graphql({ query: listTrips })
      const items: Trip[] = res.data?.listTrips?.items ?? []
      setTrips(items)
    } catch (err) {
      console.error('listTrips error', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTrips()
  }, [])

  async function onCreateTrip(e: React.FormEvent) {
    e.preventDefault()
    if (!title || !destination) return
    try {
      await client.graphql({
        query: createTrip,
        variables: { input: { title, destination } },
      })
      setTitle('')
      setDestination('')
      await fetchTrips()
    } catch (err) {
      console.error('createTrip error', err)
      alert('Create trip failed — see console.')
    }
  }

  async function onUploadPhoto() {
    if (!photoFile) return
    setUploadStatus('Uploading...')
    try {
      const key = `photos/${user?.username ?? 'anon'}/${Date.now()}-${photoFile.name}`
      await uploadData({
        path: ({ identityId }) => `private/${identityId}/${key}`,
        data: photoFile,
      }).result
      setUploadStatus(`Uploaded to private/<identityId>/${key}`)
    } catch (err) {
      console.error('upload error', err)
      setUploadStatus(`Upload failed: ${String(err)}`)
    }
  }

  async function onCallRest() {
    setRestResponse('Calling...')
    try {
      const op = get({ apiName: 'tripnotesrest-gen2-main', path: '/public/trips' })
      const { body } = await op.response
      const text = await body.text()
      setRestResponse(text)
    } catch (err) {
      console.error('rest error', err)
      setRestResponse(`REST failed: ${String(err)}`)
    }
  }

  return (
    <View padding={tokens.space.large}>
      <Flex justifyContent="space-between" alignItems="center">
        <Heading level={2}>Trip Notes — Gen1</Heading>
        <Flex alignItems="center" gap="small">
          <Text>{user?.username}</Text>
          <Button onClick={signOut} size="small">Sign out</Button>
        </Flex>
      </Flex>
      <Divider marginBlock={tokens.space.medium} />

      <Card marginBlock={tokens.space.medium}>
        <Heading level={4}>New Trip</Heading>
        <form onSubmit={onCreateTrip}>
          <Flex direction="row" gap="small" alignItems="flex-end">
            <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <TextField label="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
            <Button type="submit" variation="primary">Create</Button>
          </Flex>
        </form>
      </Card>

      <Card marginBlock={tokens.space.medium}>
        <Heading level={4}>S3 Upload (private to your identity)</Heading>
        <Flex alignItems="center" gap="small">
          <input type="file" onChange={(e) => setPhotoFile(e.target.files?.[0] ?? null)} />
          <Button onClick={onUploadPhoto} isDisabled={!photoFile}>Upload</Button>
        </Flex>
        {uploadStatus && <Text marginTop="small">{uploadStatus}</Text>}
      </Card>

      <Card marginBlock={tokens.space.medium}>
        <Heading level={4}>REST API — /public/trips</Heading>
        <Button onClick={onCallRest}>Call REST (IAM-signed as user)</Button>
        {restResponse && (
          <View as="pre" marginTop="small" fontSize="small">
            {restResponse}
          </View>
        )}
      </Card>

      <Card marginBlock={tokens.space.medium}>
        <Heading level={4}>Trips ({loading ? '…' : trips.length})</Heading>
        <Button size="small" onClick={fetchTrips} marginBottom="small">Refresh</Button>
        <ul>
          {trips.map((t) => (
            <li key={t.id}>
              <strong>{t.title}</strong> — {t.destination} <em>(owner: {t.owner ?? 'n/a'})</em>
            </li>
          ))}
        </ul>
      </Card>
    </View>
  )
}

export default function App() {
  return (
    <Authenticator signUpAttributes={['email']}>
      {({ signOut, user }) => (
        <TripNotesApp user={user as { username?: string } | undefined} signOut={signOut} />
      )}
    </Authenticator>
  )
}
