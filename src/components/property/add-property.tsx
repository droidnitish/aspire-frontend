// src/components/property/add-property.tsx
import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { PropertyData } from '../../interfaces/property';
import { registerProperty } from '../../data-access/services/property-service';

const initialData: PropertyData = {
  housingProvider: '',
  RSL: '',
  addressLine1: '',
  numberOfBedrooms: 0,
  area: '',
  city: '',
  postCode: '',
  basicRent: 0,
  totalServiceCharges: 0,
  totalEligibleRent: 0,
  weeklyIneligibleCharge: 0,
  sharedWithOther: 'no',
  addedBy: '',
  otherInformation: {
    bedsit: false,
    selfContainedFlat: false,
    quantityOfFloors: 0,
    unfurnished: false,
    partFurnished: false,
    fullyFurnished: false,
    centralHeating: false,
    garden: false,
    garageParkingSpace: false,
    accommodationLocation: '',
    accommodationFloor: 0,
    totalLivingRooms: { yourUse: 0, communal: 0 },
    totalBedsitRooms: { yourUse: 0, communal: 0 },
    totalBedrooms: { yourUse: 0, communal: 0 },
    totalBathrooms: { yourUse: 0, communal: 0 },
    totalToilets: { yourUse: 0, communal: 0 },
    totalKitchens: { yourUse: 0, communal: 0 },
    totalOtherRooms: { yourUse: 0, communal: 0 },
  },
};

