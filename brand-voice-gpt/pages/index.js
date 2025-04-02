import dynamic from "next/dynamic"
import Head from "next/head"

const BrandVoiceGenerator = dynamic(() => import("../components/BrandVoiceGenerator"), { ssr: false })

export default function Home() {
  return (
    <>
      <Head><title>Brand Voice AI</title></Head>
      <BrandVoiceGenerator />
    </>
  )
}