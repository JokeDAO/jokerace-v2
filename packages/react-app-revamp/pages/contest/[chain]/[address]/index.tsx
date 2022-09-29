import shallow from 'zustand/shallow'
import Head from 'next/head'
import { chains } from '@config/wagmi'
import { getLayout } from '@layouts/LayoutViewContest'
import type { NextPage } from 'next'
import { useStore } from '@hooks/useContest/store'
import ListProposals from '@components/_pages/ListProposals'
import { supabase } from '@config/supabase'

interface PageProps {
  address: string,
  contestData: any
}

//@ts-ignore
const Page: NextPage = (props: PageProps) => {
  const { address, contestData } = props
  const { isSuccess, isLoading, isListProposalsLoading, isListProposalsSuccess, contestName } = useStore(state =>  ({ 
    //@ts-ignore
    isLoading: state.isLoading,
    //@ts-ignore
    isListProposalsLoading: state.isListProposalsLoading, 
    //@ts-ignore
    isListProposalsSuccess: state.isListProposalsSuccess,
    //@ts-ignore
    contestName: state.contestName, 
    //@ts-ignore
    isSuccess: state.isSuccess,
   }), shallow);
  return (
    <>
      <Head>
        <title>Contest { contestData?.title ? contestData.title : contestName ? contestName : address} - JokeDAO</title>
        <meta name="description" content="@TODO: change this" />
      </Head>
    <h1 className='sr-only'>Contest {contestName ? contestName : address} </h1>
    {!isLoading && !isListProposalsLoading && isSuccess && isListProposalsSuccess && <div className='animate-appear mt-8'>
      <ListProposals />
    </div>}
  </>
)}

const REGEX_ETHEREUM_ADDRESS = /^0x[a-fA-F0-9]{40}$/

export async function getStaticPaths() {
  try {
    const { data } = await supabase
    .from("contests")
    .select("address, network_name")
    const paths = data?.map(contest => {
      return { params: { 
        address: contest?.address,
        chain: contest?.network_name,
      } }
    })
    return {
      paths: paths ?? [],
      fallback: true,
    }
  } catch(e) {
    console.error(e)
    return {paths: [], fallback: true }
  }
}

export async function getStaticProps({ params }: any) {
  const { chain, address } = params
  if (!REGEX_ETHEREUM_ADDRESS.test(address) || chains.filter(c => c.name.toLowerCase().replace(' ', '') === chain).length === 0 ) {
    return { notFound: true }
  }

  try {
    const { data } = await supabase
    .from("contests")
    .select("title")
    .eq("address", address)
    .eq("network_name", chain);

    return {
      props: {
        address,
        contestData: data?.[0],
      }
    }
  } catch (error) {
    console.error(error)
    return { notFound: true }
  }
}
//@ts-ignore
Page.getLayout = getLayout

export default Page
