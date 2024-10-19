import Navbar from "@/components/propertyPage/ui/navbar"
import Hero from "../features/hero"
import PropertyDetails from "../features/propertyDetails"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Properties", href: "/properties" },
  { label: "Agents", href: "/agents" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

const user = {
  isLoggedIn: false,
  avatarUrl: "",
}

const PropertyPageLayout = () => {
  return (
    <>
      <Navbar logo="/property/icons/logo.svg" navLinks={navLinks} user={user} />
      <Hero />
      <PropertyDetails />
      
    </>
  )
}

export default PropertyPageLayout
