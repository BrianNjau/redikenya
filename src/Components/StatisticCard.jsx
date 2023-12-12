import { Card } from 'antd'
import React from 'react'

const StatisticCard = ({title, value}) => {
  return (
    <Card className='bg-[#08415c]' bordered={false}>
    <div className=''>
    <span className='font-base text-[#f3efe0] text-md mb-1'>{title}</span>
    <br /> 
    {/* <hr className='text-[#f3efe0]' /> */}       
    <span className='font-semibold text-[#3eb489] text-[1.8rem] '>{value}</span>
    </div> 
    {/* <Statistic
    title="Average of Market Price"
    
    value={avgMarket||0}
    precision={2}
    
    valueStyle={{
    color: '#3eb489',
    }}
    prefix={"Ksh. "}
    suffix=""
    /> */}
    </Card>
  )
}

export default StatisticCard