import { ApolloClient, InMemoryCache, gql } from 'https://cdn.skypack.dev/@apollo/client@3.4.10';

const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/tellor-io/tellor-data-specs-registry',
  cache: new InMemoryCache(),
});

const QUERY = gql`
  {
    newRegistrations {
      id
      _queryType
      _owner
      _expirationTime
      blockNumber
    }

    documentHashUpdateds  {
      id
      _queryType
      _documentHash
      blockNumber
    }
  }
`;

const hardCodedItems = [
  {
    id: 36,
    _queryType: 'AmpleforthCustomSpotPrice',
    _owner: '0xa3fe6d88f2ea92be357663ba9e747301e4cfc39B',
    _expirationTime: 'Never',
    blockNumber: 9012,
    _docHash: 'ipfs://bafkreic4nwrqanfhtslypnueevdine3w4uqxudjsfukimfc5xi4gpplwrq'

  },
  {
    id: 4,
    _queryType: 'AmpleforthUSPCE',
    _owner: '0xa3fe6d88f2ea92be357663ba9e747301e4cfc39B',
    _expirationTime: 'Never',
    blockNumber: 3456,
    _docHash: 'ipfs://bafkreifqnc55qb6rvhfsscafbw5dcnvgs4gjhjeohyexzwmiux7fzyyu64'

  },
  {
    id: 3,
    _queryType: 'AutopayAddresses',
    _owner: '0xa3fe6d88f2ea92be357663ba9e747301e4cfc39B',
    _expirationTime: 'Never',
    blockNumber: 9012,
    _docHash: 'ipfs://bafkreig5war63asrzl6vygpqj3gca7nqcntxzoy4lxvu2wqtmwwxlqwzau'
  },
  {
    id: 4,
    _queryType: 'ChatGPTResponse',
    _owner: '0xa3fe6d88f2ea92be357663ba9e747301e4cfc39B',
    _expirationTime: 'Never',
    blockNumber: 3456,
    _docHash: 'ipfs://bafkreifqnc55qb6rvhfsscafbw5dcnvgs4gjhjeohyexzwmiux7fzyyu64'
  },
  {
    id: 3,
    _queryType: 'ComboQuery',
    _owner: '0xa3fe6d88f2ea92be357663ba9e747301e4cfc39B',
    _expirationTime: 'Never',
    blockNumber: 9012,
    _docHash: 'ipfs://bafkreihy55cafnpjzajwicvztbwwzzybb7eh4ra23orizjmebgenvml2fe'
  },
  {
    id: 4,
    _queryType: 'CrossChainBalance',
    _owner: '0xa3fe6d88f2ea92be357663ba9e747301e4cfc39B',
    _expirationTime: 'Never',
    blockNumber: 3456,
    _docHash: 'ipfs://bafkreief5fsf7t4mnsuli4sxiwtrustcpcu7sk2bigljky6gfrr62jgtka'
  },
  {
    id: 3,
    _queryType: 'Custom1',
    _owner: '0xa3fe6d88f2ea92be357663ba9e747301e4cfc39B',
    _expirationTime: 'Never',
    blockNumber: 9012,
    _docHash: 'ipfs://bafkreifqnc55qb6rvhfsscafbw5dcnvgs4gjhjeohyexzwmiux7fzyyu64'
  },
  {
    id: 4,
    _queryType: 'Custom2',
    _owner: '0xa3fe6d88f2ea92be357663ba9e747301e4cfc39B',
    _expirationTime: 'Never',
    blockNumber: 3456,
    _docHash: 'ipfs://bafkreifqnc55qb6rvhfsscafbw5dcnvgs4gjhjeohyexzwmiux7fzyyu64'
  },
  {
    id: 3,
    _queryType: 'Custom3',
    _owner: '0xa3fe6d88f2ea92be357663ba9e747301e4cfc39B',
    _expirationTime: 'Never',
    blockNumber: 9012,
    _docHash: 'ipfs://bafkreifqnc55qb6rvhfsscafbw5dcnvgs4gjhjeohyexzwmiux7fzyyu64'
  },
  {
    id: 4,
    _queryType: 'CustomPrice',
    _owner: '0xa3fe6d88f2ea92be357663ba9e747301e4cfc39B',
    _expirationTime: 'Never',
    blockNumber: 3456,
    _docHash: 'ipfs://bafkreich3nlh5b4e7xhrodkt5wotqktcv5hu7qn6yl2ifrpfdpfid5q2ka'
  },
  {
    id: 3,
    _queryType: 'DIVAProtocol',
    _owner: '0xa3fe6d88f2ea92be357663ba9e747301e4cfc39B',
    _expirationTime: 'Never',
    blockNumber: 9012,
    _docHash: 'ipfs://bafkreihidum7eqni3sln5jt26wwyloa5rndnisxwnr3cucz6phh4cfio6m'
  },
  {
    id: 4,
    _queryType: 'DailyVolatility',
    _owner: '0xa3fe6d88f2ea92be357663ba9e747301e4cfc39B',
    _expirationTime: 'Never',
    blockNumber: 3456,
    _docHash: 'ipfs://bafkreih6hcijia7zo5s7lbdykqek3pxtwskymbghloreulsqrs4ajzqbxu'
  },
  {
    id: 3,
    _queryType: 'EVMCall',
    _owner: '0xa3fe6d88f2ea92be357663ba9e747301e4cfc39B',
    _expirationTime: 'Never',
    blockNumber: 9012,
    _docHash: 'ipfs://bafkreigwybi7dhg6vihysqtm24vvyjmeolhao4pzx7vbdvrv5l2pbdupwq'
  },
  {
    id: 4,
    _queryType: 'EVMHeader',
    _owner: '0xa3fe6d88f2ea92be357663ba9e747301e4cfc39B',
    _expirationTime: 'Never',
    blockNumber: 3456,
    _docHash: 'ipfs://bafkreicj37ikrmjcrzvo6vdxc7g6xbte4hsoyjscd6jfvdhunujd36oj4y'
  },
  {
    id: 4,
    _queryType: 'EVMHeaderslist',
    _owner: '0xa3fe6d88f2ea92be357663ba9e747301e4cfc39B',
    _expirationTime: 'Never',
    blockNumber: 3456,
    _docHash: 'ipfs://bafkreicnesk22rhc6wjgcd4dvuk4qfm7bbcxnlnc3bjskduoq3ifx54ode'
  },
  {
    id: 3,
    _queryType: 'ExampleFantasyFootball',
    _owner: '0xa3fe6d88f2ea92be357663ba9e747301e4cfc39B',
    _expirationTime: 'Never',
    blockNumber: 9012,
    _docHash: 'ipfs://bafkreia2p7ntf5pd3biiobvoc6rnw4n5vrguky7utcf7fqtxghecc7odr4'
  },
  {
    id: 4,
    _queryType: 'ExampleNftCollectionStats',
    _owner: '0xa3fe6d88f2ea92be357663ba9e747301e4cfc39B',
    _expirationTime: 'Never',
    blockNumber: 3456,
    _docHash: 'ipfs://bafkreifqnc55qb6rvhfsscafbw5dcnvgs4gjhjeohyexzwmiux7fzyyu64'
  },
  {
    id: 3,
    _queryType: 'FilecoinDealStatus',
    _owner: '0xa3fe6d88f2ea92be357663ba9e747301e4cfc39B',
    _expirationTime: 'Never',
    blockNumber: 9012,
    _docHash: 'ipfs://bafkreifqnc55qb6rvhfsscafbw5dcnvgs4gjhjeohyexzwmiux7fzyyu64'
  },
  {
    id: 4,
    _queryType: 'GasPriceOracle',
    _owner: '0xa3fe6d88f2ea92be357663ba9e747301e4cfc39B',
    _expirationTime: 'Never',
    blockNumber: 3456,
    _docHash: 'ipfs://bafkreifqnc55qb6rvhfsscafbw5dcnvgs4gjhjeohyexzwmiux7fzyyu64'
  },
  {
    id: 4,
    _queryType: 'InflationData',
    _owner: '0xa3fe6d88f2ea92be357663ba9e747301e4cfc39B',
    _expirationTime: 'Never',
    blockNumber: 3456,
    _docHash: 'ipfs://bafkreia6ho23owl6ciccnamq6t7sruvj6fjury7ou676bog26zdls47hdy'
  },
  {
    id: 3,
    _queryType: 'LeagueDAO',
    _owner: '0xa3fe6d88f2ea92be357663ba9e747301e4cfc39B',
    _expirationTime: 'Never',
    blockNumber: 9012,
    _docHash: 'ipfs://bafkreigg4yjz5u7ibcev3zdwczy3nzzcjojvxgrqy3eny7b5qqvol7hylq'
  },
  {
    id: 4,
    _queryType: 'LegacyRequest',
    _owner: '0xa3fe6d88f2ea92be357663ba9e747301e4cfc39B',
    _expirationTime: 'Never',
    blockNumber: 3456,
    _docHash: 'ipfs://bafkreieemk5pxe2jfwaebg7kb2xdhd5qqipewiod7ics57kuqj6uot2vyy'
  },
  {
    id: 3,
    _queryType: 'LendingPairToxicity',
    _owner: '0xa3fe6d88f2ea92be357663ba9e747301e4cfc39B',
    _expirationTime: 'Never',
    blockNumber: 9012,
    _docHash: 'ipfs://bafkreiao3k56urrjlmxiacrnrfqefqbxxalzti7y5wyu55eaqp5o3mbe3u'
  },
  {
    id: 4,
    _queryType: 'MimicryCollectionStat',
    _owner: '0xa3fe6d88f2ea92be357663ba9e747301e4cfc39B',
    _expirationTime: 'Never',
    blockNumber: 3456,
    _docHash: 'ipfs://bafkreiek7nk2qnujnxwtarjmni3jjoxbgjuwwqbzp624mhcwamu5dlg5n4'
  },
  {
    id: 4,
    _queryType: 'MimicryMacroMarketMashup',
    _owner: '0xa3fe6d88f2ea92be357663ba9e747301e4cfc39B',
    _expirationTime: 'Never',
    blockNumber: 3456,
    _docHash: 'ipfs://bafkreibay2uo4tnahcoqhvwbwgvrbau6ivvq7ngxfzsyypykhf3m77abkm'
  },
  {
    id: 3,
    _queryType: 'MimicryNFTMarketIndex',
    _owner: '0xa3fe6d88f2ea92be357663ba9e747301e4cfc39B',
    _expirationTime: 'Never',
    blockNumber: 9012,
    _docHash: 'ipfs://bafkreih4ojgo2h6me3s3iboejgsb2wgddryldbml4tdam224qxburvic2a'
  },
  {
    id: 4,
    _queryType: 'Morphware',
    _owner: '0xa3fe6d88f2ea92be357663ba9e747301e4cfc39B',
    _expirationTime: 'Never',
    blockNumber: 3456,
    _docHash: 'ipfs://bafkreidynsby7yij66hxtrxad54zbz6j6xryqeq7vmyh34v6ye47vlltye'
  },
  {
    id: 3,
    _queryType: 'NumericApiResponse',
    _owner: '0xa3fe6d88f2ea92be357663ba9e747301e4cfc39B',
    _expirationTime: 'Never',
    blockNumber: 9012,
    _docHash: 'ipfs://bafkreiatchi6doztyp3rze5d24w2w4n7diqkecrkfps452tjbqgcmtaqh4'
  },
  {
    id: 4,
    _queryType: 'Snapshot',
    _owner: '0xa3fe6d88f2ea92be357663ba9e747301e4cfc39B',
    _expirationTime: 'Never',
    blockNumber: 3456,
    _docHash: 'ipfs://bafkreift3amiam3smai4uz2v3eodfaw47ionxdqoz4t2rvqrhvlxrrwgli'
  },
{
  id: 4,
    _queryType: 'SpotPrice',
    _owner: '0xa3fe6d88f2ea92be357663ba9e747301e4cfc39B',
    _expirationTime: 'Never',
    blockNumber: 3456,
    _docHash: 'https://bafybeif3kaoazzfne7si4brwpej4hpunv3b7r63jyvw5rtid7b7t6zxuca.ipfs.nftstorage.link/SpotPrice.md'
  },
  {
    id: 3,
    _queryType: 'StringQuery',
    _owner: '0xa3fe6d88f2ea92be357663ba9e747301e4cfc39B',
    _expirationTime: 'Never',
    blockNumber: 9012,
    _docHash: 'ipfs://bafkreie4l5nfqpsivjpqyiryo5s2zohyudonzuiiuz5p4it3s7sk2is4pu'
  },
  {
    id: 4,
    _queryType: 'TWAP',
    _owner: '0xa3fe6d88f2ea92be357663ba9e747301e4cfc39B',
    _expirationTime: 'Never',
    blockNumber: 3456,
    _docHash: 'ipfs://bafkreiakyftidgby3xqv7mgokccqcaljwcgg27fhfgpaxi644sodgkzgfq'
  },
  {
    id: 3,
    _queryType: 'TellorKpr',
    _owner: '0xa3fe6d88f2ea92be357663ba9e747301e4cfc39B',
    _expirationTime: 'Never',
    blockNumber: 9012,
    _docHash: 'ipfs://bafkreiezyznjupa76rx5clh2np5cjsl3p5rydqxz7f3dkmacx4khzlotda'
  },
  {
    id: 4,
    _queryType: 'TellorOracleAddress',
    _owner: '0xa3fe6d88f2ea92be357663ba9e747301e4cfc39B',
    _expirationTime: 'Never',
    blockNumber: 3456,
    _docHash: 'ipfs://bafkreiabnob2g6a63gjgiissxpirj5oyppqzwjkn4sqoed4xdzt4dyttj4'
  },
  {
    id: 3,
    _queryType: 'TellorRNG',
    _owner: '0xa3fe6d88f2ea92be357663ba9e747301e4cfc39B',
    _expirationTime: 'Never',
    blockNumber: 9012,
    _docHash: 'ipfs://bafkreibno34e5vklsc4ubyz6q7py6afhjnyz3eti6azicxdj5qmzxnvwva'
  },
  {
    id: 4,
    _queryType: 'TracerFinance',
    _owner: '0xa3fe6d88f2ea92be357663ba9e747301e4cfc39B',
    _expirationTime: 'Never',
    blockNumber: 3456,
    _docHash: 'ipfs://bafkreiaqjbbkrlyezbjxy5onq4lhavrqbwg3tn7nv4yjpizsokrwiy6soa'
  },
  {
    id: 3,
    _queryType: 'TwitterContestV1',
    _owner: '0xa3fe6d88f2ea92be357663ba9e747301e4cfc39B',
    _expirationTime: 'Never',
    blockNumber: 9012,
    _docHash: 'ipfs://bafkreihfroth2zx7osw6thkefio6cxr4xqbkxtped65emrmgwvlckszdca'
  },
  
];
hardCodedItems.sort((a, b) => a._queryType.localeCompare(b._queryType));

