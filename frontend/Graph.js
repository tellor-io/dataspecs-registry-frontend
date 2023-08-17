//The Graph
import { ApolloClient, InMemoryCache, useQuery } from '@apollo/client'
//Utils
import { reporterQuery, autopayQuery } from '../utils/queries'
import { decodingMiddleware, sortDataByProperty } from '../utils/helpers'

export const GraphContext = createContext()

//ApolloClients

const clientSepolia = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/raynharr/tellor-dataspecs-registry',
  cache: new InMemoryCache(),
})

const clientPolygonMatic = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/raynharr/tellor-dataspecs-registry',
  cache: new InMemoryCache(),
})

const Graph = ({ children }) => {
  //Component State
  
  const [graphSepoliaData, setGraphSepoliaData] = useState({})
  const [graphPolygonMaticData, setGraphPolygonMaticData] = useState({})

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

  const polygonMatic = useQuery(reporterQuery, {
    client: clientPolygonMatic,
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

    useEffect(() => {
      if (!polygonMatic) return
      setGraphPolygonMaticData({
        data: polygonMatic.data,
        loading: polygonMatic.loading,
        error: polygonMatic.error,
      })
    
      return () => {
        setGraphPolygonMaticData({})
        console.log(setGraphPolygonMaticData)
      }
    }, [polygonMatic.data, polygonMatic.loading, polygonMatic.error])
  

  //For conglomerating data
  useEffect(() => {
    if (

      !graphSepoliaData.data ,
      !graphPolygonMaticData.data
     
    )
      return

    let eventsArray = []
  
    graphSepoliaData.data.newReportEntities.forEach((event) => {
      event.chain = 'Sepolia Testnet'
      event.txnLink = `https://sepolia.etherscan.io/tx/${event.txnHash}`
      eventsArray.push(event)
    })

    graphPolygonMaticData.data.newReportEntities.forEach((event) => {
    event.chain = 'Polygon Matic'
    event.txnLink = `https://matic.etherscan.io/tx/${event.txnHash}`
    eventsArray.push(event)
    })
    
    
    let sorted = sortDataByProperty('_time', eventsArray)
    setAllGraphData(sorted)

    return () => {
      setAllGraphData(null)
    }
  }, [graphSepoliaData, graphPolygonMaticData])

  useEffect(() => {
    if (!allGraphData) return
    setDecodedData(decodingMiddleware(allGraphData))

    return () => {
      setDecodedData(null)
    }
  }, [allGraphData])

  const GraphContextObj = {
    decodedData: decodedData,
    polygonMaticData: graphPolygonMaticData,
  }

   // console.log(graphArboneData)

  return (
    <GraphContext.Provider value={GraphContextObj}>
      {children}
    </GraphContext.Provider>
  )
}

export default Graph