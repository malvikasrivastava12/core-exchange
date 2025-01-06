 let network;
 let contract_address;
 let connection;
 let mainAccount;
 let accounts;
 let Accounttype = "0";
 let windows = {};
 let contractAddress = "0x24b3f63b74a633c4d972e5b0ce1418e3ccc3f87a";
 let abi = [{
     "inputs": [{
         "internalType": "address",
         "name": "_implementation",
         "type": "address"
     }],
     "stateMutability": "nonpayable",
     "type": "constructor"
 }, {
     "inputs": [],
     "name": "Deposit",
     "outputs": [],
     "stateMutability": "payable",
     "type": "function"
 }, {
     "inputs": [],
     "name": "FreeAirDrop",
     "outputs": [{
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
     }],
     "stateMutability": "view",
     "type": "function"
 }, {
     "inputs": [{
         "internalType": "address",
         "name": "_upline",
         "type": "address"
     }],
     "name": "IsUpline",
     "outputs": [{
         "internalType": "bool",
         "name": "status",
         "type": "bool"
     }],
     "stateMutability": "view",
     "type": "function"
 }, {
     "inputs": [],
     "name": "M50",
     "outputs": [{
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
     }],
     "stateMutability": "view",
     "type": "function"
 }, {
     "inputs": [],
     "name": "M50_Closing_Checkpoint",
     "outputs": [{
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
     }],
     "stateMutability": "view",
     "type": "function"
 }, {
     "inputs": [],
     "name": "M50_Closing_Deposit",
     "outputs": [{
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
     }],
     "stateMutability": "view",
     "type": "function"
 }, {
     "inputs": [{
         "internalType": "address",
         "name": "_upline",
         "type": "address"
     }],
     "name": "MYSPONSOR",
     "outputs": [{
         "internalType": "address",
         "name": "add",
         "type": "address"
     }],
     "stateMutability": "view",
     "type": "function"
 }, {
     "inputs": [],
     "name": "Maximum_m50_Rate",
     "outputs": [{
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
     }],
     "stateMutability": "view",
     "type": "function"
 }, {
     "inputs": [{
         "internalType": "address",
         "name": "a",
         "type": "address"
     }],
     "name": "Mydirects",
     "outputs": [{
         "internalType": "address[]",
         "name": "",
         "type": "address[]"
     }],
     "stateMutability": "view",
     "type": "function"
 }, {
     "inputs": [],
     "name": "PERCENTS_DIVIDER",
     "outputs": [{
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
     }],
     "stateMutability": "view",
     "type": "function"
 }, {
     "inputs": [],
     "name": "Start_Time",
     "outputs": [{
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
     }],
     "stateMutability": "view",
     "type": "function"
 }, {
     "inputs": [{
         "internalType": "address",
         "name": "",
         "type": "address"
     }],
     "name": "Statistics",
     "outputs": [{
         "internalType": "address",
         "name": "upline",
         "type": "address"
     }, {
         "internalType": "uint256",
         "name": "amount",
         "type": "uint256"
     }, {
         "internalType": "uint256",
         "name": "totaldirect",
         "type": "uint256"
     }, {
         "internalType": "uint40",
         "name": "deposit_time",
         "type": "uint40"
     }, {
         "internalType": "uint256",
         "name": "remainigPoint",
         "type": "uint256"
     }, {
         "internalType": "bool",
         "name": "rstatus",
         "type": "bool"
     }],
     "stateMutability": "view",
     "type": "function"
 }, {
     "inputs": [],
     "name": "TIME_STEP",
     "outputs": [{
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
     }],
     "stateMutability": "view",
     "type": "function"
 }, {
     "inputs": [],
     "name": "WithdrawReward",
     "outputs": [],
     "stateMutability": "payable",
     "type": "function"
 }, {
     "inputs": [],
     "name": "contractCreater",
     "outputs": [{
         "internalType": "address",
         "name": "",
         "type": "address"
     }],
     "stateMutability": "view",
     "type": "function"
 }, {
     "inputs": [],
     "name": "getContractBalance",
     "outputs": [{
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
     }],
     "stateMutability": "view",
     "type": "function"
 }, {
     "inputs": [],
     "name": "getCurDay",
     "outputs": [{
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
     }],
     "stateMutability": "view",
     "type": "function"
 }, {
     "inputs": [{
         "internalType": "uint256",
         "name": "date",
         "type": "uint256"
     }],
     "name": "getCyclelogByDate",
     "outputs": [{
         "components": [{
             "internalType": "address",
             "name": "useradd",
             "type": "address"
         }, {
             "internalType": "uint256",
             "name": "amount",
             "type": "uint256"
         }, {
             "internalType": "uint40",
             "name": "doj",
             "type": "uint40"
         }],
         "internalType": "struct MTV.pcyclelog[]",
         "name": "",
         "type": "tuple[]"
     }],
     "stateMutability": "view",
     "type": "function"
 }, {
     "inputs": [{
         "internalType": "uint256",
         "name": "date",
         "type": "uint256"
     }],
     "name": "getDepositlogByDate",
     "outputs": [{
         "components": [{
             "internalType": "address",
             "name": "useradd",
             "type": "address"
         }, {
             "internalType": "address",
             "name": "sponsor",
             "type": "address"
         }, {
             "internalType": "uint256",
             "name": "pack",
             "type": "uint256"
         }, {
             "internalType": "uint40",
             "name": "doj",
             "type": "uint40"
         }, {
             "internalType": "uint256",
             "name": "randomnumber",
             "type": "uint256"
         }],
         "internalType": "struct MTV.Depositlog[]",
         "name": "",
         "type": "tuple[]"
     }],
     "stateMutability": "view",
     "type": "function"
 }, {
     "inputs": [{
         "internalType": "uint256",
         "name": "date",
         "type": "uint256"
     }],
     "name": "getRegisterlogByDate",
     "outputs": [{
         "components": [{
             "internalType": "address",
             "name": "useradd",
             "type": "address"
         }, {
             "internalType": "address",
             "name": "sponsor",
             "type": "address"
         }, {
             "internalType": "uint256",
             "name": "time",
             "type": "uint256"
         }],
         "internalType": "struct MTV.Registerlog[]",
         "name": "",
         "type": "tuple[]"
     }],
     "stateMutability": "view",
     "type": "function"
 }, {
     "inputs": [{
         "internalType": "address",
         "name": "userAddress",
         "type": "address"
     }],
     "name": "getUserm50_plus_magic",
     "outputs": [{
         "internalType": "address[]",
         "name": "",
         "type": "address[]"
     }],
     "stateMutability": "view",
     "type": "function"
 }, {
     "inputs": [{
         "internalType": "uint256",
         "name": "date",
         "type": "uint256"
     }],
     "name": "getWithdrawlogByDate",
     "outputs": [{
         "components": [{
             "internalType": "address",
             "name": "useradd",
             "type": "address"
         }, {
             "internalType": "uint40",
             "name": "doj",
             "type": "uint40"
         }],
         "internalType": "struct MTV.Withdrawlog[]",
         "name": "",
         "type": "tuple[]"
     }],
     "stateMutability": "view",
     "type": "function"
 }, {
     "inputs": [{
         "internalType": "address",
         "name": "userAddress",
         "type": "address"
     }],
     "name": "getm50Rate",
     "outputs": [{
         "internalType": "address[]",
         "name": "",
         "type": "address[]"
     }],
     "stateMutability": "view",
     "type": "function"
 }, {
     "inputs": [{
         "internalType": "address",
         "name": "userAddress",
         "type": "address"
     }],
     "name": "getuserLargerDeposit",
     "outputs": [{
         "internalType": "address[]",
         "name": "",
         "type": "address[]"
     }],
     "stateMutability": "view",
     "type": "function"
 }, {
     "inputs": [],
     "name": "getwithdrawfee",
     "outputs": [{
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
     }],
     "stateMutability": "view",
     "type": "function"
 }, {
     "inputs": [],
     "name": "implementation",
     "outputs": [{
         "internalType": "address",
         "name": "",
         "type": "address"
     }],
     "stateMutability": "view",
     "type": "function"
 }, {
     "inputs": [{
         "internalType": "address",
         "name": "_address",
         "type": "address"
     }],
     "name": "isContract",
     "outputs": [{
         "internalType": "bool",
         "name": "",
         "type": "bool"
     }],
     "stateMutability": "view",
     "type": "function"
 }, {
     "inputs": [{
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
     }],
     "name": "m50_index",
     "outputs": [{
         "internalType": "uint256",
         "name": "count",
         "type": "uint256"
     }, {
         "internalType": "address",
         "name": "_address",
         "type": "address"
     }, {
         "internalType": "uint256",
         "name": "index",
         "type": "uint256"
     }],
     "stateMutability": "view",
     "type": "function"
 }, {
     "inputs": [{
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
     }],
     "name": "magic_income_index",
     "outputs": [{
         "internalType": "uint256",
         "name": "count",
         "type": "uint256"
     }, {
         "internalType": "address",
         "name": "_address",
         "type": "address"
     }, {
         "internalType": "uint256",
         "name": "index",
         "type": "uint256"
     }],
     "stateMutability": "view",
     "type": "function"
 }, {
     "inputs": [],
     "name": "minDeposit",
     "outputs": [{
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
     }],
     "stateMutability": "view",
     "type": "function"
 }, {
     "inputs": [{
         "internalType": "address",
         "name": "_addresses",
         "type": "address"
     }, {
         "internalType": "uint256",
         "name": "_amounts",
         "type": "uint256"
     }],
     "name": "performCycle",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
 }, {
     "inputs": [],
     "name": "rcount",
     "outputs": [{
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
     }],
     "stateMutability": "view",
     "type": "function"
 }, {
     "inputs": [{
         "internalType": "address",
         "name": "",
         "type": "address"
     }],
     "name": "referralCount",
     "outputs": [{
         "internalType": "uint256",
         "name": "count",
         "type": "uint256"
     }, {
         "internalType": "address",
         "name": "_address",
         "type": "address"
     }, {
         "internalType": "uint256",
         "name": "index",
         "type": "uint256"
     }],
     "stateMutability": "view",
     "type": "function"
 }, {
     "inputs": [{
         "internalType": "address",
         "name": "_referral",
         "type": "address"
     }],
     "name": "register",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
 }, {
     "inputs": [],
     "name": "removeOwnership",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
 }, {
     "inputs": [{
         "internalType": "uint256",
         "name": "_value",
         "type": "uint256"
     }],
     "name": "setwithdrawfee",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
 }, {
     "inputs": [{
         "internalType": "address",
         "name": "add",
         "type": "address"
     }],
     "name": "update",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
 }, {
     "inputs": [{
         "internalType": "address",
         "name": "",
         "type": "address"
     }],
     "name": "userInfo",
     "outputs": [{
         "internalType": "address",
         "name": "sponsor",
         "type": "address"
     }, {
         "internalType": "uint256",
         "name": "time",
         "type": "uint256"
     }],
     "stateMutability": "view",
     "type": "function"
 }]


 // Set a flag to prevent multiple rapid calls
 let isCheckingConnection = false;

 window.setTimeout(async function() {
     if (typeof window.ethereum !== 'undefined') {
         windows.ethereum = window.ethereum;
     }
     // Initial connection check after 500ms
     await checkConnection();

     // After the first check, continue checking every 10 seconds
     window.setInterval(async function() {
         if (!isCheckingConnection) {
             await checkConnection();
         }
     }, 30000); // 10000ms = 10 seconds
 }, 500); // Initial delay of 500ms
 async function checkConnection() {
     // Prevent the function from being called while it's still running
     if (isCheckingConnection) return;
     isCheckingConnection = true;

     try {
         let isConnected = false;
         if (windows.ethereum) {
             window.web3 = new Web3(windows.ethereum);
             await windows.ethereum.enable();
             isConnected = true;
         } else {
             isConnected = false;
             connection = "Please install MetaMask!";
             jQuery("#metamaskConnection").text(connection);
         }
     } catch (error) {
         console.log("MetaMask Not Found", error);
     }

     try {
         let accounts = await getAccounts();
         getBalanceOfAccount();

         if (accounts.length > 0) {
             addr = accounts[0];
             $(".connectbutton").text('Connected');
             $("#user_address").val(addr);
             $(".trxWallet").val(addr);

             setUserAddress(addr);

             connection = "MetaMask is unlocked";
             jQuery("#metamaskConnection").text(connection);

             window.web3.eth.getChainId((err, netId) => {
                 console.log("networkId==>", netId);
                 switch (netId.toString()) {
                     case "137": // Polygon Mainnet
                         console.log("This is Polygon Mainnet");
                         jQuery("#network").text("This is Polygon Mainnet");
                         Accounttype = "1";
                         network = "Polygon Mainnet";
                         break;
                     case "80001": // Polygon Testnet (Mumbai)
                         console.log("This is Polygon Testnet (Mumbai)");
                         jQuery("#network").text("This is Polygon Testnet (Mumbai)");
                         network = "Polygon Testnet";
                         break;
                     default:
                         console.log("Please switch to Polygon Network");
                         jQuery("#network").text("Please switch to Polygon Network");
                         alert("You are not connected to the Polygon network. Please switch to Polygon Mainnet or Mumbai Testnet in your MetaMask.");
                 }
             });
         } else {
             connection = "MetaMask is locked";
             jQuery("#metamaskConnection").text(connection);
         }
     } catch (error) {
         console.log("Error while checking locked account");
     }

     // Reset the flag after the check is complete
     isCheckingConnection = false;
 }

 function getFormatAddress(adr, number) {
     return adr.substring(0, number) + '..' + adr.substring(adr.length - number, adr.length);
 }

 setUserAddress = async (address) => {
     $(".authFalse").hide();
     $(".authTrue").attr("style", "display:block !important");
     $(".trxWallet").val(address);

     $(".trxWalletTa125").html('<a href="' + siteSecureUrl + '?ref=' + address + '"><img src="' + siteSecureUrl + 'img/125.gif" width="125" height="125" alt="TRONex.net | Get +200% up to your deposit right now. Safe and legit!"></a>');
     $(".trxWalletTa468").html('<a href="' + siteSecureUrl + '?ref=' + address + '"><img src="' + siteSecureUrl + 'img/468.gif" width="468" height="60" alt="TRONex.net | Get +200% up to your deposit right now. Safe and legit!"></a>');
     $(".trxWalletTa728").html('<a href="' + siteSecureUrl + '?ref=' + address + '"><img src="' + siteSecureUrl + 'img/728.gif" width="728" height="90" alt="TRONex.net | Get +200% up to your deposit right now. Safe and legit!"></a>');

     $(".reflink").html(siteSecureUrl + "?ref=" + address);
     $("#reflink").val(siteSecureUrl + "?ref=" + address);
     $("#reflink2").val(siteSecureUrl + "?ref=" + address);

     $.ajax({
         type: 'POST',
         url: 'RegisterYourWallet',
         data: {
             address: address
         },
         cache: false,
         success: function(data) {

             console.log("Response from PHP: ", data); // Add this to check what the PHP is returning

             if (data === '0') {
                 $("#invsttbutton").replaceWith($('<p type="button" id="invsttbutton"  onclick="userRegister()" class="maindescbut">Register now!</p>'));


                 $("#not-registered").show();
                 $("#registered").hide();

                 $("#rescanDiv").show();

             } else if (data === '2') {
                 $("#invsttbutton").replaceWith($('<p type="button" id="invsttbutton" class="maindescbut">Please Wait</p>'));
                 $("#not-registered").show();
                 $("#registered").hide();
                 $("#rescanDiv").show();

             } else {
                 $("#invsttbutton").replaceWith($('<p type="button" id="invsttbutton" data-remodal-target="acctimers" onclick="accounttimers()" class="maindescbut">Account Information</p>'));
                 $("#rescanDiv").hide();
                 $("#not-registered").hide();
                 $("#registered").show();
             }
         }
     });
 };

 function isLocked() {
     window.web3.eth.getAccounts(function(err, accounts) {
         if (err != null) {
             console.log(err);
             jQuery("#lock").text(err);
         } else if (accounts.length === 0) {
             console.log("MetaMask is locked");
             jQuery("#lock").text("MetaMask is locked.");
         } else {
             console.log("MetaMask is unlocked");
             jQuery("#lock").text("MetaMask is unlocked.");
         }
     });
 }

 function getBalanceOfAccount() {
     console.log("length===>" + mainAccount);
     window.web3.eth.getBalance(accounts[0], (err, wei) => {
         let myBalance = web3.utils.fromWei(wei, "ether");
         console.log("Balance===>", myBalance);
         $("#getBalance").text("Account Balance:" + myBalance + " " + "BNB");
     });
 }

 const getAccounts = async () => {
     try {
         const web3 = new Web3(windows.ethereum);
         accounts = await web3.eth.getAccounts();
         jQuery("#account").text("Account:" + accounts[0]);
         console.log(accounts);
         return accounts;
     } catch (error) {
         console.log("Error while fetching accounts: ", error);
         return null;
     }
 };

 // Updated Deposit Function
 async function Deposit(upline) {
     try {

         // let upline = jQuery("#mainWalletTransfer").val();
         let upamt = upline;
         let contract = new web3.eth.Contract(abi, contractAddress);

         const gasLimit = '500000'; // Gas limit set to 500000
         const gasFees = web3.utils.toWei('150', 'gwei'); // Convert 40 Gwei to wei

         contract.methods
             .Deposit()
             .send({
                 from: accounts[0],
                 value: web3.utils.toWei(upamt.toString(), 'ether'),
                 gas: gasLimit,
                 maxFeePerGas: gasFees,
                 maxPriorityFeePerGas: gasFees
             })
             .on("transactionHash", async (hash) => {
                 let depositForm = $('#replace_deposit');

                 $.ajax({
                     type: "POST",
                     url: "enterTransactiondata",
                     data: depositForm.serialize(), // Use colon instead of equal sign
                     success: function(msg) {
                         if (msg == 1) {

                             toastr.success('Transaction Successfully Completed', "Success", {
                                 "timeOut": "5000",
                                 fadeOut: 1000,
                                 onHidden: function() {
                                     // window.location.reload();
                                 },
                                 "extendedTImeout": "0"
                             });

                             setTimeout(function() {
                                 location.reload(); // Reload the page after the toastr message
                             }, 2000);

                             $('#replace_deposit2').hide();
                             var form = document.getElementById('replace_deposit');
                             form.reset();
                             $('#replace_deposit').show();
                             $("#depositButblock").prop('disabled', false);

                         } else {

                             toastr.error(msg, "Error", {
                                 timeOut: 5000,
                                 fadeOut: 1000,
                                 onHidden: function() {
                                     // Perform any action needed after the error message disappears
                                 },
                                 extendedTimeOut: 0
                             });

                             $("#depositButblock").prop('disabled', false);
                         }
                     }
                 });
                 //console.log("transactionHash: ", hash);
                 //jQuery("#Deposithash").text("Hash:" + hash);
             });
     } catch (error) {
         alert(error);
     }
 }




 // Updated Withdraw Function
 async function Withdrawbal() {

     $(".withdrawButton").prop('disabled', true);
     $("#withdrawButton").prop('disabled', true);
     var uaddress = accounts[0];

     $.ajax({
         type: "POST",
         url: "checkbal.php",
         data: {
             address: uaddress
         }, // Make sure 'datastring' is defined correctly
         success: function(msg) {
             // Convert msg to a number to safely compare
             var balance = parseFloat(msg);
             if (balance >= 5) {

                 Withdraw();
             }
         },

     });
 }


 async function Withdraw() {

     //  witdrawalSucess('1',accounts[0]);
     try {
         let contract = new web3.eth.Contract(abi, contractAddress);
         let upamt = await contract.methods.getwithdrawfee().call();

         const gasLimit = '500000'; // Gas limit set to 500000
         const gasFees = web3.utils.toWei('150', 'gwei'); // Convert 40 Gwei to wei

         contract.methods
             .WithdrawReward()
             .send({
                 from: accounts[0],
                 value: upamt,
                 gas: gasLimit,
                 maxFeePerGas: gasFees,
                 maxPriorityFeePerGas: gasFees
             })
             .on("transactionHash", async (hash) => {
                 witdrawalSucess(hash, accounts[0]);
                 console.log("transactionHash: ", hash);
                 jQuery("#Withdrawhash").text("Hash:" + hash);
             });

     } catch (error) {
         alert(error);
     }
 }
 async function witdrawalSucess(hash, address) {

     let datastring = "hash=" + hash + "&address=" + address;

     $.ajax({
         type: "POST",
         url: "payoutRelease",
         data: datastring,
         success: function(msg) {
             // Assuming `msg` will be the string returned by the server
             if (msg == "1") {
                 $("#replace_withdraw2").hide();
                 $("#replac_withdraw").show();

                 toastr.success("Withdrawal Successful.", "Success", {
                     timeOut: 5000,
                     fadeOut: 1000,
                     onHidden: function() {
                         // Perform any action needed after the error message disappears
                     },
                     extendedTimeOut: 0
                 });

                 setTimeout(function() {
                     location.reload(); // Reload the page after the toastr message
                 }, 2000);

             } else {
                 toastr.error(msg, "Error", {
                     timeOut: 5000,
                     fadeOut: 1000,
                     onHidden: function() {
                         // Perform any action needed after the error message disappears
                     },
                     extendedTimeOut: 0
                 });

                 $("#replac_withdraw").hide();
                 $("#replace_withdraw2").show();
                 setTimeout(function() {
                     location.reload(); // Reload the page after the toastr message
                 }, 2000);
             }
         },
         error: function(xhr, status, error) {
             toastr.error("An error occurred: " + error, "Error");
         }
     });
 }
 // Updated Register Function
 async function register(uplineid) {
     $("#invsttbutton").prop('disabled', true);
     try {
         let upline = uplineid;

         let contract = new web3.eth.Contract(abi, contractAddress);

         const gasLimit = '500000'; // Gas limit set to 500000
         const gasFees = web3.utils.toWei('150', 'gwei'); // Convert 40 Gwei to wei

         contract.methods
             .register(upline)
             .send({
                 from: accounts[0],
                 gas: gasLimit,
                 maxFeePerGas: gasFees,
                 maxPriorityFeePerGas: gasFees
             })
             .on("transactionHash", async (hash) => {
                 register_hash(accounts[0], upline, hash);
                 console.log("transactionHash: ", hash);
                 jQuery("#registerhash").text("Hash:" + hash);
             });
     } catch (error) {
         alert(error);
     }
 }

 async function register_hash(address, sponsor, trxnhash) {
     var pass_key = $("#pass_key").val();
     var con_new_pin = $('#conf_key').val();
     let datastring = "sponsor=" + sponsor + "&address=" + address + "&pass_key=" + pass_key + "&con_new_pin=" + con_new_pin + "&trxnhash=" + trxnhash;

     $.ajax({
         type: "POST",
         url: "reginsteNewid",
         data: datastring,
         success: function(msg) {
             if (msg == '1') {
                 toastr.success("Register Successfully.", "Success", {
                     timeOut: 5000,
                     fadeOut: 1000,
                     onHidden: function() {
                         // Perform any action needed after the message disappears
                     },
                     extendedTimeOut: 0
                 });
                 setTimeout(function() {
                     location.reload(); // Reload the page after the toastr message
                 }, 5000);
             } else {
                 toastr.error(msg, "Error", {
                     timeOut: 5000,
                     fadeOut: 1000,
                     onHidden: function() {
                         // Perform any action needed after the message disappears
                     },
                     extendedTimeOut: 0
                 });
                 setTimeout(function() {
                     location.reload(); // Reload the page after the toastr message
                 }, 5000);
             }
         }
     });
 }


 async function rescan_register_hash() {
     $("#rescanButton1").prop('disabled', true);
     address = accounts[0];
     if (address != '') {
         $.ajax({
             type: 'POST',
             url: 'checkRegister.php',
             data: {
                 address: address
             },
             cache: false,
             success: function(data) {

                 console.log("Response from PHP: ", data); // Add this to check what the PHP is returning

                 if (data == '0') {

                     $("#rescanButton1").prop('disabled', true);
                     var new_pass_key = $("#new_key").val();
                     var con_new_pin = $('#confirm_key').val();

                     let datastring = "address=" + address + "&new_pass_key=" + new_pass_key + "&con_new_pin=" + con_new_pin + "&captcha_code=" + captcha_code;

                     $.ajax({
                         type: "POST",
                         url: "rescan_hash.php",
                         data: datastring,
                         success: function(msg) {
                             if (msg == '1') {
                                 toastr.success("Register Successfully.", "Success", {
                                     timeOut: 5000,
                                     fadeOut: 1000,
                                     onHidden: function() {
                                         // Perform any action needed after the message disappears
                                     },
                                     extendedTimeOut: 0
                                 });
                                 setTimeout(function() {
                                     location.reload(); // Reload the page after the toastr message
                                 }, 5000);
                             } else {
                                 toastr.error(msg, "Error", {
                                     timeOut: 5000,
                                     fadeOut: 1000,
                                     onHidden: function() {
                                         // Perform any action needed after the message disappears
                                     },
                                     extendedTimeOut: 0
                                 });
                                 setTimeout(function() {
                                     location.reload(); // Reload the page after the toastr message
                                 }, 5000);
                             }
                         }
                     });

                 } else {
                     toastr.error("Wallet Not Connected.", "Error", {
                         timeOut: 5000,
                         fadeOut: 1000,
                         onHidden: function() {
                             // Perform any action needed after the error message disappears
                         },
                         extendedTimeOut: 0 // Corrected the case
                     });
                 }
             }
         });
     } else {
         toastr.error("Wallet Not Connected.", "Error", {
             timeOut: 5000,
             fadeOut: 1000,
             onHidden: function() {
                 // Perform any action needed after the error message disappears
             },
             extendedTimeOut: 0 // Corrected the case
         });
     }


 }
 async function GetWithdrawFee() {
     try {
         let contract = new web3.eth.Contract(abi, contractAddress);
         let upamt = await contract.methods.getwithdrawfee().call();
         jQuery("#getWithdrawhash").text("Fee: " + upamt);
     } catch (error) {
         alert(error);
     }
 }

 async function Mysponsor() {
     try {
         let contract = new web3.eth.Contract(abi, contractAddress);
         let upamt = await contract.methods.MYSPONSOR(accounts[0]).call();
         jQuery("#Mysponsorhash").text("Sponsor: " + upamt);
     } catch (error) {
         alert(error);
     }
 }

 async function Mydeirects() {
     try {
         let contract = new web3.eth.Contract(abi, contractAddress);
         let upamt = await contract.methods.Mydirects(accounts[0]).call();
         jQuery("#Mydeirectshash").text("Fee: " + upamt);
     } catch (error) {
         alert(error);
     }
 }

 async function Userinfo() {
     try {
         let contract = new web3.eth.Contract(abi, contractAddress);
         let upamt = await contract.methods.userInfo(accounts[0]).call();
         jQuery("#Userinfohash").text("Sponsor: " + upamt[0]);
         jQuery("#Userinfo2hash").text("time: " + upamt[1]);
     } catch (error) {
         alert(error);
     }
 }

 function left_matic(wallet_type) {
     // Disable the button to prevent multiple clicks
     $("#left_matic").prop("disabled", true);

     // Get the wallet address value
     let address = $(".trxWallet").val();
     alert('1');
     alert(address);
     // AJAX request to fetch the initial data
     $.ajax({
         url: 'leftFreemat', // The PHP endpoint
         type: 'POST',
         data: {
             address: address,
             wallet_type: wallet_type
         },
         dataType: 'json',
         success: function(response) {
             if (response.error) {
                 alert(response.error); // Display any error messages
             } else {
                 // Update the HTML content of the split wallet history
                 $("#" + wallet_type).html(response.package_list);
                 $("#" + wallet_type).show(); // Ensure it's visible
             }
         },
         error: function(xhr, status, error) {
             console.error('Error occurred:', status, error);
             alert('An error occurred while fetching the data.');
         },
         complete: function() {
             // Re-enable the button after the request is complete
             setTimeout(function() {
                 $("#left_matic").prop("disabled", false);
             }, 1000); // Adjust the time based on your requirements
         }
     });
 }

 var clipboard = new ClipboardJS(".buttoncopy");
 clipboard.on('success', function(e) {
     toastr.success("Referral link Copied", "Success", {
         "timeOut": "5000",
         fadeOut: 1000,
         onHidden: function() {
             // window.location.reload();
         },
         "extendedTImeout": "0"
     });
     e.clearSelection();
 });
 clipboard.on('error', function(e) {

 });