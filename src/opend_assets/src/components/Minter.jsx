import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { opend } from "../../../declarations/opend";
import Item from "./Item";

function Minter() {
  const { register, handleSubmit } = useForm();
  const [disable, setDisable] = useState(0);
  const [nftid, setID] = useState("");
  const [fileChosen, setFile] = useState("");
  const [actualBtn, setBtn] = useState("");

  async function onSubmit(data) {
    setDisable(1);
    const name = data.name;
    const image = await data.image[0].arrayBuffer();
    const imageBytes = [...new Uint8Array(image)];
    const nftId = await opend.mint(imageBytes, name);
    setID(nftId.toText());
    print(nftId);
    setDisable(0);
  }

  useEffect(() => {
    const actualBtn = document.getElementById("actual-btn");

    const fileChosen = document.getElementById("file-chosen");

    actualBtn.addEventListener(
      "change",
      function () {
        fileChosen.textContent = this.files[0].name;
      },
      []
    );
  }, []);

  return (
    <div className="minter">
      {nftid === "" ? (
        <>
          <h2>Create NFT</h2>
          <form className="formmint" noValidate="" autoComplete="off">
            <h4>Upload Image</h4>

            <div>
              <input
                {...register("image", { required: true })}
                accept="image/x-png,image/jpeg,image/gif,image/svg+xml,image/webp"
                type="file"
                id="actual-btn"
                hidden
              />

              <label htmlFor="actual-btn">Choose File</label>

              <span id="file-chosen">No file chosen</span>
            </div>
            <h4>Collection Name</h4>

            <input
              {...register("name", { required: true })}
              className="nftname"
              placeholder="e.g. CryptoDunks"
              type="text"
            />

            {disable === 0 ? (
              <span onClick={handleSubmit(onSubmit)} className="mintButton">
                Mint NFT
              </span>
            ) : (
              <span
                style={{
                  backgroundColor: "#222",
                }}
                className="mintButton"
              >
                Minting...
              </span>
            )}
          </form>
        </>
      ) : (
        <>
          <h2>Minted</h2>

          <Item id={nftid} />
        </>
      )}
    </div>
  );
}

export default Minter;
