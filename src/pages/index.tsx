import { useState } from 'react'
import classNames from 'classnames'
import { Header, Main, Button } from '@bacondotbuild/ui'

import Layout, { DEFAULT_TITLE } from '@/components/layout'
import useLocalStorage from '@/utils/useLocalStorage'
import copyToClipboard from '@/utils/copyToClipboard'

const getRando = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) // The maximum is exclusive and the minimum is inclusive
}

export default function Home() {
  const [itemsText, setItemsText] = useLocalStorage('items', '')
  const items = (itemsText ?? '').split('\n').filter(item => item)
  const [randomIndex, setRandomIndex] = useState<number | null>(null)
  const randomItem = randomIndex !== null ? items[randomIndex] : null
  return (
    <Layout title={randomItem ?? undefined}>
      <Header>
        <button
          type='button'
          onClick={() => {
            setItemsText('')
            setRandomIndex(null)
          }}
          className={classNames(randomItem && 'text-cb-yellow')}
          disabled={items.length === 0}
        >
          {randomItem ?? DEFAULT_TITLE}
        </button>
      </Header>
      <Main className='flex flex-col space-y-4 px-4'>
        <textarea
          className='bg-cobalt h-full w-full flex-grow'
          value={itemsText}
          onChange={e => {
            setItemsText(e.target.value)
            setRandomIndex(null)
          }}
          placeholder='list some items here'
        />

        <Button
          className='disabled:pointer-events-none disabled:opacity-25'
          disabled={items.length < 1}
          onClick={() => {
            const rando = getRando(0, items.length)
            setRandomIndex(rando)
            copyToClipboard(items[rando] ?? '')
          }}
        >
          {randomItem ?? DEFAULT_TITLE}
        </Button>
      </Main>
    </Layout>
  )
}
