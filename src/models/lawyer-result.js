export default class LawyerResult {
  id;
  firstName;
  lastName;
  specialization;
  hourlyRate;
  address;
  postalCode;
  city;
  availabilities;
  constructor(
    id,
    firstName,
    lastName,
    specialization,
    hourlyRate,
    address,
    postalCode,
    city,
    availabilities
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.specialization = specialization;
    this.hourlyRate = hourlyRate;
    this.address = address;
    this.postalCode = postalCode;
    this.city = city;
    this.availabilities = availabilities;
  }
}
