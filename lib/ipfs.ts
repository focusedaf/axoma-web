export async function uploadToIPFS(data: any) {
  try {
    const res = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("IPFS upload failed");
    }

    const json = await res.json();

    return json.IpfsHash;
  } catch (err) {
    console.error("IPFS error:", err);
    throw err;
  }
}
