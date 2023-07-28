//The Graph
import { ApolloClient, InMemoryCache, useQuery } from '@apollo/client'
//Utils
import { reporterQuery, autopayQuery } from '../utils/queries'
import { decodingMiddleware, sortDataByProperty } from '../utils/helpers'

export const GraphContext = createContext()

//ApolloClients

const clientSepolia = new ApolloClient({
  uri: 'https://api.studio.thegraph.com/query/33329/tellor-dataspecs-sepolia/v.0.0.3',
  cache: new InMemoryCache(),
})

const Graph = ({ children }) => {
  //Component State
  
  const [graphSepoliaData, setGraphSepoliaData] = useState({})
 
  const [allGraphData, setAllGraphData] = useState(null)
  const [decodedData, setDecodedData] = useState(null)

  //Graph Querying every 5 seconds
  //Mainnet
  
  //Sepolia
  const sepolia = useQuery(reporterQuery, {
    client: clientSepolia,
    fetchPolicy: 'network-only',
    pollInterval: 5000,
  })
  
  //useEffects for listening to reponses
  //from ApolloClient queries
  //Mainnet
  
    //Sepolia
    useEffect(() => {
      if (!sepolia) return
      setGraphSepoliaData({
        data: sepolia.data,
        loading: sepolia.loading,
        error: sepolia.error,
      })
  
      return () => {
        setGraphSepoliaData({})
        console.log(setGraphSepoliaData)
      }
    }, [sepolia.data, sepolia.loading, sepolia.error]) //eslint-disable-line
  

  //For conglomerating data
  useEffect(() => {
    if (

      !graphSepoliaData.data 
     
    )
      return

    let eventsArray = []
  
    graphSepoliaData.data.newReportEntities.forEach((event) => {
      event.chain = 'Sepolia Testnet'
      event.txnLink = `https://sepolia.etherscan.io/tx/${event.txnHash}`
      eventsArray.push(event)
    })
    
    
    let sorted = sortDataByProperty('_time', eventsArray)
    setAllGraphData(sorted)

    return () => {
      setAllGraphData(null)
    }
  }, [graphSepoliaData])

  useEffect(() => {
    if (!allGraphData) return
    setDecodedData(decodingMiddleware(allGraphData))

    return () => {
      setDecodedData(null)
    }
  }, [allGraphData])

  const GraphContextObj = {
    decodedData: decodedData,
  }

   // console.log(graphArboneData)

  return (
    <GraphContext.Provider value={GraphContextObj}>
      {children}
    </GraphContext.Provider>
  )
}

export default Graph