"use client";

import { Card, CardFooter } from "@/components/ui/card";
import OwnerForm from "@/components/property/features/ownerForm";
import PropertyForm from "@/components/property/features/propertyForm";
import React, { useState } from "react";
import MultiStepForm from "@/components/property/layout/Multi-Step-Form/formNavHandler";
import { Separator } from "@/components/ui/separator";
import AddressForm from "@/components/property/features/addressForm";
import { Progress } from "@/components/ui/progress";
import BackIcon from "@/components/ui/icons/back";
import Spinner from "@/components/ui/icons/spinner";
import OverlayLoading from "@/components/property/layout/overlayLoading";
import Success from "@/components/property/layout/Multi-Step-Form/success";
import { APIENDPOINTS } from "@/lib/constant";

type OwnerPropertySchema = {
  ownerName: string;
  ownerPhonenumber: string;
  ownerEmail: string;
  propertyName: string;
  propertyType: string;
  plotIsCorner: boolean;
  plotFacing: string;
  propertyFurnishing: string;
  propertySize: string;
  propertyBHK: string;
  propertyCategory: string;
  propertyRent: string;
  propertyMaintance: string;
  propertyValue: string;
  addressNumber: string;
  addressStreetname: string;
  addressCity: string;
  addressState: string;
  propertyAvaiablefrom: Date;
};

const DefaultValues = {
  ownerName: "",
  ownerPhonenumber: "",
  ownerEmail: "",
  propertyName: "",
  propertyType: "",
  plotIsCorner: false,
  plotFacing: "",
  propertyFurnishing: "",
  propertySize: "",
  propertyBHK: "",
  propertyCategory: "",
  propertyRent: "",
  propertyMaintance: "",
  propertyValue: "",
  addressNumber: "",
  addressStreetname: "",
  addressCity: "",
  addressState: "",
  propertyAvaiablefrom: new Date(),
};

export default function LandlordForm() {
  const [formData, setFormData] = useState(DefaultValues);
  const [isLoading, SetIsLoading] = useState(false);
  const [isSuccess, SetIsSuccess] = useState(false);
  function updateFields(fields: Partial<OwnerPropertySchema>) {
    let updatedForm = DefaultValues;
    setFormData((prev) => {
      updatedForm = { ...prev, ...fields };
      return updatedForm;
    });
    handelSubmit(updatedForm);
  }

  async function handelSubmit(updatedForm: OwnerPropertySchema) {
    if (handleNextStep()) {
      SetIsLoading(true);
      try {
        const response = await fetch(APIENDPOINTS.ownerInventoryEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedForm),
        });

        if (response.ok) {
          console.log(response);
          SetIsLoading(false);
          SetIsSuccess(true);
        } else {
          // Handle error response
          SetIsLoading(false);
          SetIsSuccess(false);
        }
      } catch (error) {
        // Handle fetch error
        console.log(error);
        SetIsLoading(false);
        SetIsSuccess(false);
      }
    }
  }

  const { handleNextStep, element, handleBackStep, progress } = MultiStepForm([
    <OwnerForm key="OwnerForm" {...formData} updateFields={updateFields} />,
    <PropertyForm
      key="PropertyForm"
      {...formData}
      updateFields={updateFields}
    />,
    <AddressForm key="AddressForm" {...formData} updateFields={updateFields} />,
  ]);

  return (
    <>
      {isSuccess ? (
        <Success />
      ) : (
        <>
          {isLoading ? (
            <OverlayLoading>
              <Spinner className="w-8 h-8 md:w-14 md:h-16 "></Spinner>
            </OverlayLoading>
          ) : null}

          <Card className="min-h-screen md:min-h-full w-full md:w-1/3 md:mt-5">
            <div className="w-full h-8 flex items-center text-sm">
              <button className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-xs md:text-sm font-medium ring-offset-background transition-all">
                Step 1
              </button>
              <Separator orientation="vertical" />
              <button className="w-full  inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-xs md:text-sm font-medium ring-offset-background transition-all">
                Step 2
              </button>
              <Separator orientation="vertical" />
              <button className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-xs md:text-sm font-medium ring-offset-background transition-all">
                Step 3
              </button>
            </div>
            <Progress value={progress} className="rounded-none h-2" />
            <BackIcon onClick={handleBackStep} className="w-5 h-5"></BackIcon>
            {element}
            <CardFooter></CardFooter>
          </Card>
        </>
      )}
    </>
  );
}
