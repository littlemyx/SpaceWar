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
      {/* <div
        id="debug-ui"
        className="w-96 h-48 bg-gray-400 border-solid border border-gray-100"
      >
        test
      </div> */}
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
