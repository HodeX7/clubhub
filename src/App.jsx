import { Web3Provider } from "@ethersproject/providers";
import { ethers } from "ethers";
import { useState } from "react";
import ClubHub from "./ClubHub";

const App = () => {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);

  const connectWallet = async () => {
    const Address = "0xA236A366f612abc5d5EC516398b8A47c3A3F1571";
    const ABI = [
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "clubId",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            indexed: false,
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "basicFee",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "proFee",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "eliteFee",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "address",
            name: "organizer",
            type: "address",
          },
          {
            indexed: false,
            internalType: "string",
            name: "imageUrl",
            type: "string",
          },
        ],
        name: "ClubRegistered",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "clubId",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "address",
            name: "member",
            type: "address",
          },
        ],
        name: "MembershipEnrolled",
        type: "event",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "clubs",
        outputs: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "basicFee",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "proFee",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "eliteFee",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "organizer",
            type: "address",
          },
          {
            internalType: "string",
            name: "imageUrl",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "clubsByMember",
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
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "clubsByOrganizer",
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
      {
        inputs: [
          {
            internalType: "uint256",
            name: "clubId",
            type: "uint256",
          },
          {
            internalType: "enum ClubHub.MembershipType",
            name: "membershipType",
            type: "uint8",
          },
        ],
        name: "enrollMembership",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [],
        name: "getClubs",
        outputs: [
          {
            components: [
              {
                internalType: "string",
                name: "name",
                type: "string",
              },
              {
                internalType: "string",
                name: "description",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "basicFee",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "proFee",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "eliteFee",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "organizer",
                type: "address",
              },
              {
                internalType: "address[]",
                name: "members",
                type: "address[]",
              },
              {
                internalType: "string",
                name: "imageUrl",
                type: "string",
              },
            ],
            internalType: "struct ClubHub.Club[]",
            name: "",
            type: "tuple[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getClubsByMember",
        outputs: [
          {
            components: [
              {
                internalType: "string",
                name: "name",
                type: "string",
              },
              {
                internalType: "string",
                name: "description",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "basicFee",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "proFee",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "eliteFee",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "organizer",
                type: "address",
              },
              {
                internalType: "address[]",
                name: "members",
                type: "address[]",
              },
              {
                internalType: "string",
                name: "imageUrl",
                type: "string",
              },
            ],
            internalType: "struct ClubHub.Club[]",
            name: "",
            type: "tuple[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getClubsByOrganizer",
        outputs: [
          {
            components: [
              {
                internalType: "string",
                name: "name",
                type: "string",
              },
              {
                internalType: "string",
                name: "description",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "basicFee",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "proFee",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "eliteFee",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "organizer",
                type: "address",
              },
              {
                internalType: "address[]",
                name: "members",
                type: "address[]",
              },
              {
                internalType: "string",
                name: "imageUrl",
                type: "string",
              },
            ],
            internalType: "struct ClubHub.Club[]",
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
            internalType: "string",
            name: "_name",
            type: "string",
          },
          {
            internalType: "string",
            name: "_description",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "_basicFee",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_proFee",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_eliteFee",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "_imageUrl",
            type: "string",
          },
        ],
        name: "registerClub",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];
    try {
      const { ethereum } = window;
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
      setAccount(accounts[0]);

      let contract;
      const provider = new Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      contract = new ethers.Contract(Address, ABI, signer);
      setContract(contract);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {account ? (
        <ClubHub contract={contract} />
      ) : (
        <button onClick={connectWallet}> Connect Wallet</button>
      )}
    </>
  );
};

export default App;
