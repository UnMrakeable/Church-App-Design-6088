import React, { createContext, useContext, useState } from 'react';

const PaymentContext = createContext();

export const usePayments = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayments must be used within a PaymentProvider');
  }
  return context;
};

// Sample donation data
const sampleDonations = [
  {
    id: '1',
    amount: 100.00,
    currency: 'USD',
    donorName: 'John Smith',
    donorEmail: 'john@example.com',
    message: 'Thank you for this amazing platform!',
    isAnonymous: false,
    paymentMethod: 'card',
    status: 'completed',
    createdAt: '2024-01-15T10:30:00Z',
    transactionId: 'txn_1234567890'
  },
  {
    id: '2',
    amount: 50.00,
    currency: 'USD',
    donorName: 'Anonymous',
    donorEmail: 'anonymous@example.com',
    message: 'God bless your ministry',
    isAnonymous: true,
    paymentMethod: 'paypal',
    status: 'completed',
    createdAt: '2024-01-14T15:45:00Z',
    transactionId: 'txn_0987654321'
  },
  {
    id: '3',
    amount: 25.00,
    currency: 'USD',
    donorName: 'Sarah Johnson',
    donorEmail: 'sarah@example.com',
    message: 'Love the hymn collection!',
    isAnonymous: false,
    paymentMethod: 'card',
    status: 'completed',
    createdAt: '2024-01-13T09:15:00Z',
    transactionId: 'txn_1122334455'
  }
];

// Donation goals and statistics
const donationStats = {
  totalRaised: 2450.00,
  monthlyGoal: 1000.00,
  donorCount: 47,
  averageDonation: 52.13
};

export const PaymentProvider = ({ children }) => {
  const [donations, setDonations] = useState(sampleDonations);
  const [stats, setStats] = useState(donationStats);
  const [isProcessing, setIsProcessing] = useState(false);

  // Process donation
  const processDonation = async (donationData) => {
    setIsProcessing(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newDonation = {
        id: Date.now().toString(),
        ...donationData,
        status: 'completed',
        createdAt: new Date().toISOString(),
        transactionId: `txn_${Math.random().toString(36).substr(2, 9)}`
      };

      setDonations(prev => [newDonation, ...prev]);
      
      // Update stats
      setStats(prev => ({
        ...prev,
        totalRaised: prev.totalRaised + donationData.amount,
        donorCount: prev.donorCount + 1,
        averageDonation: (prev.totalRaised + donationData.amount) / (prev.donorCount + 1)
      }));

      return { success: true, donation: newDonation };
    } catch (error) {
      console.error('Payment processing error:', error);
      return { success: false, error: error.message };
    } finally {
      setIsProcessing(false);
    }
  };

  // Get recent donations (public)
  const getRecentDonations = () => {
    return donations
      .filter(donation => donation.status === 'completed')
      .slice(0, 10)
      .map(donation => ({
        id: donation.id,
        amount: donation.amount,
        currency: donation.currency,
        donorName: donation.isAnonymous ? 'Anonymous' : donation.donorName,
        message: donation.message,
        createdAt: donation.createdAt
      }));
  };

  // Calculate monthly progress
  const getMonthlyProgress = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const monthlyTotal = donations
      .filter(donation => {
        const donationDate = new Date(donation.createdAt);
        return donationDate.getMonth() === currentMonth && 
               donationDate.getFullYear() === currentYear &&
               donation.status === 'completed';
      })
      .reduce((total, donation) => total + donation.amount, 0);

    return {
      current: monthlyTotal,
      goal: stats.monthlyGoal,
      percentage: Math.min((monthlyTotal / stats.monthlyGoal) * 100, 100)
    };
  };

  const value = {
    donations,
    stats,
    isProcessing,
    processDonation,
    getRecentDonations,
    getMonthlyProgress
  };

  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  );
};