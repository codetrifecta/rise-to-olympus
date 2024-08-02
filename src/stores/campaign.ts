import { create } from 'zustand';
import { ICampaign } from '../types';

interface ICampaignStore {
  campaigns: ICampaign[];
  selectedCampaign: ICampaign | null;

  setCampaigns: (campaigns: ICampaign[]) => void;
  setSelectedCampaign: (campaign: ICampaign | null) => void;

  addCampaign: (campaign: ICampaign) => ICampaign[];
  deleteCampaign: (campaign: ICampaign) => ICampaign[];
}

export const useCampaignStore = create<ICampaignStore>((set, get) => ({
  campaigns: localStorage.getItem('campaigns')
    ? JSON.parse(localStorage.getItem('campaigns') || '[]')
    : [],
  selectedCampaign: null,

  setCampaigns: (campaigns) => {
    set({ campaigns });

    // Save campaigns to local storage
    localStorage.setItem('campaigns', JSON.stringify(campaigns));
  },

  setSelectedCampaign: (campaign) => {
    set({ selectedCampaign: campaign });
  },

  addCampaign: (campaign: ICampaign) => {
    set((state) => {
      const campaigns = [...state.campaigns, campaign];
      localStorage.setItem('campaigns', JSON.stringify(campaigns));
      return { campaigns };
    });

    return get().campaigns;
  },

  deleteCampaign: (campaign: ICampaign) => {
    set((state) => {
      const updatedCampaigns = state.campaigns.filter(
        (c) => c.id !== campaign.id
      );
      localStorage.setItem('campaigns', JSON.stringify(updatedCampaigns));
      return { campaigns: updatedCampaigns };
    });

    return get().campaigns;
  },
}));
