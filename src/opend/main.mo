import Cycles "mo:base/ExperimentalCycles";
import Debug "mo:base/Debug";
import NFTActorClass "../NFT/nft";
import Principal "mo:base/Principal";
import HashMap  "mo:base/HashMap";
import List "mo:base/List";
import Iter "mo:base/Iter";



actor OpenD {

private type Listing={
  itemOwner: Principal;
  itemPrice: Nat;

};
    var mapOfNFTs = HashMap.HashMap<Principal, NFTActorClass.NFT>(1, Principal.equal, Principal.hash);
    var mapOfOwners = HashMap.HashMap<Principal, List.List<Principal>>(1, Principal.equal, Principal.hash);
    var mapOfListedNFTs = HashMap.HashMap<Principal, Listing>(1, Principal.equal, Principal.hash);


    public shared(msg) func mint(imgData: [Nat8], name: Text) : async Principal {
      let owner : Principal = msg.caller;
      Debug.print(debug_show(owner));

      Debug.print(debug_show(Cycles.balance()));
      Cycles.add(100_500_000_000);
      let newNFT = await NFTActorClass.NFT(name, owner, imgData);
      Debug.print(debug_show(Cycles.balance()));

      let newNFTPrincipal = await newNFT.getCanId();

      mapOfNFTs.put(newNFTPrincipal, newNFT);
      addOwner(owner, newNFTPrincipal);

      return newNFTPrincipal

    };

    private func addOwner(owner: Principal, nftId: Principal) {
        var ownedNFTs : List.List<Principal> = switch (mapOfOwners.get(owner)) {
          case null List.nil<Principal>();
          case (?result) result;
        };

        ownedNFTs := List.push(nftId, ownedNFTs);
        mapOfOwners.put(owner, ownedNFTs);

    };

    public query func getOwned(user: Principal) : async [Principal] {
      var userNFTs : List.List<Principal> = switch (mapOfOwners.get(user)) {
        case null List.nil<Principal>();
        case (?result) result;
      };

      return List.toArray(userNFTs);
    };
    

       public query func getListed() : async [Principal] {
      let listedNfts= Iter.toArray(mapOfListedNFTs.keys());
      return listedNfts;
    };


      public shared(msg) func listNFT(nftID: Principal, price: Nat) : async Text {

          var getNft : NFTActorClass.NFT = switch (mapOfNFTs.get(nftID)) {
        case null return "NFT Does Not Exist";
        case (?result) result;
      };
      let owner = await getNft.getOwner();

      if(Principal.equal(owner,msg.caller))
      {
let newItem: Listing={
  itemOwner=owner;
  itemPrice=price;
};
mapOfListedNFTs.put(nftID, newItem);
return "Success";
      }else{
        return "NFT Not Owned";
      };
      


    };


public query func getOpenDID():async Principal{
  return Principal.fromActor(OpenD);

};
public query func getOriginalOwner(id: Principal):async Principal{
  var listing: Listing= switch(mapOfListedNFTs.get(id)){
    case null return Principal.fromText("");
    case (?result) result;
  };
  return listing.itemOwner;

};

public query func getPrice(id: Principal):async Nat{
  var listing: Listing= switch(mapOfListedNFTs.get(id)){
    case null return 0;
    case (?result) result;
  };
  return listing.itemPrice;

};


public query func isListed(id: Principal):async Bool{
  if(mapOfListedNFTs.get(id)==null){
    return false;
  }else{
    return true;
  }

};


    public shared(msg) func completePurchase(id: Principal, ownerID: Principal, newOwnerID: Principal) : async Text {

          var purchasedNft : NFTActorClass.NFT = switch (mapOfNFTs.get(id)) {
        case null return "NFT Does Not Exist";
        case (?result) result;
      };
      let transferRes = await purchasedNft.transferOwner(newOwnerID);
      if(transferRes == "Success"){
        mapOfListedNFTs.delete(id);
        var ownedNFTs: List.List<Principal> = switch(mapOfOwners.get(ownerID)){
          case null List.nil<Principal>();
          case (?result) result;
        };
       ownedNFTs := List.filter(ownedNFTs, func (listitemid: Principal) : Bool {
          return listitemid != id;
        });
        addOwner(newOwnerID,id);
        return "Success";
      }else{
      return transferRes;

      }
   


    };



};
