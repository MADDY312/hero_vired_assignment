class Program {
    constructor(name, price, domain, type, registrations, description, placementAssurance, imageUrl, universityName, facultyProfile, learningHours,  certificate, eligibilityCriteria) {
      this.name = name;
      this.price = price;
      this.domain = domain;
      this.type = type;
      this.registrations = registrations;
      this.description = description;
      this.placementAssurance = placementAssurance;
      this.imageUrl = imageUrl;
      this.universityName = universityName;
      this.facultyProfile = facultyProfile;
      this.learningHours = learningHours;
      this.certificate = certificate;
      this.eligibilityCriteria = eligibilityCriteria;
    }
  }
  
  module.exports = Program;
  