// src/interfaces/property.ts
export interface OtherInformation {
    bedsit: boolean;
    selfContainedFlat: boolean;
    quantityOfFloors: number;
    unfurnished: boolean;
    partFurnished: boolean;
    fullyFurnished: boolean;
    centralHeating: boolean;
    garden: boolean;
    garageParkingSpace: boolean;
    accommodationLocation: string;
    accommodationFloor: number;
    totalLivingRooms: {
      yourUse: number;
      communal: number;
    };
    totalBedsitRooms: {
      yourUse: number;
      communal: number;
    };
    totalBedrooms: {
      yourUse: number;
      communal: number;
    };
    totalBathrooms: {
      yourUse: number;
      communal: number;
    };
    totalToilets: {
      yourUse: number;
      communal: number;
    };
    totalKitchens: {
      yourUse: number;
      communal: number;
    };
    totalOtherRooms: {
      yourUse: number;
      communal: number;
    };
  }
  
  export interface PropertyData {
    housingProvider: string;
    RSL: string;
    addressLine1: string;
    numberOfBedrooms: number;
    area: string;
    city: string;
    postCode: string;
    basicRent: number;
    totalServiceCharges: number;
    totalEligibleRent: number;
    weeklyIneligibleCharge: number;
    sharedWithOther: 'yes' | 'no'; // Updated to string type for dropdown
    addedBy: string;
    otherInformation: OtherInformation;
  }
  