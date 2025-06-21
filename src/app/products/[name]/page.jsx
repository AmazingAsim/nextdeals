
import AmazonName from '@/components/AmazonName'
import { icon } from '@fortawesome/fontawesome-svg-core'
import React from 'react'

export function generateMetadata({params}) {
        let {name} = params
    return {
        title: `Top deals on ${name}`,
        description: `latest deals on ${name} at amazon,flipkart,myntra`,
        icons: {
            icon: "/logo.png"
        }
    }
}

export default function page({params}) {

    let {name} = params
  return (
    <div>
        <AmazonName productname={name} />
    </div>
  )
}