const AddProperty: React.FC = () => {
  const [propertyData, setPropertyData] = useState<PropertyData>(initialData); // Use initialData
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [alert, setAlert] = useState<{ message: string; variant: 'success' | 'danger' | '' }>({
    message: '',
    variant: '',
  });

  const token = useSelector((state: RootState) => state.auth.token);
  const userData = useSelector((state: RootState) => state.auth.user);

  // Set default values for housingProvider and RSL from companyName
  useEffect(() => {
    if (userData) {
      setPropertyData((prevData) => ({
        ...prevData,
        housingProvider: userData.companyName,
        RSL: userData.companyName,
        addedBy: userData.username
      
      }));
    }
  }, [userData]);
  

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!propertyData.housingProvider.trim()) newErrors.housingProvider = 'Housing provider is required.';
    if (!propertyData.RSL.trim()) newErrors.RSL = 'RSL is required.';
    if (!propertyData.addressLine1.trim()) newErrors.addressLine1 = 'Address is required.';
    if (propertyData.numberOfBedrooms <= 0) newErrors.numberOfBedrooms = 'Enter a valid number of bedrooms.';
    if (!propertyData.area.trim()) newErrors.area = 'Area is required.';
    if (!propertyData.city.trim()) newErrors.city = 'City is required.';
    if (!propertyData.postCode.trim()) newErrors.postCode = 'Post code is required.';
    if (!propertyData.otherInformation.accommodationLocation.trim()) newErrors.accommodationLocation = 'Accommodation location is required.';
    if (propertyData.basicRent <= 0) newErrors.basicRent = 'Enter a valid basic rent.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, type, value } = event.target;
    const checked = (event.target as HTMLInputElement).checked;

    setPropertyData((prevData) => {
      const keys = name.split('.');
      const updatedData = { ...prevData };
      keys.reduce((acc: any, key: string, index: number) => {
        if (index === keys.length - 1) {
          acc[key] = type === 'checkbox' ? checked : value;
        } else {
          acc[key] = acc[key] || {};
        }
        return acc[key];
      }, updatedData);
      return updatedData;
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      const result = await registerProperty(propertyData, token);
      console.log('Property added successfully:', result);

      // Show success alert
      setAlert({ message: 'Property added successfully!', variant: 'success' });

      // Reset the form to initial state
      setPropertyData(initialData);

      // Clear the alert after 3 seconds
      setTimeout(() => setAlert({ message: '', variant: '' }), 3000);
    } catch (error: unknown) {
      console.error('Error adding property:', error);

      // Show error alert
      setAlert({
        message: 'Failed to add property. Please try again later.',
        variant: 'danger',
      });

      // Clear the alert after 3 seconds
      setTimeout(() => setAlert({ message: '', variant: '' }), 5000);
    }
  };
  return (
    <div>
      <h2>Add Property</h2>
      {alert.message && (
        <Alert variant={alert.variant} className="mt-3">
          {alert.message}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Row>
        <Col md={6}>
        <Form.Group controlId="formHousingProvider">
              <Form.Label>Housing Provider</Form.Label>
              <Form.Select
                name="housingProvider"
                value={propertyData.housingProvider}
                onChange={handleChange}
                isInvalid={!!errors.housingProvider}
                disabled
              >
                <option value={userData?.companyName || ''}>{userData?.companyName || 'Select Housing Provider'}</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.housingProvider}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formRSL">
              <Form.Label>RSL</Form.Label>
              <Form.Select
                name="RSL"
                value={propertyData.RSL}
                onChange={handleChange}
                isInvalid={!!errors.RSL}
                disabled
              >
                <option value={userData?.companyName || ''}>{userData?.companyName || 'Select RSL'}</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.RSL}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="formAddressLine1">
              <Form.Label>Address Line 1</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                name="addressLine1"
                value={propertyData.addressLine1}
                onChange={handleChange}
                isInvalid={!!errors.addressLine1}
              />
              <Form.Control.Feedback type="invalid">
                {errors.addressLine1}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formNumberOfBedrooms">
              <Form.Label>Number of Bedrooms</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter number of bedrooms"
                name="numberOfBedrooms"
                value={propertyData.numberOfBedrooms}
                onChange={handleChange}
                isInvalid={!!errors.numberOfBedrooms}
              />
              <Form.Control.Feedback type="invalid">
                {errors.numberOfBedrooms}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="formArea">
              <Form.Label>Area</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter area"
                name="area"
                value={propertyData.area}
                onChange={handleChange}
                isInvalid={!!errors.area}
              />
              <Form.Control.Feedback type="invalid">
                {errors.area}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city"
                name="city"
                value={propertyData.city}
                onChange={handleChange}
                isInvalid={!!errors.city}
              />
              <Form.Control.Feedback type="invalid">
                {errors.city}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="formPostCode">
              <Form.Label>Post Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter post code"
                name="postCode"
                value={propertyData.postCode}
                onChange={handleChange}
                isInvalid={!!errors.postCode}
              />
              <Form.Control.Feedback type="invalid">
                {errors.postCode}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formBasicRent">
              <Form.Label>Basic Rent</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter basic rent"
                name="basicRent"
                value={propertyData.basicRent}
                onChange={handleChange}
                isInvalid={!!errors.basicRent}
              />
              <Form.Control.Feedback type="invalid">
                {errors.basicRent}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="formTotalServiceCharges">
              <Form.Label>Total Service Charges</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter total service charges"
                name="totalServiceCharges"
                value={propertyData.totalServiceCharges}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formTotalEligibleRent">
              <Form.Label>Total Eligible Rent</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter total eligible rent"
                name="totalEligibleRent"
                value={propertyData.totalEligibleRent}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="formWeeklyIneligibleCharge">
              <Form.Label>Weekly Ineligible Charge</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter weekly ineligible charge"
                name="weeklyIneligibleCharge"
                value={propertyData.weeklyIneligibleCharge}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formSharedWithOther">
              <Form.Label>Shared with Other</Form.Label>
              <Form.Control
                as="select"
                name="sharedWithOther"
                value={propertyData.sharedWithOther}
                onChange={handleChange}
                required
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <h5>Other Information</h5>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formBedsit">
              <Form.Label>Bedsit</Form.Label>
              <Form.Control
                as="select"
                name="otherInformation.bedsit"
                value={propertyData.otherInformation.bedsit ? 'yes' : 'no'}
                onChange={handleChange}
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formSelfContainedFlat">
              <Form.Label>Self Contained Flat</Form.Label>
              <Form.Control
                as="select"
                name="otherInformation.selfContainedFlat"
                value={propertyData.otherInformation.selfContainedFlat ? 'yes' : 'no'}
                onChange={handleChange}
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="formQuantityOfFloors">
              <Form.Label>Quantity of Floors</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter quantity of floors"
                name="otherInformation.quantityOfFloors"
                value={propertyData.otherInformation.quantityOfFloors}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formUnfurnished">
              <Form.Label>Unfurnished</Form.Label>
              <Form.Control
                as="select"
                name="otherInformation.unfurnished"
                value={propertyData.otherInformation.unfurnished ? 'yes' : 'no'}
                onChange={handleChange}
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="formPartFurnished">
              <Form.Label>Part Furnished</Form.Label>
              <Form.Control
                as="select"
                name="otherInformation.partFurnished"
                value={propertyData.otherInformation.partFurnished ? 'yes' : 'no'}
                onChange={handleChange}
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formFullyFurnished">
              <Form.Label>Fully Furnished</Form.Label>
              <Form.Control
                as="select"
                name="otherInformation.fullyFurnished"
                value={propertyData.otherInformation.fullyFurnished ? 'yes' : 'no'}
                onChange={handleChange}
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="formCentralHeating">
              <Form.Label>Central Heating</Form.Label>
              <Form.Control
                as="select"
                name="otherInformation.centralHeating"
                value={propertyData.otherInformation.centralHeating ? 'yes' : 'no'}
                onChange={handleChange}
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formGarden">
              <Form.Label>Garden</Form.Label>
              <Form.Control
                as="select"
                name="otherInformation.garden"
                value={propertyData.otherInformation.garden ? 'yes' : 'no'}
                onChange={handleChange}
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="formGarageParkingSpace">
              <Form.Label>Garage/Parking Space</Form.Label>
              <Form.Control
                as="select"
                name="otherInformation.garageParkingSpace"
                value={propertyData.otherInformation.garageParkingSpace ? 'yes' : 'no'}
                onChange={handleChange}
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formAccommodationLocation">
              <Form.Label>Accommodation Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter accommodation location"
                name="otherInformation.accommodationLocation"
                value={propertyData.otherInformation.accommodationLocation}
                onChange={handleChange}
                isInvalid={!!errors.accommodationLocation}
              />
              <Form.Control.Feedback type="invalid">
                {errors.accommodationLocation}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="formAccommodationFloor">
              <Form.Label>Accommodation Floor</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter accommodation floor"
                name="otherInformation.accommodationFloor"
                value={propertyData.otherInformation.accommodationFloor}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formTotalLivingRoomsYourUse">
              <Form.Label>Total Living Rooms (Your Use)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter total living rooms (your use)"
                name="otherInformation.totalLivingRooms.yourUse"
                value={propertyData.otherInformation.totalLivingRooms.yourUse}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="formTotalLivingRoomsCommunal">
              <Form.Label>Total Living Rooms (Communal)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter total living rooms (communal)"
                name="otherInformation.totalLivingRooms.communal"
                value={propertyData.otherInformation.totalLivingRooms.communal}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formTotalBedsitRoomsYourUse">
              <Form.Label>Total Bedsit Rooms (Your Use)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter total bedsit rooms (your use)"
                name="otherInformation.totalBedsitRooms.yourUse"
                value={propertyData.otherInformation.totalBedsitRooms.yourUse}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="formTotalBedsitRoomsCommunal">
              <Form.Label>Total Bedsit Rooms (Communal)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter total bedsit rooms (communal)"
                name="otherInformation.totalBedsitRooms.communal"
                value={propertyData.otherInformation.totalBedsitRooms.communal}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formTotalBedroomsYourUse">
              <Form.Label>Total Bedrooms (Your Use)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter total bedrooms (your use)"
                name="otherInformation.totalBedrooms.yourUse"
                value={propertyData.otherInformation.totalBedrooms.yourUse}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="formTotalBedroomsCommunal">
              <Form.Label>Total Bedrooms (Communal)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter total bedrooms (communal)"
                name="otherInformation.totalBedrooms.communal"
                value={propertyData.otherInformation.totalBedrooms.communal}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formTotalBathroomsYourUse">
              <Form.Label>Total Bathrooms (Your Use)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter total bathrooms (your use)"
                name="otherInformation.totalBathrooms.yourUse"
                value={propertyData.otherInformation.totalBathrooms.yourUse}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="formTotalBathroomsCommunal">
              <Form.Label>Total Bathrooms (Communal)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter total bathrooms (communal)"
                name="otherInformation.totalBathrooms.communal"
                value={propertyData.otherInformation.totalBathrooms.communal}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formTotalToiletsYourUse">
              <Form.Label>Total Toilets (Your Use)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter total toilets (your use)"
                name="otherInformation.totalToilets.yourUse"
                value={propertyData.otherInformation.totalToilets.yourUse}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="formTotalToiletsCommunal">
              <Form.Label>Total Toilets (Communal)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter total toilets (communal)"
                name="otherInformation.totalToilets.communal"
                value={propertyData.otherInformation.totalToilets.communal}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formTotalKitchensYourUse">
              <Form.Label>Total Kitchens (Your Use)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter total kitchens (your use)"
                name="otherInformation.totalKitchens.yourUse"
                value={propertyData.otherInformation.totalKitchens.yourUse}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="formTotalKitchensCommunal">
              <Form.Label>Total Kitchens (Communal)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter total kitchens (communal)"
                name="otherInformation.totalKitchens.communal"
                value={propertyData.otherInformation.totalKitchens.communal}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit">
          Add Property
        </Button>
      </Form>
    </div>
  );
}

export default AddProperty;
