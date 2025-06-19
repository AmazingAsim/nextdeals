
import AmazonName from '@/components/AmazonName'
import React from 'react'

export function generateMetadata({params}) {
        let {name} = params
    return {
        title: name
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