client.query({ query: QUERY })
  .then(response => {
    console.log(response);

    const newRegistrations = response.data.newRegistrations;
    const allItems = [...hardCodedItems, ...newRegistrations];
    newRegistrations.sort((a, b) => a._queryType.localeCompare(b._queryType));

    const documentHashUpdateds = response.data.documentHashUpdateds;

    const queryTypeToDocHash = {};
    documentHashUpdateds.forEach(item => {
      queryTypeToDocHash[item._queryType] = item._documentHash;
    });

    const table = document.createElement('table'); // Declare the 'table' variable here

    const sortedItems = allItems.sort((a, b) => a._queryType.localeCompare(b._queryType));
    const headers = ['Query Type Name', 'Doc Hash', 'Owner Address', 'Expiration Date'];
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
      const th = document.createElement('th');
      th.textContent = header;
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    sortedItems.forEach(item => {
      const row = document.createElement('tr');
      headers.forEach(header => {
        if (header === 'Doc Hash') {
          const td = document.createElement('td');

          if (queryTypeToDocHash[item._queryType] || item._docHash) {
            const a = document.createElement('a');
            a.href = queryTypeToDocHash[item._queryType] || item._docHash;
            a.textContent = 'ipfs link';
            a.style.fontSize = '12px';
            td.appendChild(a);
          }

          row.appendChild(td);
        } else if (header === 'Expiration Date') {
          const td = document.createElement('td');
td.textContent = item._expirationTime === 'Never' ? 'No Expiry' : new Date(item._expirationTime * 1000).toLocaleString();
row.appendChild(td);
        } else if (header === 'Query Type Name') {
          const td = document.createElement('td');
          td.textContent = item._queryType;
          row.appendChild(td);
        } else if (header === 'Owner Address') {
          const td = document.createElement('td');
          td.textContent = item._owner;
          row.appendChild(td);
        } else {
          const td = document.createElement('td');
          td.textContent = item[header];
          row.appendChild(td);
        }
      });
      table.appendChild(row);
    });

    document.body.appendChild(table);
  })
  .catch(error => console.error('Error:', error));