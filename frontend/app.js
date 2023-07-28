var App = {
  web3Provider: null,
  contracts: {},
  account: "0x0",
  accounts: [],
  contestAddress: {}, 
  tokenAddress: {},
  web3,
  tokenDecimals: 0,

  
  init: function () {
    return App.initWeb3();
  },

  

  initWeb3: function () {
    if (typeof web3 !== "undefined") {
      console.log("Using web3 detected from external source like Metamask");
      App.web3Provider = window.ethereum;
      web3 = new Web3(window.ethereum);
    } else {
      console.log("Using localhost");
      web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
    return App.initEth();
  },

  initEth: function () {
    ethereum
      .request({ method: "eth_requestAccounts" })
      .then(function (accounts) {
        console.log("Ethereum enabled");
        App.account = accounts[0];
        console.log("In initEth: " + App.account);
        web3.eth.getChainId().then(function (result) {
          App.chainId = result;
          console.log("Chain ID: " + App.chainId);
          return App.initContestContract();
        })
      });
  },

  initContestContract: function () {
    var pathToAbi = "./abis/TheContest.json";
    $.getJSON(pathToAbi, function (abi) {
      App.contracts.Contest = new web3.eth.Contract(abi);
      console.log(App.chainId)
      App.contracts.Contest.options.address = "0x9413c3b2Fb74A7b7e6CDeBa683b31646Ceb534F2" 
      console.log(App.chainId)
      console.log("Contract initialized");
      console.log("Contract address: " +  App.contracts.Contest.options.address);
      console.log("this is contestaddress", App.contracts.contestAddress);
      console.log("this is tokenbalance", App.tokenBalance);
      App.contracts.Contest.methods.getCostPerYearInTRB().call().then(function(result) {
        console.log("this is cost", result);
        let costPerYearInTRB = parseFloat(result) / (10 ** 18);
        document.getElementById("costPerYearInTRB").innerHTML = costPerYearInTRB.toFixed(3);
      });
      return App.initTokenContract();
    });
  },

  initTokenContract: function () {
    var pathToAbi = "./abis/ERC20.json";
    $.getJSON(pathToAbi, function (abi) {
      App.contracts.Token = new web3.eth.Contract(abi);
      if (App.chainId === 5) {
        App.contracts.Token.options.address = "0x51c59c6cAd28ce3693977F2feB4CfAebec30d8a2" //eth goerli 
      } 
      if (App.chainId === 1)  {
        App.contracts.Token.options.address = "0x88dF592F8eb5D7Bd38bFeF7dEb0fBc02cf3778a0" // eth main
      } 
      if (App.chainId === 137)  {
        App.contracts.Token.options.address = "0xE3322702BEdaaEd36CdDAb233360B939775ae5f1" // polygon main
      }
      if (App.chainId === 80001)  {
        App.contracts.Token.options.address = "0xce4e32fe9d894f8185271aa990d2db425df3e6be" // polygon mumbai
      } 
      if (App.chainId === 100)  {
        App.contracts.Token.options.address = "0xAAd66432d27737ecf6ED183160Adc5eF36aB99f2" // gnosis main
      } 
      if (App.chainId === 10200)  {
        App.contracts.Token.options.address = "0xe7147C5Ed14F545B4B17251992D1DB2bdfa26B6d" // gnosis chiado
      }
      if (App.chainId === 10)  {
        App.contracts.Token.options.address = "0xaf8cA653Fa2772d58f4368B0a71980e9E3cEB888" // optimism mainnet
      }
      if (App.chainId === 420)  {
        App.contracts.Token.options.address = "0x3251838bd813fdf6a97D32781e011cce8D225d59" //optimism goerli
      }
      if (App.chainId === 42161)  {
        App.contracts.Token.options.address = "0xd58D345Fd9c82262E087d2D0607624B410D88242" // arbitrum one
      }
      if (App.chainId === 421613)  {
        App.contracts.Token.options.address = "0x8d1bB5eDdFce08B92dD47c9871d1805211C3Eb3C" // arbitrum goerli
      }
      if (App.chainId === 3141)  {
        App.contracts.Token.options.address = "0xe7147C5Ed14F545B4B17251992D1DB2bdfa26B6d" // filecoin hyperspace
      }
      if (App.chainId === 11155111)  {
        App.contracts.Token.options.address = "0x80fc34a2f9FfE86F41580F47368289C402DEc660" // sepolia hyperspace
      }
      console.log("Token contract initialized");
      console.log(
        "Token contract address: ", App.contracts.Token.options.address
      );
      App.getTokenBalance();
      return App.getTokenDecimals();
    });
  },

  
  getTokenDecimals: function () {
    App.contracts.Token.methods
      .decimals()
      .call()
      .then(function (result) {
        App.tokenDecimals = result;
        return App.setPageParams();
      });
  },

  setPageParams: function () {
    var contestAddressElement = document.getElementById("contestAddress");
    if (contestAddressElement) {
      contestAddressElement.innerHTML = App.contracts.Contest.options.address;
    }
  
    var connectedAddressElement = document.getElementById("connectedAddress");
    if (connectedAddressElement) {
      connectedAddressElement.innerHTML = App.account;
    }

    var tokenBalanceElement = document.getElementById("tokenBalance");
    if (tokenBalanceElement) {
      tokenBalanceElement.innerHTML = App.tokenBalance 
    }
  
  
    App.getTokenBalance();
  },


  getTokenBalance: function () {
    App.contracts.Token.methods
      .balanceOf(App.account)
      .call()
      .then(function (result) {
        let tokenBalance = BigInt(result) / BigInt(10 ** App.tokenDecimals);
        let tokenBalanceString = tokenBalance.toString() + " TRB";
        console.log(window.location.pathname);
        console.log(document.getElementById("tokenBalance"), "tokenBalance");
        let tokenBalanceElement = document.getElementById("tokenBalance");
        if (tokenBalanceElement) {
          tokenBalanceElement.innerHTML = tokenBalanceString;
        } 
      });
  },

  /*getStakedTokenBalance: function () {
    App.contracts.Contest.methods
      .getStakerInfo(App.account)
      .call()
      .then(function (result) {
        let stakedTokenBalance = BigInt(result) / BigInt(10 ** App.tokenDecimals);
        let stakedTokenBalanceString = stakedTokenBalance.toString() + " TRB";
        document.getElementById("stakedTokenBalance").innerHTML = stakedTokenBalanceString;
      });
  },*/

  getCostPerYearInTRB: function () {
    // Check if the current page is Register.html
    if (window.location.pathname.endsWith('/Register.html')) {
      let costPerYearInTRBElement = document.getElementById("costPerYearInTRB");
      if (costPerYearInTRBElement) {
        App.contracts.Contest.methods.getCostPerYearInTRB().call().then(function(result) {
          console.log("getCostPerYearInTRB result:", result);
          costPerYearInTRBElement.innerHTML = result; // Display the result without rounding
        });
      }
    }
  },

  to18: function(n) {
    return ethers.BigNumber.from(n).mul(ethers.BigNumber.from(10).pow(18));
},


   /*uintTob32: function (n) {
    let vars = web3.utils.toHex(n);
    vars = vars.slice(2);
    while (vars.length < 64) {
      vars = "0" + vars;
    }
    vars = "0x" + vars;
    return vars;
  },*/

  uintTob32: function (n) {
    let vars = web3.utils.toBN(n).toString('hex');
    vars = vars.padStart(64, '0');
    return  vars;
  },
  

  reportValue: function () {
    queryType = document.getElementById("_queryType").value;
    amount = document.getElementById("_amount").value;
    convertedAmount = BigInt(amount) * BigInt(10 ** 18);
    //nonce = document.getElementById("_nonce").value;
    //queryData = document.getElementById("_queryData").value;
    console.log("_queryType: " + queryType);
    console.log("amount:" + convertedAmount);
    App.contracts.Token.methods.approve(App.contracts.Contest.options.address, amount).send({ from: App.account })
    .then(function() {
      // The approval was successful, you can now call the function that requires the allowance
    })
    .catch(function(error) {
      // There was an error, handle it here
    });
    App.contracts.Contest.methods
      .register(queryType, convertedAmount)
      .send({ from: App.account })
      .then(function (result) {
        console.log(result);
      });
  },

  setOwnerAddress: function () {
    queryType = document.getElementById("_queryType").value;
    ownerAddress = document.getElementById("_owner").value;
    //queryData = document.getElementById("_queryData").value;
    console.log("_owner: " + ownerAddress);
    App.contracts.Contest.methods
      .setOwnerAddress(queryType, ownerAddress)
      .send({ from: App.account })
      .then(function (result) {
        console.log(result);
      });
  },

  setManagerAddress: function () {
    queryType = document.getElementById("_queryType").value;
    managerAddress = document.getElementById("_manager").value;
    //queryData = document.getElementById("_queryData").value;
    console.log("_manager: " + managerAddress);
    App.contracts.Contest.methods
      .setManagerAddress(queryType, managerAddress)
      .send({ from: App.account })
      .then(function (result) {
        console.log(result);
      });
  },

  extendRegistration: function () {
    queryType = document.getElementById("_queryType").value;
    amountTRB = document.getElementById("_amountTRB").value;
    convertedAmountTRB = BigInt(amountTRB) * BigInt(10 ** 18);
    //queryData = document.getElementById("_queryData").value;
    console.log("_amountTRB: " + amountTRB);
    console.log("_queryType: " + queryType);

    App.contracts.Contest.methods
      .extendRegistration(queryType, convertedAmountTRB)
      .send({ from: App.account })
      .then(function (result) {
        console.log(result);
      });
  },

  setDocumentHash: function () {
    queryType = document.getElementById("_queryType").value;
    documentHash = document.getElementById("_docHash").value;
    console.log("_docHash: " + documentHash);
    console.log("_queryType: " + queryType);

    App.contracts.Contest.methods
      .setDocumentHash(queryType, documentHash)
      .send({ from: App.account })
      .then(function (result) {
        console.log(result);
      });
  },


  //     value = "0x" + App.uintTob32(web3.utils.toWei(document.getElementById("_value").value, 'ether')).padStart(64, '0');




  /*stakeToken: function () {
  stakeAmount = (document.getElementById("stakeAmount").value)*100000000000000000n;
  console.log("stakeAmount: " + stakeAmount);
  App.contracts.Contest.methods
    .depositStake(stakeAmount)
    .send({ from: App.account })
    .then(function (result) {
      console.log(result);
    });
},*/
};

$(function () {
  $(window).load(function () {
    // Get the current file name or path
    var currentFile = window.location.pathname;

    // Check if the current file is one of the specific HTML files
    if (currentFile === "Register.html" || currentFile === "Manage.html") {
      // Enable the connectButton if it exists
      var connectButton = document.getElementById("connectButton");
      if (connectButton) {
        connectButton.disabled = false;
      }
    }
    App.init();
  });
});