import React, { useEffect, useState } from "react";
import hasnain from "../../assets/hasnain.png";
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../../../declarations/nft";
import { idlFactory as tokenidlFactory } from "../../../declarations/token";

import { Principal } from "@dfinity/principal";
import Button from "./Button";
import { opend } from "../../../declarations/opend";
import CURRENT_USER_ID from "../index";
import Label from "./Label";

function Item({ id, role }) {
  console.log(role);
  const [name, setName] = useState("");
  const [listed, setListed] = useState("");
  const [label, setLabel] = useState();


  const [owner, setOwner] = useState("");
  const [image, setImage] = useState("");
  const [pressed, setPressed] = useState(0);
  const [button, setButton] = useState();
  const [blur, setBlur] = useState();

  const [priceInput, setPriceInput] = useState();
  let nftActor;

  const localhost = "http://localhost:8080/";
  const agent = new HttpAgent({
    host: localhost,
  });
  agent.fetchRootKey();

  async function loadNft() {
    nftActor = await Actor.createActor(idlFactory, {
      agent,
      canisterId: id,
    });

    const name = await nftActor.getName();
    const owner = await nftActor.getOwner();
    const image = await nftActor.getAsset();
    const imageArray = new Uint8Array(image);
    console.log(name);
    console.log(owner);
    console.log(image);
    const nftImage = URL.createObjectURL(
      new Blob([imageArray.buffer], {
        type: "image/png",
      })
    );
    setName(name);
    setOwner(owner.toText());
    setImage(nftImage);

    if (role == "collection") {
    
      const islisted = await opend.isListed(id);
      if (islisted) {
        setListed("Listed");
        setBlur({ filter: "blur(5px)" });
        setOwner("OpenD");
      } else {
        setButton(<Button handleClick={handleSell} title={"Sell"} />);
      }
    } else if(role =="listed") {
      const originalOwner=await opend.getOriginalOwner(id)
      if(originalOwner.toText() != CURRENT_USER_ID.toText()){
        setButton(<Button handleClick={handleProc} title={"Buy"} />);


      }
      const price=await opend.getPrice(id)
      console.log(price);
      setLabel(<Label price={price.toString()}/>)
    }
  }


const handleProc=async ()=>{
  const tid= Principal.fromText("renrk-eyaaa-aaaaa-aaada-cai")
  const tokenActor = await Actor.createActor(tokenidlFactory, {
    agent,
    canisterId: tid,
  });

  const sellerID=await opend.getOriginalOwner(id)
  const itemPrice=await opend.getPrice(id)
  const result=await tokenActor.transfer(sellerID,itemPrice)
  console.log(result);
  if(result==="Success"){
   const transferResult=await opend.completePurchase(id,sellerID,CURRENT_USER_ID)
  console.log("Purchase:"+ transferResult);
  }

}



  
  let price;
  const handleSell = () => {
    console.log("Sell Clicked");
    setPriceInput(
      <input
        className="nftname sellprice"
        placeholder="Price In ChiliCoin"
        type="number"
        value={price}
        onChange={(e) => {
          price = e.target.value;
        }}
      />
    );
    setButton(<Button handleClick={sellItem} title={"Confirm"} />);
  };

  async function sellItem() {
    setBlur({ filter: "blur(5px)" });
    setButton(<Button handleClick={() => {}} title={"Processing..."} />);

    console.log(price);
    const flag = await opend.listNFT(id, Number(price));
    if (flag === "Success") {
      const openDID = await opend.getOpenDID();
      const transferResult = await nftActor.transferOwner(openDID);
      console.log(transferResult);
      setOwner("OpenD");
      setListed("Listed");
    }
    setPriceInput(<div className="mintButton sellButton">{flag}</div>);
    setTimeout(() => {
      setPriceInput();
    }, 3000);
    setButton(null);
  }

  useEffect(() => {
    loadNft();
  }, []);

  
  return (
    <div className="grid-item">
      <div className="ItemDiv">
        <div style={blur}>
          <img
            src={image}
            style={{
              width: "100%",
              height:"400px",
              objectFit: "cover",
              borderRadius: "20px",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {label}
          <h2
            style={{
              margin: "0",
              marginTop: "5px",
              fontSize: "1.2rem",
            }}
          >
            {name}
            <span className="purple-text"> {listed}</span>
          </h2>
          <p
            className="itempara"
            style={{
              fontSize: "0.8rem",
            }}
          >
            {owner}
          </p>
          {/* {pressed === 1 ? (
            <input
              className="nftname sellprice"
              placeholder="Price In ChiliCoin"
              type="number"
              value={price}
              onChange={(text) => {
                setPrice(text.target.value);
              }}
            />
          ) : null} */}
          {/* 
          {pressed === 1 ? (
            <span
              onClick={() => {
                setPressed(0);
              }}
              className="mintButton sellButton"
            >
              Confirm
            </span>
          ) : (
         
          )} */}
          {priceInput}
          {button}
        </div>
      </div>
    </div>
  );
}

export default Item;
