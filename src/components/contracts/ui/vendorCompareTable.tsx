import React from 'react'

const VendorCompareTable = () => {
	return (
    <div className="flex-col gap-4 flex">
      {/* Div for headers, i.e., selected vendors */}

      <div></div>

      {/* div for categories and % match */}
      <div className="flex gap-4">
        {/* div for the categories, these will be accordions which will be populated with the subcategories */}
        <div></div>

        {/* div showing the percentage match */}
        <div></div>
      </div>

      <div className="flex gap-4">
        {/* div for the subcategories, these will be show when the div for the categories is clicked */}
        <div></div>

        {/* div showing the whether tick or cross  */}
        <div></div>
      </div>
    </div>
  )
}

export default VendorCompareTable