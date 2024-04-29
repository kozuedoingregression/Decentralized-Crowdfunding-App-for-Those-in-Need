contractAddress = "0xc39257CF7f518D08cF0a1E3A5121F8E5Ded23C15";
contractABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_title",
        type: "string",
      },
      {
        internalType: "string",
        name: "_description",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_target",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_deadline",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_image",
        type: "string",
      },
      {
        internalType: "string",
        name: "_tag",
        type: "string",
      },
    ],
    name: "createCampaign",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_dname",
        type: "string",
      },
    ],
    name: "donateToCampaign",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "campaigns",
    outputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "string",
        name: "cname",
        type: "string",
      },
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "target",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountCollected",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "image",
        type: "string",
      },
      {
        internalType: "string",
        name: "tag",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCampaigns",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "string",
            name: "cname",
            type: "string",
          },
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "target",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amountCollected",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "image",
            type: "string",
          },
          {
            internalType: "string",
            name: "tag",
            type: "string",
          },
          {
            internalType: "address[]",
            name: "donators",
            type: "address[]",
          },
          {
            internalType: "string[]",
            name: "donatorsName",
            type: "string[]",
          },
          {
            internalType: "uint256[]",
            name: "donations",
            type: "uint256[]",
          },
        ],
        internalType: "struct OrphFund.Campaign[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "getDonators",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "numberOfCampaigns",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const orphfund = new ethers.Contract(contractAddress, contractABI, provider);

function getid() {
  const urlParams = new URLSearchParams(window.location.search);
  const cardId = urlParams.get("id");
  return cardId;
}

async function connectwallet() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
}

async function createcampaign() {
  const name = document.getElementById("first-name");
  const title = document.getElementById("title-id");
  const story = document.getElementById("story");
  const fund = document.getElementById("fund");
  const volunter = document.getElementById("volunter");
  const target = document.getElementById("target");
  const date = document.getElementById("date-id");
  const image = document.getElementById("image-id");

  const deadline = new Date(date.value).getTime();
  const orphfund = new ethers.Contract(contractAddress, contractABI, provider);
  const user = await orphfund
    .connect(signer)
    .createCampaign(
      name.value,
      title.value,
      story.value,
      target.value,
      deadline,
      image.value,
      "fund"
    );
  await user.wait();

  console.log(
    name.value,
    title.value,
    story.value,
    fund.value,
    volunter.value,
    deadline,
    image.value
  );
}

async function accesscards() {
  const camp = await orphfund.connect(signer).getCampaigns();
  const e1 = document.getElementById("camp-list");

  for (let i = 0; i < camp.length; i++) {
    e1.innerHTML +=
      '<a href="child.html?id=' +
      i +
      '" style="text-decoration: none; color:black"><div class="cards"><div class="card" style="margin-right:10vh; border-radius: 20px;"><div class="card-img"><image  src=' +
      camp[i].image +
      ' alt="image" style=" width:210px; height:126px;"></image></div><div class="card-info"><p class="text-title">' +
      camp[i].cname +
      '</p><p class="text-body">' +
      camp[i].title +
      '</p></div><div class="card-footer"><button>HELP</button></div><span >by ' +
      " " +
      camp[i].owner.substring(0, 20) +
      "..." +
      "</span></div></a>";

    // e1.innerHTML += '<div class="card"><a href="camp.html?id=' + i + '"><img src="" alt="image"><br><h3>' + camp[i].title + '</h3><p>' + camp[i].description.substring(0, 30) + "..." + '</p><p>amount raised:' + " " + ethers.utils.formatEther(camp[i].amountCollected).substring(0, 8) + " ETH" + '</p> <button class="Btn" onclick="donate()">Fund<svg class="svgIcon"viewBox="0 0 576 512"><pathd="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"></path></svg></button> <p>by' + " " + camp[i].owner.substring(0, 20) + "..." + '</a></div>'
  }
  // console.log(camp.length);
  // console.log(ethers.utils.formatEther(camp[0].amountCollected));
}
accesscards();

async function getdonators() {
  let count = 0;
  const donationlist = document.getElementById("donation-list");
  // donationlist.innerHTML = "  <h1>RECENT DONATORS</h1>  ";
  const donators = await orphfund.connect(signer).getDonators(0);
  while (true) {
    if (donators[0][count] == undefined) break;
    console.log(donators[1][count]);
    donationlist.innerHTML +=
      '<div class="card"><div class="img"></div><div class="text"><p class="h3">' +
      donators[2][count] +
      '</p><p class="p">Amount: ' +
      donators[1][count] / 10 ** 18 +
      " ETH" +
      '</p><p class="span">' +
      donators[0][count].substring(0, 20) +
      "..." +
      "</p></div></div></div>";

    // donationlist.innerHTML += '<li>' + donators[0][count] + '</li>';
    //console.log(donators[0][i]);
    count++;
  }
  if (count == 0) donationlist.innerHTML = "<h2>No Supporter :(</h2>";
  const support = document.getElementById("support");
  support.innerText = count;
  //console.log(ethers.utils.formatEther(donators[1][0]));
}
getdonators();

