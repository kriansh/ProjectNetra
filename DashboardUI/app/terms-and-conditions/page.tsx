import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function TermsAndConditionsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Terms and Conditions</h1>
      <p className="mb-4">This is the terms and conditions page for Netra.</p>
      <Link href="/profile" passHref>
        <Button>Back to Profile</Button>
      </Link>
    </div>
  )
}

