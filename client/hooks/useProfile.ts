import { useState, useEffect } from 'react';
import { api } from '../../shared/api';

export interface ProfileData {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  nationality?: string;
  currentCountry?: string;
  currentAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  bio?: string;
  completionPercentage?: number;
  isActive?: boolean;
  verificationStatus?: 'pending' | 'verified' | 'rejected';
}

export const useProfile = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const profileData = await api.getClientProfile();
      setProfile(profileData);
    } catch (err: any) {
      console.error('Failed to load profile:', err);
      setError(err.message || 'Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: Partial<ProfileData>) => {
    try {
      const updatedProfile = await api.updateClientProfile(data);
      setProfile(updatedProfile);
      return updatedProfile;
    } catch (err: any) {
      console.error('Failed to update profile:', err);
      throw err;
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return {
    profile,
    isLoading,
    error,
    loadProfile,
    updateProfile,
  };
};
