import axios from "axios"
import { useEffect, useState } from "react"

export default function EmailHash({emailHash}: any) {
  useEffect(() => {
    const ipDetails = async () => {
      let userIp = await axios.get("https://api.ipify.org/?format=json")
      userIp = userIp.data.ip

      let moreIpDetails = await axios.get(`https://ipapi.co/${userIp}/json/`)

      const fullIpDetails = {
        ...moreIpDetails.data,
        userIp
      }

      const mailResponseDetails = await axios.post("/api/contact", {
        email: emailHash,
        ipDetails: JSON.stringify(fullIpDetails)
      })

      console.log(mailResponseDetails.data)
    }
    
    ipDetails()
  }, [])

  return (
    <>
      
    </>
  )
}

export const getServerSideProps = async (context: any) => {
  const { emailHash } = context.query;

  return {
      props: {
        emailHash
      }
  }
}