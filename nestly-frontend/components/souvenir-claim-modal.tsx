"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface SouvenirClaimModalProps {
  attractionId: number
  attractionName: string
  onClose: () => void
}

export function SouvenirClaimModal({ attractionId, attractionName, onClose }: SouvenirClaimModalProps) {
  const [step, setStep] = useState<"confirm" | "minting" | "success" | "error">("confirm")
  const [txHash, setTxHash] = useState("")
  const [nftTokenId, setNftTokenId] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleClaimSouvenir = async () => {
    setStep("minting")
    try {
      const response = await fetch("/api/souvenirs/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ attractionId }),
      })

      if (response.ok) {
        const data = await response.json()
        setTxHash(data.txHash)
        setNftTokenId(data.tokenId)
        setStep("success")
      } else {
        const error = await response.json()
        setErrorMessage(error.error || "Failed to claim souvenir")
        setStep("error")
      }
    } catch (error) {
      console.error("Claim error:", error)
      setErrorMessage("An error occurred while claiming your souvenir")
      setStep("error")
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-8">
        {step === "confirm" && (
          <>
            <h2 className="text-2xl font-bold mb-2">Claim Souvenir NFT</h2>
            <p className="text-muted mb-6">
              Collect a unique NFT souvenir from <span className="font-semibold">{attractionName}</span>. This NFT will
              be minted to your wallet and proves you visited this attraction.
            </p>

            <div className="bg-accent/10 border border-accent rounded-lg p-4 mb-6">
              <p className="text-sm text-foreground">
                <span className="font-semibold">NFT Details:</span>
              </p>
              <ul className="text-sm text-muted mt-2 space-y-1">
                <li>• Attraction: {attractionName}</li>
                <li>• Type: Souvenir NFT</li>
                <li>• Network: Ethereum</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent">
                Cancel
              </Button>
              <Button onClick={handleClaimSouvenir} className="flex-1 bg-accent hover:bg-accent-light text-foreground">
                Claim NFT
              </Button>
            </div>
          </>
        )}

        {step === "minting" && (
          <>
            <div className="text-center">
              <div className="mb-6">
                <div className="inline-block">
                  <div className="w-16 h-16 border-4 border-accent border-t-primary rounded-full animate-spin" />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-2">Minting Your NFT</h2>
              <p className="text-muted">
                Your souvenir NFT is being minted to your wallet. This usually takes 30-60 seconds.
              </p>
            </div>
          </>
        )}

        {step === "success" && (
          <>
            <div className="text-center">
              <div className="mb-6 text-5xl">✨</div>
              <h2 className="text-2xl font-bold mb-2">Souvenir Claimed!</h2>
              <p className="text-muted mb-6">Your NFT has been successfully minted and added to your wallet.</p>

              <div className="bg-success/10 border border-success rounded-lg p-4 mb-6 text-left">
                <p className="text-sm font-semibold text-foreground mb-2">Transaction Details:</p>
                <div className="space-y-2 text-xs text-muted">
                  <div className="flex justify-between">
                    <span>Token ID:</span>
                    <span className="font-mono">{nftTokenId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tx Hash:</span>
                    <a
                      href={`https://etherscan.io/tx/${txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline truncate"
                    >
                      {txHash.slice(0, 10)}...
                    </a>
                  </div>
                </div>
              </div>

              <Button onClick={onClose} className="w-full bg-primary hover:bg-primary-dark text-white">
                Done
              </Button>
            </div>
          </>
        )}

        {step === "error" && (
          <>
            <div className="text-center">
              <div className="mb-6 text-5xl">❌</div>
              <h2 className="text-2xl font-bold mb-2">Claim Failed</h2>
              <p className="text-muted mb-6">{errorMessage}</p>

              <div className="flex gap-3">
                <Button onClick={() => setStep("confirm")} variant="outline" className="flex-1 bg-transparent">
                  Try Again
                </Button>
                <Button onClick={onClose} className="flex-1 bg-primary hover:bg-primary-dark text-white">
                  Close
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
