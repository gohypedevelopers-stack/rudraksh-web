import type { ReactNode } from "react"

import CartDrawer from "@/components/CartDrawer"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <CartDrawer />
      {children}
      <Footer />
    </>
  )
}
