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
    <main>
      <form onSubmit={handleForm}>
        Enter your email here and we will create a page for you. Anyone that visits your page will have their ip sent to your email!<br />
        <input type="email" placeholder="Your Email" onChange={handleEmailInput} required/>
        <button>
          GET YOUR LINK!
        </button>
      </form>
    </main>
  )
}
