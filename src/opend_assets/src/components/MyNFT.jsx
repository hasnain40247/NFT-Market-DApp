import React, { useEffect, useState } from "react";

import Item from "./Item";
import {opend} from "../../../declarations/opend"
import CURRENT_USER_ID from "../index";



const MyNFT = () => {
  const [nftlist,setList]= useState([])
  async function getNFts(){
    const list= await opend.getOwned(CURRENT_USER_ID)
    console.log("here");
    console.log(list);
    setList(list)
   }
   useEffect(()=>{
     getNFts()
   },[])
 

  return (
    <div className="discover2 grid-container">
      {nftlist.map((NFTID)=>(
      <Item id={NFTID} role="collection" key={NFTID.toText()}/>


      ))}


    </div>
  );
};

export default MyNFT;
