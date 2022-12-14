import Debug "mo:base/Debug";
import Principal "mo:base/Principal";
actor class NFT (name: Text, owner: Principal, content: [Nat8] )= this {
 private let itemName=name;
 private var nftOwner=owner;
 private let imageContent=content;
 
 

 public query func getName() : async Text{
    return itemName;
 };
  public query func getOwner() : async Principal{
    return nftOwner;
 };
  public query func getAsset() : async [Nat8]{
    return imageContent;
 };
  public query func getCanId() : async Principal{
    return Principal.fromActor(this)
 };

public shared(msg) func transferOwner(newOwner:Principal): async Text{


  if(msg.caller == nftOwner ){
   nftOwner := newOwner;
   return "Transfer Ownership Success";

  }else{
   return "Error";
  };
};

};
