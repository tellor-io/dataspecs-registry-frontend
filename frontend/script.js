import { ApolloClient, InMemoryCache, gql } from 'https://cdn.skypack.dev/@apollo/client@3.4.10';

const client = new ApolloClient({
  uri: 'https://api.studio.thegraph.com/query/33329/tellor-dataspecs-sepolia/v.0.0.3',
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

client.query({ query: QUERY })
  .then(response => {
    console.log(response);

    const newRegistrations = response.data.newRegistrations;
    const documentHashUpdateds = response.data.documentHashUpdateds;
    
    // Step 1: Create a mapping object for _queryType and documentHash
    const queryTypeToDocHash = {};
    documentHashUpdateds.forEach(item => {
      queryTypeToDocHash[item._queryType] = item._documentHash;
    });
    
    const table = document.createElement('table');
     
    // Add table headers
    const headers = ['Query Type Name', 'Doc Hash', 'Owner Address','Expiration Date'];
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
      const th = document.createElement('th');
      th.textContent = header;
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    

    // Add a row for each item in newRegistrations
    newRegistrations.forEach(item => {
      const row = document.createElement('tr');
      headers.forEach(header => {
        if (header === 'Doc Hash') {
          const td = document.createElement('td');

          // Step 2: Check if there is a matching documentHash for the current _queryType
          if (queryTypeToDocHash[item._queryType]) {
            const a = document.createElement('a');
            a.href = queryTypeToDocHash[item._queryType];
            a.textContent = 'ipfs link';
            a.style.fontSize = '12px'; 
            td.appendChild(a);
          }
          
          row.appendChild(td);
        }
        else if (header === 'Expiration Date') {
          const td = document.createElement('td');
          const expirationTime = new Date(item._expirationTime * 1000); // Convert timestamp to milliseconds
          td.textContent = expirationTime.toLocaleString(); // Convert to human-readable format
          row.appendChild(td);
        } else if (header === 'Query Type Name') {
          const td = document.createElement('td');
            td.textContent = item._queryType;
            row.appendChild(td);
        } else if  (header === 'Owner Address') {
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

    // Append the table to the body (or another element of your choice)
    document.body.appendChild(table);
  })
  .catch(error => console.error('Error:', error));