export type WeblingRecord = {
  recordStatus: null | 'active' | 'blocked' | 'died'
  firstName: null | string
  lastName: null | string
  recordCategory: null | 'private' | 'media' | 'company' | 'npo' | 'network'
  language: null | 'd' | 'f' | 'i'
  gender: null | 'n' | 'f' | 'm' | 'mf'
  salutationFormal: null | 'fD' | 'mD' | 'mfD' | 'fF' | 'mF' | 'mfF'
  salutationInformal: null | 'nD' | 'fD' | 'mD' | 'mfD' | 'nF' | 'fF' | 'mF' | 'mfF'
  title: null | string
  company: null | string
  address1: null | string
  address2: null | string
  zip: null | string
  city: null | string
  country: null | 'ch' | 'de' | 'fr' | 'it' | 'at' | 'other'
  postStatus: null | 'active' | 'invalid' | 'unwanted'
  email1: null | string
  email2: null | string
  emailStatus: null | 'active' | 'invalid' | 'unwanted'
  mobilePhone: null | string
  landlinePhone: null | string
  workPhone: null | string
  phoneStatus: null | 'active' | 'unwanted'
  entryChannel: null | string
  birthday: null | string
  website: null | string
  facebook: null | string
  twitter: null | string
  instagram: null | string
  iban: null | string
  profession: null | string
  professionCategory: null | 'education' | 'craft' | 'agriculture' | 'medicine' | 'pensioner' | 'entrepreneurs' | 'administration' | 'science'
  networkNpo: null | string
  interests: null | Array<'international' | 'education' | 'digitisation' | 'energy' | 'internationalDevelopment' | 'finance' | 'gender' | 'health' | 'climate' | 'culture' | 'agriculture' | 'migration' | 'natureProtection' | 'spatialPlaning' | 'law' | 'security' | 'social' | 'sport' | 'traffic' | 'economy'>
  request: null | Array<'administrative' | 'driver' | 'movie' | 'photo' | 'fundraising' | 'design' | 'campaignOrganisation' | 'candidacyInternal' | 'candidacyOfficial' | 'readersLetter' | 'music' | 'onlineComments' | 'postering' | 'socialMedia' | 'standCampaign' | 'streetCampaign' | 'writing' | 'signatureCollection' | 'EventOrganisation' | 'distributionCampaign' | 'webdesign' | 'notes' | 'no'>
  coupleCategory: null | 'single' | 'partner1' | 'partner2'
  partnerSalutationFormal: null | 'fD' | 'mD' | 'fF' | 'mF'
  partnerSalutationInformal: null | 'fD' | 'mD' | 'fF' | 'mF'
  partnerFirstName: null | string
  partnerLastName: null | string
  memberStatusMunicipality: null | 'sympathiser' | 'member' | 'unconfirmed' | 'resigned' | 'expelled' | 'notMember'
  memberStatusRegion: null | 'sympathiser' | 'member' | 'unconfirmed' | 'resigned' | 'expelled' | 'notMember'
  memberStatusCanton: null | 'sympathiser' | 'member' | 'unconfirmed' | 'resigned' | 'expelled' | 'notMember'
  memberStatusCountry: null | 'sympathiser' | 'member' | 'unconfirmed' | 'resigned' | 'expelled' | 'notMember'
  memberStatusYoung: null | 'sympathiser' | 'member' | 'unconfirmed' | 'resigned' | 'expelled' | 'notMember'
  membershipStart: null | string
  membershipEnd: null | string
  responsibility: null | string
  membershipFeeMunicipality: null | 'regular' | 'reduced' | 'couple' | 'extra' | 'no'
  membershipFeeRegion: null | 'regular' | 'reduced' | 'couple' | 'extra' | 'no'
  membershipFeeCanton: null | 'regular' | 'reduced' | 'couple' | 'extra' | 'no'
  membershipFeeCountry: null | 'regular' | 'reduced' | 'no'
  membershipFeeYoung: null | 'regular' | 'reduced' | 'extra' | 'no'
  magazineMunicipality: null | 'yes' | 'no'
  newsletterMunicipality: null | 'yes' | 'no'
  pressReleaseMunicipality: null | 'yes' | 'no'
  roleMunicipality: null | string
  mandateMunicipality: null | Array<'executiveActive' | 'executivePast' | 'legislativeActive' | 'legislativePast' | 'judikativeActive' | 'judikativePast' | 'commissionActive' | 'commissionPast'>
  mandateMunicipalityDetail: null | string
  donorMunicipality: null | 'donor' | 'sponsor' | 'majorDonor'
  notesMunicipality: null | string
  roleRegion: null | string
  mandateRegion: null | Array<'judikativeActive' | 'judikativePast' | 'governorActive' | 'governorPast' | 'commissionActive' | 'commissionPast'>
  mandateRegionDetail: null | string
  donorRegion: null | 'donor' | 'sponsor' | 'majorDonor'
  magazineCantonD: null | 'yes' | 'no'
  magazineCantonF: null | 'yes' | 'no'
  newsletterCantonD: null | 'yes' | 'no'
  newsletterCantonF: null | 'yes' | 'no'
  pressReleaseCantonD: null | 'yes' | 'no'
  pressReleaseCantonF: null | 'yes' | 'no'
  roleCanton: null | string
  mandateCanton: null | Array<'executiveActive' | 'executivePast' | 'legislativeActive' | 'legislativePast' | 'judikativeActive' | 'judikativePast' | 'commissionActive' | 'commissionPast'>
  mandateCantonDetail: null | string
  donorCanton: null | 'donor' | 'sponsor' | 'majorDonor'
  notesCanton: null | string
  magazineCountryD: null | 'yes' | 'no'
  magazineCountryF: null | 'yes' | 'no'
  newsletterCountryD: null | 'yes' | 'no'
  newsletterCountryF: null | 'yes' | 'no'
  pressReleaseCountryD: null | 'yes' | 'no'
  pressReleaseCountryF: null | 'yes' | 'no'
  roleCountry: null | string
  roleInternational: null | string
  mandateCountry: null | Array<'legislativeActive' | 'legislativePast' | 'judikativeActive' | 'judikativePast' | 'commissionActive' | 'commissionPast'>
  mandateCountryDetail: null | string
  donorCountry: null | 'donor' | 'sponsor' | 'majorDonor'
  notesCountry: null | string
  notesCantonYoung: null | string
  notesCountryYoung: null | string
  legacy: null | string
  dontUse: null | string
  magazineOther: null | string
  newsletterOther: null | string
  networkOther: null | string
  roleYoung: null | string
  donorYoung: null | 'donor' | 'sponsor' | 'majorDonor'
  id: number
  groups: null | number[]
  firstLevelGroupNames: null | string
}