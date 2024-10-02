import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice'
const filterdata= [
  {
    filterType:"Location",
    array:["Delhi NCR" ,"Bangloro" ,"Hyderabad" ,"pune","mumbai"]
  },
  {
    filterType:"Industy",
    array:["Frontend Developer" ,"Backend Developer" ,"FullStack Developer" ]
  },
  {
    filterType:"Salary",
    array:["0-48k" ,"42-1lakh" ,"1-11lakh"]
  },
  
]

function FilterCards() {
  const [selectedValue,setSelectedValue]=useState('')
  const dispatch =useDispatch()
  
  const changeHandler=(value)=>{
      setSelectedValue(value)
  }

  useEffect(()=>{
    dispatch(setSearchQuery(selectedValue))
  },[selectedValue])

  return (
    <div className='w-full bg-white p-3 rounded-md'>
     <h1 className='text-[#951f05] font-bold'>Filter Jobs</h1>
     <hr className='mt-3'/>
     <RadioGroup value ={selectedValue} onValueChange={changeHandler}>
      {
        filterdata.map((items,index)=>(
          <div key={index}>
            <h1 className='font-bold text-lg'>{items.filterType}</h1>
            {
              items.array.map((item,idx)=>{
                const itemId =`r${index}-${idx}`
                return (
                  <div key={idx} className='flex items-center space-x-2 my-2'>
                    <RadioGroupItem value={item} id={itemId}/>
                    <Label htmlFor={itemId}>{item}</Label>
                  </div>
                )
              })
            }
          </div>
        ))
      }
     </RadioGroup>
    </div>
  )
}

export default FilterCards