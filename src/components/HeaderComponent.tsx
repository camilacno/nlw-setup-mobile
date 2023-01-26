import { Text } from 'react-native'

import { Container } from './HeaderStyles'

export function Header() {
  return (
    <Container className="w-full flex-row items-center justify-between">
      <Text>Header</Text>
    </Container>
  )
}
