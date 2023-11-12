export default class Lawyer {
  id;
  firstName;
  lastName;
  specialization;
  hourlyRate;
  email;
  address;
  postalCode;
  city;
  constructor(
    id,
    firstName,
    lastName,
    specialization,
    hourlyRate,
    email,
    address,
    postalCode,
    city
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.specialization = specialization;
    this.hourlyRate = hourlyRate;
    this.email = email;
    this.address = address;
    this.postalCode = postalCode;
    this.city = city;
  }
}
