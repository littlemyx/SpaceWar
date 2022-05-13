import dynamic from 'next/dynamic'

const SpaceWar = dynamic(() => import('@/components/SpaceWar/SpaceWar'), {
  ssr: false,
})

const R3F = () => {
  return (
    <>
      <SpaceWar />
    </>
  )
}

const Page = () => {
  return (
    <>
      {/* @ts-ignore */}
      <R3F r3f />
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'SpaceWar',
    },
  }
}
