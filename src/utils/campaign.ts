import { BASE_CAMPAIGN } from '../constants/campaign';

/**
 * Check if an object is a campaign
 * @param campaign The object to check
 * @returns True if the object is a campaign, false otherwise
 */
export const isCampaign = (campaign: object) => {
  // Iterate over base object properties
  // and check if they exist in the campaign object

  // Return true if all properties exist
  // Return false if any property does not exist

  for (const key in BASE_CAMPAIGN) {
    if (!(key in campaign)) {
      return false;
    }
  }

  return true;
};
