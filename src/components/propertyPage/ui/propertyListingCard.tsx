import React from "react";
import { Button } from "@/components/ui/button"; // Assuming you have a button component
import Image from "next/image";

import { Bath, MapPin, Bed, SetSquare } from "@/components/ui/icons";
import { shimmer, toBase64 } from "@/components/ui/generateBlur";

interface Property {
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  size: string;
  status?: string;
  image: string;
}

const PropertyListingCard = ({ property }: { property: Property }) => {
  return (
    <div className="rounded-lg shadow-md overflow-hidden m-2 flex-1 transition-shadow duration-300 hover:shadow-lg border border-gray-300/50">
      <div className="relative">
        <Image
          width={300}
          height={240}
          src={property.image}
          alt={property.title}
          className={`w-full md:h-60 h-48 object-cover `}
          placeholder="blur" // Shimmer placeholder
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(300, 240)
          )}`} // Shimmer effect
        />
        <div className="absolute top-3 left-3 bg-green-500/80 hover:bg-green-600 text-slate-200 cursor-pointer text-sm font-medium px-3 py-1 rounded-lg backdrop-blur-md drop-shadow-xl">
          {property.status}
        </div>
      </div>
      <div className="py-4 pt-2 px-3">
        <h3 className="text-lg font-bold text-slate-800">{property.title}</h3>
        <p className="text-gray-500/80 flex gap-1 items-center text-sm">
          <MapPin size={16} /> {property.location}
        </p>
        <p className="text-md text-gray-700 font-semibold mt-3">
          ₹ {property.price}
        </p>
        <div className="flex justify-between mt-2">
          <p className="bg-slate-200/50 text-slate-800 px-2 py-1 rounded flex gap-1 items-center text-xs">
            <Bed size={16} />
            {property.beds} Beds
          </p>
          <p className="bg-slate-200/50 text-slate-800 px-2 py-1 rounded flex gap-1 items-center text-xs">
            <Bath size={16} />
            {property.baths} Baths
          </p>
          <p className="bg-slate-200/50 text-slate-800 px-2 py-1 rounded flex gap-1 items-center text-xs">
            <SetSquare size={16} />
            {property.size}
          </p>
        </div>
        <Button className="mt-4 bg-green-600 hover:bg-green-700 text-white rounded px-4 py-2 w-full shadow-md shadow-slate-700/40 hover:shadow-slate-800/70 transition duration-300 ">
          View Details
        </Button>
      </div>
    </div>
  );
};

export default PropertyListingCard;
