/**
 * @description Схема организации
 * @author @MiroslavWise
 * @version 0.1
 * @date 2024-12-27
 *
 */

import env from "@/config/environment"

export const schemaOrg = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Услуги, общения и события, ивенты",
  provider: {
    "@type": "Organization",
    name: "Sheira",
    url: env.server.host,
    logo: `${env.server.host!}/api/og`,
  },
  description: "Сервис с интерактивной картой города. Можно размещать свои услуги, проводить активности, общаться и помогать друг другу",
})

interface IProps {
  url: string
  name: string
  description: string
  images: string[]
  address: {
    streetAddress?: string
    addressLocality?: string
    addressRegion?: string
    postalCode?: string
    addressCountry?: string
  }
}

export const schemaOrgOffer = ({ url, name, address, description, images }: IProps) =>
  JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Event",
    name: name,
    location: {
      "@type": "Place",
      name: name,
      address: {
        "@type": "PostalAddress",
        ...address,
      },
    },
    description: description,
    image: images,
  })
