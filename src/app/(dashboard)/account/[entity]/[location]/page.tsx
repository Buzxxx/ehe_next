/**
  @path src/app/(dashboard)/account/[entity]/[location]/page.tsx
*/

import EntityPageLayout from "@/components/account/layout/entityPageLayout"

interface EntityPageProps {
  params: Promise<{
    entity: string
    location: string
  }>
}

export default async function EntityPage({ params }: EntityPageProps) {
  const resolvedParams = await params

  return (
    <>
      <EntityPageLayout
        entity={decodeURI(resolvedParams.entity)}
        location={decodeURI(resolvedParams.location)}
      />
    </>
  )
}