async function accessinfo() {
  const camp = await orphfund.connect(signer).getCampaigns();
  const e1 = document.getElementById("child-details");

  const id = getid();

  e1.innerHTML +=
    '<div class="main-first"style="width:190vh"><div class="child-img" style="display: flex;"><div class="child-img1" style="width:70vh;margin-left:20vh; background-color:#f5f5f7;"><img src="' +
    camp[id].image +
    '" style="height:50vh; width:70vh;"alt="child_image"></div><div class="donators"style="width:80vh; margin-left:30px; background-color:#f5f5f7;"><h1 style="padding-left:20px; ">Donators</h1><ol id="donation-lists"><li>dsds</li></ol></div></div><div class="child-info" style="margin-left:22vh;"><h1 style="padding:20px;">Story</h1><p style="padding-left:20px;">' +
    camp[id].description +
    '</p></div></div><div class="main-second"><div class="firs"><fieldset><legend>amount raised</legend><div><h1 id="raised">0.0ETH</h1></div></fieldset></div><div class="second">	<fieldset><legend>Total supportes</legend><div><h1 id="support">0</h1></div></fieldset></div><div class="third">	<fieldset><legend>Fund</legend><form action=""><label for="">Name</label><br><input type="text" name="" id="" style="margin-bottom:10px;"><br><input type="number" id="amount-eth" placeholder="ETH 0.1"><h5>Back it because you believe in it.</h5><p>suport child for no reward, just because it speaks to you.</p></form></fieldset></div><button onclick="donate()">FUND</button></div>';

  // e1.innerHTML += '<div class="main-first"><div class="child-img"><img style="width:1055px; height:351px;" src="' + camp[id].image + '" alt="child_image"></div><div class="child-info"><p style="padding:50px;">' + camp[id].description + '</p></div></div><div class="main-second"><div class="firs"><fieldset><legend>amount raised</legend ><div><h1 id="raised">0.0ETH</h1></div></fieldset ></div ><div class="second"><fieldset><legend>Total supportes</legend><div><h1 id="support">0</h1></div></fieldset></div><div class="third">	<fieldset><legend>Fund</legend><form action=""><label for="">Name</label><br><input type="text" name="" id="name-d"><br><input type="number" id="amount-eth" placeholder="ETH 0.1"><h5>Back it because you believe in it.</h5><p>suport child for no reward, just because it speaks to you.</p></form></fieldset></div><button onclick="donate()">FUND</button></div><ol id="donation-lists"></ol>'
  const raised = document.getElementById("raised");
  raised.innerText =
    ethers.utils.formatEther(camp[id].amountCollected).substring(0, 10) +
    " ETH";

  getdonatorss();

  // e1.innerHTML = '<img src="" alt="image"><h2>child</h2><p>Name: Jazz </p><p>Wallet: ' + camp[id].owner + '</p><h2>Story</h2><p>' + camp[id].description + '</p>';
  // console.log(camp.length);
  // console.log(ethers.utils.formatEther(camp[0].amountCollected));
}
accessinfo();

async function donate() {
  const amount = document.getElementById("amount-eth");
  const name = document.getElementById("name-d");
  const pid = getid();
  const data = await orphfund
    .connect(signer)
    .donateToCampaign(pid, name.value, {
      value: ethers.utils.parseEther(amount.value),
    });
  await data.wait();
  location.reload();
}
async function getdonatorss() {
  let count = 0;
  const donationlist = document.getElementById("donation-lists");
  donationlist.innerHTML = " ";
  const donators = await orphfund.connect(signer).getDonators(getid());
  while (true) {
    if (donators[0][count] == undefined) break;
    donationlist.innerHTML +=
      "<li> Name:" +
      " " +
      donators[2][count] +
      "<br>Address: " +
      " " +
      donators[0][count] +
      "</li>";
    //console.log(donators[0][i]);
    count++;
  }
  if (count == 0) donationlist.innerHTML = "<h2>No Supporter :(</h2>";
  const support = document.getElementById("support");
  support.innerText = count;
  //console.log(ethers.utils.formatEther(donators[1][0]));
}
