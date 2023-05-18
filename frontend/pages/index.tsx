import { useState } from "react"
import { useRouter } from 'next/navigation';
import CryptoJS from "crypto-js"


export default function Home() {
  const router = useRouter();
  const [emailInput, setEmailInput] = useState("")

  const handleEmailInput = (e: any) => {
    setEmailInput(e.target.value)
  }

  const handleForm = (e: any) => {
    e.preventDefault()

    const aesEncryptedEmail: any = CryptoJS.AES.encrypt(emailInput, "Secret Passphrase").toString().replaceAll("/", "*")
    router.push(`/website/${aesEncryptedEmail}`)
  }

  return (
    <main className="main-page">
      <form onSubmit={handleForm}>
        <h1>IP GRABBER</h1>
        <p className="main-description">Simply enter your email, and we’ll generate a page that you can share with friends and family. When someone goes on the page, their IP and network details will be sent to you via email!</p>
        <input type="email" placeholder="Your email..." onChange={handleEmailInput} required/><br />
        <button>Get a Link</button>
      </form>
    </main>
  )
}
